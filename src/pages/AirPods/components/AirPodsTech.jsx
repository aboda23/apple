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

        {/* Video Block */}
        <div className="relative w-full max-w-5xl mx-auto rounded-[40px] overflow-hidden glass-panel border border-white/10 shadow-[0_0_80px_rgba(255,255,255,0.05)] aspect-[21/9] bg-black flex justify-center items-center">
          <video 
            className="w-full h-full object-contain opacity-80" 
            playsInline 
            muted 
            autoPlay 
            loop 
            ref={videoRef}
          >
            <source src={airpodsVideos.sensor} type="video/webm" />
          </video>
          
          {/* Overlay Stats */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex flex-col justify-end p-10 text-left pointer-events-none">
             <div className="tech-counter">
               <span className="text-6xl md:text-8xl font-black text-white">{count}</span>
               <span className="text-3xl md:text-5xl font-bold text-gray-400"> Billion</span>
             </div>
             <p className="text-sm md:text-base font-semibold tracking-widest uppercase text-gray-400 mt-2">Operations per second</p>
          </div>
        </div>

        {/* Text descriptions */}
        <div className="tech-text-container grid grid-cols-1 md:grid-cols-3 gap-12 mt-24 text-left">
          <div className="col-span-1 md:col-span-2 flex flex-col gap-8">
            <p className="g_fadeIn_tech text-gray-400 text-xl md:text-2xl font-medium leading-relaxed">
              H2 is an entirely new class of headphone chip that delivers our <span className="text-white font-semibold">best audio performance by far</span>.
            </p>
            <p className="g_fadeIn_tech text-gray-400 text-xl md:text-2xl font-medium leading-relaxed">
              Music and movies <span className="text-white font-semibold">will sound and feel so immersive</span>, with incredibly detailed environments and perfectly separated frequencies.
            </p>
          </div>
          
          <div className="col-span-1 flex flex-col justify-center g_fadeIn_tech p-8 rounded-3xl glass-panel">
            <p className="text-gray-400 text-sm font-bold tracking-widest uppercase mb-2">New</p>
            <p className="text-white text-3xl md:text-4xl font-bold mb-2">Pro-class Audio</p>
            <p className="text-gray-400 text-lg">with Custom Amplifier</p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default AirPodsTech;
