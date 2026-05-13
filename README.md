# Face Track Backend

Production-ready FastAPI backend for the Face Track App — Face Recognition Attendance System.

---

## Tech Stack

| Layer | Tool |
|---|---|
| API | FastAPI + Uvicorn |
| Database | PostgreSQL via Supabase (free) |
| Face Recognition | InsightFace (buffalo_sc model) |
| Image Storage | Cloudinary (free) |
| Auth | JWT (access + refresh tokens) |
| Hosting | Render (free tier) |

---

## Project Structure

```
face_track_backend/
├── app/
│   ├── main.py              ← FastAPI app entry point
│   ├── config.py            ← Environment settings
│   ├── database.py          ← Async SQLAlchemy setup
│   ├── models/
│   │   └── models.py        ← All DB models
│   ├── schemas/
│   │   └── schemas.py       ← Pydantic request/response schemas
│   ├── routers/
│   │   ├── auth.py          ← Login, register, refresh
│   │   ├── students.py      ← Student CRUD + face registration
│   │   ├── attendance.py    ← Sessions + face marking + reports
│   │   └── admin.py         ← Dashboard, teachers, classes, subjects
│   └── services/
│       ├── face_service.py      ← InsightFace embedding + matching
│       ├── jwt_service.py       ← Token creation + validation
│       ├── cloudinary_service.py← Image upload
│       └── report_service.py    ← PDF, CSV, Excel export
├── alembic/                 ← DB migrations
├── tests/                   ← API tests
├── Dockerfile
├── docker-compose.yml       ← Local development
├── requirements.txt
└── .env.example
```

---

## Step 1 — Set Up Supabase Database

