from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Query
from fastapi.responses import StreamingResponse
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func, and_
from datetime import datetime, date
import json
import io
import logging

from app.database import get_db
from app.models.models import (
    Attendance, AttendanceSession, Student, User, Class, Subject, AttendanceStatus
)
from app.schemas.schemas import (
    StartSessionRequest, SessionOut, AttendanceOut,
    FaceMarkResult, MarkAttendanceManual
)
from app.services.jwt_service import get_current_user, require_teacher
from app.services.face_service import extract_embedding, match_face, detect_all_faces
from app.services.report_service import generate_csv, generate_excel, generate_pdf

router = APIRouter()
logger = logging.getLogger(__name__)


# ─── Session management ───────────────────────────────────────────────────────

@router.post("/start-session", response_model=SessionOut)
async def start_session(
    data: StartSessionRequest,
    db: AsyncSession = Depends(get_db),
    user=Depends(require_teacher),
):
    """Teacher starts an attendance session for a class."""
    # Close any existing active session for this class
    existing = await db.execute(
        select(AttendanceSession).where(
            AttendanceSession.class_id == data.class_id,
            AttendanceSession.is_active == True,
        )
    )
    for old in existing.scalars().all():
        old.is_active = False
        old.ended_at = datetime.utcnow()

    # Get teacher id from user token
    teacher_result = await db.execute(
        select(Student.__class__)
    )
    from app.models.models import Teacher
    teacher_result = await db.execute(
        select(Teacher).where(Teacher.user_id == int(user["sub"]))
    )
    teacher = teacher_result.scalar_one_or_none()
    teacher_id = teacher.id if teacher else None

    session = AttendanceSession(
        class_id=data.class_id,
        teacher_id=teacher_id,
        subject_id=data.subject_id,
        date=datetime.utcnow(),
    )
    db.add(session)
    await db.commit()
    await db.refresh(session)
    return session


@router.post("/end-session/{session_id}")
async def end_session(
    session_id: int,
    db: AsyncSession = Depends(get_db),
    user=Depends(require_teacher),
):
    result = await db.execute(select(AttendanceSession).where(AttendanceSession.id == session_id))
    session = result.scalar_one_or_none()
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
    session.is_active = False
    session.ended_at = datetime.utcnow()
    await db.commit()
    return {"message": "Session ended", "session_id": session_id}


@router.get("/sessions", response_model=list[SessionOut])
async def list_sessions(
    class_id: int = None,
    active_only: bool = False,
    db: AsyncSession = Depends(get_db),
    user=Depends(require_teacher),
):
    query = select(AttendanceSession)
    if class_id:
        query = query.where(AttendanceSession.class_id == class_id)
    if active_only:
        query = query.where(AttendanceSession.is_active == True)
    query = query.order_by(AttendanceSession.started_at.desc())
    result = await db.execute(query)
    return result.scalars().all()


# ─── Face-based marking ───────────────────────────────────────────────────────

