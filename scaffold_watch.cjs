const fs = require('fs');
const path = require('path');

const baseDir = 'c:/Users/user/OneDrive/Desktop/apple2/src';

const files = {
  'pages/Watch/Watch.jsx': `import React, { useEffect } from 'react';
import Hero from './components/Watch/Hero';
import WatchCanvas from './components/Watch/WatchCanvas';
import ScrollSequence from './components/Watch/ScrollSequence';
import ColorSection from './components/Watch/ColorSection';
import CTA from './components/Watch/CTA';
import Footer from '../../components/Footer';

export default function Watch() {
    useEffect(() => {
        // Ensure scroll to top on mount
        window.scrollTo(0, 0);
    }, []);

    return (
        <main className="bg-black text-white w-full overflow-x-hidden relative">
            <Hero />
            <div id="watch-story-container" className="relative w-full">
                <WatchCanvas />
                <ScrollSequence />
            </div>
            <ColorSection />
            <CTA />
            <Footer />
        </main>
    );
}`,

  'pages/Watch/components/Watch/Hero.jsx': `import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export default function Hero() {
    const ref = useRef();
    
    useGSAP(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
        tl.from('.hero-text', { opacity: 0, y: 40, duration: 1, stagger: 0.2, delay: 0.5 });
    }, { scope: ref });

    return (
        <section ref={ref} className="w-full h-screen flex flex-col items-center justify-center relative z-20 bg-black">
            <h1 className="hero-text text-5xl md:text-8xl font-bold text-center tracking-tight mb-4">
                Apple Watch
            </h1>
            <h2 className="hero-text text-xl md:text-3xl text-gray-400 font-medium mb-10">
                Thinstant Classic.
            </h2>
            <div className="hero-text flex gap-5">
                <button className="bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-gray-200 transition">
                    Learn more
                </button>
                <button className="bg-transparent text-white border border-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-black transition">
                    Buy
                </button>
            </div>
        </section>
    );
}`,

  'pages/Watch/components/Watch/WatchCanvas.jsx': `import React, { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, useGLTF } from '@react-three/drei';
import { useWatchAnimation } from '../../../../hooks/useWatchAnimation';

export function AppleWatchModel(props) {
    const { scene } = useGLTF('/watch/models/AppleWatch.glb');
    const groupRef = useRef();
    
    // Pass the ref to the animation hook so GSAP can control it
    useWatchAnimation(groupRef);

    return (
        <group ref={groupRef} {...props}>
            <primitive object={scene} />
        </group>
    );
}

useGLTF.preload('/watch/models/AppleWatch.glb');

export default function WatchCanvas() {
    return (
        <div id="canvas-container" className="absolute top-0 left-0 w-full h-screen z-10 pointer-events-none">
            <Canvas camera={{ position: [0, 0, 5], fov: 45 }} gl={{ antialias: true }}>
                <ambientLight intensity={1.5} />
                <directionalLight position={[5, 10, 5]} intensity={2} />
                <Environment preset="city" />
                <Suspense fallback={null}>
                    <AppleWatchModel position={[0, 0, 0]} scale={1.5} />
                </Suspense>
            </Canvas>
        </div>
    );
}`,

  'pages/Watch/components/Watch/ScrollSequence.jsx': `import React from 'react';

export default function ScrollSequence() {
    return (
        <div id="scroll-sequence" className="relative z-20 w-full pointer-events-none">
            {/* Scene 2 & 3: Pin & Rotation */}
            <div id="scene-rotation" className="h-[150vh] w-full flex items-center justify-center">
                <div className="w-full max-w-5xl px-10">
                    <h2 className="text-4xl md:text-6xl font-bold opacity-0 rotation-text">
                        A design that turns heads.
                    </h2>
                </div>
            </div>

            {/* Scene 4: Exploded View */}
            <div id="scene-exploded" className="h-[200vh] w-full flex items-center justify-center">
                <div className="w-full max-w-5xl px-10 text-right">
                    <h2 className="text-4xl md:text-6xl font-bold opacity-0 exploded-text">
                        Forged for perfection.<br/>
                        <span className="text-gray-400 text-2xl md:text-3xl mt-4 block">Every component redesigned.</span>
                    </h2>
                </div>
            </div>

            {/* Scene 5 & 6: Health */}
            <div id="scene-health" className="h-[150vh] w-full flex items-center justify-center">
                <div className="w-full max-w-5xl px-10">
                    <p className="text-green-500 font-bold uppercase tracking-widest mb-2 opacity-0 health-text">Health</p>
                    <h2 className="text-4xl md:text-6xl font-bold opacity-0 health-text">
                        Know your heart.<br/>In a heartbeat.
                    </h2>
                </div>
            </div>

            {/* Scene 7: Fitness */}
            <div id="scene-fitness" className="h-[150vh] w-full flex flex-col items-center justify-center">
                <h2 className="text-4xl md:text-6xl font-bold text-center opacity-0 fitness-text">
                    Every move counts.
                </h2>
            </div>
            
            {/* Scene 8: Battery */}
            <div id="scene-battery" className="h-[150vh] w-full flex items-center justify-center">
                <div className="w-full max-w-5xl px-10 text-right">
                    <h2 className="text-4xl md:text-6xl font-bold opacity-0 battery-text">
                        All-day battery life.<br/>
                        <span className="text-green-400">Now 30% faster charging.</span>
                    </h2>
                </div>
            </div>
        </div>
    );
}`,

  'pages/Watch/components/Watch/ColorSection.jsx': `import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger);

export default function ColorSection() {
    const ref = useRef();

    useGSAP(() => {
        gsap.from('.color-text', {
            scrollTrigger: {
                trigger: ref.current,
                start: 'top center',
                end: 'center center',
                scrub: true
            },
            y: 100,
            opacity: 0
        });
    }, { scope: ref });

    return (
        <section ref={ref} className="w-full h-screen bg-[#0a0a0a] flex flex-col items-center justify-center relative z-20">
            <h2 className="color-text text-5xl md:text-7xl font-bold text-center mb-10">
                Any band. Any style.
            </h2>
            <p className="color-text text-xl text-gray-400 text-center max-w-2xl mb-10">
                Mix and match cases and bands to make it uniquely yours.
            </p>
            <div className="w-full max-w-4xl h-64 bg-gray-900 rounded-3xl flex items-center justify-center border border-gray-800">
                <p className="text-gray-500">[ Interactive Color Picker / 3D Variant Preview Here ]</p>
            </div>
        </section>
    );
}`,

  'pages/Watch/components/Watch/CTA.jsx': `import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export default function CTA() {
    const ref = useRef();

    useGSAP(() => {
        gsap.from('.cta-content', {
            scrollTrigger: { trigger: ref.current, start: 'top 80%' },
            y: 50, opacity: 0, duration: 1, ease: 'power3.out'
        });
    }, { scope: ref });

    return (
        <section ref={ref} className="w-full py-40 bg-black flex flex-col items-center justify-center relative z-20 border-t border-gray-900">
            <div className="cta-content text-center">
                <h2 className="text-4xl md:text-6xl font-bold mb-6">Smarter. Healthier. Stronger.</h2>
                <p className="text-xl text-gray-400 mb-10">Starting from $399. Trade in your current watch and save.</p>
                <div className="flex gap-4 justify-center">
                    <button className="bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-gray-200 transition">Buy</button>
                    <button className="bg-transparent text-white border border-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-black transition">Learn more</button>
                </div>
            </div>
        </section>
    );
}`,

  'hooks/useWatchAnimation.js': `import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger);

export function useWatchAnimation(modelRef) {
    useGSAP(() => {
        if (!modelRef.current) return;

        const model = modelRef.current;
        
        // Setup initial state (Scene 1: Hero - Tiny scale, opacity handled by material ideally, but we scale it)
        gsap.set(model.scale, { x: 0.6, y: 0.6, z: 0.6 });
        gsap.set(model.rotation, { x: 0, y: 0, z: 0 });
        gsap.set(model.position, { x: 0, y: -0.5, z: 0 });

        // Master Timeline for Scroll Sequence
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: '#watch-story-container',
                start: 'top top',
                end: 'bottom bottom',
                scrub: 1,
                pin: '#canvas-container', // Scene 2: Pin the canvas container
                anticipatePin: 1
            }
        });

        // Scene 3: Rotation
        tl.to(model.rotation, {
            y: Math.PI * 2, // 360 degree spin
            ease: 'power1.inOut'
        }, 'scene3')
        .to(model.scale, {
            x: 1.5, y: 1.5, z: 1.5,
            ease: 'power1.inOut'
        }, 'scene3')
        .to('.rotation-text', {
            opacity: 1,
            y: -50,
            duration: 0.5
        }, 'scene3')
        .to('.rotation-text', {
            opacity: 0,
            y: -100,
            duration: 0.5
        }, 'scene3+=0.5');

        // Scene 4: Exploded View (pseudo explosion since we have a single mesh placeholder)
        // In a real Apple Watch GLB, we would target model.children[x].position
        tl.to(model.position, {
            x: -1.5,
            ease: 'power1.inOut'
        }, 'scene4')
        .to(model.rotation, {
            y: Math.PI / 4,
            x: 0.2,
            ease: 'power1.inOut'
        }, 'scene4')
        .to('.exploded-text', {
            opacity: 1,
            x: -50,
            duration: 0.5
        }, 'scene4')
        .to('.exploded-text', {
            opacity: 0,
            x: -100,
            duration: 0.5
        }, 'scene4+=0.5');

        // Scene 5 & 6: Health (Rotate back, green background transition)
        tl.to(model.position, {
            x: 1.5,
            ease: 'power2.inOut'
        }, 'scene6')
        .to(model.rotation, {
            y: -Math.PI / 6,
            ease: 'power2.inOut'
        }, 'scene6')
        .to('#watch-story-container', {
            backgroundColor: '#001a00',
            duration: 0.5
        }, 'scene6')
        .to('.health-text', {
            opacity: 1,
            y: -30,
            duration: 0.5
        }, 'scene6')
        .to('.health-text', {
            opacity: 0,
            y: -60,
            duration: 0.5
        }, 'scene6+=0.5');

        // Scene 7: Fitness
        tl.to(model.position, {
            x: 0,
            y: 0.5,
            ease: 'power2.inOut'
        }, 'scene7')
        .to(model.rotation, {
            y: 0,
            x: -0.2,
            ease: 'power2.inOut'
        }, 'scene7')
        .to('#watch-story-container', {
            backgroundColor: '#000022',
            duration: 0.5
        }, 'scene7')
        .to('.fitness-text', {
            opacity: 1,
            scale: 1.1,
            duration: 0.5
        }, 'scene7')
        .to('.fitness-text', {
            opacity: 0,
            scale: 1.2,
            duration: 0.5
        }, 'scene7+=0.5');

        // Scene 8: Battery
        tl.to(model.position, {
            x: -1.5,
            y: 0,
            ease: 'power2.inOut'
        }, 'scene8')
        .to(model.rotation, {
            y: Math.PI, // Show back of watch
            ease: 'power2.inOut'
        }, 'scene8')
        .to('#watch-story-container', {
            backgroundColor: '#000000',
            duration: 0.5
        }, 'scene8')
        .to('.battery-text', {
            opacity: 1,
            x: -50,
            duration: 0.5
        }, 'scene8')
        .to('.battery-text', {
            opacity: 0,
            x: -100,
            duration: 0.5
        }, 'scene8+=0.5');

        // End of sequence, model goes out of view or stays for next section
        tl.to(model.scale, {
            x: 0.8, y: 0.8, z: 0.8,
            ease: 'power2.inOut'
        }, 'scene9')
        .to(model.position, {
            x: 0,
            y: 2, // move up out of view
            ease: 'power2.inOut'
        }, 'scene9');

    }, { dependencies: [modelRef] });
}`
};

for (const [relativePath, content] of Object.entries(files)) {
    const fullPath = path.join(baseDir, relativePath);
    fs.mkdirSync(path.dirname(fullPath), { recursive: true });
    fs.writeFileSync(fullPath, content);
    console.log('Wrote', fullPath);
}