1. Go to [supabase.com](https://supabase.com) and create a free project
2. Go to **Settings → Database → Connection string → URI**
3. Copy the URI and change `postgres://` to `postgresql+asyncpg://`
4. It should look like:
   ```
   postgresql+asyncpg://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres
   ```

---

## Step 2 — Set Up Cloudinary (Image Storage)

1. Go to [cloudinary.com](https://cloudinary.com) and create a free account
2. From the dashboard, copy:
   - Cloud Name
   - API Key
   - API Secret

---

## Step 3 — Run Locally

### Option A: Docker Compose (recommended)

```bash
# 1. Clone and enter the project
cd face_track_backend

# 2. Copy env file
cp .env.example .env
# Fill in your Supabase and Cloudinary values in .env

# 3. Start everything
docker-compose up --build

# API will be at: http://localhost:8000
# Swagger docs: http://localhost:8000/docs
```

### Option B: Plain Python

```bash
# 1. Create virtual environment
python -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate

# 2. Install dependencies
pip install -r requirements.txt

# 3. Copy and fill .env
cp .env.example .env

# 4. Run
uvicorn app.main:app --reload --port 8000
```

---

## Step 4 — Deploy to Render (Free)

### 4.1 Push to GitHub

```bash
git init
git add .
git commit -m "Initial Face Track backend"
git remote add origin https://github.com/YOUR_USERNAME/face-track-backend.git
git push -u origin main
```

### 4.2 Create Render Web Service

1. Go to [render.com](https://render.com) → **New → Web Service**
2. Connect your GitHub repo
3. Set these settings:

| Setting | Value |
|---|---|
| Name | face-track-api |
| Region | Oregon (US West) |
| Runtime | **Docker** |
| Instance Type | Free |
| Branch | main |

### 4.3 Set Environment Variables on Render

In Render dashboard → **Environment**, add these:

```
DATABASE_URL          = postgresql+asyncpg://...your supabase URL...
SECRET_KEY            = run: python -c "import secrets; print(secrets.token_hex(32))"
ALGORITHM             = HS256
ACCESS_TOKEN_EXPIRE_MINUTES = 30
REFRESH_TOKEN_EXPIRE_DAYS   = 7
CLOUDINARY_CLOUD_NAME = your_cloud_name
CLOUDINARY_API_KEY    = your_api_key
CLOUDINARY_API_SECRET = your_api_secret
FACE_MATCH_THRESHOLD  = 0.5
```

### 4.4 Deploy

Click **Create Web Service**. Render will:
1. Pull your code
2. Build the Docker image (downloads InsightFace model — takes ~5 min first time)
3. Start the server

Your API URL will be: `https://face-track-api.onrender.com`

---

## Step 5 — Seed Initial Data

After deployment, call this once to create the admin account:

```bash
curl -X POST https://face-track-api.onrender.com/admin/seed
```

Response:
```json
{
  "message": "Seed data created",
  "admin_email": "admin@facetrack.app",
  "admin_password": "admin123"
}
```

**Change the admin password immediately after seeding.**

---

## API Reference

### Authentication

| Method | Endpoint | Description |
|---|---|---|
| POST | `/auth/login` | Login → get tokens |
| POST | `/auth/register` | Create user |
| POST | `/auth/refresh` | Refresh access token |
| GET | `/auth/me` | Get current user |

### Students

| Method | Endpoint | Description |
|---|---|---|
| POST | `/students/` | Create student (admin) |
| GET | `/students/` | List students |
| GET | `/students/{id}` | Get student |
| POST | `/students/{id}/register-face` | Upload face images |
| DELETE | `/students/{id}/face` | Remove face data |
| GET | `/students/me/attendance` | My attendance (student) |

### Attendance

| Method | Endpoint | Description |
|---|---|---|
| POST | `/attendance/start-session` | Start session |
| POST | `/attendance/end-session/{id}` | End session |
| GET | `/attendance/sessions` | List sessions |
| POST | `/attendance/mark-face` | Mark via single face photo |
| POST | `/attendance/mark-classroom` | Mark all faces in classroom photo |
| POST | `/attendance/mark-manual` | Manual edit |
| GET | `/attendance/reports/session/{id}` | Session report |
| GET | `/attendance/reports/student/{id}` | Student report |
| GET | `/attendance/export/{id}?format=csv` | Export CSV/Excel/PDF |

### Admin

| Method | Endpoint | Description |
|---|---|---|
| GET | `/admin/dashboard` | Stats overview |
| POST | `/admin/teachers` | Create teacher |
| GET | `/admin/teachers` | List teachers |
| POST | `/admin/classes` | Create class |
| GET | `/admin/classes` | List classes |
| POST | `/admin/subjects` | Create subject |
| GET | `/admin/subjects` | List subjects |

**Interactive docs:** `https://your-render-url.onrender.com/docs`

---

## Flutter Integration

### Base URL

```dart
const String baseUrl = 'https://face-track-api.onrender.com';
```

### Key request formats

**Login:**
```json
POST /auth/login
{ "email": "teacher@school.com", "password": "pass123" }
```

**Start Session:**
```json
POST /attendance/start-session
{ "class_id": 1, "subject_id": 2 }
```

**Mark Face (multipart):**
```
POST /attendance/mark-face?session_id=5
Content-Type: multipart/form-data
file: [image bytes]
```

**Register Face (multipart, multiple files):**
```
POST /students/1/register-face
Content-Type: multipart/form-data
files: [image1, image2, image3 ...]
```

All protected routes need:
```
Authorization: Bearer <access_token>
```

---

## Important Notes for Free Tier (Render)

- **Cold start:** Render free tier sleeps after 15 min inactivity. First request after sleep takes ~30 seconds (model reload).
- **RAM:** InsightFace `buffalo_sc` model uses ~400MB RAM. Free tier gives 512MB — it's tight but works.
- **Speed:** Face matching is done in Python/CPU — expect 1-3 seconds per match. For classroom mode with many faces, it may take 5-10 seconds.
- **Concurrent users:** Free tier is single-worker. Avoid simultaneous recognition requests.

---

## Running Tests

```bash
pip install pytest pytest-asyncio httpx
pytest tests/ -v
```
