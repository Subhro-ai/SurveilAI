import React, { useEffect, useState } from "react";

const Camera = () => {
  const [prediction, setPrediction] = useState({
    label: "Waiting for predictions...",
    confidence: 0,
  });

  useEffect(() => {
    // Establish WebSocket connection to FastAPI
    const ws = new WebSocket("ws://127.0.0.1:8000/ws");

    // Receive prediction data via WebSocket
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setPrediction(data);
    };

    // Cleanup on WebSocket close
    ws.onclose = () => console.log("WebSocket connection closed");

    return () => {
      ws.close();
    };
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
      {/* 📹 Live Video Feed */}
      <div style={{ marginRight: 20 }}>
        <h2>📹 Live Video Feed</h2>
        <img
          src="http://127.0.0.1:8000/video_feed"
          alt="Live Feed"
          width="640"
          height="480"
          style={{ border: "2px solid #333", borderRadius: 8 }}
        />
      </div>

      {/* ⚡ Live Prediction Results */}
      <div style={{ marginLeft: 20, textAlign: "left" }}>
        <h2>⚡ Prediction Results</h2>
        <div
          style={{
            padding: 20,
            border: "2px solid #333",
            borderRadius: 8,
            backgroundColor: "#f9f9f9",
            width: "300px",
          }}
        >
          <p>
            <strong>Label:</strong> {prediction.label}
          </p>
          <p>
            <strong>Confidence:</strong>{" "}
            {(prediction.confidence * 100).toFixed(2)}%
          </p>
          {prediction.confidence > 0.8 ? (
            <p style={{ color: "red", fontWeight: "bold" }}>
              ⚠ High Threat Detected!
            </p>
          ) : (
            <p style={{ color: "green" }}>✅ Normal Activity</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Camera;