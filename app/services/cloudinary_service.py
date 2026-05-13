import cloudinary
import cloudinary.uploader
import logging
from app.config import settings

logger = logging.getLogger(__name__)

# Configure cloudinary on import
cloudinary.config(
    cloud_name=settings.CLOUDINARY_CLOUD_NAME,
    api_key=settings.CLOUDINARY_API_KEY,
    api_secret=settings.CLOUDINARY_API_SECRET,
    secure=True,
)


def upload_face_image(image_bytes: bytes, student_id: int, index: int = 0) -> str:
    """
    Upload a face image to Cloudinary.
    Returns the secure URL of the uploaded image.
    """
    try:
        result = cloudinary.uploader.upload(
            image_bytes,
            folder="face_track/students",
            public_id=f"student_{student_id}_face_{index}",
            overwrite=True,
            resource_type="image",
            transformation=[
                {"width": 400, "height": 400, "crop": "fill", "gravity": "face"},
                {"quality": "auto:good"},
            ],
        )
        return result["secure_url"]
    except Exception as e:
        logger.error(f"Cloudinary upload failed: {e}")
        return ""


def delete_face_images(student_id: int):
    """Delete all face images for a student from Cloudinary."""
    try:
        for i in range(settings.MAX_FACE_IMAGES):
            cloudinary.uploader.destroy(f"face_track/students/student_{student_id}_face_{i}")
    except Exception as e:
        logger.warning(f"Could not delete Cloudinary images: {e}")
