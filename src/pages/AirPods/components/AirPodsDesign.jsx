import { useGSAP } from '@gsap/react'
import React, { useRef } from 'react'
import { animateWithGsap } from '../../Iphone/utils/animations';
import { extraImages, airpodsVideos } from '../utils';
import gsap from 'gsap';

const AirPodsDesign = () => {
  const videoRef = useRef();

  useGSAP(() => {
    gsap.to('#exploreAirpodsVideo', {
      scrollTrigger: {
        trigger: '#exploreAirpodsVideo',
        toggleActions: 'play pause reverse restart',
        start: '-10% bottom',
      },
      onComplete: () => {
        if(videoRef.current) {
          videoRef.current.play();
        }
      }
    })

    animateWithGsap('#features_title', { y:0, opacity:1})
    animateWithGsap(
      '.g_grow',
      { scale: 1, opacity: 1, ease: 'power1' },
      { scrub: 5.5 }
    );
    animateWithGsap(
      '.g_text',
      {y:0, opacity: 1,ease: 'power2.inOut',duration: 1}
    )
  }, []);

  return (
    <section className="h-full common-padding bg-zinc relative overflow-hidden bg-black text-white w-full">
      <div className="screen-max-width mx-auto px-5 md:px-10">
        <div className="mb-12 w-full">
          <h1 id="features_title" className="section-heading">Explore the full story.</h1>
        </div>
        
        <div className="flex flex-col justify-center items-center overflow-hidden">
          <div className="mt-32 mb-24 pl-8 md:pl-24 w-full">
            <h2 className="text-5xl lg:text-7xl font-semibold">AirPods Pro.</h2>
            <h2 className="text-5xl lg:text-7xl font-semibold">Forged for sound.</h2>
          </div>

          <div className="flex-center flex-col sm:px-10 w-full">
            <div className="relative h-[50vh] w-full flex items-center mb-8">
              <video playsInline id="exploreAirpodsVideo" className="w-full h-full object-cover object-center rounded-3xl" preload="none" muted autoPlay ref={videoRef}>
                <source src={airpodsVideos.main} type="video/mp4" />
              </video>
            </div>

            <div className="flex flex-col w-full relative">
              <div className="feature-video-container flex flex-col md:flex-row gap-5">
                <div className="overflow-hidden flex-1 h-[50vh] rounded-3xl bg-black flex items-center justify-center">
                  <img src={extraImages[0]} alt="airpods" className="feature-video g_grow object-cover h-full w-full" />
                </div>
                <div className="overflow-hidden flex-1 h-[50vh] rounded-3xl bg-black flex items-center justify-center">
                  <img src={extraImages[1]} alt="airpods 2" className="feature-video g_grow object-cover h-full w-full" />
                </div>
              </div>

              <div className="feature-text-container flex flex-col md:flex-row mt-16 gap-10">
                <div className="flex-1 flex-center">
                  <p className="feature-text g_text text-gray-400 text-lg md:text-xl font-medium">
                    AirPods Pro 3 are {' '}
                    <span className="text-white">
                      the first AirPods to feature an adaptive audio system
                    </span>,
                    using the same advanced algorithms that high-end studio headphones use for absolute clarity.
                  </p>
                </div>

                <div className="flex-1 flex-center">
                  <p className="feature-text g_text text-gray-400 text-lg md:text-xl font-medium">
                    The new acoustic architecture has one of the best fits of any earbud, making these our {' '}
                    <span className="text-white">
                      most comfortable Pro models ever.
                    </span>
                    You'll notice the difference the moment you put them in.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AirPodsDesign
