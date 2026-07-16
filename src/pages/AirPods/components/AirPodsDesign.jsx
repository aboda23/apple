import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/all';
import { motion } from 'framer-motion';
import { airpodsProImages, airpodsVideos } from '../utils';

gsap.registerPlugin(ScrollTrigger);

const AirPodsDesign = () => {
  const containerRef = useRef(null);
  const videoRef = useRef();

  useGSAP(() => {
    // Play video on scroll
    gsap.to('#exploreAirpodsVideo', {
      scrollTrigger: {
        trigger: '#exploreAirpodsVideo',
        start: '-20% bottom',
        toggleActions: 'play pause reverse restart',
      },
      onEnter: () => videoRef.current?.play(),
    });

    // Main titles reveal
    gsap.fromTo('.design-title', 
      { y: 50, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 1, 
        stagger: 0.1, 
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.design-title-container',
          start: 'top 80%',
        }
      }
    );

    // Parallax on images
    gsap.utils.toArray('.parallax-img').forEach((img, i) => {
      gsap.fromTo(img, 
        { y: -30, scale: 1.1 },
        {
          y: 30,
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: img.parentElement,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          }
        }
      );
    });

    // Text fade up
    gsap.fromTo('.g_text_new',
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.text-reveal-container',
          start: 'top 80%'
        }
      }
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="airpods-sect bg-black text-white w-full relative">
      <div className="airpods-wrap">
        <div className="mb-16 w-full text-center design-title-container">
          <span className="block text-xs font-bold tracking-widest uppercase mb-4 text-gray-500 design-title">
            Explore the full story
          </span>
          <h2 className="text-4xl lg:text-6xl font-bold design-title mb-2">AirPods Pro.</h2>
          <h2 className="text-4xl lg:text-6xl font-bold design-title text-gray-500">Forged for sound.</h2>
        </div>
        
        <div className="flex flex-col items-center w-full">
          {/* Main Video */}
          <div className="relative w-full lg:w-[85%] aspect-video flex items-center justify-center mb-20 rounded-[40px] overflow-hidden shadow-2xl glass-panel border border-white/5">
            <video 
              id="exploreAirpodsVideo" 
              className="w-full h-full object-cover object-center scale-105" 
              preload="none" 
              muted 
              ref={videoRef}
            >
              <source src={airpodsVideos.pro} type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
          </div>

          <div className="flex flex-col w-full relative">
            {/* Side by side new images */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {airpodsProImages.map((img, idx) => (
                <div key={idx} className="overflow-hidden h-[50vh] rounded-[36px] bg-[#0a0a0a] flex items-center justify-center border border-white/5 relative">
                  <img 
                    src={img} 
                    alt={`AirPods Pro feature ${idx + 1}`} 
                    className="parallax-img object-cover h-full w-full opacity-90" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                  <div className="absolute bottom-8 left-8 z-20">
                    <p className="text-sm font-semibold tracking-widest uppercase text-gray-300">
                      {idx === 0 ? "Adaptive Fit" : "Premium Finish"}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Feature text descriptions */}
            <div className="text-reveal-container grid grid-cols-1 md:grid-cols-2 mt-20 gap-16">
              <div className="flex flex-col justify-center">
                <p className="g_text_new text-gray-400 text-xl md:text-2xl font-medium leading-relaxed">
                  AirPods Pro are <span className="text-white font-semibold">the first AirPods to feature an adaptive audio system</span>, using the same advanced algorithms that high-end studio headphones use for absolute clarity.
                </p>
              </div>
              <div className="flex flex-col justify-center">
                <p className="g_text_new text-gray-400 text-xl md:text-2xl font-medium leading-relaxed">
                  The new acoustic architecture has one of the best fits of any earbud, making these our <span className="text-white font-semibold">most comfortable Pro models ever.</span> You'll notice the difference the moment you put them in.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AirPodsDesign;
