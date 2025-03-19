import React, { useRef, useEffect } from "react";

const Camera = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const getCameraStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("Error accessing webcam: ", error);
      }
    };

    getCameraStream();
  }, []);

  return (
    <div className="absolute inset-0 flex items-center justify-center z-10">
      <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
    </div>
  );
};

export default Camera;
