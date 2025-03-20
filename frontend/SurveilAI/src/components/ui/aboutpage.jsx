import React, { useEffect } from "react";
import { motion } from "framer-motion";

const AboutPage = () => {
  // Apply global styles for background
  useEffect(() => {
    document.documentElement.style.backgroundColor = "black";
    document.body.style.backgroundColor = "black";
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.overflowX = "hidden";
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  const techItemVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 10,
      },
    },
    hover: {
      scale: 1.05,
      boxShadow: "0px 5px 15px rgba(138, 75, 175, 0.3)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 10,
      },
    },
  };

  // Parallax Effect for Background Elements
  useEffect(() => {
    const handleMouseMove = (e) => {
      const parallaxElements = document.querySelectorAll(".parallax");
      const x = (window.innerWidth - e.pageX * 2) / 100;
      const y = (window.innerHeight - e.pageY * 2) / 100;

      parallaxElements.forEach((el) => {
        el.style.transform = `translateX(${x}px) translateY(${y}px)`;
      });
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="relative w-screen h-screen overflow-y-auto items-center text-gray-100 font-sans">
      {/* Background Elements */}
      <div className="fixed inset-0 w-full h-full bg-black overflow-hidden">
  <div className="absolute inset-0 w-full h-full">
    <div className="parallax absolute top-20 left-20 w-full h-full rounded-full bg-purple-700 blur-3xl"></div>
    <div className="parallax absolute bottom-20 right-40 w-80 h-80 rounded-full bg-purple-500 blur-3xl"></div>
    <div className="parallax absolute top-1/2 left-1/2 w-72 h-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-900 blur-3xl"></div>
  </div>
</div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-grid-white/[0.02] -z-10 bg-[length:50px_50px] items-center"></div>

      {/* Main Content */}
      <motion.div
        className="container items-center pt-32 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="ml-61 max-w-5xl mx-autor">
          {/* Header Section */}
          <motion.div className="mb-16 text-center" variants={itemVariants}>
            <motion.h1
              className="text-6xl font-bold mb-4 text-purple-400 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-purple-300"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              About SurveilAI
            </motion.h1>
            <motion.p
              className="text-xl text-gray-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Advanced CCTV Surveillance with AI-Powered Real-Time Alerts
            </motion.p>
          </motion.div>

          {/* Content Grid */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            variants={containerVariants}
          >
            {/* Our Mission */}
            <motion.div 
              className="bg-gray-900/70 backdrop-blur-sm p-8 rounded-2xl border border-gray-800 hover:border-purple-500 transition duration-300"
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <h2 className="text-2xl font-bold mb-4 text-purple-400">Our Mission</h2>
              <p className="text-gray-300">
                SurveilAI is dedicated to revolutionizing surveillance technology by combining cutting-edge AI with seamless user experiences. We aim to provide real-time threat detection and instant alerts, empowering businesses and individuals to respond quickly to security concerns.
              </p>
            </motion.div>
            
            {/* Technology */}
            <motion.div 
              className="bg-gray-900/70 backdrop-blur-sm p-8 rounded-2xl border border-gray-800 hover:border-purple-500 transition duration-300"
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <h2 className="text-2xl font-bold mb-4 text-purple-400">Technology</h2>
              <p className="text-gray-300">
                Our platform leverages OpenAI's CLIP model for advanced image recognition, enabling intelligent object and anomaly detection in real-time. With FastAPI and RESTful architecture, we ensure rapid processing and reliable performance even under high loads.
              </p>
            </motion.div>
            
            {/* Key Features */}
            <motion.div 
              className="bg-gray-900/70 backdrop-blur-sm p-8 rounded-2xl border border-gray-800 hover:border-purple-500 transition duration-300"
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <h2 className="text-2xl font-bold mb-4 text-purple-400">Key Features</h2>
              <ul className="text-gray-300 space-y-2">
                <motion.li 
                  className="flex items-center"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <span className="text-purple-400 mr-2">→</span> 
                  Real-time monitoring with AI-powered detection
                </motion.li>
                <motion.li 
                  className="flex items-center"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <span className="text-purple-400 mr-2">→</span> 
                  Instant SMS alerts via Twilio integration
                </motion.li>
                <motion.li 
                  className="flex items-center"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <span className="text-purple-400 mr-2">→</span> 
                  Customizable detection parameters
                </motion.li>
                <motion.li 
                  className="flex items-center"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <span className="text-purple-400 mr-2">→</span> 
                  User-friendly dashboard with React and Tailwind
                </motion.li>
              </ul>
            </motion.div>
            
            {/* Our Team */}
            <motion.div 
              className="bg-gray-900/70 backdrop-blur-sm p-8 rounded-2xl border border-gray-800 hover:border-purple-500 transition duration-300"
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <h2 className="text-2xl font-bold mb-4 text-purple-400">Our Team</h2>
              <p className="text-gray-300">
                Behind SurveilAI is a team of passionate developers, security experts, and AI specialists committed to building the most reliable surveillance solution on the market. We combine expertise in machine learning, full-stack development, and security systems to deliver a comprehensive solution.
              </p>
            </motion.div>
          </motion.div>
          
          {/* Tech Stack Section */}
          <motion.div 
            className="mt-16"
            variants={itemVariants}
          >
            <motion.h2 
              className="text-3xl font-bold mb-8 text-center text-purple-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              Our Tech Stack
            </motion.h2>
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
              variants={containerVariants}
            >
              {[
                { name: "React", desc: "Frontend" },
                { name: "Tailwind", desc: "Styling" },
                { name: "Aceternity UI", desc: "UI Components" },
                { name: "FastAPI", desc: "Backend" },
                { name: "OpenAI CLIP", desc: "AI Model" },
                { name: "Twilio", desc: "SMS Alerts" }
              ].map((tech, index) => (
                <motion.div
                  key={tech.name}
                  className="bg-gray-900/60 backdrop-blur-sm p-4 rounded-xl text-center border border-gray-800"
                  variants={techItemVariants}
                  whileHover="hover"
                  custom={index}
                >
                  <p className="text-lg font-semibold text-purple-400">{tech.name}</p>
                  <p className="text-gray-400">{tech.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
          
          {/* Contact Section */}
          <motion.div 
            className="mt-16 text-center"
            variants={itemVariants}
          >
            <motion.h2 
              className="text-3xl font-bold mb-4 text-purple-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0 }}
            >
              Get in Touch
            </motion.h2>
            <motion.p 
              className="text-gray-300 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
            >
              Interested in learning more about how SurveilAI can enhance your security infrastructure?
            </motion.p>
            <motion.button 
              className="px-8 py-3 bg-purple-600 text-white font-semibold rounded-xl hover:bg-purple-700 transition duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, type: "spring" }}
            >
              Contact Us
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default AboutPage;
