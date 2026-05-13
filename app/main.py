import logging
from contextlib import asynccontextmanager
from fastapi import FastAPI, Request, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded

from app.config import settings
from app.database import create_tables
from app.routers import auth, students, attendance, admin

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s | %(levelname)s | %(name)s | %(message)s",
)
logger = logging.getLogger(__name__)

limiter = Limiter(key_func=get_remote_address)


@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("Starting Face Track API...")
    await create_tables()
    logger.info("Database tables ready")
    # Pre-load face model on startup to avoid cold start on first request
    try:
        from app.services.face_service import get_face_app
        get_face_app()
        logger.info("Face recognition model loaded")
    except Exception as e:
        logger.warning(f"Face model not loaded at startup: {e}")
    yield
    logger.info("Shutting down Face Track API")


app = FastAPI(
    title=settings.APP_NAME,
    version="1.0.0",
    description="Face Recognition Attendance System API",
    docs_url="/docs",
    redoc_url="/redoc",
    lifespan=lifespan,
)

# ─── Rate limiting ────────────────────────────────────────────────────────────
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# ─── CORS ─────────────────────────────────────────────────────────────────────
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # Restrict to your Flutter app domain in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ─── Global error handler ─────────────────────────────────────────────────────
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logger.error(f"Unhandled error: {exc}", exc_info=True)
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={"detail": "Internal server error. Please try again."},
    )

# ─── Routers ──────────────────────────────────────────────────────────────────
app.include_router(auth.router,       prefix="/auth",       tags=["Authentication"])
app.include_router(students.router,   prefix="/students",   tags=["Students"])
app.include_router(attendance.router, prefix="/attendance", tags=["Attendance"])
app.include_router(admin.router,      prefix="/admin",      tags=["Admin"])

# ─── Health check ─────────────────────────────────────────────────────────────
@app.get("/", tags=["Health"])
async def root():
    return {"status": "ok", "app": settings.APP_NAME, "version": "1.0.0"}

@app.get("/health", tags=["Health"])
async def health():
    return {"status": "healthy"}
