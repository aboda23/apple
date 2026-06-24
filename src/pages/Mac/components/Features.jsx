import { Canvas } from '@react-three/fiber'
import React, { Suspense, useEffect, useRef } from 'react'
import StudioLights from '../../../components/three/StudioLights'
import { features, featureSequence, useMacbookStore } from '../../../Store'
import clsx from 'clsx'
import MacbookModel from '../../../components/models/Macbook'
import { useMediaQuery } from 'react-responsive'
import { Html } from '@react-three/drei'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import video1 from "../../../assets/videos/feature-1.mp4"
import video2 from "../../../assets/videos/feature-2.mp4"
import video3 from "../../../assets/videos/feature-3.mp4"
import video4 from "../../../assets/videos/feature-4.mp4"
import video5 from "../../../assets/videos/feature-5.mp4"


const ModelScroll = () => {
  const groupRef = useRef(null);
  const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });
  const { setTexture } = useMacbookStore();

  // pre-load all feature videos during component mount
  useEffect(() => {
    featureSequence.forEach((feature) => { 
      const v = document.createElement("video");
      Object.assign(v, {
        src: feature.videoPath,
        muted: true,
        playsInline: true,
        preload: "auto",
        crossOrigin: "anonymous",
      
      });
      v.load();
     });
  }, []);
  
  useGSAP(() => { 
    // 3D model rotation animation
    const modelTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: '#features',
        start: "top center",
        end: "bottom center",
        scrub: 1,
      }
    })

    // fetch the feature content
    const timeline = gsap.timeline({
        scrollTrigger: {
            trigger: "#f-canvas",
            start: "top center",
            end: "bottom top",
            scrub: 1,
        },
    });
    
    // 3D SPIN 
    if (groupRef.current) {
      modelTimeline.to(groupRef.current.rotation, {y: Math.PI * 2, ease: "power1.inOut"})
    }
timeline
    .call(() => setTexture(video1))
    .to(".box1", { opacity: 1, y: 0, delay: 1 })
    .call(() => setTexture(video2))
    .to(".box2", { opacity: 1, y: 0 })
    .call(() => setTexture(video3))
    .to(".box3", { opacity: 1, y: 0 })
    .call(() => setTexture(video4))
    .to(".box4", { opacity: 1, y: 0 })
    .call(() => setTexture(video5))
    .to(".box5", { opacity: 1, y: 0 });
  
  }, [])

  // content and texture sync
  

  return (
    <group ref={groupRef} >
      <Suspense fallback={<Html><h1 className='text-white text-3xl uppercase'>Loading...</h1></Html>} >
      <MacbookModel scale={isMobile ? 0.05 : 0.08} position={[0, -1, 0]}  />
      </Suspense>
    </group>
  )
}

const Features = () => {
  return (
      <section id='features'>
      <h2>See it all in a new light.</h2>
      
      <Canvas id='f-canvas' camera={{}}>
        <StudioLights />
        <ambientLight intensity={0.5} />

        <ModelScroll />
      </Canvas>
      <div className="absolute inset-0">
        {features.map((feature , index) => (
          <div key={index} className={clsx("box", `box${index + 1}`, feature.styles)}>
            {feature.text}
          </div>
        ) )}
      </div>
    </section>
  )
}

export default Features