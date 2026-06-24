import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { airpodsVideos } from "../utils";

gsap.registerPlugin(ScrollTrigger);

const AirPodsProSection = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.utils.toArray(".pro-reveal").forEach((elem) => {
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
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="w-full bg-black text-white py-32 px-5 md:px-20 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col gap-32">
        
        {/* Heart Rate Sensor Section */}
        <div className="flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 pro-reveal">
            <h2 className="text-4xl md:text-6xl font-semibold mb-6">
              Heart Rate Sensor.
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-orange-400">
                Track every beat.
              </span>
            </h2>
            <p className="text-xl text-gray-400 mb-6">
              The all-new Heart Rate sensor helps you track your heart rate and calories burned during workouts. Using LED units that emit 256 invisible flashes per second combined with accelerometer sensors, AirPods Pro 3 provide highly accurate data for up to 50 different types of workouts in the Fitness app.
            </p>
            <p className="text-xl text-gray-400 font-medium">
              And with a more secure in-ear fit, they will never fall out.
            </p>
          </div>
          <div className="flex-1 pro-reveal w-full relative aspect-square max-w-md mx-auto">
             <div className="absolute inset-0 bg-white/30 blur-[100px] rounded-full"></div>
             <video 
                src={airpodsVideos.sensor}
                autoPlay 
                loop 
                muted 
                playsInline 
                className="w-full h-full object-cover rounded-[40px] relative z-10 shadow-2xl"
             />
          </div>
        </div>

        {/* Battery & MagSafe Section */}
        <div className="flex flex-col-reverse md:flex-row items-center gap-16">
           <div className="flex-1 pro-reveal w-full h-96 bg-[#111] rounded-[40px] overflow-hidden flex items-center justify-center border border-[#222] relative">
             <video 
                src={airpodsVideos.third}
                autoPlay 
                loop 
                muted 
                playsInline 
                className="w-full h-full object-cover absolute inset-0 opacity-50"
             />
             <h3 className="text-7xl font-bold text-white relative z-10 drop-shadow-2xl">
                8 hrs
             </h3>
          </div>
          <div className="flex-1 pro-reveal">
            <h2 className="text-4xl md:text-6xl font-semibold mb-6">
              All-day battery.
              <br />
              <span className="text-gray-500">Morning to night.</span>
            </h2>
            <p className="text-xl text-gray-400 mb-6">
              Forget about charging. The MagSafe Charging Case is packed with useful features to stay with you always, even after hours. Now, they are ready to listen all day on just a single charge.
            </p>
            <ul className="text-lg text-gray-300 space-y-4">
              <li className="flex items-start gap-3">
                <span className="text-green-500">✓</span> 
                Up to 8 hours of listening time on a single charge with Active Noise Cancellation.
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-500">✓</span> 
                2 hours more compared to AirPods Pro 2.
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-500">✓</span> 
                Up to 10 hours with Transparency mode when using Hearing Aid feature.
              </li>
            </ul>
          </div>
        </div>

      </div>
    </section>
  );
};

export default AirPodsProSection;
