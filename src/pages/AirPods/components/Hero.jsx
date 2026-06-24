import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Hero = () => {
  const container = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.to("#hero-title", {
      opacity: 1,
      y: 0,
      duration: 1.5,
      ease: "power3.out",
      delay: 0.5,
    })
      .to(
        "#hero-subtitle",
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
        },
        "-=0.8"
      )
      .to(
        "#hero-image",
        {
          opacity: 1,
          scale: 1,
          duration: 1.5,
          ease: "power3.out",
        },
        "-=1"
      );
  }, { scope: container });

  return (
    <section
      ref={container}
      className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden hero-gradient"
    >
      <div className="z-10 flex flex-col items-center mt-[-10vh]">
        <h1
          id="hero-title"
          className="text-7xl md:text-9xl font-semibold opacity-0 translate-y-10 airpods-hero-text tracking-tighter"
        >
          AirPods Pro
        </h1>
        <p
          id="hero-subtitle"
          className="text-2xl md:text-3xl text-gray-400 mt-4 opacity-0 translate-y-5 font-medium"
        >
          Magic, remastered.
        </p>
      </div>

      <div
        id="hero-image"
        className="absolute bottom-[-10%] md:bottom-[-5%] w-full max-w-4xl opacity-0 scale-90"
      >
        {/* Placeholder image for AirPods Pro case */}
        <img
          src="/assets/images/airpods_hero.png"
          alt="AirPods Pro"
          className="w-full h-auto object-cover rounded-t-[100px] shadow-2xl drop-shadow-2xl"
        />
        {/* Subtle gradient overlay to blend the image into the background */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none" />
      </div>
    </section>
  );
};

export default Hero;
