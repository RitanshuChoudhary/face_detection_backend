import enum
from datetime import datetime
from sqlalchemy import (
    Column, Integer, String, ForeignKey,
    DateTime, Text, Enum, Boolean, Float
)
from sqlalchemy.orm import relationship
from app.database import Base


class RoleEnum(str, enum.Enum):
    admin = "admin"
    teacher = "teacher"
    student = "student"


class AttendanceStatus(str, enum.Enum):
    present = "present"
    absent = "absent"
    late = "late"


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, nullable=False, index=True)
    password_hash = Column(String(255), nullable=False)
    role = Column(Enum(RoleEnum), nullable=False)
    full_name = Column(String(255), nullable=False)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    student = relationship("Student", back_populates="user", uselist=False)
    teacher = relationship("Teacher", back_populates="user", uselist=False)


class Student(Base):
    __tablename__ = "students"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), unique=True)
    roll_number = Column(String(50), unique=True, nullable=False, index=True)
    class_id = Column(Integer, ForeignKey("classes.id", ondelete="SET NULL"), nullable=True)
    phone = Column(String(20), nullable=True)
    face_embedding = Column(Text, nullable=True)   # JSON list of floats
    face_image_url = Column(String(500), nullable=True)
    face_registered = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="student")
    class_ = relationship("Class", back_populates="students")
    attendances = relationship("Attendance", back_populates="student")


class Teacher(Base):
    __tablename__ = "teachers"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), unique=True)
    employee_id = Column(String(50), unique=True, nullable=True)
    phone = Column(String(20), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="teacher")
    sessions = relationship("AttendanceSession", back_populates="teacher")


class Class(Base):
    __tablename__ = "classes"

    id = Column(Integer, primary_key=True, index=True)
    class_name = Column(String(100), nullable=False)
    section = Column(String(10), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    students = relationship("Student", back_populates="class_")
    sessions = relationship("AttendanceSession", back_populates="class_")
    class_subjects = relationship("ClassSubject", back_populates="class_")


class Subject(Base):
    __tablename__ = "subjects"

    id = Column(Integer, primary_key=True, index=True)
    subject_name = Column(String(100), nullable=False)
    subject_code = Column(String(20), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    class_subjects = relationship("ClassSubject", back_populates="subject")


class ClassSubject(Base):
    __tablename__ = "class_subjects"

    id = Column(Integer, primary_key=True, index=True)
    class_id = Column(Integer, ForeignKey("classes.id", ondelete="CASCADE"))
    subject_id = Column(Integer, ForeignKey("subjects.id", ondelete="CASCADE"))
    teacher_id = Column(Integer, ForeignKey("teachers.id", ondelete="SET NULL"), nullable=True)

    class_ = relationship("Class", back_populates="class_subjects")
    subject = relationship("Subject", back_populates="class_subjects")


class AttendanceSession(Base):
    __tablename__ = "attendance_sessions"

    id = Column(Integer, primary_key=True, index=True)
    class_id = Column(Integer, ForeignKey("classes.id", ondelete="CASCADE"))
    teacher_id = Column(Integer, ForeignKey("teachers.id", ondelete="SET NULL"), nullable=True)
    subject_id = Column(Integer, ForeignKey("subjects.id", ondelete="SET NULL"), nullable=True)
    started_at = Column(DateTime, default=datetime.utcnow)
    ended_at = Column(DateTime, nullable=True)
    is_active = Column(Boolean, default=True)
    date = Column(DateTime, default=datetime.utcnow)

    class_ = relationship("Class", back_populates="sessions")
    teacher = relationship("Teacher", back_populates="sessions")
    attendances = relationship("Attendance", back_populates="session")


class Attendance(Base):
    __tablename__ = "attendance"

    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey("students.id", ondelete="CASCADE"))
    session_id = Column(Integer, ForeignKey("attendance_sessions.id", ondelete="CASCADE"))
    status = Column(Enum(AttendanceStatus), default=AttendanceStatus.present)
    confidence = Column(Float, nullable=True)
    timestamp = Column(DateTime, default=datetime.utcnow)
    marked_manually = Column(Boolean, default=False)

    student = relationship("Student", back_populates="attendances")
    session = relationship("AttendanceSession", back_populates="attendances")
