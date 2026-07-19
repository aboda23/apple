import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import bgImage from "../../../assets/airpods/IMG_0276.JPG";

const NUM_BARS = 40;

// Generate random heights for noise bars
const noiseHeights = Array.from({ length: NUM_BARS }, (_, i) => {
  const base = Math.sin(i * 0.6) * 30 + 40;
  return Math.max(12, Math.min(95, base + Math.random() * 25));
});

const ANCSimulator = () => {
  const [ancOn, setAncOn] = useState(false);

  return (
    <div className="anc-widget w-full max-w-3xl mx-auto px-8 sm:px-12 md:px-16 py-16 min-h-[560px] flex flex-col justify-center items-center relative overflow-hidden">
      {/* Background Image */}
      <img src={bgImage} alt="" className="absolute inset-0 w-full h-full object-cover z-0 opacity-40 mix-blend-lighten" />

      {/* Ambient glow */}
      <div className={`anc-glow relative z-10 ${ancOn ? "anc-glow--active" : ""}`} />

      {/* Label */}
      <div className="relative z-10 text-center w-full max-w-lg mx-auto mb-12">
        <motion.span
          key={ancOn ? "on" : "off"}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="block ap-label mb-8"
          style={{ color: ancOn ? "#32d74b" : "#2997ff" }}
        >
          {ancOn ? "Active Noise Cancellation ON" : "Transparency Mode"}
        </motion.span>
        <motion.h3
          key={`title-${ancOn}`}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="ap-section-title text-white mb-6"
        >
          {ancOn ? "Pure. Silence." : "Hear the world."}
        </motion.h3>
        <p className="ap-body text-gray-300 max-w-sm mx-auto">
          {ancOn
            ? "Industry-leading noise cancellation blocks out the world so you can focus."
            : "Transparency mode lets in the sounds that matter most."}
        </p>
      </div>

      {/* Soundwave Visualizer */}
      <div className="anc-wave-container relative z-10 w-full flex justify-center items-center mb-8">
        {noiseHeights.map((h, i) => (
          <motion.div
            key={i}
            className="anc-wave-bar rounded-full"
            animate={{
              height: ancOn ? 4 : `${h}%`,
              backgroundColor: ancOn ? "#32d74b" : "#2997ff",
              scaleY: ancOn ? 0.05 : 1,
              opacity: ancOn ? 0.5 : 1,
            }}
            transition={{
              duration: ancOn ? 0.6 : 0.4,
              delay: i * 0.01,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            style={{ height: `${h}%`, minHeight: 4 }}
          />
        ))}
      </div>

      {/* Toggle Button */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => setAncOn((v) => !v)}
        className="relative z-10 ap-btn w-full max-w-[240px]"
        style={{
          background: ancOn
            ? "linear-gradient(135deg,#32d74b,#00a832)"
            : "linear-gradient(135deg,#2997ff,#0071e3)",
          color: "#fff",
          boxShadow: ancOn
            ? "0 8px 30px rgba(50,215,75,0.35)"
            : "0 8px 30px rgba(41,151,255,0.35)",
        }}
      >
        {ancOn ? "Turn Off ANC" : "Enable ANC"}
      </motion.button>
    </div>
  );
};

export default ANCSimulator;
