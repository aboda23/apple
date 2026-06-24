import React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { TbWorld, TbLock, TbAccessible } from "react-icons/tb";
import { FaApple } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const AppleValues = () => {
  useGSAP(() => {
    gsap.fromTo(
      ".value-card",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "#apple-values",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );
  });

  return (
    <section id="apple-values" className="w-full py-32 px-5 md:px-20 bg-[#f5f5f7] text-black border-t border-gray-200">
      <div className="max-w-6xl mx-auto flex flex-col gap-12">
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-semibold mb-6">
            Our values are the foundation of our work.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Environment */}
          <div className="value-card bg-white rounded-[32px] p-10 flex flex-col items-center text-center shadow-sm">
            <TbWorld className="text-4xl text-black mb-6" />
            <h3 className="text-xl font-semibold mb-3">Our plan is as innovative as our products.</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              We are committed to achieving zero net emissions across our entire carbon footprint by 2030.
            </p>
          </div>

          {/* Privacy */}
          <div className="value-card bg-white rounded-[32px] p-10 flex flex-col items-center text-center shadow-sm">
            <FaApple className="text-4xl text-black mb-6" />
            <h3 className="text-xl font-semibold mb-3">Privacy. That's Apple.</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              Privacy is a fundamental human right. That's why all our products and services are designed to keep your data secure.
            </p>
          </div>

          {/* Accessibility */}
          <div className="value-card bg-white rounded-[32px] p-10 flex flex-col items-center text-center shadow-sm">
            <TbAccessible className="text-4xl text-black mb-6" />
            <h3 className="text-xl font-semibold mb-3">Accessibility in the core of every innovation.</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              Our products and services are designed for everyone, with built-in features to help you do what you love, your way.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AppleValues;
