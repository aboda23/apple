import React, { useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { bentoImages, airpodsVideos } from "../utils";

gsap.registerPlugin(ScrollTrigger);

/* ── Framer variants ── */
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
  const videoRef = useRef(null);
  const vidRef2 = useRef(null);

  useGSAP(() => {
    /* Staggered bento reveal */
    gsap.fromTo(
      ".bento-card-gsap",
      { opacity: 0, y: 70, scale: 0.94 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.1,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "#bento-grid-max",
          start: "top 78%",
          toggleActions: "play none none reverse",
        },
      }
    );

    /* Parallax zoom on big video */
    gsap.fromTo(
      "#max-hero-video",
      { scale: 1.14 },
      {
        scale: 1.0,
        ease: "none",
        scrollTrigger: {
          trigger: "#max-video-block",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      }
    );

    /* Stat cards count-up like slide */
    gsap.fromTo(
      ".stat-card",
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "#stats-section",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="w-full bg-black text-white overflow-hidden">

      {/* ═══════ INTRO ═══════ */}
      <section className="airpods-sect airpods-sect--lg text-center relative">
        <div className="ambient-glow-backdrop" />
        <div className="airpods-wrap">
          <motion.span
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="block text-xs font-bold tracking-[0.28em] uppercase mb-5"
            style={{ color: "#2997ff" }}
          >
            Over‑Ear Masterpiece
          </motion.span>

          <motion.h2
            variants={fadeUp}
            custom={1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="airpods-title-huge mb-6"
          >
            <span className="airpods-gradient-max">AirPods Max.</span>
            <br />
            <span className="text-gray-600">Radically original.</span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            custom={2}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed"
          >
            A perfect balance of exhilarating high‑fidelity audio and the
            effortless magic of AirPods. The ultimate personal listening
            experience is here.
          </motion.p>
        </div>
      </section>

      {/* ═══════ FULL-BLEED HERO VIDEO ═══════ */}
      <section
        id="max-video-block"
        className="relative overflow-hidden"
        style={{ height: "75vh", minHeight: 520 }}
      >
        <video
          id="max-hero-video"
          ref={videoRef}
          src={airpodsVideos.main}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          style={{ transformOrigin: "center center" }}
        />
        {/* Dark gradient top + bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-80" />
        {/* Content overlay */}
        <div className="absolute inset-0 flex items-end justify-start p-10 md:p-20">
          <div>
            <motion.span
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="block text-xs font-bold tracking-widest uppercase mb-3"
              style={{ color: "#2997ff" }}
            >
              Computational Audio
            </motion.span>
            <motion.h3
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4 max-w-xl leading-none"
            >
              H1 chip. <br />
              <span className="text-gray-400">In each cup.</span>
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-base md:text-lg text-gray-300 max-w-md leading-relaxed"
            >
              10 audio cores per chip process 9 billion operations per second —
              dynamically tuning noise cancellation to your fit.
            </motion.p>
          </div>
        </div>
      </section>

      {/* ═══════ BENTO GRID ═══════ */}
      <section
        id="bento-grid-max"
        className="airpods-sect"
      >
        <div className="airpods-wrap">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="text-center mb-16"
          >
            <motion.span
              variants={fadeUp}
              className="block text-xs font-bold tracking-[0.28em] uppercase mb-4 text-gray-500"
            >
              Design & Materials
            </motion.span>
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="text-4xl md:text-6xl font-bold tracking-tight"
            >
              Built from a{" "}
              <span className="airpods-gradient-max">different material.</span>
            </motion.h2>
          </motion.div>

          {/* Asymmetric bento */}
          <div className="bento-grid-container">

            {/* Card 1 — large (col-span-2 row-span-2) */}
            <div className="bento-card bento-card-gsap md:col-span-2 md:row-span-2" style={{ minHeight: 320 }}>
              <img src={bentoImages[3]} alt="AirPods Max full view" className="absolute inset-0 w-full h-full object-cover" />
              <div className="bento-overlay">
                <span className="block text-xs font-bold tracking-widest uppercase mb-1" style={{ color: "#2997ff" }}>Acoustic Architecture</span>
                <h3 className="text-2xl md:text-3xl font-bold mb-2">Completely reimagined.</h3>
                <p className="text-sm text-gray-300 max-w-xs leading-relaxed">
                  Every surface shaped for sound. Every curve shaped for comfort.
                </p>
              </div>
            </div>

            {/* Card 2 — wide (col-span-2) */}
            <div className="bento-card bento-card-gsap md:col-span-2" style={{ minHeight: 280 }}>
              <img src={bentoImages[0]} alt="Knit Mesh Canopy" className="absolute inset-0 w-full h-full object-cover" />
              <div className="bento-overlay">
                <h3 className="text-xl md:text-2xl font-bold mb-1">Knit‑Mesh Canopy.</h3>
                <p className="text-sm text-gray-300 max-w-sm leading-relaxed">
                  Breathable mesh spans the headband, distributing pressure evenly for all-day comfort.
                </p>
              </div>
            </div>

            {/* Card 3 — small */}
            <div className="bento-card bento-card-gsap md:col-span-1" style={{ minHeight: 280 }}>
              <img src={bentoImages[1]} alt="Ear Cushions" className="absolute inset-0 w-full h-full object-cover" />
              <div className="bento-overlay">
                <h3 className="text-lg md:text-xl font-bold mb-1">Memory Foam.</h3>
                <p className="text-xs text-gray-300 leading-relaxed">
                  Custom cushions create an acoustic seal to block ambient noise.
                </p>
              </div>
            </div>

            {/* Card 4 — small */}
            <div className="bento-card bento-card-gsap md:col-span-1" style={{ minHeight: 280 }}>
              <img src={bentoImages[2]} alt="Digital Crown Controls" className="absolute inset-0 w-full h-full object-cover" />
              <div className="bento-overlay">
                <h3 className="text-lg md:text-xl font-bold mb-1">Digital Crown.</h3>
                <p className="text-xs text-gray-300 leading-relaxed">
                  Precision control for volume, skip, and phone calls.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════ SENSOR VIDEO SIDE-BY-SIDE ═══════ */}
      <section className="airpods-sect" style={{ background: "rgba(255,255,255,0.01)", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <div className="airpods-wrap">
          <div className="airpods-grid-2">
            {/* Text left */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="flex flex-col gap-6"
            >
              <span className="text-xs font-bold tracking-widest uppercase" style={{ color: "#2997ff" }}>
                Active Noise Cancellation
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-none">
                Up to 4× more noise cancelled.
              </h2>
              <p className="text-lg text-gray-400 leading-relaxed max-w-md">
                Six microphones — three outward-facing and three inward-facing —
                work with two Apple H1 chips to remove up to 4x more noise than
                the previous generation.
              </p>
              <div className="flex flex-col gap-4">
                {[
                  { label: "Outward-facing mics", val: "3" },
                  { label: "Inward-facing mics", val: "3" },
                  { label: "Noise cancelled vs. prev. gen.", val: "4×" },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="flex items-center gap-4"
                  >
                    <span
                      className="text-3xl font-bold"
                      style={{ color: "#2997ff", minWidth: 50 }}
                    >
                      {item.val}
                    </span>
                    <span className="text-gray-400 text-sm">{item.label}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Video right — sensor */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative rounded-[36px] overflow-hidden border border-white/10"
              style={{
                aspectRatio: "4/3",
                boxShadow: "0 30px 60px rgba(0,0,0,0.5), 0 0 80px rgba(41,151,255,0.08)",
              }}
            >
              <video
                ref={vidRef2}
                src={airpodsVideos.sensor}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <p className="text-xs font-semibold text-gray-400 tracking-widest uppercase">
                  Adaptive Transparency
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════ STATS ═══════ */}
      <section id="stats-section" className="airpods-sect">
        <div className="airpods-wrap">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { val: "20 hrs", desc: "Listening time with ANC and Spatial Audio enabled.", color: "#2997ff" },
              { val: "5 min", desc: "Quick charge gives 1.5 hours of listening.", color: "#5ac8fa" },
              { val: "38mm", desc: "Custom-built 38mm dynamic driver for full-range audio.", color: "#2997ff" },
            ].map((s, i) => (
              <div
                key={i}
                className="stat-card p-10 rounded-3xl flex flex-col items-center text-center gap-4"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  boxShadow: "0 15px 35px rgba(0,0,0,0.3)",
                }}
              >
                <span className="text-5xl md:text-6xl font-bold" style={{ color: s.color }}>{s.val}</span>
                <p className="text-gray-400 text-sm max-w-[200px] leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default AirPodsMaxSection;
