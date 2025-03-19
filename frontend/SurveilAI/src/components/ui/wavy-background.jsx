
import { useNavigate } from "react-router-dom";"use client";
import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { createNoise3D } from "simplex-noise";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

// Original Accentricity Navbar Components
const transition = {
  type: "spring",
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

export const MenuItem = ({ setActive, active, item, children }) => {
  return (
    <div onMouseEnter={() => setActive(item)} className="relative">
      <motion.p
        transition={{ duration: 0.3 }}
        className="cursor-pointer text-black hover:opacity-[0.9] dark:text-white"
      >
        {item}
      </motion.p>
      {active === item && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={transition}
          className="absolute top-[calc(100%_+_1.2rem)] left-1/2 transform -translate-x-1/2 pt-4"
        >
          <motion.div
            transition={transition}
            layoutId="active"
            className="bg-white dark:bg-black backdrop-blur-sm rounded-2xl overflow-hidden border border-black/[0.2] dark:border-white/[0.2] shadow-xl"
          >
            <motion.div layout className="w-max h-full p-4">
              {children}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export const Menu = ({ setActive, children }) => {
  return (
    <nav
      onMouseLeave={() => setActive(null)}
      className="relative rounded-full border border-transparent dark:bg-black dark:border-white/[0.2] bg-white shadow-input flex justify-center space-x-4 px-8 py-6"
    >
      {children}
    </nav>
  );
};

export const HoveredLink = ({ to, children, ...rest }) => {
  return (
    <Link
      to={to}
      className="text-neutral-700 dark:text-neutral-200 hover:text-black"
      {...rest}
    >
      {children}
    </Link>
  );
};

// Navbar Component
const Navbar = () => {
  const [active, setActive] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  useEffect(() => {
    // Check for system preference
    const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full z-50 flex justify-center py-4">
      <Menu setActive={setActive}>
        <MenuItem setActive={setActive} active={active} item="Log In">
          <HoveredLink to="/login">Tap to log in</HoveredLink>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Detect">
          <HoveredLink to="/surveilai">Start monitoring !</HoveredLink>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Feedback">
          <HoveredLink to="/feedback">Review</HoveredLink>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Contact">
          <HoveredLink to="/contact">Contact Us</HoveredLink>
        </MenuItem>
      </Menu>
    </div>
  );
};

// WavyBackground Component
export const WavyBackground = ({
  children,
  className,
  containerClassName,
  colors,
  waveWidth,
  backgroundFill,
  blur = 10,
  speed = "fast",
  waveOpacity = 0.5,
  ...props
}) => {
  const noise = createNoise3D();
  let w, h, nt, i, x, ctx, canvas;
  const canvasRef = useRef(null);
  
  const getSpeed = () => {
    switch (speed) {
      case "slow":
        return 0.001;
      case "fast":
        return 0.002;
      default:
        return 0.001;
    }
  };

  const init = () => {
    canvas = canvasRef.current;
    ctx = canvas.getContext("2d");
    w = ctx.canvas.width = window.innerWidth;
    h = ctx.canvas.height = window.innerHeight;
    ctx.filter = `blur(${blur}px)`;
    nt = 0;
    window.onresize = function () {
      w = ctx.canvas.width = window.innerWidth;
      h = ctx.canvas.height = window.innerHeight;
      ctx.filter = `blur(${blur}px)`;
    };
    render();
  };

  const waveColors = colors ?? [
    "#38bdf8",
    "#818cf8",
    "#c084fc",
    "#e879f9",
    "#22d3ee",
  ];
  
  const drawWave = (n) => {
    nt += getSpeed();
    for (i = 0; i < n; i++) {
      ctx.beginPath();
      ctx.lineWidth = waveWidth || 50;
      ctx.strokeStyle = waveColors[i % waveColors.length];
      for (x = 0; x < w; x += 5) {
        var y = noise(x / 800, 0.3 * i, nt) * 100;
        ctx.lineTo(x, y + h * 0.5); // adjust for height, currently at 50% of the container
      }
      ctx.stroke();
      ctx.closePath();
    }
  };

  let animationId;
  const render = () => {
    ctx.fillStyle = backgroundFill || "black";
    ctx.globalAlpha = waveOpacity || 0.5;
    ctx.fillRect(0, 0, w, h);
    drawWave(5);
    animationId = requestAnimationFrame(render);
  };

  useEffect(() => {
    init();
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  // Add styles to make the background black for the entire page
  useEffect(() => {
    document.body.style.backgroundColor = "black";
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.minHeight = "100vh";
    
    return () => {
      document.body.style.backgroundColor = "";
      document.body.style.margin = "";
      document.body.style.padding = "";
      document.body.style.minHeight = "";
    };
  }, []);

  const [isSafari, setIsSafari] = useState(false);
  useEffect(() => {
    setIsSafari(
      typeof window !== "undefined" &&
      navigator.userAgent.includes("Safari") &&
      !navigator.userAgent.includes("Chrome")
    );
  }, []);

  return (
    <div className={cn("min-h-screen flex flex-col items-center", containerClassName)}>
      <canvas
        className="absolute inset-0 z-0"
        ref={canvasRef}
        id="canvas"
        style={{
          ...(isSafari ? { filter: `blur(${blur}px)` } : {}),
        }}
      ></canvas>
      
      {/* Original Accentricity Navbar positioned at the top */}
      <Navbar />
      
      {/* Main content positioned absolutely to appear over the waves */}
      <div className={cn("absolute inset-0 z-10 flex flex-col items-center justify-center", className)} {...props}>
        {children}
      </div>
    </div>
  );
};

const ExampleUsage = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  return (
    <WavyBackground
      colors={["#38bdf8", "#818cf8", "#c084fc", "#e879f9", "#22d3ee"]}
      waveWidth={50}
      backgroundFill="black"
      blur={10}
      speed="fast"
      waveOpacity={0.5}
      containerClassName="bg-black"
    >
      <div className="text-center">
        <h1 className="text-6xl font-bold text-white mb-4">SurveilAI</h1>
        <p className="text-xl text-gray-300 mb-6">Detecting threats before they happen</p>
        <p className="text-lg text-gray-300 max-w-md mx-auto mb-6">
          Advanced AI-powered surveillance system that identifies and alerts you to potential 
          violence or threats in real-time. Protecting what matters most with cutting-edge
          threat detection technology.
        </p>
        <button 
          className="mt-4 px-8 py-3 text-white border border-white rounded-full bg-transparent backdrop-blur-md"
          onClick={() => navigate("/surveilai")} // Navigate to /surveilai
        >
          Start Monitoring!
        </button>
      </div>
    </WavyBackground>
  );
};

export default ExampleUsage;