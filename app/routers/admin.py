from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from datetime import datetime, date
from passlib.context import CryptContext

from app.database import get_db
from app.models.models import User, Student, Teacher, Class, Subject, AttendanceSession, Attendance, RoleEnum
from app.schemas.schemas import (
    TeacherCreate, TeacherOut, ClassCreate, ClassOut,
    SubjectCreate, SubjectOut, DashboardStats
)
from app.services.jwt_service import require_admin, require_teacher

router = APIRouter()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


# ─── Dashboard ────────────────────────────────────────────────────────────────

@router.get("/dashboard", response_model=DashboardStats)
async def dashboard(
    db: AsyncSession = Depends(get_db),
    user=Depends(require_admin),
):
    total_students = (await db.execute(select(func.count()).select_from(Student))).scalar()
    total_teachers = (await db.execute(select(func.count()).select_from(Teacher))).scalar()
    total_classes  = (await db.execute(select(func.count()).select_from(Class))).scalar()
    total_sessions = (await db.execute(select(func.count()).select_from(AttendanceSession))).scalar()

    today = datetime.utcnow().date()
    today_sessions = (await db.execute(
        select(func.count()).select_from(AttendanceSession).where(
            func.date(AttendanceSession.started_at) == today
        )
    )).scalar()

    total_att = (await db.execute(select(func.count()).select_from(Attendance))).scalar()
    present_att = (await db.execute(
        select(func.count()).select_from(Attendance).where(Attendance.status == "present")
    )).scalar()
    avg_pct = round((present_att / total_att * 100) if total_att else 0.0, 2)

    return DashboardStats(
        total_students=total_students,
        total_teachers=total_teachers,
        total_classes=total_classes,
        total_sessions=total_sessions,
        today_sessions=today_sessions,
        average_attendance_percentage=avg_pct,
    )


# ─── Teachers ────────────────────────────────────────────────────────────────

@router.post("/teachers", status_code=201)
async def create_teacher(
    data: TeacherCreate,
    db: AsyncSession = Depends(get_db),
    user=Depends(require_admin),
):
    existing = await db.execute(select(User).where(User.email == data.email))
    if existing.scalar_one_or_none():
        raise HTTPException(status_code=400, detail="Email already registered")

    if data.class_id:
        class_check = await db.execute(select(Class).where(Class.id == data.class_id))
        if not class_check.scalar_one_or_none():
            raise HTTPException(status_code=400, detail="Assigned Class ID does not exist")

    db_user = User(
        email=data.email,
        password_hash=pwd_context.hash(data.password),
        full_name=data.full_name,
        role=RoleEnum.teacher,
    )
    db.add(db_user)
    await db.flush()

    teacher = Teacher(
        user_id=db_user.id,
        employee_id=data.employee_id,
        phone=data.phone,
        class_id=data.class_id,
    )
    db.add(teacher)
    await db.commit()
    return {"message": "Teacher created", "teacher_id": teacher.id}


@router.get("/teachers", response_model=list[TeacherOut])
async def list_teachers(
    db: AsyncSession = Depends(get_db),
    user=Depends(require_admin),
):
    from sqlalchemy.orm import selectinload
    result = await db.execute(select(Teacher).options(selectinload(Teacher.user)))
    return result.scalars().all()


@router.delete("/teachers/{teacher_id}")
async def delete_teacher(
    teacher_id: int,
    db: AsyncSession = Depends(get_db),
    user=Depends(require_admin),
):
    result = await db.execute(select(Teacher).where(Teacher.id == teacher_id))
    teacher = result.scalar_one_or_none()
    if not teacher:
        raise HTTPException(status_code=404, detail="Teacher not found")
    user_result = await db.execute(select(User).where(User.id == teacher.user_id))
    db_user = user_result.scalar_one()
    await db.delete(teacher)
    await db.delete(db_user)
    await db.commit()
    return {"message": "Teacher deleted"}


# ─── Classes ─────────────────────────────────────────────────────────────────

@router.post("/classes", response_model=ClassOut, status_code=201)
async def create_class(
    data: ClassCreate,
    db: AsyncSession = Depends(get_db),
    user=Depends(require_admin),
):
    class_ = Class(class_name=data.class_name, section=data.section)
    db.add(class_)
    await db.commit()
    await db.refresh(class_)
    return class_


@router.get("/classes", response_model=list[ClassOut])
async def list_classes(
    db: AsyncSession = Depends(get_db),
    user=Depends(require_teacher),
):
    result = await db.execute(select(Class).order_by(Class.class_name))
    return result.scalars().all()


@router.delete("/classes/{class_id}")
async def delete_class(
    class_id: int,
    db: AsyncSession = Depends(get_db),
    user=Depends(require_admin),
):
    result = await db.execute(select(Class).where(Class.id == class_id))
    class_ = result.scalar_one_or_none()
    if not class_:
        raise HTTPException(status_code=404, detail="Class not found")
    await db.delete(class_)
    await db.commit()
    return {"message": "Class deleted"}


# ─── Subjects ─────────────────────────────────────────────────────────────────

