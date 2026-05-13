FROM python:3.11-slim

WORKDIR /app

# System dependencies for InsightFace + OpenCV
# Note: libgl1-mesa-glx was renamed to libgl1 in Debian trixie
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    python3-dev \
    libgl1 \
    libglib2.0-0 \
    libsm6 \
    libxrender1 \
    libxext6 \
    libgomp1 \
    wget \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# Pre-download InsightFace model (buffalo_sc = smaller model for free tier)
RUN python -c "\
import insightface; \
app = insightface.app.FaceAnalysis(name='buffalo_sc', allowed_modules=['detection','recognition']); \
app.prepare(ctx_id=-1, det_size=(320,320)); \
print('Model downloaded')"

COPY . .

EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--workers", "1"]
