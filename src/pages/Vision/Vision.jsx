import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger);

/* ---------------------------------------------------------
   Apple Vision Pro — Arabic spatial-computing landing page
   Design tokens:
   bg void     #050507
   bg surface  #0D0E12
   glass       rgba(255,255,255,.06) / border rgba(255,255,255,.12)
   text        #F5F5F7 / muted #9B9BA3
   accent ice  #0071E3
   accent warm #F0C48A
   accent violet #9B8CFF (sparingly, depth only)
   Display: Space Grotesk | Body: Inter | Mono: JetBrains Mono
--------------------------------------------------------- */

function Reveal({ children, className = "", delay = 0 }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          delay: delay / 1000,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            once: true,
          },
        }
      );
    }, el);
    return () => ctx.revert();
  }, [delay]);

  return (
    <div ref={ref} className={className} style={{ opacity: 0 }}>
      {children}
    </div>
  );
}

/* ---------------- Hero ambient background ---------------- */
function AmbientField() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* HERO BACKGROUND VIDEO — replace src below with your own video file/URL */}
      <video
        className="absolute inset-0 w-full h-full object-cover opacity-60"
        src="/videos/hero-background.mp4"
        autoPlay
        muted
        loop
        playsInline
      />
      <div className="vp-orb vp-orb-a" />
      <div className="vp-orb vp-orb-b" />
      <div className="vp-orb vp-orb-c" />
      <div className="vp-grain" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 40%, transparent 0%, #050507 78%)",
        }}
      />
    </div>
  );
}

/* ---------------- Parallax spatial windows (signature) ---------------- */
function SpatialStage() {
  const stageRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMove = (e) => {
    const el = stageRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ x: px, y: py });
  };

  const handleLeave = () => setTilt({ x: 0, y: 0 });

  const layers = [
    { label: "Mail", sub: "12 new messages", depth: 70, w: 200, h: 130, top: "8%", left: "6%", tint: "ice" },
    { label: "Music", sub: "Night playlist", depth: 40, w: 170, h: 110, top: "58%", left: "2%", tint: "warm" },
    { label: "Maps", sub: "Spatial mode", depth: 100, w: 240, h: 160, top: "18%", left: "58%", tint: "violet" },
    { label: "Weather", sub: "24°  Clear", depth: 55, w: 150, h: 100, top: "66%", left: "62%", tint: "ice" },
    { label: "Notes", sub: "Design session", depth: 85, w: 190, h: 120, top: "38%", left: "32%", tint: "warm" },
  ];

  const tintMap = {
    ice: "rgba(0,113,227,0.16)",
    warm: "rgba(240,196,138,0.14)",
    violet: "rgba(155,140,255,0.14)",
  };
  const borderMap = {
    ice: "rgba(0,113,227,0.35)",
    warm: "rgba(240,196,138,0.32)",
    violet: "rgba(155,140,255,0.32)",
  };

  return (
    <div
      ref={stageRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="relative w-full h-[420px] md:h-[560px] select-none"
      style={{ perspective: "1200px" }}
    >
      {/* SECOND-SECTION VIDEO — replace src below with your own 3D/product video */}
      <video
        className="absolute inset-0 w-full h-full object-cover rounded-3xl border border-white/10 opacity-70"
        src="/videos/spatial-stage.mp4"
        autoPlay
        muted
        loop
        playsInline
      />
      <div
        className="absolute inset-0"
        style={{
          transformStyle: "preserve-3d",
          transition: "transform 0.15s ease-out",
          transform: `rotateY(${tilt.x * 10}deg) rotateX(${-tilt.y * 10}deg)`,
        }}
      >
        {layers.map((l, i) => (
          <div
            key={i}
            className="absolute rounded-2xl backdrop-blur-xl border"
            style={{
              width: l.w,
              height: l.h,
              top: l.top,
              left: l.left,
              background: tintMap[l.tint],
              borderColor: borderMap[l.tint],
              boxShadow: "0 20px 60px -20px rgba(0,0,0,0.6)",
              transform: `translateZ(${l.depth}px) translate(${tilt.x * l.depth * 0.6}px, ${tilt.y * l.depth * 0.6}px)`,
              transition: "transform 0.15s ease-out",
            }}
          >
            <div className="h-full w-full p-4 flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <span className="text-[11px] tracking-wide text-white/50 font-mono">{`0${i + 1}`}</span>
                <div className="w-2 h-2 rounded-full" style={{ background: borderMap[l.tint] }} />
              </div>
              <div>
                <p className="text-white/90 text-sm font-bold">
                  {l.label}
                </p>
                <p className="text-white/45 text-xs mt-1">{l.sub}</p>
              </div>
            </div>
          </div>
        ))}

        {/* center anchor glow representing the wearer's viewpoint */}
        <div
          className="absolute rounded-full"
          style={{
            width: 320,
            height: 320,
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%) translateZ(0px)",
            background:
              "radial-gradient(circle, rgba(0,113,227,0.10) 0%, transparent 70%)",
          }}
        />
      </div>
    </div>
  );
}