@router.post("/subjects", response_model=SubjectOut, status_code=201)
async def create_subject(
    data: SubjectCreate,
    db: AsyncSession = Depends(get_db),
    user=Depends(require_admin),
):
    subject = Subject(subject_name=data.subject_name, subject_code=data.subject_code)
    db.add(subject)
    await db.commit()
    await db.refresh(subject)
    return subject


@router.get("/subjects", response_model=list[SubjectOut])
async def list_subjects(
    db: AsyncSession = Depends(get_db),
    user=Depends(require_teacher),
):
    result = await db.execute(select(Subject).order_by(Subject.subject_name))
    return result.scalars().all()


# ─── Tracking ─────────────────────────────────────────────────────────────────

@router.get("/tracking/teachers")
async def track_teachers(
    db: AsyncSession = Depends(get_db),
    user=Depends(require_admin),
):
    from sqlalchemy.orm import selectinload
    result = await db.execute(
        select(Teacher)
        .options(selectinload(Teacher.user), selectinload(Teacher.class_))
    )
    teachers = result.scalars().all()
    
    tracking_data = []
    for t in teachers:
        sessions_count = (await db.execute(
            select(func.count()).select_from(AttendanceSession).where(AttendanceSession.teacher_id == t.id)
        )).scalar()
        
        tracking_data.append({
            "teacher_id": t.id,
            "employee_id": t.employee_id,
            "phone": t.phone,
            "class_id": t.class_id,
            "class_name": t.class_.class_name if t.class_ else None,
            "section": t.class_.section if t.class_ else None,
            "user_id": t.user.id if t.user else None,
            "email": t.user.email if t.user else None,
            "full_name": t.user.full_name if t.user else None,
            "is_active": t.user.is_active if t.user else False,
            "sessions_conducted": sessions_count
        })
    return tracking_data


@router.get("/tracking/classes")
async def track_classes(
    db: AsyncSession = Depends(get_db),
    user=Depends(require_admin),
):
    from sqlalchemy.orm import selectinload
    result = await db.execute(
        select(Class)
        .options(selectinload(Class.teachers))
    )
    classes = result.scalars().all()
    
    tracking_data = []
    today = datetime.utcnow().date()
    for c in classes:
        student_count = (await db.execute(
            select(func.count()).select_from(Student).where(Student.class_id == c.id)
        )).scalar()
        
        assigned_teachers = []
        for t in c.teachers:
            user_res = await db.execute(select(User).where(User.id == t.user_id))
            u = user_res.scalar_one_or_none()
            if u:
                assigned_teachers.append({
                    "teacher_id": t.id,
                    "full_name": u.full_name,
                    "email": u.email
                })
                
        sessions_today_res = await db.execute(
            select(AttendanceSession.id).where(
                AttendanceSession.class_id == c.id,
                func.date(AttendanceSession.date) == today
            )
        )
        session_ids = [s[0] for s in sessions_today_res.all()]
        
        today_attendance_pct = 0.0
        if session_ids:
            total_records = (await db.execute(
                select(func.count()).select_from(Attendance).where(Attendance.session_id.in_(session_ids))
            )).scalar()
            
            present_records = (await db.execute(
                select(func.count()).select_from(Attendance).where(
                    Attendance.session_id.in_(session_ids),
                    Attendance.status == "present"
                )
            )).scalar()
            
            if total_records > 0:
                today_attendance_pct = round((present_records / total_records) * 100, 2)
        
        tracking_data.append({
            "class_id": c.id,
            "class_name": c.class_name,
            "section": c.section,
            "student_count": student_count,
            "teachers": assigned_teachers,
            "today_attendance_percentage": today_attendance_pct
        })
    return tracking_data


# ─── Seed data ───────────────────────────────────────────────────────────────

async def seed_classes_1_to_10(db: AsyncSession):
    for i in range(1, 11):
        class_name = f"Class {i}"
        result = await db.execute(select(Class).where(Class.class_name == class_name))
        if not result.scalar_one_or_none():
            cls = Class(class_name=class_name, section="A")
            db.add(cls)
    await db.commit()


@router.post("/seed", status_code=201)
async def seed_data(db: AsyncSession = Depends(get_db)):
    """
    Create initial admin account + sample data.
    REMOVE THIS ENDPOINT OR ADD AUTH PROTECTION IN PRODUCTION.
    """
    # Create admin
    existing = await db.execute(select(User).where(User.email == "admin@facetrack.app"))
    if not existing.scalar_one_or_none():
        admin = User(
            email="admin@facetrack.app",
            password_hash=pwd_context.hash("admin123"),
            full_name="System Admin",
            role=RoleEnum.admin,
        )
        db.add(admin)

    # Seed Classes 1 to 10
    await seed_classes_1_to_10(db)

    # Create sample subject
    sub_result = await db.execute(select(Subject).where(Subject.subject_name == "Mathematics"))
    if not sub_result.scalar_one_or_none():
        sub = Subject(subject_name="Mathematics", subject_code="MATH101")
        db.add(sub)

    await db.commit()
    return {
        "message": "Seed data created",
        "admin_email": "admin@facetrack.app",
        "admin_password": "admin123",
        "note": "Change the admin password immediately!"
    }
