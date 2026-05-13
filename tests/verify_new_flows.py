import asyncio
import sys
import os
from datetime import datetime, timedelta

# Ensure workspace is in python path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from app.main import app
from app.config import settings
from app.database import engine, Base, AsyncSessionLocal
from app.models.models import Class, User, Teacher, Student, AttendanceSession, Attendance
from httpx import AsyncClient, ASGITransport


async def setup_test_db():
    from app.database import create_tables
    await create_tables()


async def cleanup_test_records(session):
    from sqlalchemy import select, delete
    test_emails = ["admin@facetrack.app", "teacher1@facetrack.app", "student1@facetrack.app"]
    for email in test_emails:
        res = await session.execute(select(User).where(User.email == email))
        u = res.scalar_one_or_none()
        if u:
            # SQLAlchemy cascade handles deleting associated student/teacher profiles automatically
            await session.delete(u)
    await session.commit()


async def run_verification():
    print("🚀 Starting Verification of Redesigned Flows...")
    # Execute direct database migrations / hot-fixes
    await setup_test_db()
    
    # 1. Run Seeding and Cleanup explicitly on session
    async with AsyncSessionLocal() as session:
        from app.routers.admin import seed_classes_1_to_10
        await seed_classes_1_to_10(session)
        await cleanup_test_records(session)
        
        from sqlalchemy import select
        classes_res = await session.execute(select(Class))
        classes = classes_res.scalars().all()
        print(f"✅ Seeding & Cleanup Verified: Found {len(classes)} classes in DB")
        assert len(classes) >= 10, "Default classes (Class 1 to 10) should be seeded"
        
        # Find Class 1 and Class 2 IDs for testing
        class_1 = next(c for c in classes if c.class_name == "Class 1")
        class_2 = next(c for c in classes if c.class_name == "Class 2")
        print(f"   - Class 1 ID: {class_1.id}, Class 2 ID: {class_2.id}")

    # 2. Run API integration tests using client
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as client:
        # Seed Admin and Login
        seed_res = await client.post("/admin/seed")
        print(f"✅ Seed Route Verified: status={seed_res.status_code}")
        assert seed_res.status_code == 201
        
        login_res = await client.post("/auth/login", json={
            "email": "admin@facetrack.app",
            "password": "admin123"
        })
        print(f"✅ Admin Login Verified: status={login_res.status_code}")
        assert login_res.status_code == 200
        admin_token = login_res.json()["access_token"]
        admin_headers = {"Authorization": f"Bearer {admin_token}"}

        # 3. Admin Creates Teacher & Assigns Class 1
        create_teacher_res = await client.post("/admin/teachers", json={
            "email": "teacher1@facetrack.app",
            "password": "teacherpassword",
            "full_name": "Teacher One",
            "employee_id": "T001",
            "phone": "1234567890",
            "class_id": class_1.id
        }, headers=admin_headers)
        print(f"✅ Admin Teacher Assignment Verified: status={create_teacher_res.status_code}")
        assert create_teacher_res.status_code == 201
        
        # 4. Teacher Logins
        teacher_login_res = await client.post("/auth/login", json={
            "email": "teacher1@facetrack.app",
            "password": "teacherpassword"
        })
        print(f"✅ Teacher Login Verified: status={teacher_login_res.status_code}")
        assert teacher_login_res.status_code == 200
        teacher_token = teacher_login_res.json()["access_token"]
        teacher_headers = {"Authorization": f"Bearer {teacher_token}"}

        # 5. Teacher Student Registration (Register-with-face)
        # For testing face, we bypass actual InsightFace detection by providing a mock or empty file and expecting the validation 
        # to correctly fail or succeed if mocked. Let's test that upload of a non-image file raises face detection error!
        import io
        fake_file = io.BytesIO(b"fake image content")
        register_student_res = await client.post(
            "/students/register-with-face",
            data={
                "email": "student1@facetrack.app",
                "password": "studentpassword",
                "full_name": "Student One",
                "roll_number": "S001",
                "class_id": class_1.id,
                "phone": "9876543210"
            },
            files={"file": ("test.jpg", fake_file, "image/jpeg")},
            headers=teacher_headers
        )
        print(f"✅ Teacher-led Student Creation with Face Validation Verified:")
        print(f"   - Response: {register_student_res.json()}")
        # Should fail with 400 because "fake image content" doesn't have a valid face
        assert register_student_res.status_code == 400
        assert "No face detected" in register_student_res.json()["detail"]

        # 6. Admin Tracking Dashboards
        tracking_teachers_res = await client.get("/admin/tracking/teachers", headers=admin_headers)
        print(f"✅ Admin Tracking Teachers Dashboard Verified: status={tracking_teachers_res.status_code}")
        assert tracking_teachers_res.status_code == 200
        teachers_list = tracking_teachers_res.json()
        print(f"   - Teachers: {teachers_list}")
        assert len(teachers_list) >= 1
        assert teachers_list[0]["class_id"] == class_1.id
        assert teachers_list[0]["class_name"] == "Class 1"

        tracking_classes_res = await client.get("/admin/tracking/classes", headers=admin_headers)
        print(f"✅ Admin Tracking Classes Dashboard Verified: status={tracking_classes_res.status_code}")
        assert tracking_classes_res.status_code == 200
        classes_list = tracking_classes_res.json()
        class_1_track = next(c for c in classes_list if c["class_id"] == class_1.id)
        print(f"   - Class 1 Tracking Summary: {class_1_track}")
        assert len(class_1_track["teachers"]) >= 1
        assert class_1_track["teachers"][0]["full_name"] == "Teacher One"

    print("🏁 All Verification Scenarios Passed Successfully!")


if __name__ == "__main__":
    asyncio.run(run_verification())
