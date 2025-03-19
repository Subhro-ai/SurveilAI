from fastapi import FastAPI, WebSocket
from fastapi.responses import StreamingResponse, JSONResponse
import cv2
import asyncio
from model import Model

app = FastAPI()

# Load CLIP model with settings
model = Model(settings_path="./settings.yaml")

# Use a single VideoCapture instance
cap = cv2.VideoCapture(0)  # 0 for webcam, or RTSP URL for IP cam

# Lock for thread safety
lock = asyncio.Lock()

# --------------------------------------
# 📡 API 1: Video Feed to Frontend
# --------------------------------------
def generate_frames():
    while True:
        success, frame = cap.read()
        if not success:
            break

        # Encode frame as JPEG for streaming
        ret, buffer = cv2.imencode('.jpg', frame)
        frame_bytes = buffer.tobytes()

        # Yield frame for MJPEG streaming
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame_bytes + b'\r\n')

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
    """ Get prediction result from the model """
    async with lock:  # Prevent multiple access to camera
        success, frame = cap.read()
        if not success:
            return JSONResponse(content={"error": "Failed to read frame"}, status_code=500)

        # Run model prediction
        prediction = model.predict(frame)

        return JSONResponse(content=prediction)

# --------------------------------------
# 🌐 API 3: WebSocket for Live Predictions
# --------------------------------------
@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    while True:
        async with lock:
            success, frame = cap.read()
            if not success:
                break

            # Get prediction
            prediction = model.predict(frame)
            await websocket.send_json(prediction)

    cap.release()
    await websocket.close()

# --------------------------------------
# 🧹 Cleanup on Shutdown
# --------------------------------------
@app.on_event("shutdown")
def shutdown_event():
    """ Release resources when FastAPI stops """
    cap.release()
