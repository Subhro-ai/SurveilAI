
from fastapi import FastAPI, WebSocket
from fastapi.responses import StreamingResponse, JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import cv2
import asyncio
from model import Model
from twilio_service import send_alert

app = FastAPI()

# --------------------------------------
# 🌐 CORS Configuration (For Frontend Access)
# --------------------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=[""],  # ⚠ Use "" during development, restrict in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --------------------------------------
# 🎥 Global Variables
# --------------------------------------
model = Model(settings_path="./settings.yaml")

# Global frame and lock for safety
frame_buffer = None
lock = asyncio.Lock()

# Video capture (0 for webcam, or RTSP/URL for IP camera)
cap = cv2.VideoCapture(0)

# Alert tracking to prevent spamming
last_alert_label = None
alert_cooldown = 5  # Cooldown period in seconds
last_alert_time = 0

# --------------------------------------
# 📸 Background Frame Capture Task
# --------------------------------------
async def capture_frames():
    global frame_buffer
    while True:
        success, frame = cap.read()
        if success:
            async with lock:
                frame_buffer = frame
        await asyncio.sleep(0.03)  # Capture every 30 ms (~30 FPS)

# Start frame capturing as background task
asyncio.create_task(capture_frames())

# --------------------------------------
# 📡 API 1: Video Feed to Frontend
# --------------------------------------
def generate_frames():
    """ Continuously stream frames to frontend """
    global frame_buffer
    while True:
        if frame_buffer is not None:
            success, buffer = cv2.imencode('.jpg', frame_buffer)
            if success:
                yield (b'--frame\r\n'
                       b'Content-Type: image/jpeg\r\n\r\n' + buffer.tobytes() + b'\r\n')

@app.get("/video_feed")
def video_feed():
    """ Serve video feed to the frontend """
    return StreamingResponse(generate_frames(),
                             media_type="multipart/x-mixed-replace;boundary=frame")

# --------------------------------------
# 🤖 API 2: Get Prediction Results
# --------------------------------------
@app.get("/predict")
async def get_prediction():
    """ Get prediction result from the current frame """
    async with lock:
        if frame_buffer is None:
            return JSONResponse(content={"error": "No frame available"}, status_code=500)

        # Run model prediction
        prediction = model.predict(frame_buffer)

        # Check and trigger SMS alert if needed
        await maybe_send_alert(prediction)

        return JSONResponse(content=prediction)

# --------------------------------------
# 🌐 API 3: WebSocket for Live Predictions
# --------------------------------------
@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    """ Send real-time predictions over WebSocket """
    await websocket.accept()
    while True:
        async with lock:
            if frame_buffer is not None:
                prediction = model.predict(frame_buffer)

                # Check and trigger SMS alert if needed
                await maybe_send_alert(prediction)

                await websocket.send_json(prediction)

        await asyncio.sleep(0.5)  # Limit prediction frequency

# --------------------------------------
# 📢 Trigger SMS Alert
# --------------------------------------
async def maybe_send_alert(prediction):
    """ Check confidence and send SMS alert if needed """
    global last_alert_label, last_alert_time

    label = prediction['label']
    confidence = prediction['confidence']

    # Check confidence threshold and avoid spamming
    if confidence >= 0.6 and label != "Unknown":
        current_time = asyncio.get_event_loop().time()

        # Only send alert if cooldown is passed or label has changed
        if (label != last_alert_label) or (current_time - last_alert_time > alert_cooldown):
            send_alert(label, confidence)
            last_alert_label = label
            last_alert_time = current_time

# --------------------------------------
# 🧹 Cleanup on Shutdown
# --------------------------------------
@app.on_event("shutdown")
def shutdown_event():
    """ Release resources when FastAPI stops """
    cap.release()