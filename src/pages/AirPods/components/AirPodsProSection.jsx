import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { motion } from "framer-motion";
import { airpodsVideos, extraImages } from "../utils";
import ANCSimulator from "./ANCSimulator";

gsap.registerPlugin(ScrollTrigger);

const fadeUp = {
  hidden: { opacity: 0, y: 45 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};

const AirPodsProSection = () => {
  const containerRef = useRef(null);
  const heartVideoRef = useRef(null);
  const battVideoRef = useRef(null);

  useGSAP(() => {
    /* Heart Rate sensor video play on scroll */
    gsap.to("#heart-video-block", {
      scrollTrigger: {
        trigger: "#heart-video-block",
        start: "top 70%",
        toggleActions: "play pause reverse restart",
        onEnter: () => heartVideoRef.current?.play(),
        onLeave: () => heartVideoRef.current?.pause(),
        onEnterBack: () => heartVideoRef.current?.play(),
        onLeaveBack: () => heartVideoRef.current?.pause(),
      },
    });

    /* Battery video play on scroll */
    gsap.to("#batt-video-block", {
      scrollTrigger: {
        trigger: "#batt-video-block",
        start: "top 70%",
        toggleActions: "play pause reverse restart",
        onEnter: () => battVideoRef.current?.play(),
        onLeave: () => battVideoRef.current?.pause(),
        onEnterBack: () => battVideoRef.current?.play(),
        onLeaveBack: () => battVideoRef.current?.pause(),
      },
    });

    /* Feature images scale grow on scroll */
    gsap.fromTo(
      ".pro-feat-img",
      { scale: 1.08, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 1.2,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "#pro-image-pair",
          start: "top 78%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="w-full bg-black text-white overflow-hidden">

      {/* ═══════ ANC SIMULATOR ═══════ */}
      <section className="airpods-sect" style={{ background: "rgba(255,255,255,0.01)", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <div className="airpods-wrap">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="text-center mb-14"
          >
            <motion.span
              variants={fadeUp}
              className="block text-xs font-bold tracking-widest uppercase mb-4"
              style={{ color: "#2997ff" }}
            >
              Active Noise Cancellation
            </motion.span>
            <motion.h2 variants={fadeUp} custom={1} className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
              The world goes quiet.
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Up to 2× more noise cancellation than AirPods Pro 2. Toggle below to experience it.
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <ANCSimulator />
          </motion.div>
        </div>
      </section>

      {/* ═══════ HEART RATE SENSOR ═══════ */}
      <section className="airpods-sect">
        <div className="airpods-wrap">
          <div className="airpods-grid-2">
            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.85, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="flex flex-col gap-6"
            >
              <span className="text-xs font-bold tracking-widest uppercase" style={{ color: "#ff375f" }}>
                Heart Rate Sensor
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-none">
                Track every beat.
                <br />
                <span className="text-gray-600">During every rep.</span>
              </h2>
              <p className="text-lg text-gray-400 leading-relaxed max-w-md">
                256 invisible LED flashes per second combined with accelerometer sensors give you
                highly accurate heart rate data during up to 50 different workout types in Fitness+.
              </p>
              <ul className="flex flex-col gap-3">
                {[
                  "Up to 50 workout types tracked",
                  "Accurate even at max intensity",
                  "Never fall out — improved fit system",
                ].map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="flex items-start gap-3 text-gray-300 text-sm"
                  >
                    <span style={{ color: "#ff375f", marginTop: 2 }}>✦</span>
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Video */}
            <motion.div
              id="heart-video-block"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.85, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative rounded-[36px] overflow-hidden border border-white/10"
              style={{
                aspectRatio: "1/1",
                boxShadow: "0 30px 60px rgba(0,0,0,0.5), 0 0 80px rgba(255,55,95,0.06)",
              }}
            >
              {/* Subtle pink glow behind */}
              <div
                className="absolute inset-0 z-0"
                style={{
                  background: "radial-gradient(circle at 60% 40%, rgba(255,55,95,0.12) 0%, transparent 60%)",
                }}
              />
              <video
                ref={heartVideoRef}
                src={airpodsVideos.sensor}
                muted
                playsInline
                loop
                className="w-full h-full object-cover relative z-10"
              />
              <div className="absolute bottom-6 left-6 z-20">
                <span className="text-xs font-semibold text-gray-400 tracking-widest uppercase">
                  Optical Sensor
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════ BATTERY SIDE-BY-SIDE ═══════ */}
      <section
        className="airpods-sect"
        style={{ background: "rgba(255,255,255,0.01)", borderTop: "1px solid rgba(255,255,255,0.04)" }}
      >
        <div className="airpods-wrap">
          <div className="airpods-grid-2" style={{ direction: "ltr" }}>
            {/* Video LEFT */}
            <motion.div
              id="batt-video-block"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.85, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative rounded-[36px] overflow-hidden border border-white/10 order-2 md:order-1"
              style={{
                aspectRatio: "4/3",
                boxShadow: "0 30px 60px rgba(0,0,0,0.5)",
              }}
            >
              <video
                ref={battVideoRef}
                src={airpodsVideos.third}
                muted
                playsInline
                loop
                className="w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-7xl md:text-8xl font-black text-white drop-shadow-2xl">
                  8 hrs
                </span>
              </div>
            </motion.div>

            {/* Text RIGHT */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.85, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="flex flex-col gap-6 order-1 md:order-2"
            >
              <span className="text-xs font-bold tracking-widest uppercase" style={{ color: "#32d74b" }}>
                All-Day Battery
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-none">
                Morning to night.
                <br />
                <span className="text-gray-600">And beyond.</span>
              </h2>
              <p className="text-lg text-gray-400 leading-relaxed max-w-md">
                Up to 8 hours of listening with Active Noise Cancellation. An
                additional 22 hours with the MagSafe Charging Case — up to 30
                hours total before you need to find a cable.
              </p>
              <ul className="flex flex-col gap-3">
                {[
                  "30 hrs total with MagSafe Case",
                  "2 hrs more than AirPods Pro 2",
                  "5 min charge = 1 hour of listening",
                ].map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="flex items-start gap-3 text-gray-300 text-sm"
                  >
                    <span style={{ color: "#32d74b", marginTop: 2 }}>✦</span>
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════ FEATURE IMAGE PAIR ═══════ */}
      <section className="airpods-sect">
        <div className="airpods-wrap">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="text-center mb-14"
          >
            <motion.span
              variants={fadeUp}
              className="block text-xs font-bold tracking-widest uppercase mb-4 text-gray-500"
            >
              Design & Comfort
            </motion.span>
            <motion.h2 variants={fadeUp} custom={1} className="text-4xl md:text-6xl font-bold tracking-tight">
              Precision acoustic engineering.
            </motion.h2>
          </motion.div>

          <div
            id="pro-image-pair"
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {extraImages.slice(0, 2).map((img, i) => (
              <div
                key={i}
                className="pro-feat-img relative rounded-[32px] overflow-hidden border border-white/06"
                style={{
                  aspectRatio: "4/3",
                  background: "#0a0a0a",
                  boxShadow: "0 20px 45px rgba(0,0,0,0.4)",
                }}
              >
                <img
                  src={img}
                  alt={`AirPods Pro ${i + 1}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <p className="text-xs font-semibold text-gray-300 tracking-widest uppercase">
                    {i === 0 ? "Adaptive Ear Tip" : "Precision Venting"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default AirPodsProSection;
