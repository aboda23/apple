import React, { useRef } from 'react'
import { airpodsVideos } from '../utils'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap';
import { animateWithGsap } from '../../Iphone/utils/animations';
import { TbCpu } from "react-icons/tb";

const AirPodsTech = () => {
  const videoRef = useRef();

  useGSAP(() => {
    gsap.from('#airpods-chip', {
      scrollTrigger: {
        trigger: '#airpods-chip',
        start: '20% bottom'
      },
      opacity: 0,
      scale: 2,
      duration: 2,
      ease: 'power2.inOut'
    })

    animateWithGsap('.g_fadeIn', {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power2.inOut'
    })
  }, []);

  return (
    <section className="common-padding bg-black text-white w-full">
      <div className="screen-max-width mx-auto px-5 md:px-10">
        <div id="airpods-chip" className="flex-center w-full my-20">
          <TbCpu className="text-8xl text-white" />
        </div>

        <div className="flex flex-col items-center text-center">
          <h2 className="text-4xl md:text-7xl font-semibold mb-4">
            H2 chip.
            <br /> A monster win for audio.
          </h2>

          <p className="text-gray-400 text-xl md:text-2xl font-medium max-w-2xl">
            It's here. The biggest redesign in the history of Apple acoustics.
          </p>
        </div>

        <div className="mt-10 md:mt-20 mb-14">
          <div className="relative h-full flex-center">
            <div className="hiw-video rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(255,255,255,0.1)] w-full max-w-4xl mx-auto flex justify-center items-center">
                <video className="pointer-events-none w-full object-cover" playsInline preload="none" muted autoPlay loop ref={videoRef}>
                  <source src={airpodsVideos.sensor} type="video/webm" />
                </video>
            </div>
          </div>
          <p className="text-gray-500 font-semibold text-center mt-6">Heart Rate Sensor & Advanced Tracking</p>
        </div>

        <div className="flex flex-col md:flex-row gap-10 justify-between items-start mt-16 max-w-4xl mx-auto">
          <div className="flex flex-1 justify-center flex-col gap-5">
            <p className="hiw-text g_fadeIn text-gray-400 text-lg md:text-xl font-medium">
              H2 is an entirely new class of headphone chip that delivers our {' '}
              <span className="text-white">
                best audio performance by far
              </span>.
            </p>

            <p className="hiw-text g_fadeIn text-gray-400 text-lg md:text-xl font-medium">
              Music and movies {' '}
              <span className="text-white">
                will sound and feel so immersive
              </span>,
                with incredibly detailed environments and perfectly separated frequencies.
            </p>
          </div>
          

          <div className="flex-1 flex justify-center flex-col g_fadeIn">
            <p className="text-gray-400 text-lg font-semibold">New</p>
            <p className="text-white text-3xl md:text-5xl font-bold my-2">Pro-class Audio</p>
            <p className="text-gray-400 text-lg font-semibold">with Custom Amplifier</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AirPodsTech