@router.post("/mark-face", response_model=FaceMarkResult)
async def mark_attendance_face(
    session_id: int,
    file: UploadFile = File(...),
    db: AsyncSession = Depends(get_db),
    user=Depends(require_teacher),
):
    """
    Single-face attendance marking.
    Flutter sends one face image → backend matches → marks present.
    """
    # Verify session is active
    sess_result = await db.execute(
        select(AttendanceSession).where(
            AttendanceSession.id == session_id,
            AttendanceSession.is_active == True,
        )
    )
    session = sess_result.scalar_one_or_none()
    if not session:
        raise HTTPException(status_code=400, detail="Session not found or already ended")

    image_bytes = await file.read()
    probe = extract_embedding(image_bytes)
    if probe is None:
        return FaceMarkResult(matched=False, message="No face detected in image")

    # Load all registered students for this class
    students_result = await db.execute(
        select(Student).where(
            Student.class_id == session.class_id,
            Student.face_registered == True,
        )
    )
    students = students_result.scalars().all()

    if not students:
        return FaceMarkResult(matched=False, message="No registered faces in this class")

    stored = [
        {
            "id": s.id,
            "embedding": s.face_embedding,
            "roll_number": s.roll_number,
        }
        for s in students
        if s.face_embedding
    ]

    match = match_face(probe, stored)
    if not match:
        return FaceMarkResult(matched=False, message="Face not recognized")

    # Load student details
    student_result = await db.execute(select(Student).where(Student.id == match["id"]))
    student = student_result.scalar_one()
    user_result = await db.execute(select(User).where(User.id == student.user_id))
    db_user = user_result.scalar_one()

    # Check duplicate
    dup_result = await db.execute(
        select(Attendance).where(
            Attendance.student_id == match["id"],
            Attendance.session_id == session_id,
        )
    )
    if dup_result.scalar_one_or_none():
        return FaceMarkResult(
            matched=True,
            student_id=match["id"],
            roll_number=student.roll_number,
            full_name=db_user.full_name,
            confidence=match["confidence"],
            duplicate=True,
            message="Already marked present",
        )

    # Mark attendance
    attendance = Attendance(
        student_id=match["id"],
        session_id=session_id,
        status=AttendanceStatus.present,
        confidence=match["confidence"],
    )
    db.add(attendance)
    await db.commit()

    return FaceMarkResult(
        matched=True,
        student_id=match["id"],
        roll_number=student.roll_number,
        full_name=db_user.full_name,
        confidence=match["confidence"],
        duplicate=False,
        message="Attendance marked successfully",
    )


@router.post("/mark-classroom")
async def mark_classroom_attendance(
    session_id: int,
    file: UploadFile = File(...),
    db: AsyncSession = Depends(get_db),
    user=Depends(require_teacher),
):
    """
    Classroom-wide attendance marking.
    Teacher takes one photo of the classroom → all visible students get marked.
    """
    sess_result = await db.execute(
        select(AttendanceSession).where(
            AttendanceSession.id == session_id,
            AttendanceSession.is_active == True,
        )
    )
    session = sess_result.scalar_one_or_none()
    if not session:
        raise HTTPException(status_code=400, detail="Session not found or ended")

    image_bytes = await file.read()
    detected_faces = detect_all_faces(image_bytes)

    if not detected_faces:
        return {"matched_count": 0, "message": "No faces detected in image", "results": []}

    # Load registered students
    students_result = await db.execute(
        select(Student).where(
            Student.class_id == session.class_id,
            Student.face_registered == True,
        )
    )
    students = students_result.scalars().all()
    stored = [
        {"id": s.id, "embedding": s.face_embedding, "roll_number": s.roll_number}
        for s in students if s.face_embedding
    ]

    results = []
    matched_ids = set()

    for face in detected_faces:
        match = match_face(face["embedding"], stored)
        if not match or match["id"] in matched_ids:
            continue

        matched_ids.add(match["id"])

        # Check duplicate
        dup = await db.execute(
            select(Attendance).where(
                Attendance.student_id == match["id"],
                Attendance.session_id == session_id,
            )
        )
        if dup.scalar_one_or_none():
            results.append({**match, "status": "already_present"})
            continue

        attendance = Attendance(
            student_id=match["id"],
            session_id=session_id,
            status=AttendanceStatus.present,
            confidence=match["confidence"],
        )
        db.add(attendance)
        results.append({**match, "status": "marked"})

    await db.commit()
    return {
        "faces_detected": len(detected_faces),
        "matched_count": len(matched_ids),
        "results": results,
    }


# ─── Manual marking ───────────────────────────────────────────────────────────

@router.post("/mark-manual")
async def mark_manual(
    data: MarkAttendanceManual,
    db: AsyncSession = Depends(get_db),
    user=Depends(require_teacher),
):
    """Teacher manually marks or edits attendance."""
    # Update if exists
    existing = await db.execute(
        select(Attendance).where(
            Attendance.student_id == data.student_id,
            Attendance.session_id == data.session_id,
        )
    )
    att = existing.scalar_one_or_none()
    if att:
        att.status = data.status
        att.marked_manually = True
    else:
        att = Attendance(
            student_id=data.student_id,
            session_id=data.session_id,
            status=data.status,
            marked_manually=True,
        )
        db.add(att)
    await db.commit()
    return {"message": "Attendance updated", "status": data.status}


