import React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { TbWaveSine, TbEar, TbView360, TbActivityHeartbeat, TbStethoscope, TbCrown } from "react-icons/tb";

gsap.registerPlugin(ScrollTrigger);

const CompareModels = () => {
  useGSAP(() => {
    gsap.fromTo(".compare-col",
      { opacity: 0, y: 60 },
      {
        opacity: 1, y: 0, duration: 1.2, stagger: 0.15, ease: "power3.out",
        scrollTrigger: { trigger: "#compare-section", start: "top 75%" }
      }
    );
  });

  return (
    <section id="compare-section" className="w-full py-32 px-5 md:px-10 bg-[#0a0a0a] text-white border-t border-white/10 flex justify-center">
      <div className="max-w-7xl w-full mx-auto flex flex-col items-center">
        
        <div className="text-center mb-24">
          <h2 className="ap-section-title mb-6">Which AirPods are right for you?</h2>
        </div>

        {/* 3 Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          
          {/* AirPods 4 */}
          <div className="compare-col glass-panel rounded-[40px] p-8 md:p-12 flex flex-col items-center text-center border border-white/5 hover:border-white/20 transition-all duration-300 h-full">
            <div className="flex flex-col items-center text-center w-full min-h-[160px]">
              <div className="h-6 mb-2"></div>
              <h3 className="ap-card-title mb-4">AirPods 4</h3>
              <p className="text-gray-400 text-sm leading-relaxed max-w-[200px]">The new standard for sound, comfort, and noise control.</p>
            </div>
            <div className="flex flex-col gap-4 mt-6">
              <button className="ap-btn ap-btn--white">Buy</button>
              <span className="text-[#2997ff] text-sm hover:underline cursor-pointer">Learn more &gt;</span>
            </div>
            <div className="w-full h-px bg-white/10 my-10" />
            <div className="flex flex-col gap-8 w-full flex-grow">
              <Feature icon={<TbWaveSine />} text="Active Noise Cancellation" />
              <Feature icon={<TbEar />} text="Adaptive Audio & Transparency" />
              <Feature icon={<TbView360 />} text="Personalized Spatial Audio" />
              <Feature missing text="No Heart Rate Sensor" />
              <Feature missing text="No Hearing Aid" />
              <div className="mt-auto pt-8">
                <h4 className="text-3xl font-bold mb-2">5 hrs</h4>
                <p className="text-xs text-gray-500">Listening time (ANC off)</p>
              </div>
            </div>
          </div>

          {/* AirPods Pro 3 */}
          <div className="compare-col glass-panel rounded-[40px] p-8 md:p-12 flex flex-col items-center text-center border border-[#2997ff]/30 relative shadow-[0_0_50px_rgba(41,151,255,0.1)] h-full">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-[#2997ff] text-white text-xs font-bold px-4 py-1 rounded-b-xl uppercase tracking-wider">Most Popular</div>
            <div className="flex flex-col items-center text-center w-full min-h-[160px]">
              <div className="h-6 mb-2 flex items-center justify-center">
                <span className="text-[#ff375f] ap-label">New</span>
              </div>
              <h3 className="ap-card-title mb-4">AirPods Pro</h3>
              <p className="text-gray-400 text-sm leading-relaxed max-w-[220px]">The world's best ANC, with Heart Rate sensing and Hearing Aid.</p>
            </div>
            <div className="flex flex-col gap-4 mt-6">
              <button className="ap-btn ap-btn--blue">Buy</button>
              <span className="text-[#2997ff] text-sm hover:underline cursor-pointer">Learn more &gt;</span>
            </div>
            <div className="w-full h-px bg-white/10 my-10" />
            <div className="flex flex-col gap-8 w-full flex-grow">
              <Feature icon={<TbWaveSine />} text="2x more Active Noise Cancellation" highlight />
              <Feature icon={<TbEar />} text="Adaptive Audio & Transparency" />
              <Feature icon={<TbView360 />} text="Personalized Spatial Audio" />
              <Feature icon={<TbActivityHeartbeat />} text="Heart Rate Sensor during workouts" highlight />
              <Feature icon={<TbStethoscope />} text="Clinical-grade Hearing Aid feature" highlight />
              <div className="mt-auto pt-8">
                <h4 className="text-3xl font-bold mb-2">6 hrs</h4>
                <p className="text-xs text-gray-500">Listening time with ANC</p>
              </div>
            </div>
          </div>

          {/* AirPods Max */}
          <div className="compare-col glass-panel rounded-[40px] p-8 md:p-12 flex flex-col items-center text-center border border-white/5 hover:border-white/20 transition-all duration-300 h-full">
            <div className="flex flex-col items-center text-center w-full min-h-[160px]">
              <div className="h-6 mb-2 flex items-center justify-center">
                <span className="text-[#ff9004] ap-label">Updated</span>
              </div>
              <h3 className="ap-card-title mb-4">AirPods Max</h3>
              <p className="text-gray-400 text-sm leading-relaxed max-w-[200px]">High-fidelity over-ear audio with USB-C and 5 new colors.</p>
            </div>
            <div className="flex flex-col gap-4 mt-6">
              <button className="ap-btn ap-btn--white">Buy</button>
              <span className="text-[#2997ff] text-sm hover:underline cursor-pointer">Learn more &gt;</span>
            </div>
            <div className="w-full h-px bg-white/10 my-10" />
            <div className="flex flex-col gap-8 w-full flex-grow">
              <Feature icon={<TbWaveSine />} text="Pro-level Active Noise Cancellation" />
              <Feature icon={<TbEar />} text="Transparency mode" />
              <Feature icon={<TbView360 />} text="Personalized Spatial Audio" />
              <Feature icon={<TbCrown />} text="Digital Crown for precise control" highlight />
              <Feature missing text="No Heart Rate/Hearing Aid" />
              <div className="mt-auto pt-8">
                <h4 className="text-3xl font-bold mb-2">20 hrs</h4>
                <p className="text-xs text-gray-500">Listening time with ANC</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

const Feature = ({ icon, text, missing, highlight }) => {
  if (missing) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80px]">
        <span className="text-gray-600 text-2xl">—</span>
        <span className="text-gray-500 text-xs mt-2">{text}</span>
      </div>
    );
  }
  return (
    <div className={`flex flex-col items-center gap-3 min-h-[80px] ${highlight ? 'text-white' : 'text-gray-300'}`}>
      <div className={`text-4xl ${highlight ? 'text-[#2997ff]' : 'text-white'}`}>{icon}</div>
      <span className="font-medium text-sm leading-snug">{text}</span>
    </div>
  );
};

export default CompareModels;
