import React, { useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { airpodsMaxImages, airpodsVideos } from "../utils";

gsap.registerPlugin(ScrollTrigger);

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const AirPodsMaxSection = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    // Bento reveal
    gsap.fromTo(".bento-card-gsap",
      { opacity: 0, y: 70, scale: 0.94 },
      {
        opacity: 1, y: 0, scale: 1, duration: 1.1, stagger: 0.12, ease: "power3.out",
        scrollTrigger: { trigger: "#bento-grid-max", start: "top 78%" }
      }
    );

    // Hero Video Parallax
    gsap.fromTo("#max-hero-video",
      { scale: 1.14 },
      {
        scale: 1.0, ease: "none",
        scrollTrigger: { trigger: "#max-video-block", start: "top bottom", end: "bottom top", scrub: true }
      }
    );

    // Stat cards count-up
    gsap.fromTo(".stat-card",
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power2.out",
        scrollTrigger: { trigger: "#stats-section", start: "top 80%" }
      }
    );
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="w-full bg-black text-white overflow-hidden pb-20">
      
      {/* ═══════ INTRO ═══════ */}
      <section className="pt-24 pb-32 text-center relative flex flex-col items-center justify-center min-h-[60vh]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#2997ff] opacity-10 blur-[150px] pointer-events-none rounded-full" />
        
        <div className="relative z-10 w-full px-6">
          <motion.span 
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} 
            className="block text-sm font-bold tracking-[0.3em] uppercase mb-8" 
            style={{ color: "#2997ff" }}
          >
            Over-Ear Masterpiece
          </motion.span>
          
          <motion.h2 
            variants={fadeUp} custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }} 
            className="text-[60px] md:text-[130px] font-black tracking-tighter leading-[0.85] mb-8"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#a6d1ff]">AirPods Max.</span>
            <br />
            <span className="text-[#666666]">Radically original.</span>
          </motion.h2>
          
          <motion.p 
            variants={fadeUp} custom={2} initial="hidden" whileInView="visible" viewport={{ once: true }} 
            className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed font-medium"
          >
            A perfect balance of exhilarating high-fidelity audio and the effortless magic of AirPods. The ultimate personal listening experience is here.
          </motion.p>
        </div>
      </section>

      {/* ═══════ FULL-BLEED HERO VIDEO ═══════ */}
      <section id="max-video-block" className="relative overflow-hidden w-full h-[80vh] min-h-[600px] my-10">
        <video
          id="max-hero-video"
          src={airpodsVideos.max}
          autoPlay loop muted playsInline
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/80" />
        <div className="absolute inset-0 flex items-center justify-center p-10 text-center">
           <div>
             <motion.h3 initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1 }} className="text-6xl md:text-8xl font-bold tracking-tight mb-4 drop-shadow-2xl">
                High-fidelity audio.
             </motion.h3>
             <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.3 }} className="text-2xl text-gray-200 drop-shadow-lg">
                Now in 5 stunning new colors with USB-C.
             </motion.p>
           </div>
        </div>
      </section>

      {/* ═══════ BENTO GRID ═══════ */}
      <section id="bento-grid-max" className="airpods-sect">
        <div className="airpods-wrap">
          <div className="text-center mb-16">
            <span className="block text-xs font-bold tracking-[0.28em] uppercase mb-4 text-[#2997ff]">Design & Materials</span>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tight">
              Built from a <span className="airpods-gradient-max">different material.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 w-full">
            {/* Card 1 — Large */}
            <div className="bento-card bento-card-gsap md:col-span-2 md:row-span-2 aspect-[4/3] md:aspect-auto">
              <img src={airpodsMaxImages[1]} alt="AirPods Max Lifestyle" className="absolute inset-0 w-full h-full object-cover" />
              <div className="bento-overlay">
                <span className="block text-xs font-bold tracking-widest uppercase mb-2 text-[#2997ff]">Acoustic Architecture</span>
                <h3 className="text-3xl md:text-4xl font-bold mb-3">Completely reimagined.</h3>
                <p className="text-gray-300 max-w-sm text-lg">Every surface shaped for sound. Every curve shaped for comfort.</p>
              </div>
            </div>

            {/* Card 2 — Wide */}
            <div className="bento-card bento-card-gsap md:col-span-2 aspect-[16/9] md:aspect-[2/1]">
               <img src={airpodsMaxImages[2]} alt="Knit Mesh Canopy" className="absolute inset-0 w-full h-full object-cover" />
               <div className="bento-overlay">
                 <h3 className="text-2xl md:text-3xl font-bold mb-2">Knit‑Mesh Canopy.</h3>
                 <p className="text-gray-300 max-w-md">Breathable mesh spans the headband, distributing weight to reduce on‑head pressure.</p>
               </div>
            </div>

            {/* Card 3 — Small */}
            <div className="bento-card bento-card-gsap md:col-span-1 aspect-square bg-[#111]">
               <div className="p-8 h-full flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-[#2997ff]">Digital Crown</h3>
                    <p className="text-gray-400 text-sm">Control volume, skip tracks, answer calls, and activate Siri.</p>
                  </div>
                  <div className="w-16 h-16 rounded-full border-4 border-gray-700 bg-gradient-to-br from-gray-600 to-gray-900 mx-auto mt-4 shadow-xl" />
               </div>
            </div>

            {/* Card 4 — Small */}
            <div className="bento-card bento-card-gsap md:col-span-1 aspect-square">
               <img src={airpodsMaxImages[0]} alt="Memory Foam" className="absolute inset-0 w-full h-full object-cover" />
               <div className="bento-overlay !p-6">
                 <h3 className="text-2xl font-bold mb-1">Memory Foam.</h3>
                 <p className="text-gray-300 text-sm">Acoustically engineered memory foam gently creates an immersive seal.</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ TECH SPECS & CHIPS ═══════ */}
      <section className="airpods-sect border-t border-white/5 bg-[#050505]">
        <div className="airpods-wrap">
          <div className="airpods-grid-2">
            <div className="flex flex-col gap-6">
              <span className="text-xs font-bold tracking-widest uppercase text-[#2997ff]">Computational Audio</span>
              <h2 className="text-5xl md:text-6xl font-bold tracking-tight leading-none">
                H1 chip.
                <br />
                <span className="text-gray-600">In each cup.</span>
              </h2>
              <p className="text-xl text-gray-400 leading-relaxed max-w-md">
                With a powerful Apple-designed H1 chip in each cup, our custom acoustic design, and advanced software, AirPods Max use computational audio to create a breakthrough listening experience.
              </p>
              <ul className="flex flex-col gap-4 mt-4">
                {["10 audio cores per chip", "9 billion operations per second", "Adaptive EQ adjusts sound to fit"].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-gray-300 text-lg">
                    <span className="w-2 h-2 rounded-full bg-[#2997ff]" /> {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative rounded-[40px] overflow-hidden glass-panel border border-[#2997ff]/20 aspect-square flex items-center justify-center bg-gradient-to-br from-[#0a1930] to-black shadow-[0_0_100px_rgba(41,151,255,0.15)]">
               <div className="text-center">
                 <h3 className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-[#2997ff]">40mm</h3>
                 <p className="text-xl font-medium text-gray-300 mt-4 tracking-widest uppercase">Custom Apple Driver</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ STATS ═══════ */}
      <section id="stats-section" className="airpods-sect">
        <div className="airpods-wrap">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { val: "20 hrs", desc: "Listening, movie watching, or talk time with ANC and Spatial Audio.", color: "#2997ff" },
              { val: "5 min", desc: "Quick charge gives 1.5 hours of listening via USB-C.", color: "#5ac8fa" },
              { val: "Smart", desc: "Case preserves battery in ultra-low-power state.", color: "#2997ff" },
            ].map((s, i) => (
              <div key={i} className="stat-card p-10 rounded-[36px] glass-panel flex flex-col items-center text-center gap-6 border border-white/5 hover:border-white/20 transition-colors">
                <span className="text-6xl font-bold" style={{ color: s.color }}>{s.val}</span>
                <p className="text-gray-400 text-base max-w-[220px] leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default AirPodsMaxSection;