/* ---------------- 3D visor model (Three.js + GSAP) ----------------
   Drop your own 3D model file in /public/models/vision-pro.glb (or .gltf)
   and it will load automatically here. Until then, a stylized glass-visor
   placeholder (not a literal replica of any real product) is shown instead.
------------------------------------------------------------------- */
function Model3D({ modelUrl = "/models/vision-pro/source/ARcode.glb" }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let width = mount.clientWidth;
    let height = mount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 100);
    camera.position.set(0, 0, 6);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // stylized visor placeholder: a wide, flat, curved glass strip + frame band
    const lensGeo = new THREE.SphereGeometry(1.6, 64, 64, 0, Math.PI * 2, 0, Math.PI * 0.5);
    lensGeo.scale(1.55, 0.5, 0.46);
    const lensMat = new THREE.MeshPhysicalMaterial({
      color: 0x0a0a0f,
      metalness: 0.15,
      roughness: 0.08,
      transmission: 1,
      thickness: 1.4,
      ior: 1.4,
      clearcoat: 1,
      clearcoatRoughness: 0.05,
    });
    const lens = new THREE.Mesh(lensGeo, lensMat);
    lens.rotation.x = Math.PI;

    // frame band tracing the visor's edge
    const bandGeo = new THREE.TorusGeometry(1.6, 0.045, 24, 100);
    bandGeo.scale(1.55, 0.5, 0.46);
    const bandMat = new THREE.MeshStandardMaterial({ color: 0x1a1a20, metalness: 0.85, roughness: 0.3 });
    const band = new THREE.Mesh(bandGeo, bandMat);
    band.rotation.x = Math.PI / 2;
    band.position.y = -0.03;

    // side arms suggesting a headset, kept abstract/simple
    const armGeo = new THREE.CylinderGeometry(0.05, 0.05, 1.1, 16);
    const armMat = new THREE.MeshStandardMaterial({ color: 0x222228, metalness: 0.6, roughness: 0.4 });
    const armL = new THREE.Mesh(armGeo, armMat);
    armL.rotation.z = Math.PI / 2;
    armL.position.set(-2.3, -0.05, 0);
    const armR = armL.clone();
    armR.position.x = 2.3;

    const placeholder = [lens, band, armL, armR];

    // outer group spins continuously; inner group tilts toward the cursor
    const spinGroup = new THREE.Group();
    const tiltGroup = new THREE.Group();
    placeholder.forEach((m) => tiltGroup.add(m));
    spinGroup.add(tiltGroup);
    scene.add(spinGroup);

    const keyLight = new THREE.PointLight(0x8fe3e8, 6, 20);
    keyLight.position.set(3, 2, 4);
    const rimLight = new THREE.PointLight(0x0071e3, 8, 20);
    rimLight.position.set(-3, -1, 3);
    const ambient = new THREE.AmbientLight(0xffffff, 0.35);
    scene.add(keyLight, rimLight, ambient);

    // try to load a real model; silently keep the placeholder if none is found
    let loadedModel = null;
    import("three/examples/jsm/loaders/GLTFLoader.js")
      .then(({ GLTFLoader }) => {
        const loader = new GLTFLoader();
        loader.load(
          modelUrl,
          (gltf) => {
            placeholder.forEach((m) => tiltGroup.remove(m));
            const model = gltf.scene;
            const box = new THREE.Box3().setFromObject(model);
            const size = new THREE.Vector3();
            box.getSize(size);
            const maxDim = Math.max(size.x, size.y, size.z) || 1;
            const scale = 2.8 / maxDim;
            model.scale.setScalar(scale);
            const center = new THREE.Vector3();
            box.getCenter(center);
            model.position.sub(center.multiplyScalar(scale));
            tiltGroup.add(model);
            loadedModel = model;
          },
          undefined,
          () => {
            // no file at modelUrl yet — placeholder visor stays visible
          }
        );
      })
      .catch(() => {
        // GLTFLoader unavailable in this environment — placeholder stays visible
      });

    const spinTween = gsap.to(spinGroup.rotation, {
      y: Math.PI * 2,
      duration: 40,
      repeat: -1,
      ease: "none",
    });
    const floatTween = gsap.to(tiltGroup.position, {
      y: 0.12,
      duration: 2.4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
    const tiltX = gsap.quickTo(tiltGroup.rotation, "x", { duration: 0.6, ease: "power3.out" });
    const tiltY = gsap.quickTo(tiltGroup.rotation, "y", { duration: 0.6, ease: "power3.out" });

    const handleMove = (e) => {
      const rect = mount.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      tiltX(-py * 0.5 + 0.1);
      tiltY(px * 0.7);
    };
    mount.addEventListener("mousemove", handleMove);

    let frameId;
    const renderLoop = () => {
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(renderLoop);
    };
    renderLoop();

    const handleResize = () => {
      width = mount.clientWidth;
      height = mount.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);
      mount.removeEventListener("mousemove", handleMove);
      spinTween.kill();
      floatTween.kill();
      lensGeo.dispose();
      lensMat.dispose();
      bandGeo.dispose();
      bandMat.dispose();
      armGeo.dispose();
      armMat.dispose();
      if (loadedModel) {
        loadedModel.traverse((child) => {
          if (child.isMesh) {
            child.geometry?.dispose();
            if (Array.isArray(child.material)) child.material.forEach((m) => m.dispose());
            else child.material?.dispose();
          }
        });
      }
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, [modelUrl]);

  return <div ref={mountRef} className="absolute inset-0" />;
}

