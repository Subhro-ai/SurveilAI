import cv2
from model import Model

# Load the CLIP model with custom settings
model = Model(settings_path="./settings.yaml")

# Capture video from webcam/IP camera
cap = cv2.VideoCapture(0)  # Use 0 for webcam or RTSP URL for IP cam

while True:
    ret, frame = cap.read()
    if not ret:
        break

    # Predict label for the frame
    prediction = model.predict(frame)
    label = prediction['label']
    confidence = prediction['confidence']

    # Display the result on the frame
    cv2.putText(frame, f"{label} ({confidence:.2f})",
                (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 2)
    cv2.imshow('Threat Detection', frame)

    # Press 'q' to exit
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
