import React, { useRef, useState, useEffect } from 'react';
import { airpodsVideos } from '../utils';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { TbCpu } from "react-icons/tb";

gsap.registerPlugin(ScrollTrigger);

const AirPodsTech = () => {
  const containerRef = useRef();
  const videoRef = useRef();
  const [count, setCount] = useState(0);

  useGSAP(() => {
    // Chip zoom in
    gsap.fromTo('#airpods-chip-icon', 
      { opacity: 0, scale: 2, rotation: 45 },
      { 
        opacity: 1, 
        scale: 1, 
        rotation: 0,
        duration: 1.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '#airpods-chip-icon',
          start: 'top 80%'
        }
      }
    );

    // Number counter animation (9 Billion)
    ScrollTrigger.create({
      trigger: '.tech-counter',
      start: 'top 80%',
      onEnter: () => {
        gsap.to({ val: 0 }, {
          val: 9,
          duration: 2,
          ease: "power2.out",
          onUpdate: function() {
            setCount(Math.floor(this.targets()[0].val));
          }
        });
      }
    });

    gsap.fromTo('.g_fadeIn_tech', 
      { opacity: 0, y: 40 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 1, 
        stagger: 0.15, 
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.tech-text-container',
          start: 'top 85%'
        }
      }
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="airpods-sect bg-black text-white w-full relative">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#a0a0a0] opacity-5 rounded-full blur-[100px] pointer-events-none" />

      <div className="airpods-wrap text-center relative z-10">
        
        {/* Chip Icon */}
        <div id="airpods-chip-icon" className="inline-flex justify-center items-center w-32 h-32 rounded-3xl bg-gradient-to-br from-gray-800 to-black border border-gray-700 shadow-2xl mb-12">
          <TbCpu className="text-7xl text-white" />
        </div>

        <h2 className="text-5xl md:text-8xl font-bold mb-6 tracking-tight">
          <span className="airpods-gradient-pro">H2 chip.</span>
          <br /> 
          <span className="text-gray-400">A monster win for audio.</span>
        </h2>

        <p className="text-gray-400 text-xl md:text-2xl font-medium max-w-2xl mx-auto mb-20">
          It's here. The biggest redesign in the history of Apple acoustics.
        </p>

        {/* Statistics & Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl mx-auto mb-16">
          {/* Left Statistics Card (Video) */}
          <div className="col-span-1 md:col-span-2 relative rounded-[40px] overflow-hidden glass-panel border border-white/10 shadow-[0_0_80px_rgba(255,255,255,0.05)] bg-black flex flex-col min-h-[400px]">
            <video 
              className="absolute inset-0 w-full h-full object-contain opacity-80" 
              playsInline 
              muted 
              autoPlay 
              loop 
              ref={videoRef}
            >
              <source src={airpodsVideos.sensor} type="video/webm" />
            </video>
            
            {/* Overlay Stats */}
            <div className="relative z-10 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-8 md:p-12 text-left pointer-events-none flex-grow">
               <div className="mt-auto">
                 <div className="tech-counter mb-2">
                   <span className="text-6xl md:text-8xl font-black text-white leading-none">{count}</span>
                   <span className="text-3xl md:text-5xl font-bold text-gray-400"> Billion</span>
                 </div>
                 <p className="ap-label text-gray-400">Operations per second</p>
               </div>
            </div>
          </div>

          {/* Right Feature Card */}
          <div className="col-span-1 flex flex-col justify-end g_fadeIn_tech p-8 md:p-12 rounded-[40px] glass-panel border border-white/10 min-h-[400px] text-left">
            <div className="mt-auto">
              <p className="ap-label text-gray-400 mb-4">New</p>
              <p className="ap-card-title text-white mb-2">Pro-class Audio</p>
              <p className="ap-body text-gray-400">with Custom Amplifier</p>
            </div>
          </div>
        </div>

        {/* Text descriptions */}
        <div className="tech-text-container grid grid-cols-1 md:grid-cols-2 gap-8 text-left w-full max-w-5xl mx-auto">
          <p className="g_fadeIn_tech ap-body text-gray-400">
            H2 is an entirely new class of headphone chip that delivers our <span className="text-white font-semibold">best audio performance by far</span>.
          </p>
          <p className="g_fadeIn_tech ap-body text-gray-400">
            Music and movies <span className="text-white font-semibold">will sound and feel so immersive</span>, with incredibly detailed environments and perfectly separated frequencies.
          </p>
        </div>

      </div>
    </section>
  );
};

export default AirPodsTech;
