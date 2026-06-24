import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { bentoImages } from "../utils";

gsap.registerPlugin(ScrollTrigger);

const FeaturesGrid = () => {
  const gridRef = useRef(null);

  useGSAP(() => {
    // Staggered fade in for the bento cards
    gsap.fromTo(
      ".bento-card",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, { scope: gridRef });

  return (
    <section className="w-full py-32 px-5 md:px-20 bg-black">
      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-6xl font-semibold mb-6">
            A symphony of simplicity.
          </h2>
          <p className="text-xl text-gray-400">
            From instant setup to seamless switching, the magic is in the details.
          </p>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-6 auto-rows-[400px]">
          {/* Card 1 */}
          <div className="bento-card relative overflow-hidden group">
            <img src={bentoImages[0]} alt="Feature 1" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
            <div className="absolute bottom-8 left-8 right-8 z-10">
               <h3 className="text-3xl font-semibold text-white mb-3">Active Noise Cancellation</h3>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bento-card relative overflow-hidden group">
            <img src={bentoImages[1]} alt="Feature 2" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
             <div className="absolute bottom-8 left-8 right-8 z-10">
               <h3 className="text-3xl font-semibold text-white mb-3">Personalized Spatial Audio</h3>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bento-card relative overflow-hidden group">
            <img src={bentoImages[2]} alt="Feature 3" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
             <div className="absolute bottom-8 left-8 right-8 z-10">
               <h3 className="text-3xl font-semibold text-white mb-3">Immersive Sound</h3>
            </div>
          </div>

          {/* Card 4 */}
          <div className="bento-card relative overflow-hidden group">
            <img src={bentoImages[3]} alt="Feature 4" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
             <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
             <div className="absolute bottom-8 left-8 right-8 z-10">
               <h3 className="text-3xl font-semibold text-white mb-3">Battery Life</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesGrid;
