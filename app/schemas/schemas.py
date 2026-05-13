from pydantic import BaseModel, EmailStr, field_validator
from typing import Optional, List
from datetime import datetime
from app.models.models import RoleEnum, AttendanceStatus


# ─── Auth ────────────────────────────────────────────────────────────────────

class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class RegisterRequest(BaseModel):
    email: EmailStr
    password: str
    full_name: str
    role: RoleEnum = RoleEnum.student

    @field_validator("password")
    @classmethod
    def password_min_length(cls, v):
        if len(v) < 6:
            raise ValueError("Password must be at least 6 characters")
        return v


class TokenResponse(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"
    role: str
    user_id: int
    full_name: str


class RefreshRequest(BaseModel):
    refresh_token: str


# ─── User ────────────────────────────────────────────────────────────────────

class UserOut(BaseModel):
    id: int
    email: str
    full_name: str
    role: RoleEnum
    is_active: bool
    created_at: datetime

    model_config = {"from_attributes": True}


# ─── Class ───────────────────────────────────────────────────────────────────

class ClassCreate(BaseModel):
    class_name: str
    section: Optional[str] = None


class ClassOut(BaseModel):
    id: int
    class_name: str
    section: Optional[str]
    created_at: datetime

    model_config = {"from_attributes": True}


# ─── Subject ─────────────────────────────────────────────────────────────────

class SubjectCreate(BaseModel):
    subject_name: str
    subject_code: Optional[str] = None


class SubjectOut(BaseModel):
    id: int
    subject_name: str
    subject_code: Optional[str]

    model_config = {"from_attributes": True}


# ─── Student ─────────────────────────────────────────────────────────────────

class StudentCreate(BaseModel):
    email: EmailStr
    password: str
    full_name: str
    roll_number: str
    class_id: Optional[int] = None
    phone: Optional[str] = None


class StudentOut(BaseModel):
    id: int
    roll_number: str
    phone: Optional[str]
    face_registered: bool
    face_image_url: Optional[str]
    class_id: Optional[int]
    user: UserOut

    model_config = {"from_attributes": True}


class StudentAttendanceSummary(BaseModel):
    student_id: int
    roll_number: str
    full_name: str
    total_sessions: int
    present_count: int
    absent_count: int
    attendance_percentage: float


# ─── Teacher ─────────────────────────────────────────────────────────────────

class TeacherCreate(BaseModel):
    email: EmailStr
    password: str
    full_name: str
    employee_id: Optional[str] = None
    phone: Optional[str] = None


class TeacherOut(BaseModel):
    id: int
    employee_id: Optional[str]
    phone: Optional[str]
    user: UserOut

    model_config = {"from_attributes": True}


# ─── Attendance Session ───────────────────────────────────────────────────────

class StartSessionRequest(BaseModel):
    class_id: int
    subject_id: Optional[int] = None


class SessionOut(BaseModel):
    id: int
    class_id: int
    teacher_id: Optional[int]
    subject_id: Optional[int]
    started_at: datetime
    ended_at: Optional[datetime]
    is_active: bool

    model_config = {"from_attributes": True}


# ─── Attendance ───────────────────────────────────────────────────────────────

class AttendanceOut(BaseModel):
    id: int
    student_id: int
    session_id: int
    status: AttendanceStatus
    confidence: Optional[float]
    timestamp: datetime
    marked_manually: bool

    model_config = {"from_attributes": True}


class MarkAttendanceManual(BaseModel):
    student_id: int
    session_id: int
    status: AttendanceStatus


class FaceMarkResult(BaseModel):
    matched: bool
    student_id: Optional[int] = None
    roll_number: Optional[str] = None
    full_name: Optional[str] = None
    confidence: Optional[float] = None
    duplicate: bool = False
    message: str = ""


# ─── Reports ─────────────────────────────────────────────────────────────────

class AttendanceReport(BaseModel):
    session_id: int
    class_name: str
    section: Optional[str]
    subject_name: Optional[str]
    date: datetime
    total_students: int
    present_count: int
    absent_count: int
    records: List[AttendanceOut]


# ─── Admin Dashboard ──────────────────────────────────────────────────────────

class DashboardStats(BaseModel):
    total_students: int
    total_teachers: int
    total_classes: int
    total_sessions: int
    today_sessions: int
    average_attendance_percentage: float
