import React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { extraImages } from "../utils";
import { TbWaveSine, TbEar, TbView360, TbActivityHeartbeat, TbStethoscope } from "react-icons/tb";

gsap.registerPlugin(ScrollTrigger);

const CompareModels = () => {
  useGSAP(() => {
    gsap.fromTo(
      ".compare-column",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "#compare-section",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );
  });

  return (
    <section id="compare-section" className="w-full py-32 px-5 md:px-20 bg-white text-black">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        
        {/* Main Grid: 2 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32 w-full">
          
          {/* Column 1: AirPods 4 */}
          <div className="compare-column flex flex-col items-center text-center">
            
            {/* Header */}
            <div className="flex flex-col items-center h-[200px] justify-end">
              <h3 className="text-2xl font-semibold mb-2">AirPods 4</h3>
              <p className="text-gray-500 text-sm max-w-[200px] mb-6">
                The new standard for sound, comfort, and noise control.
              </p>
              <div className="flex items-center gap-4">
                <button className="bg-[#0071e3] text-white py-2 px-5 rounded-full text-sm hover:bg-[#0077ED] transition-colors">
                  Buy
                </button>
                <button className="text-[#0071e3] text-sm hover:underline flex items-center gap-1">
                  Learn more {'>'}
                </button>
              </div>
            </div>

            <div className="w-full h-px bg-gray-200 my-10"></div>

            {/* Features List */}
            <div className="flex flex-col gap-12 w-full">
              {/* Feature 1 */}
              <div className="flex flex-col items-center gap-3">
                <TbWaveSine className="text-4xl text-black" />
                <span className="font-medium text-sm">Active Noise Cancellation</span>
              </div>
              
              {/* Feature 2 */}
              <div className="flex flex-col items-center gap-3">
                <TbEar className="text-4xl text-black" />
                <span className="font-medium text-sm">Adaptive Audio and Transparency mode</span>
              </div>

              {/* Feature 3 */}
              <div className="flex flex-col items-center gap-3">
                <TbView360 className="text-4xl text-black" />
                <span className="font-medium text-sm max-w-[180px]">Personalized Spatial Audio with dynamic head tracking</span>
              </div>

              {/* Missing Feature 1 */}
              <div className="flex flex-col items-center justify-center h-[80px]">
                <span className="text-gray-400 text-2xl">—</span>
                <span className="text-gray-500 text-xs mt-2">No Heart Rate Sensor</span>
              </div>

              {/* Missing Feature 2 */}
              <div className="flex flex-col items-center justify-center h-[80px]">
                <span className="text-gray-400 text-2xl">—</span>
                <span className="text-gray-500 text-xs mt-2">No Hearing Aid</span>
              </div>

              {/* Battery */}
              <div className="flex flex-col items-center gap-2 mt-8">
                <h4 className="text-2xl font-semibold">5 Hours</h4>
                <p className="text-xs text-gray-500 max-w-[200px]">
                  Up to 5 hours listening time on a single charge (up to 4 hours with ANC)
                </p>
              </div>
            </div>

          </div>

          {/* Column 2: AirPods Pro 3 */}
          <div className="compare-column flex flex-col items-center text-center">
            
            {/* Header */}
            <div className="flex flex-col items-center h-[200px] justify-end">
              <span className="text-[#bf4800] text-xs font-semibold mb-1">New</span>
              <h3 className="text-2xl font-semibold mb-2">AirPods Pro 3</h3>
              <p className="text-gray-500 text-sm max-w-[200px] mb-6">
                The world's best Active Noise Cancellation, with Heart Rate sensing during workouts.
              </p>
              <div className="flex items-center gap-4">
                <button className="bg-[#0071e3] text-white py-2 px-5 rounded-full text-sm hover:bg-[#0077ED] transition-colors">
                  Buy
                </button>
                <button className="text-[#0071e3] text-sm hover:underline flex items-center gap-1">
                  Learn more {'>'}
                </button>
              </div>
            </div>

            <div className="w-full h-px bg-gray-200 my-10"></div>

            {/* Features List */}
            <div className="flex flex-col gap-12 w-full">
              {/* Feature 1 */}
              <div className="flex flex-col items-center gap-3">
                <TbWaveSine className="text-4xl text-black" />
                <span className="font-medium text-sm max-w-[220px]">
                  Active Noise Cancellation up to 4x more compared to original AirPods Pro
                </span>
              </div>
              
              {/* Feature 2 */}
              <div className="flex flex-col items-center gap-3">
                <TbEar className="text-4xl text-black" />
                <span className="font-medium text-sm">Adaptive Audio and Transparency mode</span>
              </div>

              {/* Feature 3 */}
              <div className="flex flex-col items-center gap-3">
                <TbView360 className="text-4xl text-black" />
                <span className="font-medium text-sm max-w-[180px]">Personalized Spatial Audio with dynamic head tracking</span>
              </div>

              {/* Feature 4 */}
              <div className="flex flex-col items-center gap-3 h-[80px]">
                <TbActivityHeartbeat className="text-4xl text-black" />
                <span className="font-medium text-sm">Heart Rate Sensor during workouts</span>
              </div>

              {/* Feature 5 */}
              <div className="flex flex-col items-center gap-3 h-[80px]">
                <TbStethoscope className="text-4xl text-black" />
                <span className="font-medium text-sm max-w-[200px]">Hearing Test, Hearing Aid, and Hearing Protection</span>
              </div>

              {/* Battery */}
              <div className="flex flex-col items-center gap-2 mt-8">
                <h4 className="text-2xl font-semibold">8 Hours</h4>
                <p className="text-xs text-gray-500 max-w-[200px]">
                  Up to 8 hours listening time on a single charge with ANC
                </p>
              </div>
            </div>

          </div>

        </div>
        
        <div className="w-full h-px bg-gray-200 my-16"></div>

        <div className="text-center w-full">
          <a href="#" className="text-[#0071e3] hover:underline text-lg flex items-center justify-center gap-2">
            Compare all AirPods models <span>{'>'}</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default CompareModels;
