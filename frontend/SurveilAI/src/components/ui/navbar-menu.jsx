"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

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
            <motion.div layout className="w-max h-full p-4">{children}</motion.div>
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
      className="relative rounded-full border border-transparent dark:bg-black dark:border-white/[0.2] bg-white shadow-input flex justify-center space-x-4 px-8 py-6 hover:bg-gray-200 dark:hover:bg-gray-700"
>
      {children}
    </nav>
  );
};

export const HoveredLink = ({ to, children, ...rest }) => {
  return (
    <Link
      to={to}
      className="text-neutral-700 dark:text-neutral-200"
      {...rest}
    >
      {children}
    </Link>
  );
};

export default function Navbar() {
  const [active, setActive] = useState(null);

  return (
    <div className="fixed top-0 left-0 w-full flex justify-center py-4 z-50 shadow-lg">
      <Menu setActive={setActive}>
        <MenuItem setActive={setActive} active={active} item="Home">
          <HoveredLink to="/">Home Page</HoveredLink>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Detect">
          <HoveredLink to="/surveilai">Start monitoring !</HoveredLink>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="About">
          <HoveredLink to="/about">About </HoveredLink>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Feedback">
          <HoveredLink to="/feedback">Review</HoveredLink>
        </MenuItem>
      </Menu>
    </div>
  );
}
