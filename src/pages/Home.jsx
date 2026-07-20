import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { ChevronRight, PlayCircle, Apple, ShieldCheck, Box, RotateCcw, Headset, Star, Mail, Heart, ShoppingBag } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Framer Motion variants
const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
};

export default function Home() {
  const containerRef = useRef(null);

  useEffect(() => {
    // GSAP Scroll Reveal
    const reveals = document.querySelectorAll('.lux-reveal');
    reveals.forEach(el => {
      gsap.fromTo(el, 
        { opacity: 0, y: 80, scale: 0.98 }, 
        { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: 'expo.out', scrollTrigger: {
          trigger: el,
          start: 'top 85%'
        }}
      );
    });
  }, []);

  return (
    <div className="bg-[#000000] min-h-screen font-sans text-white overflow-hidden pt-[90px]" ref={containerRef}>
      
      {/* ================= SECTION 1: HERO ================= */}
      <section className="relative w-full h-[900px] flex items-center justify-center overflow-hidden mb-32 border-b border-[#111]">
        {/* Deep Dark Blue/Black Glow Background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,_rgba(10,132,255,0.15),_#000000_60%)] z-0"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')] opacity-10 mix-blend-screen z-0 animate-pulse bg-cover bg-center"></div>
        
        <div className="relative z-10 w-full max-w-[1920px] px-8 md:px-20 flex flex-col md:flex-row items-center justify-between h-full">
          {/* Left Content */}
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="w-full md:w-1/2 text-left z-20">
            <h1 className="text-7xl md:text-8xl lg:text-[120px] font-bold mb-4 tracking-tighter text-white drop-shadow-2xl">
              iPhone 16 Pro
            </h1>
            <h2 className="text-3xl md:text-4xl font-semibold mb-8 text-[#0A84FF]">
              Built for Apple Intelligence.
            </h2>
            <p className="text-xl md:text-2xl text-[#A1A1AA] mb-12 leading-relaxed font-light">
              Titanium.<br/>
              A18 Pro chip.<br/>
              The most powerful iPhone ever.
            </p>
            <div className="flex gap-6 items-center">
              <Link to="/iphone" className="bg-white text-black px-10 py-4 rounded-full font-semibold text-lg hover:scale-105 transition-transform duration-300 shadow-[0_0_40px_rgba(255,255,255,0.2)]">
                Learn More
              </Link>
              <Link to="/store" className="bg-[#0A84FF] text-white px-10 py-4 rounded-full font-semibold text-lg hover:bg-blue-500 hover:scale-105 transition-all duration-300 shadow-[0_0_40px_rgba(10,132,255,0.4)]">
                Buy Now
              </Link>
            </div>
          </motion.div>
          
          {/* Right Product Image */}
          <motion.div 
            initial={{ opacity: 0, x: 100 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
            className="w-full md:w-1/2 h-full relative flex items-center justify-end z-10"
          >
            <img 
              src="https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&q=80&w=1000" 
              alt="iPhone 16 Pro" 
              className="w-[90%] lg:w-[80%] h-auto max-h-[850px] object-contain drop-shadow-[0_0_60px_rgba(255,255,255,0.15)] filter contrast-125"
            />
          </motion.div>
        </div>
      </section>

      {/* ================= SECTION 2: PRODUCT CATEGORIES ================= */}
      <section className="w-full max-w-[1920px] mx-auto px-8 md:px-20 mb-32 lux-reveal">
        <div className="flex overflow-x-auto gap-6 pb-12 hide-scrollbar snap-x">
          {[
            { name: 'Mac', img: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=800' },
            { name: 'iPad', img: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80&w=800' },
            { name: 'iPhone', img: 'https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&q=80&w=800' },
            { name: 'Apple Watch', img: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?auto=format&fit=crop&q=80&w=800' },
            { name: 'AirPods', img: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&q=80&w=800' },
            { name: 'Vision Pro', img: 'https://images.unsplash.com/photo-1535223289827-42f1e9919769?auto=format&fit=crop&q=80&w=800' },
            { name: 'Apple TV', img: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&q=80&w=800' },
            { name: 'Accessories', img: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&q=80&w=800' }
          ].map((cat, i) => (
            <Link key={cat.name} to={`/${cat.name.toLowerCase().replace(' ', '')}`} className="min-w-[320px] h-[400px] bg-[#111111] rounded-[24px] relative flex flex-col items-center justify-start overflow-hidden hover:-translate-y-4 transition-transform duration-500 shadow-[0_10px_40px_rgba(0,0,0,0.8)] border border-[#222] snap-center group">
              <img src={cat.img} alt={cat.name} className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-110 transition-all duration-700" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/20 to-black/80 z-10"></div>
              <h3 className="text-3xl font-semibold mt-10 z-20 text-white tracking-wide">{cat.name}</h3>
            </Link>
          ))}
        </div>
      </section>

      {/* ================= SECTION 3: NEW ARRIVALS (THE LATEST) ================= */}
      <section className="w-full max-w-[1920px] mx-auto px-8 md:px-20 mb-32 lux-reveal">
        <div className="mb-12 flex justify-between items-end">
          <div>
            <h2 className="text-6xl font-bold tracking-tight mb-4">The Latest.</h2>
            <p className="text-2xl text-[#A1A1AA]">Take a look at what’s new right now.</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { name: 'iPhone 16 Pro', desc: 'Hello, Apple Intelligence.', price: 'From $999', img: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&q=80&w=800' },
            { name: 'MacBook Air M4', desc: 'Lean. Mean. M4 machine.', price: 'From $1,099', img: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=800' },
            { name: 'iPad Pro M4', desc: 'Unbelievably thin. Incredibly powerful.', price: 'From $999', img: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80&w=800' },
            { name: 'Apple Watch Series 10', desc: 'Thinnest classic.', price: 'From $399', img: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?auto=format&fit=crop&q=80&w=800' },
            { name: 'AirPods 4', desc: 'Iconic. Now supersonic.', price: 'From $129', img: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&q=80&w=800' },
            { name: 'Vision Pro', desc: 'Welcome to the era of spatial computing.', price: 'From $3,499', img: 'https://images.unsplash.com/photo-1535223289827-42f1e9919769?auto=format&fit=crop&q=80&w=800' }
          ].map((prod, i) => (
            <div key={i} className="bg-[#111111] rounded-[24px] p-10 flex flex-col h-[650px] border border-[#222] hover:border-[#444] transition-colors group relative overflow-hidden shadow-2xl hover:-translate-y-2 duration-500">
              <div className="flex justify-between items-start z-20 mb-4">
                <div>
                  <h3 className="text-3xl font-bold mb-2">{prod.name}</h3>
                  <p className="text-[#A1A1AA] text-lg">{prod.desc}</p>
                </div>
                <button className="text-gray-400 hover:text-white transition"><Heart size={28} /></button>
              </div>
              <p className="text-xl font-medium z-20 mb-6">{prod.price}</p>
              
              <div className="flex gap-1 text-[#0A84FF] mb-6 z-20">
                {[1,2,3,4,5].map(s => <Star key={s} size={18} fill="currentColor" />)}
              </div>

              <div className="mt-auto flex gap-4 items-center z-20">
                <button className="bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-gray-200 transition text-md flex items-center gap-2">
                  <ShoppingBag size={18} /> Buy Now
                </button>
              </div>

              <div className="absolute bottom-0 left-0 right-0 h-[60%] flex items-end justify-center pb-8 z-10">
                <img src={prod.img} alt={prod.name} className="w-[90%] h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-700 shadow-2xl" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent z-20"></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= SECTION 4: CINEMATIC VIDEO ================= */}
      <section className="w-full max-w-[1920px] mx-auto px-8 md:px-20 mb-32 lux-reveal">
        <div className="relative w-full h-[700px] bg-[#0a0a0a] rounded-[24px] overflow-hidden border border-[#2C2C2E] group flex items-center justify-center cursor-pointer shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
          <img src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=2000" alt="Apple Cinematic Video" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10"></div>
          
          <div className="z-20 w-32 h-32 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 group-hover:bg-white/20 transition-colors shadow-[0_0_40px_rgba(255,255,255,0.2)]">
            <PlayCircle size={60} className="text-white opacity-90 group-hover:opacity-100 transition-all duration-300" />
          </div>
          
          <div className="absolute bottom-16 left-16 z-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-4">Experience Apple Intelligence</h2>
            <p className="text-2xl text-[#A1A1AA]">Watch the latest cinematic launch film.</p>
          </div>
        </div>
      </section>

      {/* ================= SECTION 5: APPLE INTELLIGENCE ================= */}
      <section className="w-full max-w-[1920px] mx-auto px-8 md:px-20 mb-32 lux-reveal">
        <div className="flex flex-col lg:flex-row gap-0 bg-[#111111] rounded-[24px] overflow-hidden border border-[#222] shadow-2xl">
          <div className="w-full lg:w-1/2 min-h-[500px] lg:min-h-[700px] relative">
            <img src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=1000" alt="AI Abstract" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#111111] lg:to-[#111111]"></div>
          </div>
          <div className="w-full lg:w-1/2 p-16 lg:p-24 flex flex-col justify-center items-start z-10 bg-[#111111]">
            <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 w-16 h-16 rounded-2xl flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(168,85,247,0.4)]">
              <Apple size={36} color="white" />
            </div>
            <h2 className="text-6xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
              Apple Intelligence
            </h2>
            <p className="text-2xl text-[#A1A1AA] mb-12 leading-relaxed">
              Powerful AI designed for Apple devices. <br/>
              Personal, private, and seamlessly integrated into your daily life. It understands you better than ever before.
            </p>
            <button className="bg-white text-black px-10 py-4 rounded-full font-bold text-lg hover:scale-105 transition shadow-lg shadow-white/10">
              Explore Apple Intelligence
            </button>
          </div>
        </div>
      </section>

      {/* ================= SECTION 6: FEATURED COLLECTION (MASONRY GRID) ================= */}
      <section className="w-full max-w-[1920px] mx-auto px-8 md:px-20 mb-32 lux-reveal">
        <h2 className="text-5xl font-bold mb-12 text-center">Featured Collection</h2>
        <div className="grid grid-cols-1 md:grid-cols-12 auto-rows-[400px] gap-6">
          
          <div className="md:col-span-8 bg-[#111] rounded-[24px] border border-[#222] relative overflow-hidden group">
            <img src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=1200" alt="MacBook" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
            <div className="absolute bottom-10 left-10">
              <h3 className="text-4xl font-bold mb-2">MacBook Air M4</h3>
              <p className="text-xl text-gray-300">Lean. Mean. M4 machine.</p>
            </div>
          </div>

          <div className="md:col-span-4 bg-[#111] rounded-[24px] border border-[#222] relative overflow-hidden group">
            <img src="https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&q=80&w=800" alt="AirPods" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
            <div className="absolute bottom-10 left-10">
              <h3 className="text-3xl font-bold mb-2">AirPods 4</h3>
              <p className="text-lg text-gray-300">Iconic audio.</p>
            </div>
          </div>

          <div className="md:col-span-4 bg-[#111] rounded-[24px] border border-[#222] relative overflow-hidden group">
            <img src="https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?auto=format&fit=crop&q=80&w=800" alt="Watch" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
            <div className="absolute bottom-10 left-10">
              <h3 className="text-3xl font-bold mb-2">Watch Series 10</h3>
              <p className="text-lg text-gray-300">Thinnest classic.</p>
            </div>
          </div>

          <div className="md:col-span-8 bg-[#111] rounded-[24px] border border-[#222] relative overflow-hidden group">
            <img src="https://images.unsplash.com/photo-1535223289827-42f1e9919769?auto=format&fit=crop&q=80&w=1200" alt="Vision Pro" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
            <div className="absolute bottom-10 left-10">
              <h3 className="text-4xl font-bold mb-2">Apple Vision Pro</h3>
              <p className="text-xl text-gray-300">The era of spatial computing.</p>
            </div>
          </div>

        </div>
      </section>

      {/* ================= SECTION 7: TRADE IN ================= */}
      <section className="w-full max-w-[1920px] mx-auto px-8 md:px-20 mb-32 lux-reveal">
        <div className="w-full bg-gradient-to-br from-[#1C1C1E] via-[#0A0A0A] to-[#111] border border-[#2C2C2E] rounded-[24px] p-16 md:p-24 flex flex-col md:flex-row items-center justify-between relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80')] bg-cover mix-blend-overlay"></div>
          <div className="z-20 max-w-2xl">
            <h2 className="text-6xl font-bold mb-6">Trade in your old device.</h2>
            <p className="text-4xl text-[#0A84FF] font-medium mb-12">Save up to $700.</p>
            <button className="bg-white text-black px-10 py-4 rounded-full font-bold text-lg hover:scale-105 transition shadow-[0_0_30px_rgba(255,255,255,0.2)]">
              Get Estimate
            </button>
          </div>
          <div className="z-20 mt-12 md:mt-0 relative w-full md:w-1/3 h-[400px]">
            <img src="https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&q=80&w=600" alt="Trade In" className="absolute inset-0 w-full h-full object-cover rounded-3xl rotate-12 shadow-2xl border border-[#333]" />
          </div>
        </div>
      </section>

      {/* ================= SECTION 8: APPLE TV+ ================= */}
      <section className="w-full max-w-[1920px] mx-auto px-8 md:px-20 mb-32 lux-reveal">
        <div className="relative w-full h-[700px] bg-[#0a0a0a] rounded-[24px] overflow-hidden border border-[#2C2C2E] flex flex-col justify-end p-16 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          {/* Real Posters Slider Background */}
          <div className="absolute inset-0 flex gap-6 opacity-60 p-12 overflow-hidden pointer-events-none">
            <img src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=400" alt="Severance" className="w-72 h-[120%] object-cover rounded-2xl shadow-2xl" />
            <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=400" alt="Foundation" className="w-72 h-[120%] object-cover rounded-2xl shadow-2xl" />
            <img src="https://images.unsplash.com/photo-1504333638930-c8787321efa0?auto=format&fit=crop&q=80&w=400" alt="Silo" className="w-72 h-[120%] object-cover rounded-2xl shadow-2xl" />
            <img src="https://images.unsplash.com/photo-1518605368461-1eb25dc8b6e6?auto=format&fit=crop&q=80&w=400" alt="Ted Lasso" className="w-72 h-[120%] object-cover rounded-2xl shadow-2xl" />
            <img src="https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&q=80&w=400" alt="The Morning Show" className="w-72 h-[120%] object-cover rounded-2xl shadow-2xl" />
            <img src="https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&q=80&w=400" alt="F1" className="w-72 h-[120%] object-cover rounded-2xl shadow-2xl" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
          
          <div className="relative z-20">
            <h2 className="text-6xl font-bold mb-8 flex items-center gap-2"><Apple size={48}/> tv+</h2>
            <p className="text-2xl text-[#A1A1AA] mb-8">Award-winning Apple Originals. Only on Apple TV+.</p>
            <button className="bg-white text-black px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-200 transition flex items-center gap-3 shadow-[0_0_30px_rgba(255,255,255,0.2)]">
              Stream Now <PlayCircle size={24} fill="black" stroke="white" />
            </button>
          </div>
        </div>
      </section>

      {/* ================= SECTION 9: SERVICES ================= */}
      <section className="w-full max-w-[1920px] mx-auto px-8 md:px-20 mb-32 lux-reveal">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: <Box size={40}/>, title: 'Free Delivery', desc: 'Get free delivery on all orders over $50.' },
            { icon: <ShieldCheck size={40}/>, title: 'Secure Checkout', desc: 'Your data is 100% protected and encrypted.' },
            { icon: <RotateCcw size={40}/>, title: 'Easy Returns', desc: 'Return your items easily within 14 days.' },
            { icon: <Headset size={40}/>, title: '24/7 Support', desc: 'Our Apple experts are always here to help.' }
          ].map((srv, i) => (
            <div key={i} className="bg-[#111111] border border-[#2C2C2E] rounded-[24px] p-12 flex flex-col items-start hover:-translate-y-2 transition-transform shadow-xl">
              <div className="text-[#0A84FF] mb-6 bg-[#1a1a1a] p-4 rounded-2xl border border-[#333]">{srv.icon}</div>
              <h3 className="text-2xl font-bold mb-3">{srv.title}</h3>
              <p className="text-[#A1A1AA] text-lg">{srv.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= SECTION 10: APPLE STORE ================= */}
      <section className="w-full max-w-[1920px] mx-auto px-8 md:px-20 mb-32 lux-reveal">
        <div className="w-full h-[500px] bg-black rounded-[24px] border border-[#2C2C2E] overflow-hidden relative flex items-center justify-center lg:justify-start p-12 md:p-24 shadow-2xl group">
          <img src="https://images.unsplash.com/photo-1534422298391-e4f8c172dd36?auto=format&fit=crop&q=80&w=2000" alt="Apple Store" className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-1000" />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
          <div className="relative z-10 max-w-2xl text-center lg:text-left">
            <h2 className="text-6xl font-bold mb-6">Find an Apple Store near you.</h2>
            <p className="text-2xl text-[#A1A1AA] mb-10">The best way to buy the products you love.</p>
            <button className="bg-white text-black px-10 py-4 rounded-full font-bold text-lg hover:scale-105 transition shadow-[0_0_30px_rgba(255,255,255,0.2)]">
              Locate Store
            </button>
          </div>
        </div>
      </section>

      {/* ================= SECTION 11: CUSTOMER REVIEWS ================= */}
      <section className="w-full max-w-[1920px] mx-auto px-8 md:px-20 mb-32 lux-reveal">
        <h2 className="text-5xl font-bold mb-16 text-center">Loved by millions.</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200', name: 'Sarah Jenkins', text: 'The new iPhone 16 Pro is an absolute masterpiece. The camera quality is unmatched, and Apple Intelligence changes everything.' },
            { img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200', name: 'Michael Chen', text: 'I bought the MacBook Air M4 for programming and it flies through compilation times. Best purchase I have made this year.' },
            { img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200', name: 'Emma Watson', text: 'Shopping at the Apple Store was a breeze. Fast shipping, secure packaging, and the products are simply luxury.' }
          ].map((rev, i) => (
            <div key={i} className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[24px] p-12 hover:bg-white/10 transition-colors shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#0A84FF] to-purple-500"></div>
              <div className="flex gap-1 text-[#0A84FF] mb-6">
                {[1,2,3,4,5].map(s => <Star key={s} size={20} fill="currentColor" />)}
              </div>
              <p className="text-xl font-medium mb-10 text-gray-200 leading-relaxed">"{rev.text}"</p>
              <div className="flex items-center gap-4 mt-auto">
                <img src={rev.img} alt={rev.name} className="w-16 h-16 rounded-full object-cover border-2 border-[#333]" />
                <div>
                  <h4 className="font-bold text-lg">{rev.name}</h4>
                  <p className="text-sm text-[#0A84FF]">Verified Buyer</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= SECTION 12: NEWSLETTER ================= */}
      <section className="w-full max-w-[1920px] mx-auto px-8 md:px-20 mb-32 lux-reveal">
        <div className="relative bg-[#111111] border border-[#2C2C2E] rounded-[24px] p-20 text-center max-w-5xl mx-auto flex flex-col items-center overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80')] opacity-10 bg-cover mix-blend-screen"></div>
          <div className="relative z-10 w-full flex flex-col items-center">
            <div className="bg-[#1a1a1a] p-5 rounded-full mb-8 border border-[#333]">
              <Mail size={48} className="text-[#0A84FF]" />
            </div>
            <h2 className="text-5xl font-bold mb-6">Stay Connected.</h2>
            <p className="text-[#A1A1AA] mb-12 text-2xl">Sign up for the latest news, offers, and innovations.</p>
            <div className="flex w-full max-w-2xl bg-black border border-[#333] rounded-full overflow-hidden p-2 focus-within:border-[#0A84FF] transition-colors shadow-2xl">
              <input type="email" placeholder="Your email address" className="w-full bg-transparent border-none outline-none px-8 text-xl text-white placeholder-gray-500" />
              <button className="bg-white text-black px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-200 transition">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SECTION 13: FOOTER ================= */}
      <footer className="w-full max-w-[1920px] mx-auto px-8 md:px-20 pb-20 border-t border-[#2C2C2E] pt-16 bg-[#000000]">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-10 mb-16 text-sm text-[#A1A1AA]">
          <div className="flex flex-col gap-4">
            <h4 className="text-white font-bold mb-4 text-base">Shop and Learn</h4>
            <Link to="/store" className="hover:text-white transition">Store</Link>
            <Link to="/mac" className="hover:text-white transition">Mac</Link>
            <Link to="/ipad" className="hover:text-white transition">iPad</Link>
            <Link to="/iphone" className="hover:text-white transition">iPhone</Link>
            <Link to="/watch" className="hover:text-white transition">Watch</Link>
            <Link to="/vision" className="hover:text-white transition">Vision</Link>
            <Link to="/airpods" className="hover:text-white transition">AirPods</Link>
            <Link to="/tv" className="hover:text-white transition">TV & Home</Link>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="text-white font-bold mb-4 text-base">Services</h4>
            <Link to="#" className="hover:text-white transition">Apple Music</Link>
            <Link to="#" className="hover:text-white transition">Apple TV+</Link>
            <Link to="#" className="hover:text-white transition">Apple Fitness+</Link>
            <Link to="#" className="hover:text-white transition">Apple News+</Link>
            <Link to="#" className="hover:text-white transition">Apple Arcade</Link>
            <Link to="#" className="hover:text-white transition">iCloud</Link>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="text-white font-bold mb-4 text-base">Apple Store</h4>
            <Link to="#" className="hover:text-white transition">Find a Store</Link>
            <Link to="#" className="hover:text-white transition">Genius Bar</Link>
            <Link to="#" className="hover:text-white transition">Today at Apple</Link>
            <Link to="#" className="hover:text-white transition">Apple Camp</Link>
            <Link to="#" className="hover:text-white transition">Apple Trade In</Link>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="text-white font-bold mb-4 text-base">For Business</h4>
            <Link to="#" className="hover:text-white transition">Apple and Business</Link>
            <Link to="#" className="hover:text-white transition">Shop for Business</Link>
          </div>
          <div className="flex flex-col gap-4 lg:col-span-2 lg:items-end">
            <h4 className="text-white font-bold mb-4 text-base">Apple Values</h4>
            <div className="flex flex-col lg:items-end gap-4">
              <Link to="#" className="hover:text-white transition">Accessibility</Link>
              <Link to="#" className="hover:text-white transition">Education</Link>
              <Link to="#" className="hover:text-white transition">Environment</Link>
              <Link to="#" className="hover:text-white transition">Inclusion and Diversity</Link>
              <Link to="#" className="hover:text-white transition">Privacy</Link>
            </div>
          </div>
        </div>
        <div className="text-[#A1A1AA] text-sm pt-8 border-t border-[#2C2C2E] flex flex-col md:flex-row justify-between items-center">
          <p>Copyright © 2026 Apple Inc. All rights reserved.</p>
          <div className="flex gap-6 mt-6 md:mt-0">
            <Link to="#" className="hover:text-white transition border-r border-[#333] pr-6">Privacy Policy</Link>
            <Link to="#" className="hover:text-white transition border-r border-[#333] pr-6">Terms of Use</Link>
            <Link to="#" className="hover:text-white transition border-r border-[#333] pr-6">Sales and Refunds</Link>
            <Link to="#" className="hover:text-white transition border-r border-[#333] pr-6">Legal</Link>
            <Link to="#" className="hover:text-white transition">Site Map</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