/* ---------------- Feature card ---------------- */
function FeatureCard({ eyebrow, title, text, visual, video }) {
  return (
    <div className="group relative rounded-3xl border border-white/10 bg-white/[0.03] p-7 overflow-hidden transition-all duration-500 hover:border-white/25 hover:bg-white/[0.05]">
      <div className="absolute -inset-24 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{ background: "radial-gradient(circle at 30% 20%, rgba(0,113,227,0.10), transparent 60%)" }} />
      <div className="relative h-36 mb-6 rounded-2xl overflow-hidden border border-white/10 flex items-center justify-center"
        style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.01))" }}>
        {/* If a "video" prop is passed, it plays here instead of the SVG icon below */}
        {video ? (
          <video className="absolute inset-0 w-full h-full object-cover" src={video} autoPlay muted loop playsInline />
        ) : (
          visual
        )}
      </div>
      <span className="font-mono text-[11px] tracking-[0.2em] text-[#0071E3]/80">{eyebrow}</span>
      <h3 className="mt-2 text-xl font-bold text-white">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-7 text-white/55">{text}</p>
    </div>
  );
}

/* tiny abstract SVG visuals for feature cards (no branded imagery) */
const VisualOrbit = () => (
  <svg viewBox="0 0 100 100" className="w-20 h-20">
    <circle cx="50" cy="50" r="34" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
    <circle cx="50" cy="50" r="20" fill="none" stroke="rgba(0,113,227,0.4)" strokeWidth="1" />
    <circle cx="50" cy="16" r="4" fill="#0071E3" className="vp-spin-slow" style={{ transformOrigin: "50px 50px" }} />
    <circle cx="84" cy="50" r="2.5" fill="#F0C48A" className="vp-spin-med" style={{ transformOrigin: "50px 50px" }} />
  </svg>
);
const VisualLayers = () => (
  <svg viewBox="0 0 100 100" className="w-24 h-16">
    <rect x="20" y="46" width="60" height="34" rx="8" fill="rgba(240,196,138,0.12)" stroke="rgba(240,196,138,0.4)" />
    <rect x="14" y="30" width="60" height="34" rx="8" fill="rgba(155,140,255,0.12)" stroke="rgba(155,140,255,0.4)" />
    <rect x="26" y="16" width="60" height="34" rx="8" fill="rgba(0,113,227,0.14)" stroke="rgba(0,113,227,0.45)" />
  </svg>
);
const VisualEye = () => (
  <svg viewBox="0 0 100 60" className="w-24 h-14">
    <path d="M5 30 Q50 -5 95 30 Q50 65 5 30 Z" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
    <circle cx="50" cy="30" r="12" fill="rgba(0,113,227,0.18)" stroke="#0071E3" strokeWidth="1.2" />
    <circle cx="50" cy="30" r="4" fill="#0071E3" />
  </svg>
);
const VisualWave = () => (
  <svg viewBox="0 0 100 50" className="w-24 h-12">
    {[0, 1, 2, 3, 4, 5, 6].map((i) => (
      <rect key={i} x={8 + i * 13} y={25 - (i % 3) * 8} width="6" height={10 + (i % 3) * 16} rx="3"
        fill={i % 2 === 0 ? "rgba(0,113,227,0.55)" : "rgba(240,196,138,0.5)"} />
    ))}
  </svg>
);

