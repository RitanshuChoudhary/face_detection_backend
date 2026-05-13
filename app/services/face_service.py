import numpy as np
import json
import cv2
import logging
from typing import Optional
from app.config import settings

logger = logging.getLogger(__name__)

# ─── Model loading (singleton) ────────────────────────────────────────────────
_face_app = None


def get_face_app():
    global _face_app
    if _face_app is None:
        try:
            import insightface
            _face_app = insightface.app.FaceAnalysis(
                name="buffalo_sc",          # lighter model, good for free tier
                allowed_modules=["detection", "recognition"],
            )
            _face_app.prepare(ctx_id=-1, det_size=(320, 320))  # CPU mode
            logger.info("InsightFace model loaded successfully")
        except Exception as e:
            logger.error(f"Failed to load InsightFace: {e}")
            raise
    return _face_app


# ─── Core functions ───────────────────────────────────────────────────────────

def extract_embedding(image_bytes: bytes) -> Optional[list]:
    """Extract face embedding from raw image bytes. Returns None if no face found."""
    try:
        nparr = np.frombuffer(image_bytes, np.uint8)
        img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        if img is None:
            logger.warning("Could not decode image")
            return None

        # Resize for performance on free tier
        h, w = img.shape[:2]
        if max(h, w) > 640:
            scale = 640 / max(h, w)
            img = cv2.resize(img, (int(w * scale), int(h * scale)))

        app = get_face_app()
        faces = app.get(img)

        if not faces:
            logger.info("No faces detected in image")
            return None

        # Use the largest face if multiple detected
        largest = max(faces, key=lambda f: (f.bbox[2] - f.bbox[0]) * (f.bbox[3] - f.bbox[1]))
        return largest.embedding.tolist()

    except Exception as e:
        logger.error(f"Error extracting embedding: {e}")
        return None


def cosine_similarity(a: list, b: list) -> float:
    """Compute cosine similarity between two embedding vectors."""
    va = np.array(a, dtype=np.float32)
    vb = np.array(b, dtype=np.float32)
    norm_a = np.linalg.norm(va)
    norm_b = np.linalg.norm(vb)
    if norm_a == 0 or norm_b == 0:
        return 0.0
    return float(np.dot(va, vb) / (norm_a * norm_b))


def average_embeddings(embeddings: list[list]) -> list:
    """Average multiple embeddings into one robust representation."""
    arr = np.array(embeddings, dtype=np.float32)
    avg = np.mean(arr, axis=0)
    # Normalize
    norm = np.linalg.norm(avg)
    if norm > 0:
        avg = avg / norm
    return avg.tolist()


def match_face(
    probe_embedding: list,
    stored_records: list[dict],
    threshold: float = None
) -> Optional[dict]:
    """
    Match a probe embedding against stored records.
    Each record must have: {id, embedding (JSON str), student_id, roll_number, full_name}
    Returns the best match above threshold or None.
    """
    if threshold is None:
        threshold = settings.FACE_MATCH_THRESHOLD

    best_match = None
    best_score = threshold  # Only accept if above threshold

    for record in stored_records:
        try:
            stored_emb = json.loads(record["embedding"])
            score = cosine_similarity(probe_embedding, stored_emb)
            if score > best_score:
                best_score = score
                best_match = {**record, "confidence": round(score, 4)}
        except Exception as e:
            logger.warning(f"Error comparing embedding for record {record.get('id')}: {e}")

    return best_match


def detect_faces_count(image_bytes: bytes) -> int:
    """Return how many faces are detected in an image."""
    try:
        nparr = np.frombuffer(image_bytes, np.uint8)
        img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        if img is None:
            return 0
        app = get_face_app()
        faces = app.get(img)
        return len(faces)
    except Exception:
        return 0


def detect_all_faces(image_bytes: bytes) -> list[dict]:
    """
    Detect all faces in a classroom image and return embeddings + bounding boxes.
    Used during live attendance scanning.
    """
    try:
        nparr = np.frombuffer(image_bytes, np.uint8)
        img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        if img is None:
            return []

        h, w = img.shape[:2]
        if max(h, w) > 960:
            scale = 960 / max(h, w)
            img = cv2.resize(img, (int(w * scale), int(h * scale)))

        app = get_face_app()
        faces = app.get(img)

        result = []
        for face in faces:
            bbox = face.bbox.tolist()
            result.append({
                "embedding": face.embedding.tolist(),
                "bbox": {
                    "x": int(bbox[0]),
                    "y": int(bbox[1]),
                    "w": int(bbox[2] - bbox[0]),
                    "h": int(bbox[3] - bbox[1]),
                },
                "det_score": float(face.det_score),
            })
        return result

    except Exception as e:
        logger.error(f"Error detecting faces: {e}")
        return []
