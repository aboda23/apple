import React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const VideoHero = ({ videoSrc, title }) => {
  useGSAP(() => {
    gsap.fromTo(
      "#hero-text",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.5, ease: "power3.out", delay: 0.5 }
    );
  });

  return (
    <section className="relative w-full h-screen bg-black flex items-center justify-center overflow-hidden">
      <video
        src={videoSrc}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-80"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black" />
      
      <div id="hero-text" className="relative z-10 text-center flex flex-col items-center">
        <h1 className="text-white text-6xl md:text-9xl font-bold tracking-tighter mb-4">
          {title}
        </h1>
        <p className="text-white text-2xl md:text-3xl font-medium">
          Rebuilt from the sound up.
        </p>
      </div>
    </section>
  );
};

export default VideoHero;