/* ---------------- Spec row ---------------- */
function Spec({ num, unit, label }) {
  return (
    <div className="flex-1 min-w-[150px] border-t border-white/10 pt-5">
      <div className="flex items-baseline gap-1">
        <span className="font-mono text-4xl md:text-5xl font-medium text-white">{num}</span>
        <span className="font-mono text-lg text-[#0071E3]">{unit}</span>
      </div>
      <p className="mt-2 text-sm text-white/50 leading-6">{label}</p>
    </div>
  );
}

export default function VisionProLanding() {
  const heroRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(".hero-eyebrow", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.7 })
        .fromTo(".hero-line", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.9, stagger: 0.12 }, "-=0.3")
        .fromTo(".hero-sub", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 }, "-=0.4")
        .fromTo(".hero-cta", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 }, "-=0.5");
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <div
      dir="ltr"
      className="min-h-screen w-full text-[#F5F5F7]"
      style={{ background: "#050507" }}
    >
      <style>{`
        .vp-orb { position:absolute; border-radius:9999px; filter: blur(70px); opacity:0.55; }
        .vp-orb-a { width:520px; height:520px; top:-140px; right:-80px; background: radial-gradient(circle, rgba(0,113,227,0.35), transparent 70%); animation: vpFloatA 18s ease-in-out infinite; }
        .vp-orb-b { width:420px; height:420px; bottom:-120px; left:-100px; background: radial-gradient(circle, rgba(155,140,255,0.28), transparent 70%); animation: vpFloatB 22s ease-in-out infinite; }
        .vp-orb-c { width:360px; height:360px; top:30%; left:35%; background: radial-gradient(circle, rgba(240,196,138,0.22), transparent 70%); animation: vpFloatC 26s ease-in-out infinite; }
        @keyframes vpFloatA { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(-40px, 50px) scale(1.08); } }
        @keyframes vpFloatB { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(50px, -30px) scale(1.05); } }
        @keyframes vpFloatC { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(-25px, -40px) scale(0.95); } }
        .vp-grain { position:absolute; inset:0; opacity:0.03; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"); }

        .vp-spin-slow { animation: vpSpin 14s linear infinite; }
        .vp-spin-med { animation: vpSpin 9s linear infinite reverse; }
        @keyframes vpSpin { from { transform: rotate(0deg) translateX(0) rotate(0deg); } to { transform: rotate(360deg) translateX(0) rotate(-360deg); } }

        @media (prefers-reduced-motion: reduce) {
          .vp-orb, .vp-spin-slow, .vp-spin-med { animation: none !important; }
        }
      `}</style>

      {/* HERO */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <AmbientField />
        <div ref={heroRef} className="relative z-10 text-center px-6 max-w-4xl">
          <p className="hero-eyebrow font-mono text-xs md:text-sm tracking-[0.3em] text-[#0071E3]/80 mb-6">
            APPLE VISION PRO — Spatial Computing
          </p>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black leading-[1.2] md:leading-[1.15]">
            <span className="hero-line inline-block">The first</span>{" "}
            <span className="hero-line inline-block">spatial</span>{" "}
            <span className="hero-line inline-block">computer</span>
            <br />
            <span className="hero-line inline-block" style={{ color: "#0071E3" }}>in the world</span>
          </h1>
          <p className="hero-sub mt-7 text-base md:text-lg text-white/55 max-w-xl mx-auto leading-8">
            Your digital content blends into your physical space, controlled with nothing but your eyes, hands, and voice.
          </p>
          <div className="hero-cta mt-10 flex items-center justify-center gap-4">
            <button className="px-7 py-3 rounded-full bg-white text-black text-sm font-medium hover:bg-[#0071E3] transition-colors duration-300">
              Order Now
            </button>
            <button className="px-7 py-3 rounded-full border border-white/25 text-white/85 text-sm hover:bg-white/10 transition-colors duration-300">
              Watch the Film
            </button>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/35 z-10">
          <span className="text-[11px] font-mono">Scroll to Explore</span>
          <div className="w-[1px] h-10 bg-gradient-to-b from-white/40 to-transparent" />
        </div>
      </section>

      {/* SIGNATURE / SPATIAL STAGE */}
      <section id="stage" className="relative py-28 md:py-36 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-14 items-center">
          <Reveal>
            <span className="font-mono text-xs tracking-[0.25em] text-[#F0C48A]/80">Spatial Glass</span>
            <h2
              className="mt-4 text-3xl md:text-5xl font-bold leading-[1.3]"
            >
              Your display,
              <br />
              without limits.
            </h2>
            <p className="mt-6 text-white/55 leading-8 max-w-md">
              Apps are no longer locked in a box. Every window hangs exactly where you place it,
              at the depth and size you choose. Move your cursor over the scene beside it
              to feel the depth for yourself.
            </p>
            <ul className="mt-8 space-y-3 text-sm text-white/50">
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0071E3]" /> Unlimited workspace around you
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F0C48A]" /> Controlled by your eyes and hands, no controllers
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#9B8CFF]" /> Real depth, not just a flat layout
              </li>
            </ul>
          </Reveal>
          <Reveal delay={150}>
            <SpatialStage />
          </Reveal>
        </div>

        <Reveal delay={250} className="max-w-6xl mx-auto mt-16">
          <div className="relative w-full h-[380px] md:h-[460px] rounded-3xl border border-white/10 overflow-hidden bg-white/[0.02]">
            <Model3D modelUrl="/models/vision-pro/source/ARcode.glb" />
            <div className="absolute bottom-5 inset-x-0 text-center pointer-events-none">
              <span className="font-mono text-[11px] tracking-[0.2em] text-white/40">
                MOVE YOUR CURSOR TO ROTATE
              </span>
            </div>
          </div>
        </Reveal>
      </section>

      {/* FEATURES */}
      <section id="features" className="relative py-28 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <span className="font-mono text-xs tracking-[0.25em] text-[#0071E3]/80">Use Cases</span>
            <h2 className="mt-4 text-3xl md:text-4xl font-bold">
              Experiences from another world
            </h2>
          </Reveal>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Reveal delay={0}>
              <FeatureCard
                eyebrow="ENVIRONMENTS"
                title="Immersive Environments"
                text="Turn your room into any view you like, from a quiet desert to a mountain peak, without leaving your seat."
                visual={<VisualOrbit />}
              />
            </Reveal>
            <Reveal delay={100}>
              <FeatureCard
                eyebrow="SPATIAL VIDEO"
                title="Spatial Video"
                text="Capture your moments with real depth, and relive them as if you're standing right there again."
                video="/videos/spatial-video-card.mp4"
                visual={<VisualLayers />}
              />
            </Reveal>
            <Reveal delay={200}>
              <FeatureCard
                eyebrow="EYESIGHT"
                title="Connection Without Barriers"
                text="Your eyes stay visible to people around you, so no one ever feels like you're checked out of the moment."
                visual={<VisualEye />}
              />
            </Reveal>
            <Reveal delay={300}>
              <FeatureCard
                eyebrow="SPATIAL AUDIO"
                title="Sound That Surrounds You"
                text="Every sound comes from its natural place in the room, shifting as you move your head."
                visual={<VisualWave />}
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* SPECS */}
      <section id="specs" className="relative py-28 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <span className="font-mono text-xs tracking-[0.25em] text-[#F0C48A]/80">The Details That Matter</span>
            <h2 className="mt-4 text-3xl md:text-4xl font-bold">
              Numbers, Not Just for Show
            </h2>
          </Reveal>
          <Reveal delay={150}>
            <div className="mt-12 flex flex-wrap gap-x-10 gap-y-8">
              <Spec num="23" unit="million pixels" label="Resolution that beats a 4K screen, in each eye" />
              <Spec num="R1" unit="chip" label="Processes sensor data in 12 milliseconds" />
              <Spec num="M2" unit="chip" label="Serious performance in a device you wear" />
              <Spec num="2" unit="hrs+" label="Battery life for everyday use" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA / FOOTER */}
      <section className="relative py-28 px-6 border-t border-white/5">
        <Reveal>
          <div className="max-w-4xl mx-auto text-center rounded-3xl border border-white/10 bg-white/[0.03] px-8 py-16 relative overflow-hidden">
            <div
              className="absolute -inset-32 opacity-70 pointer-events-none"
              style={{ background: "radial-gradient(circle at 50% 0%, rgba(0,113,227,0.12), transparent 60%)" }}
            />
            <h2 className="relative text-3xl md:text-4xl font-bold">
              Ready to step into the space?
            </h2>
            <p className="relative mt-4 text-white/55 max-w-md mx-auto">
              Try it at your nearest Apple Store, or order now and have it delivered to your door.
            </p>
            <button className="relative mt-8 px-8 py-3 rounded-full bg-white text-black text-sm font-medium hover:bg-[#0071E3] transition-colors duration-300">
              Order Vision Pro
            </button>
          </div>
        </Reveal>
        <div className="max-w-6xl mx-auto mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-white/35 text-xs font-mono">
          <span>© Vision Pro Concept Page</span>
          <span>Designed in the spirit of spatial reality</span>
        </div>
      </section>
    </div>
  );
}