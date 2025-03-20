import { useState, useEffect } from "react";
import axios from "axios";

const Livefeed = () => {
  const [prediction, setPrediction] = useState(null);

  useEffect(() => {
    const fetchPrediction = async () => {
      try {
        console.log("WORKSs");  // Check if this logs
        const response = await axios.get("http://192.168.1.15:8000/predict");
        setPrediction(response.data);
      } catch (error) {
        console.error("Error fetching prediction:", error);
      }
    };

    fetchPrediction();  // Call immediately when the component mounts
    const interval = setInterval(fetchPrediction, 10000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-2xl font-bold mb-4">Live Camera Feed</h1>
      <img
        src="http://192.168.1.15:8000/video_feed"
        alt="Live Feed"
        className="border-4 border-blue-500 rounded-lg w-[640px] h-[480px] shadow-lg"
      />
      <div className="mt-4 p-4 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold">Prediction:</h2>
        <p className="text-lg">
          {prediction ? JSON.stringify(prediction) : "Loading..."}
        </p>
      </div>
    </div>
  );
};

export default Livefeed;           