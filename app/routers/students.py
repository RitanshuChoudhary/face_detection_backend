from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from passlib.context import CryptContext
import json
import logging

from app.database import get_db
from app.models.models import User, Student, RoleEnum
from app.schemas.schemas import StudentCreate, StudentOut
from app.services.jwt_service import get_current_user, require_admin, require_teacher
from app.services.face_service import extract_embedding, average_embeddings
from app.services.cloudinary_service import upload_face_image
from app.config import settings

router = APIRouter()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
logger = logging.getLogger(__name__)


@router.post("/", status_code=201)
async def create_student(
    data: StudentCreate,
    db: AsyncSession = Depends(get_db),
    user=Depends(require_admin),
):
    """Admin creates a student account."""
    existing = await db.execute(select(User).where(User.email == data.email))
    if existing.scalar_one_or_none():
        raise HTTPException(status_code=400, detail="Email already registered")

    roll_check = await db.execute(select(Student).where(Student.roll_number == data.roll_number))
    if roll_check.scalar_one_or_none():
        raise HTTPException(status_code=400, detail="Roll number already exists")

    db_user = User(
        email=data.email,
        password_hash=pwd_context.hash(data.password),
        full_name=data.full_name,
        role=RoleEnum.student,
    )
    db.add(db_user)
    await db.flush()

    student = Student(
        user_id=db_user.id,
        roll_number=data.roll_number,
        class_id=data.class_id,
        phone=data.phone,
    )
    db.add(student)
    await db.commit()
    await db.refresh(student)
    return {"message": "Student created", "student_id": student.id, "user_id": db_user.id}


@router.get("/", response_model=list[StudentOut])
async def list_students(
    class_id: int = None,
    db: AsyncSession = Depends(get_db),
    user=Depends(require_teacher),
):
    """List all students. Optionally filter by class."""
    query = select(Student)
    if class_id:
        query = query.where(Student.class_id == class_id)
    result = await db.execute(query)
    return result.scalars().all()


@router.get("/{student_id}", response_model=StudentOut)
async def get_student(
    student_id: int,
    db: AsyncSession = Depends(get_db),
    user=Depends(require_teacher),
):
    result = await db.execute(select(Student).where(Student.id == student_id))
    student = result.scalar_one_or_none()
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")
    return student


@router.post("/{student_id}/register-face")
async def register_face(
    student_id: int,
    files: list[UploadFile] = File(...),
    db: AsyncSession = Depends(get_db),
    user=Depends(require_teacher),
):
    """
    Register face for a student.
    Upload 5-20 images from different angles.
    Backend extracts embeddings and averages them for a robust representation.
    """
    result = await db.execute(select(Student).where(Student.id == student_id))
    student = result.scalar_one_or_none()
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")

    if len(files) < 3:
        raise HTTPException(status_code=400, detail="Please upload at least 3 face images")
    if len(files) > settings.MAX_FACE_IMAGES:
        raise HTTPException(status_code=400, detail=f"Maximum {settings.MAX_FACE_IMAGES} images allowed")

    embeddings = []
    failed = 0
    preview_url = ""

    for i, file in enumerate(files):
        image_bytes = await file.read()

        embedding = extract_embedding(image_bytes)
        if embedding is None:
            failed += 1
            logger.warning(f"No face found in image {i} for student {student_id}")
            continue

        embeddings.append(embedding)

        # Upload first successful image as preview
        if not preview_url and settings.CLOUDINARY_CLOUD_NAME:
            preview_url = upload_face_image(image_bytes, student_id, i)

    if len(embeddings) < 2:
        raise HTTPException(
            status_code=400,
            detail=f"Only {len(embeddings)} valid face(s) found. Need at least 2. "
                   f"Check image quality and ensure face is clearly visible."
        )

    # Average all embeddings for robustness
    avg_embedding = average_embeddings(embeddings)

    student.face_embedding = json.dumps(avg_embedding)
    student.face_registered = True
    if preview_url:
        student.face_image_url = preview_url

    await db.commit()
    return {
        "message": "Face registered successfully",
        "images_processed": len(embeddings),
        "images_failed": failed,
        "face_image_url": preview_url,
    }


@router.delete("/{student_id}/face")
async def remove_face(
    student_id: int,
    db: AsyncSession = Depends(get_db),
    user=Depends(require_admin),
):
    result = await db.execute(select(Student).where(Student.id == student_id))
    student = result.scalar_one_or_none()
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")

    student.face_embedding = None
    student.face_registered = False
    student.face_image_url = None
    await db.commit()
    return {"message": "Face data removed"}


@router.get("/me/attendance")
async def my_attendance(
    db: AsyncSession = Depends(get_db),
    user=Depends(get_current_user),
):
    """Student views their own attendance."""
    from app.models.models import Attendance, AttendanceSession
    from sqlalchemy import func

    student_result = await db.execute(
        select(Student).where(Student.user_id == int(user["sub"]))
    )
    student = student_result.scalar_one_or_none()
    if not student:
        raise HTTPException(status_code=404, detail="Student profile not found")

    total = await db.execute(
        select(func.count()).where(Attendance.student_id == student.id)
    )
    present = await db.execute(
        select(func.count()).where(
            Attendance.student_id == student.id,
            Attendance.status == "present"
        )
    )
    total_count = total.scalar()
    present_count = present.scalar()

    return {
        "student_id": student.id,
        "roll_number": student.roll_number,
        "total_sessions": total_count,
        "present_count": present_count,
        "absent_count": total_count - present_count,
        "attendance_percentage": round((present_count / total_count * 100) if total_count else 0, 2),
    }
