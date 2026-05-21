# Face Track — Client-Side TensorFlow.js Face-Tracking HUD

Welcome to the **Face Track Frontend**, a high-fidelity client-side Single-Page Application (SPA) utilizing **TensorFlow.js (BlazeFace)** to perform real-time local biometric face tracking, alignment validation, and scanning HUD overlays directly in the browser!

---

## 🌟 Key Features

1. **WebGL-Accelerated Face Tracking**: Loads BlazeFace dynamically via Google CDNs to detect faces in real-time, drawing a sleek, high-tech glowing cyan face frame reticle and 6 facial landmarks (eyes, nose, mouth, ears).
2. **AI-Assisted Biometric Alignment**: The central HUD crosshairs turn neon green when a face is centered and clear, automatically triggering an attendance scan or letting you snap a manual registration image.
3. **Double-Layer Camera Canvas**: Overlaying custom vector drawings on top of mirrored webcam feeds creates a smooth HUD visual experience without lag.
4. **Single-Snap Student Onboarding**: Snaps a face photo and uploads personal credentials directly to `/students/register-with-face` to register a student and generate their biometric face embedding in one single atomic transaction.
5. **Classroom Sessions Launcher**: Quick-select seeded Batches/Classes and Subjects, launch active scanning sessions, and monitor attendance counts live.
6. **Attendance Sheets & CSV Export**: Pull historical sessions summaries and download full CSV files for class registries.

---

## 🚀 Getting Started

Since the frontend is built using standard web assets (HTML5, Vanilla CSS, and JavaScript) loaded via CDNs, it requires **zero build compilation or bundler setup**. You can run it instantly using any local web server.

### Option A: Run via Python 3 (Quickest)

Open your terminal, navigate to the `face_track_backend` folder, and start a local HTTP server:

```bash
# From the project root folder:
python -m http.server 3000 --directory frontend
```

Now, navigate your web browser to:
👉 **[http://localhost:3000](http://localhost:3000)**

### Option B: Run via NodeJS (Alternative)

If you have Node installed, you can use the global `serve` command without installing it:

```bash
# Run serve directly:
npx serve frontend
```

---

## ⚙️ Backend Integration Guide

1. Make sure your FastAPI backend is running (e.g. `uvicorn app.main:app --reload --port 8000`).
2. Go to **System Settings** in the left sidebar of the frontend.
3. Verify that the **Backend Server Gateway URL** is pointing to your active backend (default: `http://localhost:8000`).
4. Click **Trigger Initial Data Seed** if your database is empty. This automatically seeds:
   - Sample Classes (Class 1 to 10)
   - Default Administrator Credentials (`admin@facetrack.app` / `admin123`)
5. Enter `admin@facetrack.app` and `admin123` inside the credentials panel and click **Authenticate JWT Gateway**.
6. Once validated, your teacher dashboard stats, active attendance sessions, registration options, and reports will instantly light up!