# ─── Reports ──────────────────────────────────────────────────────────────────

@router.get("/reports/session/{session_id}")
async def session_report(
    session_id: int,
    db: AsyncSession = Depends(get_db),
    user=Depends(require_teacher),
):
    """Get full report for a single session."""
    sess = await db.execute(select(AttendanceSession).where(AttendanceSession.id == session_id))
    session = sess.scalar_one_or_none()
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")

    # All students in class
    all_students = await db.execute(
        select(Student).where(Student.class_id == session.class_id)
    )
    students = all_students.scalars().all()

    # Attendance records
    att_result = await db.execute(
        select(Attendance).where(Attendance.session_id == session_id)
    )
    att_records = {a.student_id: a for a in att_result.scalars().all()}

    records = []
    for s in students:
        user_result = await db.execute(select(User).where(User.id == s.user_id))
        u = user_result.scalar_one()
        att = att_records.get(s.id)
        records.append({
            "student_id": s.id,
            "roll_number": s.roll_number,
            "full_name": u.full_name,
            "status": att.status if att else "absent",
            "confidence": att.confidence if att else None,
            "marked_manually": att.marked_manually if att else False,
            "timestamp": att.timestamp.isoformat() if att else None,
        })

    present_count = sum(1 for r in records if r["status"] == "present")
    return {
        "session_id": session_id,
        "class_id": session.class_id,
        "date": session.date.isoformat(),
        "total_students": len(records),
        "present_count": present_count,
        "absent_count": len(records) - present_count,
        "records": records,
    }


@router.get("/reports/student/{student_id}")
async def student_report(
    student_id: int,
    db: AsyncSession = Depends(get_db),
    user=Depends(require_teacher),
):
    """Get attendance summary for a single student."""
    student_result = await db.execute(select(Student).where(Student.id == student_id))
    student = student_result.scalar_one_or_none()
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")

    total = await db.execute(
        select(func.count()).where(Attendance.student_id == student_id)
    )
    present = await db.execute(
        select(func.count()).where(
            Attendance.student_id == student_id,
            Attendance.status == "present",
        )
    )
    total_count = total.scalar()
    present_count = present.scalar()

    user_result = await db.execute(select(User).where(User.id == student.user_id))
    u = user_result.scalar_one()

    return {
        "student_id": student_id,
        "roll_number": student.roll_number,
        "full_name": u.full_name,
        "total_sessions": total_count,
        "present_count": present_count,
        "absent_count": total_count - present_count,
        "attendance_percentage": round((present_count / total_count * 100) if total_count else 0, 2),
    }


@router.get("/export/{session_id}")
async def export_session(
    session_id: int,
    format: str = Query("csv", enum=["csv", "excel", "pdf"]),
    db: AsyncSession = Depends(get_db),
    user=Depends(require_teacher),
):
    """Export session attendance as CSV, Excel, or PDF."""
    report = await session_report(session_id, db, user)
    records = report["records"]
    summary = {
        "Session ID": session_id,
        "Date": report["date"],
        "Total Students": report["total_students"],
        "Present": report["present_count"],
        "Absent": report["absent_count"],
        "Attendance %": f"{round(report['present_count'] / report['total_students'] * 100, 1) if report['total_students'] else 0}%",
    }

    if format == "csv":
        content = generate_csv(records)
        return StreamingResponse(
            io.BytesIO(content),
            media_type="text/csv",
            headers={"Content-Disposition": f"attachment; filename=session_{session_id}.csv"},
        )
    elif format == "excel":
        content = generate_excel(records)
        return StreamingResponse(
            io.BytesIO(content),
            media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            headers={"Content-Disposition": f"attachment; filename=session_{session_id}.xlsx"},
        )
    elif format == "pdf":
        content = generate_pdf(f"Attendance Report — Session {session_id}", records, summary)
        return StreamingResponse(
            io.BytesIO(content),
            media_type="application/pdf",
            headers={"Content-Disposition": f"attachment; filename=session_{session_id}.pdf"},
        )
