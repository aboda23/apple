import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { motion } from "framer-motion";
import { airpodsVideos, airpodsProImages } from "../utils";
import ANCSimulator from "./ANCSimulator";

gsap.registerPlugin(ScrollTrigger);

const AirPodsProSection = () => {
  const containerRef = useRef(null);
  const heartVideoRef = useRef(null);
  const battVideoRef = useRef(null);

  useGSAP(() => {
    // Autoplay videos on scroll
    [heartVideoRef, battVideoRef].forEach(ref => {
      if(ref.current) {
        gsap.to(ref.current, {
          scrollTrigger: {
            trigger: ref.current.parentElement,
            start: "top 70%",
            toggleActions: "play pause reverse restart",
          }
        });
      }
    });

    // Stagger feature reveals
    gsap.fromTo('.pro-feature-card',
      { opacity: 0, y: 50 },
      {
        opacity: 1, 
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.pro-features-grid',
          start: 'top 80%',
        }
      }
    );
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="w-full bg-black text-white overflow-hidden pb-32">
      
      {/* ═══════ ANC SIMULATOR ═══════ */}
      <section className="airpods-sect relative border-t border-white/5">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] to-black -z-10" />
        <div className="airpods-wrap">
          <div className="text-center mb-16 flex flex-col items-center">
            <span className="block text-xs font-bold tracking-widest uppercase mb-4 text-[#32d74b]">
              Active Noise Cancellation
            </span>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
              The world goes quiet.
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed text-center">
              Up to 2× more noise cancellation than the previous generation. Toggle below to experience it.
            </p>
          </div>
          <div className="flex justify-center w-full">
            <ANCSimulator />
          </div>
        </div>
      </section>

      {/* ═══════ HEART RATE & HEALTH ═══════ */}
      <section className="airpods-sect">
        <div className="airpods-wrap">
          <div className="airpods-grid-2">
            <div className="flex flex-col gap-8">
              <span className="text-xs font-bold tracking-widest uppercase text-[#ff375f]">
                Health & Fitness
              </span>
              <h2 className="text-5xl md:text-6xl font-bold tracking-tight leading-none">
                Track every beat.
                <br />
                <span className="text-gray-600">During every rep.</span>
              </h2>
              <p className="text-xl text-gray-400 leading-relaxed max-w-md">
                256 invisible LED flashes per second combined with advanced accelerometers give you
                highly accurate heart rate data during up to 50 different workout types.
              </p>
              
              <div className="flex flex-col gap-6 mt-4">
                <div className="p-8 rounded-[32px] glass-panel border border-[#ff375f]/30 shadow-[0_10px_30px_rgba(255,55,95,0.1)]">
                  <h4 className="text-white font-bold text-xl mb-3">Hearing Aid Feature</h4>
                  <p className="text-gray-400 text-base leading-relaxed">Clinical-grade hearing assistance, personalized via a 5-minute hearing test on your iPhone.</p>
                </div>
                <div className="p-8 rounded-[32px] glass-panel border border-[#32d74b]/30 shadow-[0_10px_30px_rgba(50,215,75,0.1)]">
                  <h4 className="text-white font-bold text-xl mb-3">Conversation Awareness</h4>
                  <p className="text-gray-400 text-base leading-relaxed">Automatically lowers media volume and enhances voices in front of you when you start speaking.</p>
                </div>
              </div>
            </div>

            <div className="relative rounded-[40px] overflow-hidden border border-white/10 shadow-[0_30px_80px_rgba(255,255,255,0.15)] aspect-square group max-w-md mx-auto w-full bg-[#1a1a1a]">
              <img
                src={airpodsProImages[1]}
                alt="AirPods Pro"
                className="w-full h-full object-cover relative z-10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ BATTERY & MAGSAFE ═══════ */}
      <section className="airpods-sect border-t border-white/5 bg-[#050505]">
        <div className="airpods-wrap">
          <div className="airpods-grid-2" style={{ direction: "ltr" }}>
            
            {/* Video Left */}
            <div className="relative rounded-[40px] overflow-hidden border border-white/10 order-2 md:order-1 aspect-square group shadow-2xl max-w-md mx-auto w-full">
              <video
                ref={battVideoRef}
                src={airpodsVideos.third}
                muted
                playsInline
                loop
                className="w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-opacity duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none" />
              <div className="absolute bottom-10 left-10 pointer-events-none">
                 <span className="text-6xl md:text-7xl font-black text-white drop-shadow-2xl mb-2 block">
                  30 hrs
                 </span>
                 <p className="text-gray-400 font-medium">Total listening time with charging case.</p>
              </div>
            </div>

            {/* Text Right */}
            <div className="flex flex-col gap-8 order-1 md:order-2">
              <span className="text-xs font-bold tracking-widest uppercase text-[#32d74b]">
                Battery & Case
              </span>
              <h2 className="text-5xl md:text-6xl font-bold tracking-tight leading-none">
                Power for days.
                <br />
                <span className="text-gray-600">USB‑C included.</span>
              </h2>
              <p className="text-xl text-gray-400 leading-relaxed max-w-md">
                The MagSafe Charging Case has been rebuilt with a new U1 chip for Precision Finding, a built-in lanyard loop, and a speaker to help you locate it.
              </p>
              
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="p-6 rounded-3xl glass-panel text-center">
                  <span className="text-3xl font-bold text-white mb-1 block">8 hrs</span>
                  <span className="text-xs text-gray-400 uppercase tracking-wider">With ANC On</span>
                </div>
                <div className="p-6 rounded-3xl glass-panel text-center">
                  <span className="text-3xl font-bold text-white mb-1 block">IP54</span>
                  <span className="text-xs text-gray-400 uppercase tracking-wider">Dust & Water</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default AirPodsProSection;
