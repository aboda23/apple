import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { extraImages } from "../utils";

gsap.registerPlugin(ScrollTrigger);

const AudioPerformance = () => {
  const sectionRef = useRef(null);

  useGSAP(() => {
    // Reveal text elements on scroll
    gsap.utils.toArray(".audio-text-reveal").forEach((elem) => {
      gsap.fromTo(
        elem,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: elem,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    // Parallax effect for the image
    gsap.to("#chip-image", {
      y: -100,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="relative w-full py-32 px-5 md:px-20 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div className="flex flex-col gap-8 z-10">
          <h2 className="text-5xl md:text-7xl font-semibold audio-text-reveal">
            Audio performance.
            <br />
            <span className="airpods-gradient-text">More immersive by every measure.</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-400 font-medium audio-text-reveal">
            Engineered to deliver an unparalleled listening experience. Custom-built drivers and amplifiers deliver crisp, clear high notes and deep, rich bass in stunning definition — so every sound is more vivid than ever.
          </p>
          <div className="audio-text-reveal">
            <button className="bg-white text-black px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-200 transition-colors">
              Explore Performance
            </button>
          </div>
        </div>

        <div className="relative flex justify-center items-center">
          <div className="relative w-full max-w-md aspect-square rounded-full flex items-center justify-center">
            {/* Background glowing circle */}
            <div className="absolute inset-0 bg-white rounded-full blur-[100px] opacity-30 chip-glow" />
            
            <img
              id="chip-image"
              src={extraImages[0]}
              alt="Performance Detail"
              className="relative z-10 w-[100%] rounded-[40px] shadow-2xl object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AudioPerformance;
