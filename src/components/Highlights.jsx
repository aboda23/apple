import React from 'react'
import laptob from '../assets/images/laptop.png'
import sun from '../assets/images/sun.png'
import ai from '../assets/images/ai.png'
import battery from '../assets/images/battery.png'
import { useMediaQuery } from 'react-responsive'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'


const Highlights = () => {
    const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });
    useGSAP(() => {
        gsap.from([".left-column ", ".right-column "], {
            y: isMobile ? 30 : 80,
            opacity: 0,
            stagger: 0.15,
            duration: 1,
            scrollTrigger: {
                trigger: "#highlights",
                start: "top 80%",
            },
        });
    }, [isMobile]);

    return (
        <section id="highlights">
            <h2>There’s never been a better time to upgrade.</h2>
            <h3>Here’s what you get with the new MacBook Pro.</h3>

            <div className="masonry">
                <div className="left-column">
                    <div>
                        <img src="/laptop.png" alt="Laptop" />
                        <p>Fly through demanding tasks up to 9.8x faster.</p>
                    </div>
                    <div>
                        <img src="/sun.png" alt="Sun" />
                        <p>
                            A stunning <br />
                            Liquid Retina XDR <br />
                            display.
                        </p>
                    </div>
                </div>
                <div className="right-column">
                    <div className="apple-gradient">
                        <img src={ai} alt="AI" />
                        <p>
                            Built for <br />
                            <span>Apple Intelligence.</span>
                        </p>
                    </div>
                    <div>
                        <img src={battery} alt="Battery" />
                        <p>
                            Up to
                <span className="green-gradient"> { ' '}14 more hours{" "} </span>
                            battery life.
                <span className="text-dark-100"> {' '}(Up to 24 hours total.){ ''}</span>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};
export default Highlights;