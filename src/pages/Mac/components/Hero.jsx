import lap from "../../../assets/videos/hero.mp4";
import title from "../../../assets/images/title.png";
const Hero = () => {
    // const videoRef = useRef();
    // useEffect(() => {
    //     if (videoRef.current) videoRef.current.playbackRate = 2.0;
    // }
    // , []);

    return (
        <section id="hero">
            <div>
                <h1>MacBook Pro</h1>
                <img src={title} alt="MacBook Pro Title" />
            </div>
        <video src={lap} autoPlay muted playsInline  />
            <button>Buy Now</button>
            <p>From $1599 or $133/mo for months</p>
        </section>
    );
};
export default Hero;
