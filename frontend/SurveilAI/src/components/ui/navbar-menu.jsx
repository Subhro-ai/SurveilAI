"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [active, setActive] = useState(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const RANGE = 200; // Change this to increase/decrease the detection range

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const navCenterX = window.innerWidth / 2;
      const navCenterY = 50; // Adjusted height of the navbar

      const distance = Math.sqrt(
        Math.pow(clientX - navCenterX, 2) + Math.pow(clientY - navCenterY, 2)
      );

      if (distance < RANGE) {
        const moveX = (clientX - navCenterX) * 0.1; // Moves toward cursor
        const moveY = (clientY - navCenterY) * 0.1; // Moves toward cursor
        setPosition({ x: moveX, y: moveY });
      } else {
        setPosition({ x: 0, y: 0 }); // Reset to original position
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full flex justify-center py-4 z-50 ">
      <motion.nav
        animate={{ x: position.x, y: position.y }}
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
        onMouseLeave={() => setActive(null)}
        className="relative rounded-full border border-white/40 
             backdrop-blur-lg bg-white/20 dark:bg-white/10 
             text-white shadow-lg shadow-white/20 
             flex justify-center space-x-4 px-8 py-6"

>
        <MenuItem setActive={setActive} active={active} item="Home">
          <HoveredLink to="/">Home Page</HoveredLink>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Detect">
          <HoveredLink to="/surveilai">Start monitoring!</HoveredLink>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="About">
          <HoveredLink to="/about">About</HoveredLink>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Feedback">
          <HoveredLink to="/feedback">Review</HoveredLink>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="History">
          <HoveredLink to="/threathistory">Check History</HoveredLink>
        </MenuItem>
      </motion.nav>
    </div>
  );
}

const MenuItem = ({ setActive, active, item, children }) => (
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
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
        className="absolute top-[calc(100%_+_1.2rem)] left-1/2 transform -translate-x-1/2 pt-4"
      >
        <motion.div
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
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

const HoveredLink = ({ to, children, ...rest }) => (
  <Link to={to} className="text-neutral-700 dark:text-neutral-200" {...rest}>
    {children}
  </Link>
);
