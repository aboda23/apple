import React, { useRef, Suspense } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/all';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import StudioLights from '../components/three/StudioLights';
import MacbookModel from '../components/models/Macbook';

// Import local assets
import homeIphone from '../assets/images/home_iphone.jpg';
import gameVideo from '../assets/videos/game.mp4';
import explore1 from '../assets/images/explore1.jpg';
import explore2 from '../assets/images/explore2.jpg';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
    const containerRef = useRef(null);
    const modelGroupRef = useRef(null);

    useGSAP(() => {
        // Simple fade-up for all sections
        const sections = document.querySelectorAll('.fade-up-section');
        sections.forEach(sec => {
            gsap.fromTo(sec.children, 
                { opacity: 0, y: 50 }, 
                { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: 'power3.out', scrollTrigger: {
                    trigger: sec,
                    start: 'top 75%'
                }}
            );
        });

        // 3D Model Scroll Animation
        if (modelGroupRef.current) {
            gsap.timeline({
                scrollTrigger: {
                    trigger: '.mac-section',
                    start: "top center",
                    end: "bottom top",
                    scrub: 1,
                }
            }).to(modelGroupRef.current.rotation, {
                y: Math.PI * 2,
                ease: "power1.inOut"
            });
        }
    }, { scope: containerRef });

    return (
        <div className="bg-black min-h-screen font-sans" ref={containerRef}>
            
            {/* Section 1: iPhone (Using Downloaded Image) */}
            <section className="relative w-full h-[80vh] flex flex-col justify-start items-center pt-24 bg-black overflow-hidden fade-up-section">
                <h1 className="text-5xl md:text-6xl font-bold mb-2 tracking-tight text-white z-10">iPhone</h1>
                <p className="text-xl md:text-2xl text-gray-400 mb-6 z-10">Meet the latest iPhone lineup.</p>
                <div className="flex gap-4 z-10">
                    <Link to="/iphone" className="bg-[#0071e3] text-white px-6 py-2 rounded-full font-medium hover:bg-[#0077ED] transition">
                        Learn more
                    </Link>
                </div>
                <img 
                    src={homeIphone}
                    alt="iPhone" 
                    className="absolute bottom-0 w-full h-[65%] object-cover md:object-contain object-bottom"
                    onError={(e) => { e.target.style.display = 'none'; }}
                />
            </section>

            {/* Section 2: iPad Air (Using local image/video alternative) */}
            <section className="relative w-full h-[80vh] flex flex-col justify-start items-center pt-24 overflow-hidden fade-up-section" style={{ background: 'linear-gradient(180deg, #111 0%, #000 100%)' }}>
                <h1 className="text-5xl md:text-6xl font-bold mb-2 tracking-tight text-white flex items-center gap-2 z-10">
                    iPad <span className="font-serif italic font-normal text-[#0071e3]">air</span>
                </h1>
                <p className="text-xl md:text-2xl text-gray-400 mb-6 z-10">Now supercharged by M4.</p>
                <div className="flex gap-4 z-10">
                    <Link to="/store" className="bg-[#0071e3] text-white px-6 py-2 rounded-full font-medium hover:bg-[#0077ED] transition">
                        Learn more
                    </Link>
                </div>
                <img 
                    src={explore1}
                    alt="iPad Air Alternative" 
                    className="absolute bottom-10 w-[80%] md:w-[60%] h-[60%] object-cover rounded-3xl shadow-2xl"
                />
            </section>

            {/* Section 3: MacBook Air (Using 3D Model instead of broken image) */}
            <section className="mac-section relative w-full h-[80vh] flex flex-col justify-start items-center pt-24 overflow-hidden fade-up-section" style={{ background: 'linear-gradient(180deg, #1a1a1c 0%, #000 100%)' }}>
                <h1 className="text-5xl md:text-6xl font-bold mb-2 tracking-tight text-white z-10">MacBook Air</h1>
                <p className="text-xl md:text-2xl text-gray-400 mb-6 z-10">Now supercharged by M3.</p>
                <div className="flex gap-4 z-10">
                    <Link to="/mac" className="bg-[#0071e3] text-white px-6 py-2 rounded-full font-medium hover:bg-[#0077ED] transition">
                        Learn more
                    </Link>
                    <Link to="/store" className="bg-transparent border border-[#0071e3] text-[#0071e3] px-6 py-2 rounded-full font-medium hover:bg-[#0071e3] hover:text-white transition">
                        Buy
                    </Link>
                </div>
                
                <div className="absolute inset-0 top-32 z-0">
                    <Canvas camera={{ position: [0, 2, 8], fov: 45 }}>
                        <StudioLights />
                        <ambientLight intensity={0.5} />
                        <Suspense fallback={<Html center><p className="text-black text-xl">Loading 3D Model...</p></Html>}>
                            <group ref={modelGroupRef}>
                                <MacbookModel scale={0.08} position={[0, -2, 0]} />
                            </group>
                            <OrbitControls enableZoom={false} enablePan={false} autoRotate={true} autoRotateSpeed={0.5} />
                        </Suspense>
                    </Canvas>
                </div>
            </section>

            {/* Grid Section for smaller cards */}
            <section className="w-full bg-black p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-[2560px] mx-auto">
                    
                    {/* MacBook Pro (Using local Video) */}
                    <Link to="/mac" className="relative w-full h-[600px] bg-black overflow-hidden flex flex-col justify-start items-center pt-14 group fade-up-section">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-2 z-10">MacBook Pro</h2>
                        <p className="text-lg md:text-xl text-gray-400 z-10 mb-6">Mind-blowing. Head-turning.</p>
                        <div className="flex gap-4 z-10 mb-10 opacity-0 group-hover:opacity-100 transition duration-300">
                            <span className="bg-[#0071e3] text-white px-5 py-2 rounded-full font-medium text-sm">Learn more</span>
                        </div>
                        <div className="absolute bottom-0 w-full h-[70%] group-hover:scale-105 transition duration-500 overflow-hidden rounded-t-3xl">
                             <video src={gameVideo} autoPlay muted loop playsInline className="w-full h-full object-cover opacity-80" />
                        </div>
                    </Link>

                    {/* AirPods Pro (Using local image alternative) */}
                    <Link to="/airpods" className="relative w-full h-[600px] bg-black overflow-hidden flex flex-col justify-end items-center pb-14 group fade-up-section">
                        <img 
                            src={explore2}
                            alt="AirPods Pro Alternative" 
                            className="absolute top-0 w-full h-full object-cover group-hover:scale-105 transition duration-500 opacity-60"
                        />
                        <div className="relative z-10 text-center w-full">
                            <h2 className="text-4xl md:text-6xl font-bold text-white mb-2">AirPods Pro</h2>
                            <p className="text-lg md:text-xl text-gray-300 mb-6">Adaptive Audio. Now playing.</p>
                            <div className="flex justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                                <span className="text-white border border-white px-5 py-2 rounded-full font-medium text-sm hover:bg-white hover:text-black transition">Buy</span>
                            </div>
                        </div>
                    </Link>

                </div>
            </section>
        </div>
    );
}
