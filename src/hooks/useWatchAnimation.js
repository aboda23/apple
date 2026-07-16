import { useGSAP } from '@gsap/react';
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
}