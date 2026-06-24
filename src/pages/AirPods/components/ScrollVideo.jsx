import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger);

const ScrollVideo = ({ videoSrc }) => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Only initialize GSAP ScrollTrigger after the video's metadata (duration) is loaded
    if (loaded && videoRef.current) {
      const video = videoRef.current;
      
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=3000", // 3000px of scrolling to scrub through the video
          scrub: 0.5, // 0.5 seconds smoothing for a premium feel
          pin: true,
        }
      });

      // Scrub the video currentTime based on scroll progress
      tl.fromTo(video, 
        { currentTime: 0 }, 
        { currentTime: video.duration || 1, ease: "none" }
      );

      // Clean up on unmount
      return () => {
        if (tl.scrollTrigger) tl.scrollTrigger.kill();
        tl.kill();
      };
    }
  }, [loaded]);

  // Force video loading if Safari pauses it
  useEffect(() => {
    if (videoRef.current) {
        videoRef.current.load();
    }
  }, []);

  return (
    <section ref={containerRef} className="w-full h-screen relative bg-black flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute top-[10%] z-20 flex flex-col items-center pointer-events-none">
        <h1 className="text-white text-6xl md:text-8xl font-bold tracking-tight mb-4">
          AirPods Pro
        </h1>
        <p className="text-gray-300 text-2xl md:text-3xl font-medium">
          Magic, remastered.
        </p>
      </div>
      
      {/* Video Element */}
      <video
        ref={videoRef}
        src={videoSrc}
        className="w-full h-full object-cover absolute inset-0 z-10"
        muted
        playsInline
        preload="auto"
        onLoadedMetadata={() => setLoaded(true)}
      />

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/30 z-15 pointer-events-none" />
    </section>
  );
};

export default ScrollVideo;
