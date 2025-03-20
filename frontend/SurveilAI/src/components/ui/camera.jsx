import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

// 📡 Backend URL (change if needed)
const URL = "192.168.57.214:8000";

const Camera = () => {
  const [prediction, setPrediction] = useState({
    label: "Waiting for predictions...",
    confidence: 0,
    threat_status: "Loading...",
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

  // Variants for animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  return (
    <motion.div 
      className="camera-container"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* 📹 Live Video Feed */}
      <motion.div className="video-container" variants={itemVariants}>
        <h2 className="section-title">Live Video Feed</h2>
        <div className="video-wrapper">
          <img
            src={`http://${URL}/video_feed`}
            alt="Live Feed"
            onError={() =>
              console.error("❌ Error loading video. Check backend connection.")
            }
            className="video-feed"
          />
        </div>
      </motion.div>

      {/* ⚡ Live Prediction Results */}
      <motion.div className="prediction-container" variants={itemVariants}>
        <h2 className="section-title"> Prediction Results</h2>
        <motion.div 
          className={`prediction-box ${prediction.threat_status === "Threat" ? "threat" : "safe"}`}
          animate={{
            boxShadow: prediction.threat_status === "Threat" 
              ? [
                  "0 5px 15px rgba(255, 77, 79, 0.3)",
                  "0 5px 25px rgba(255, 77, 79, 0.6)",
                  "0 5px 15px rgba(255, 77, 79, 0.3)"
                ]
              : "0 5px 15px rgba(0, 0, 0, 0.2)"
          }}
          transition={{
            repeat: prediction.threat_status === "Threat" ? Infinity : 0,
            duration: 2
          }}
        >
          <div className="prediction-item">
            <span className="prediction-label">Label:</span>
            <motion.span 
              className="prediction-value"
              key={prediction.label}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {prediction.label}
            </motion.span>
          </div>
          
          <div className="prediction-item">
            <span className="prediction-label">Confidence:</span>
            <div className="confidence-wrapper">
              <motion.div 
                className="confidence-bar"
                initial={{ width: 0 }}
                animate={{ width: `${prediction.confidence * 100}%` }}
                transition={{ type: "spring", stiffness: 50 }}
              />
              <span className="confidence-text">
                {(prediction.confidence * 100).toFixed(2)}%
              </span>
            </div>
          </div>
          
          <div className="prediction-item status-item">
            <motion.div 
              className={`status-indicator ${prediction.threat_status === "Threat" ? "threat" : "safe"}`}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ 
                repeat: Infinity, 
                repeatType: "reverse", 
                duration: prediction.threat_status === "Threat" ? 0.5 : 1.5 
              }}
            >
              {prediction.threat_status === "Threat" ? "⚠️" : "✅"}
            </motion.div>
            <span className={`status-text ${prediction.threat_status === "Threat" ? "threat" : "safe"}`}>
              {prediction.threat_status}
            </span>
          </div>
          
          <div className="connection-status">
            <span className={`status-dot ${isConnected ? "connected" : "disconnected"}`}></span>
            <span className="status-text">
              {isConnected ? "Connected to WebSocket" : "Disconnected"}
            </span>
          </div>
        </motion.div>
      </motion.div>

      <style jsx>{`
        /* Global variables */
        :root {
          --glass-bg: rgba(255, 255, 255, 0.1);
          --glass-border: rgba(255, 255, 255, 0.2);
          --glass-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
          --threat-color: #ff4d4f;
          --safe-color: #52c41a;
          --text-color: rgba(255, 255, 255, 0.9);
          --blur-amount: 10px;
        }

        /* Camera container */
        .camera-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          color: var(--text-color);
          font-family: 'Inter', sans-serif;
          
          @media (min-width: 768px) {
            flex-direction: row;
            align-items: flex-start;
          }
        }

        /* Section titles */
        .section-title {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 1.5rem;
          text-align: center;
          color: white;
          position: relative;
        }
        
        .section-title::after {
          content: '';
          position: absolute;
          left: 50%;
          bottom: -8px;
          height: 3px;
          width: 60px;
          background: linear-gradient(90deg, #e0e0e0, transparent);
          transform: translateX(-50%);
          border-radius: 3px;
        }

        /* Video container */
        .video-container {
          margin-bottom: 2rem;
          width: 100%;
          max-width: 640px;
          
          @media (min-width: 768px) {
            margin-right: 2rem;
            margin-bottom: 0;
          }
        }

        .video-wrapper {
          border-radius: 1rem;
          overflow: hidden;
          position: relative;
          box-shadow: var(--glass-shadow);
          transition: transform 0.3s ease;
        }
        
        .video-wrapper:hover {
          transform: translateY(-5px);
        }
        
        .video-feed {
          display: block;
          width: 100%;
          height: auto;
          object-fit: cover;
          border-radius: 1rem;
          transition: all 0.3s ease;
        }

        /* Prediction container */
        .prediction-container {
          width: 100%;
          max-width: 320px;
        }

        .prediction-box {
          background: var(--glass-bg);
          backdrop-filter: blur(var(--blur-amount));
          -webkit-backdrop-filter: blur(var(--blur-amount));
          border: 1px solid var(--glass-border);
          border-radius: 1rem;
          padding: 1.5rem;
          box-shadow: var(--glass-shadow);
          transition: all 0.3s ease;
        }
        
        .prediction-box.threat {
          border-color: rgba(255, 77, 79, 0.4);
        }
        
        .prediction-box.safe {
          border-color: rgba(82, 196, 26, 0.4);
        }

        .prediction-item {
          margin-bottom: 1.25rem;
          display: flex;
          flex-direction: column;
        }

        .prediction-label {
          font-size: 0.875rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 0.5rem;
          opacity: 0.7;
        }

        .prediction-value {
          font-size: 1.25rem;
          font-weight: 600;
        }

        /* Confidence bar */
        .confidence-wrapper {
          position: relative;
          height: 6px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
          margin-top: 0.5rem;
          margin-bottom: 0.5rem;
          overflow: hidden;
        }
        
        .confidence-bar {
          height: 100%;
          background: linear-gradient(90deg, #4cc9f0, #4361ee);
          border-radius: 3px;
        }
        
        .confidence-text {
          position: absolute;
          right: 0;
          top: -20px;
          font-size: 0.875rem;
          font-weight: 600;
        }

        /* Status indicator */
        .status-item {
          display: flex;
          align-items: center;
          margin-top: 1.5rem;
        }
        
        .status-indicator {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          margin-right: 1rem;
          font-size: 1.25rem;
          background: rgba(0, 0, 0, 0.2);
        }
        
        .status-indicator.threat {
          background: rgba(255, 77, 79, 0.2);
        }
        
        .status-indicator.safe {
          background: rgba(82, 196, 26, 0.2);
        }
        
        .status-text {
          font-weight: 600;
          font-size: 1.25rem;
        }
        
        .status-text.threat {
          color: var(--threat-color);
        }
        
        .status-text.safe {
          color: var(--safe-color);
        }

        /* Connection status */
        .connection-status {
          display: flex;
          align-items: center;
          margin-top: 1.5rem;
          padding-top: 1rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .status-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          margin-right: 0.5rem;
        }
        
        .status-dot.connected {
          background: var(--safe-color);
          box-shadow: 0 0 10px var(--safe-color);
          animation: pulse 1.5s infinite;
        }
        
        .status-dot.disconnected {
          background: var(--threat-color);
        }
        
        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(82, 196, 26, 0.4);
          }
          70% {
            box-shadow: 0 0 0 5px rgba(82, 196, 26, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(82, 196, 26, 0);
          }
        }
      `}</style>
    </motion.div>
  );
};

export default Camera;