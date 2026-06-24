import React from 'react'
import game from '../../../assets/videos/game.mp4'
import logo from '../../../assets/images/mask-logo.svg'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useMediaQuery } from "react-responsive";

const Showcase = () => {
    const isTablet = useMediaQuery({ query: "(max-width: 1024px)" });
    useGSAP(() => {
        if (!isTablet) {
            const timeline = gsap.timeline({
                scrollTrigger: {
                    trigger: "#showcase",
                    start: "top top",
                    end: "bottom top",
                    scrub: true,
                    pin: true,
                },
            });
            timeline.to('.mask img', {
                transform: 'scale(1.1)'
            }).to('.content', { opacity: 1, y: 0, ease: 'Power1.in' });
        }
    }, [isTablet]);

  return (
      <section id="showcase">
          <div className="media">
              <video src={game} loop muted autoPlay playsInline />
              <div className="mask">
                  <img src={logo} alt="Mask Logo" />
              </div>
          </div>
          <div className="content">
              <div className="wrapper">
                  <div className="lg:max-w-md">
                      <h2>Rocket Chip</h2>
                      <div className="space-y-5 mt-5 pe-10">
                          <p>
                              Introducing {" "}
                              <span className='text-white'>
                                  M4, the next generation of Apple silicon
                              </span>
                              . M4 powers
                          </p>
                          <p>
                              It drives Apple Intelligence on ipad pro, so you can do more than ever with your ipad. With up to 15% faster CPU performance and up to 30% faster GPU performance, M4 delivers a powerful boost to everything you do. And with up to 18 hours of battery life, you can work, play, and create all day long without needing to recharge.
                          </p>
                          <p>
                              A brand-new display engine delivers breath taking precision, color accuracy, and brightness.And a next-gen GPU with hardware-accelerated ray tracing bring console-level graphics to your fingertips.
                          </p>
                          <p className='text-primary'>
                              Learn more about Apple Intelligence
                          </p>
                      </div>
                  </div>
                  <div className='max-w-3xs space-y-14'>
                      <div className='space-y-2'>
                          <p>Up to</p>
                          <h3>4x faster</h3>
                          <p>pro rendering performance than M2</p>
                      </div>
                      <div className='space-y-2'>
                          <p>Up to</p>
                          <h3>1.5 faster</h3>
                          <p>CPU performance than M2</p>
                      </div>
</div>

              </div>
          </div>
      </section>
  );
}

export default Showcase