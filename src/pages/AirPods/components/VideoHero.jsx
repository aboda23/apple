import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const VideoHero = ({ videoSrc, title }) => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const subtitleRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline();
    
    tl.to(".char-span", {
      opacity: 1,
      y: 0,
      rotateX: 0,
      stagger: 0.05,
      duration: 1.2,
      ease: "power4.out",
      delay: 0.2
    })
    .fromTo(subtitleRef.current,
      { opacity: 0, y: 30, filter: "blur(10px)" },
      { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.5, ease: "power3.out" },
      "-=0.8"
    );

    // Parallax on video
    gsap.to(".hero-video", {
      scale: 1.15,
      opacity: 0.3,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      }
    });
  }, { scope: containerRef, dependencies: [title] });

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-black flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <video
        src={videoSrc}
        autoPlay
        loop
        muted
        playsInline
        className="hero-video absolute inset-0 w-full h-full object-cover opacity-80 scale-105"
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black z-10" />
      
      {/* Animated Particles / Glow */}
      <div className="absolute inset-0 z-15 pointer-events-none pulse-glow" 
           style={{ background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.05) 0%, transparent 60%)' }} />
      
      {/* Content */}
      <div className="relative z-20 text-center flex flex-col items-center">
        <h1 
          ref={textRef} 
          className="text-white text-7xl md:text-[140px] font-bold tracking-tighter mb-6 leading-none"
          style={{ perspective: "1000px" }}
        >
          {title.split('').map((char, i) => (
            <span 
              key={i} 
              className="char-span inline-block" 
              style={{ opacity: 0, transform: 'translateY(50px) rotateX(-90deg)' }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </h1>
        <p ref={subtitleRef} className="text-gray-300 text-2xl md:text-4xl font-medium tracking-wide">
          Rebuilt from the sound up.
        </p>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center animate-bounce">
        <p className="text-gray-500 text-xs tracking-widest uppercase mb-2">Scroll</p>
        <div className="w-[1px] h-12 bg-gradient-to-b from-gray-400 to-transparent" />
      </div>
    </section>
  );
};

export default VideoHero;
