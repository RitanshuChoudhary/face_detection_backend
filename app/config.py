from pydantic_settings import BaseSettings
from typing import Optional


class Settings(BaseSettings):
    # Database
    DATABASE_URL: str

    # JWT
    SECRET_KEY: str
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7

    # Cloudinary
    CLOUDINARY_CLOUD_NAME: str = ""
    CLOUDINARY_API_KEY: str = ""
    CLOUDINARY_API_SECRET: str = ""

    # Redis
    REDIS_URL: Optional[str] = None

    # App
    APP_NAME: str = "Face Track API"
    DEBUG: bool = False
    FACE_MATCH_THRESHOLD: float = 0.5
    MAX_FACE_IMAGES: int = 20

    class Config:
        env_file = ".env"
        extra = "ignore"


settings = Settings()
