import React, { useEffect, useState } from "react";

// 📡 Backend URL (change if needed)
const URL = "192.168.57.214:8000";

const Camera = () => {
  const [prediction, setPrediction] = useState({
    label: "Waiting for predictions...",
    confidence: 0,
    threat_status: "Loading...", // Add threat status
  });

  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // 🌐 Establish WebSocket connection to FastAPI
    const ws = new WebSocket(`ws://${URL}/ws`);

    ws.onopen = () => {
      console.log("✅ WebSocket connected");
      setIsConnected(true);
    };

    // 📡 Receive prediction data via WebSocket
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      // 🎯 Update prediction & threat status
      setPrediction({
        label: data.label || "Unknown",
        confidence: data.confidence || 0,
        threat_status: data.threat_status || "Unknown",
      });
    };

    // ❌ Handle WebSocket errors
    ws.onerror = (error) => {
      console.error("❌ WebSocket error:", error);
    };

    // 🔌 Handle WebSocket closure
    ws.onclose = () => {
      console.log("⚠️ WebSocket connection closed");
      setIsConnected(false);
    };

    // Cleanup WebSocket on component unmount
    return () => {
      ws.close();
    };
  }, []);

  return (
    <div style={styles.container}>
      {/* 📹 Live Video Feed */}
      <div style={styles.videoContainer}>
        <h2>📹 Live Video Feed</h2>
        <img
          src={`http://${URL}/video_feed`}
          alt="Live Feed"
          width="640"
          height="480"
          onError={() =>
            console.error("❌ Error loading video. Check backend connection.")
          }
          style={styles.videoFeed}
        />
      </div>

      {/* ⚡ Live Prediction Results */}
      <div style={styles.predictionContainer}>
        <h2>⚡ Prediction Results</h2>
        <div style={styles.predictionBox}>
          <p>
            <strong>Label:</strong> {prediction.label}
          </p>
          <p>
            <strong>Confidence:</strong>{" "}
            {(prediction.confidence * 100).toFixed(2)}%
          </p>
          <p
            style={{
              color:
                prediction.threat_status === "Threat"
                  ? "#ff4d4f"
                  : "#52c41a",
              fontWeight: "bold",
            }}
          >
            ⚠️ Status: {prediction.threat_status}
          </p>
          {/* ✅ WebSocket Connection Status */}
          <p
            style={{
              color: isConnected ? "#52c41a" : "#ff4d4f",
              fontWeight: "bold",
            }}
          >
            {/* {isConnected ? "✅ Connected to WebSocket" : "❌ Disconnected"} */}
          </p>
        </div>
      </div>
    </div>
  );
};

// 🎨 CSS Styles
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    marginTop: 20,
  },
  videoContainer: {
    marginRight: 20,
    textAlign: "center",
  },
  videoFeed: {
    border: "2px solid #333",
    borderRadius: 8,
    boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
  },
  predictionContainer: {
    marginLeft: 20,
    textAlign: "left",
  },
  predictionBox: {
    padding: 20,
    border: "2px solid #333",
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
    width: "300px",
    boxShadow: "0 5px 10px rgba(0,0,0,0.1)",
  },
};

export default Camera;
