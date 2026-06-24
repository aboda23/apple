import React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const MediaGallery = () => {
  useGSAP(() => {
    gsap.fromTo(
      ".media-card",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "#media-gallery",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );
  });

  return (
    <section id="media-gallery" className="w-full py-32 px-5 md:px-20 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto flex flex-col gap-16">
        <div className="text-center">
          <h2 className="text-5xl md:text-7xl font-semibold mb-6 text-white">
            See it in action.
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Experience the magic of AirPods Pro through these stunning visual showcases and community designs.
          </p>
        </div>

        {/* YouTube Videos Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="media-card aspect-video rounded-3xl overflow-hidden shadow-2xl bg-black border border-gray-800">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/EMmKs8vMKhU?autoplay=0&controls=1&rel=0"
              title="AirPods Pro Video 1"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div className="media-card aspect-video rounded-3xl overflow-hidden shadow-2xl bg-black border border-gray-800">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/ixVlJv8qrtE?autoplay=0&controls=1&rel=0"
              title="AirPods Pro Video 2"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        {/* Gallery & Posters Section */}
        <div className="mt-10">
          <h3 className="text-3xl font-semibold text-white mb-8 text-center">Community Posters & Designs</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Dribbble 1 */}
            <a 
              href="https://dribbble.com/shots/27338637-Apple-Airpods-pro-4-poster" 
              target="_blank" 
              rel="noreferrer"
              className="media-card group relative h-64 rounded-3xl bg-gradient-to-br from-[#ea4c89] to-[#ff6699] flex flex-col items-center justify-center p-6 hover:scale-[1.02] transition-transform duration-300 shadow-xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300"></div>
              <h4 className="text-white text-2xl font-bold z-10 text-center">AirPods Pro 4 Poster</h4>
              <p className="text-white/80 mt-2 z-10 font-medium">View on Dribbble</p>
            </a>

            {/* Dribbble 2 */}
            <a 
              href="https://dribbble.com/shots/26667029-Apple-AirPods-Max-headphones-poster-design" 
              target="_blank" 
              rel="noreferrer"
              className="media-card group relative h-64 rounded-3xl bg-gradient-to-bl from-[#ea4c89] to-[#ff6699] flex flex-col items-center justify-center p-6 hover:scale-[1.02] transition-transform duration-300 shadow-xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300"></div>
              <h4 className="text-white text-2xl font-bold z-10 text-center">AirPods Max Poster</h4>
              <p className="text-white/80 mt-2 z-10 font-medium">View on Dribbble</p>
            </a>

            {/* Pinterest 1 */}
            <a 
              href="https://www.pinterest.com/pin/41236152833425859/" 
              target="_blank" 
              rel="noreferrer"
              className="media-card group relative h-64 rounded-3xl bg-gradient-to-tr from-[#E60023] to-[#ff3b5c] flex flex-col items-center justify-center p-6 hover:scale-[1.02] transition-transform duration-300 shadow-xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300"></div>
              <h4 className="text-white text-2xl font-bold z-10 text-center">Apple Aesthetic</h4>
              <p className="text-white/80 mt-2 z-10 font-medium">View on Pinterest</p>
            </a>

            {/* Pinterest 2 */}
            <a 
              href="https://www.pinterest.com/pin/330310953940459588/" 
              target="_blank" 
              rel="noreferrer"
              className="media-card group relative h-64 rounded-3xl bg-gradient-to-br from-[#E60023] to-[#ff3b5c] flex flex-col items-center justify-center p-6 hover:scale-[1.02] transition-transform duration-300 shadow-xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300"></div>
              <h4 className="text-white text-2xl font-bold z-10 text-center">Product Design</h4>
              <p className="text-white/80 mt-2 z-10 font-medium">View on Pinterest</p>
            </a>

            {/* Pinterest 3 */}
            <a 
              href="https://www.pinterest.com/pin/844143523929619238/" 
              target="_blank" 
              rel="noreferrer"
              className="media-card sm:col-span-2 lg:col-span-1 group relative h-64 rounded-3xl bg-gradient-to-t from-[#E60023] to-[#ff3b5c] flex flex-col items-center justify-center p-6 hover:scale-[1.02] transition-transform duration-300 shadow-xl overflow-hidden"
            >
               <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300"></div>
              <h4 className="text-white text-2xl font-bold z-10 text-center">AirPods Showcase</h4>
              <p className="text-white/80 mt-2 z-10 font-medium">View on Pinterest</p>
            </a>

          </div>
        </div>
      </div>
    </section>
  );
};

export default MediaGallery;
