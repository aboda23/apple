const fs = require('fs');

const content = `import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Lenis from 'lenis';
import Footer from '../../components/Footer';
import './watch.css';

// Assets
import heroImg from '../../assets/images/watch/hero.jpg';
import fitnessImg from '../../assets/images/watch/fitness.jpg';
import healthImg from '../../assets/images/watch/health.jpg';
import bandsImg from '../../assets/images/watch/bands.jpg';
import underwaterImg from '../../assets/images/watch/underwater.jpg';

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────────────────────────────
   SECTION: HERO
───────────────────────────────────────────────────────────────── */
function Hero() {
  const heroRef = useRef();
  const btnRef = useRef();

  useGSAP(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const title = new SplitType('.watch-hero-h1', { types: 'words,chars' });
    const sub   = new SplitType('.watch-hero-sub', { types: 'words' });
    if (!prefersReduced) {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.from('.watch-hero-tag', { opacity: 0, y: 20, duration: 0.7, delay: 0.3 })
        .from(title.chars,       { opacity: 0, y: 60, stagger: 0.02, duration: 0.7 }, '-=0.3')
        .from(sub.words,         { opacity: 0, y: 20, stagger: 0.04, duration: 0.6 }, '-=0.3')
        .from('.watch-hero-btn', { opacity: 0, y: 20, duration: 0.5 }, '-=0.2')
        .from('.watch-hero-img-wrap', { opacity: 0, scale: 0.95, duration: 1.2, ease: 'expo.out' }, '-=0.5');
    } else {
      gsap.set(['.watch-hero-tag', '.watch-hero-h1', '.watch-hero-sub', '.watch-hero-btn', '.watch-hero-img-wrap'], { opacity: 1 });
    }
  }, { scope: heroRef });

  const handleMouseMove = (e) => {
    const btn = btnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(btn, { x: x * 0.3, y: y * 0.3, duration: 0.4, ease: 'power2.out' });
  };
  const handleMouseLeave = () => {
    gsap.to(btnRef.current, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.5)' });
  };

  return (
    <section ref={heroRef} className="watch-hero">
      <div className="watch-hero-content">
        <p className="watch-hero-tag">Apple Watch Series 10</p>
        <h1 className="watch-hero-h1">Thinstant<br />Classic.</h1>
        <p className="watch-hero-sub">Our thinnest display. Fastest charging. Sleep apnea detection.</p>
        <div className="watch-hero-btn-wrap">
          <button ref={btnRef} className="watch-hero-btn" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
            Shop Now
          </button>
          <a href="#watch-features" className="watch-hero-link">Learn more ↓</a>
        </div>
      </div>
      <div className="watch-hero-img-wrap">
        <img src={heroImg} alt="Apple Watch Series 10" className="watch-hero-img" loading="eager" />
        <div className="watch-hero-img-overlay" />
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────
   SECTION: PINNED PRODUCT REVEAL
───────────────────────────────────────────────────────────────── */
const revealPanels = [
  { label: 'Display',     headline: 'Biggest display\\never on Apple Watch.', body: 'Up to 30% more screen area. Every pixel makes the experience richer, more immersive.', accent: '#30d158' },
  { label: 'Performance', headline: 'Always-on. Always fast.',                body: 'S10 chip. Twice the neural engine. Snappier, smarter, always connected.',              accent: '#2997ff' },
  { label: 'Health',      headline: 'Your wrist knows your heart.',           body: 'FDA-approved sleep apnea detection. ECG. Blood oxygen. All day, every day.',          accent: '#ff375f' },
  { label: 'Design',      headline: 'Titanium.\\nReimagined.',                body: 'Microsatined or polished finish. Anodized aluminum. Under 10mm thin.',                accent: '#bf5af2' },
];

function PinnedReveal() {
  const wrapRef   = useRef();
  const imgRef    = useRef();
  const panelRefs = useRef([]);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add('(min-width: 768px)', () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapRef.current,
          start: 'top top',
          end: \`+=\${revealPanels.length * 100}%\`,
          scrub: 1.2,
          pin: true,
          anticipatePin: 1,
          snap: { snapTo: 1 / (revealPanels.length - 1), duration: 0.4, ease: 'power2.inOut' },
        },
      });
      revealPanels.forEach((panel, i) => {
        const el = panelRefs.current[i];
        if (!el) return;
        tl.to(imgRef.current, { rotation: i * 22, scale: 1 + i * 0.05, filter: \`drop-shadow(0 0 \${20 + i * 10}px \${panel.accent}55)\`, duration: 1, ease: 'power2.inOut' })
          .fromTo(el, { opacity: 0, x: 60 }, { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out' }, '<0.3')
          .to(el, { opacity: 0, x: -60, duration: 0.4, ease: 'power3.in' }, '>0.8');
      });
    });
    mm.add('(max-width: 767px)', () => {
      revealPanels.forEach((_, i) => {
        const el = panelRefs.current[i];
        if (!el) return;
        gsap.from(el, { scrollTrigger: { trigger: el, start: 'top 85%' }, opacity: 0, y: 40, duration: 0.7, ease: 'power3.out' });
      });
    });
    return () => mm.revert();
  }, { scope: wrapRef });

  return (
    <section ref={wrapRef} className="watch-pinned" aria-label="Product feature reveal">
      <div className="watch-pinned-inner">
        <div className="watch-pinned-img-col">
          <img ref={imgRef} src={heroImg} alt="Apple Watch rotating" className="watch-pinned-img" />
        </div>
        <div className="watch-pinned-text-col">
          {revealPanels.map((p, i) => (
            <div key={i} ref={el => panelRefs.current[i] = el} className="watch-pinned-panel" style={{ '--accent': p.accent }}>
              <span className="watch-pinned-label">{p.label}</span>
              <h2 className="watch-pinned-h2">{p.headline}</h2>
              <p className="watch-pinned-body">{p.body}</p>
              <span className="watch-pinned-indicator" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────
   SECTION: COLOR SELECTOR
───────────────────────────────────────────────────────────────── */
const watchColors = [
  { label: 'Midnight',  hex: '#1c1c1e', img: heroImg },
  { label: 'Starlight', hex: '#f2e8d5', img: bandsImg },
  { label: 'Blue',      hex: '#1b4f8c', img: healthImg },
  { label: 'Red',       hex: '#c0392b', img: underwaterImg },
  { label: 'Green',     hex: '#1a6b3a', img: fitnessImg },
];

function ColorSelector() {
  const [active, setActive]   = useState(0);
  const [fading, setFading]   = useState(false);
  const sectionRef = useRef();

  const changeColor = (i) => {
    if (i === active) return;
    setFading(true);
    setTimeout(() => { setActive(i); setFading(false); }, 300);
  };

  useGSAP(() => {
    gsap.from('.watch-color-heading', { scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }, opacity: 0, y: 60, duration: 1, ease: 'power3.out' });
    gsap.from('.watch-color-swiper',  { scrollTrigger: { trigger: sectionRef.current, start: 'top 65%' }, opacity: 0, y: 40, duration: 0.9, ease: 'power3.out', delay: 0.2 });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="watch-colors" id="watch-colors">
      <div className="watch-colors-inner">
        <p className="watch-color-eyebrow">Colours</p>
        <h2 className="watch-color-heading">Any style.<br />Any band.</h2>
        <div className="watch-color-preview-wrap">
          <img src={watchColors[active].img} alt={watchColors[active].label} className={\`watch-color-preview-img \${fading ? 'fading' : ''}\`} />
          <div className="watch-color-preview-swatch" style={{ background: watchColors[active].hex }} />
        </div>
        <div className="watch-color-swiper">
          <Swiper modules={[Navigation, Pagination]} spaceBetween={16} slidesPerView="auto" centeredSlides loop={false} pagination={{ clickable: true }}>
            {watchColors.map((c, i) => (
              <SwiperSlide key={i} style={{ width: 'auto' }}>
                <button className={\`watch-color-dot \${i === active ? 'active' : ''}\`} style={{ '--dot-color': c.hex }} onClick={() => changeColor(i)} aria-label={\`Select \${c.label}\`} title={c.label}>
                  <span className="watch-color-dot-ring" />
                </button>
                <p className="watch-color-dot-label">{c.label}</p>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <p className="watch-color-name">{watchColors[active].label}</p>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────
   SECTION: FEATURE GRID
───────────────────────────────────────────────────────────────── */
const featureCards = [
  { icon: '💤', title: 'Sleep Apnea Detection', desc: 'FDA-cleared. Monitors your breathing while you sleep.', accent: '#2997ff' },
  { icon: '❤️', title: 'Heart Rate & ECG',      desc: 'Continuous heart rate + on-demand ECG, right on your wrist.', accent: '#ff375f' },
  { icon: '⚡', title: '30% Faster Charging',   desc: 'Reach 80% in just 30 minutes — full charge before bed.', accent: '#30d158' },
  { icon: '💧', title: 'Water Resistant 50m',   desc: 'Swim, surf, shower — it keeps up with everything.', accent: '#0a84ff' },
  { icon: '🧭', title: 'Precision GPS',          desc: 'Dual-frequency GPS. Accurate routes, elevation, speed.', accent: '#bf5af2' },
  { icon: '🌡️', title: 'Temperature Sensing',    desc: 'Wrist temperature tracking across the day and night.', accent: '#ff9f0a' },
];

function FeatureCard({ card }) {
  const ref = useRef();
  const handleMouseMove = (e) => {
    const el = ref.current;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width  - 0.5;
    const y = (e.clientY - rect.top)  / rect.height - 0.5;
    gsap.to(el, { rotateY: x * 12, rotateX: -y * 12, duration: 0.4, ease: 'power2.out', transformPerspective: 800 });
  };
  const handleMouseLeave = () => {
    gsap.to(ref.current, { rotateY: 0, rotateX: 0, duration: 0.6, ease: 'elastic.out(1, 0.5)' });
  };
  return (
    <div ref={ref} className="watch-feat-card" style={{ '--card-accent': card.accent }} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      <span className="watch-feat-icon">{card.icon}</span>
      <h3 className="watch-feat-title">{card.title}</h3>
      <p className="watch-feat-desc">{card.desc}</p>
      <div className="watch-feat-accent-line" />
    </div>
  );
}

function FeatureGrid() {
  const ref = useRef();
  useGSAP(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) { gsap.set('.watch-feat-card', { opacity: 1 }); return; }
    gsap.from('.watch-feat-heading-wrap > *', { scrollTrigger: { trigger: ref.current, start: 'top 80%' }, opacity: 0, y: 50, stagger: 0.15, duration: 0.9, ease: 'power3.out' });
    gsap.from('.watch-feat-card', { scrollTrigger: { trigger: '.watch-feat-grid', start: 'top 80%' }, opacity: 0, y: 70, stagger: 0.1, duration: 0.8, ease: 'power3.out' });
  }, { scope: ref });
  return (
    <section ref={ref} id="watch-features" className="watch-features">
      <div className="watch-feat-heading-wrap">
        <p className="watch-feat-eyebrow">Capabilities</p>
        <h2 className="watch-feat-heading">Everything it does.<br/>Nothing it doesn't.</h2>
      </div>
      <div className="watch-feat-grid">
        {featureCards.map((c, i) => <FeatureCard key={i} card={c} />)}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────
   SECTION: FULL-BLEED SECTION
───────────────────────────────────────────────────────────────── */
function FullBleedSection({ img, alt, eyebrow, headline, body, flipped = false }) {
  const ref = useRef();
  useGSAP(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) { gsap.set(['.fbs-text-inner', '.fbs-img'], { opacity: 1 }); return; }
    gsap.fromTo(ref.current.querySelector('.fbs-img'), { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', scrollTrigger: { trigger: ref.current, start: 'top 75%' }, duration: 1.2, ease: 'power3.inOut' });
    const lines = new SplitType(ref.current.querySelectorAll('.fbs-text-h2'), { types: 'lines' });
    gsap.from(lines.lines, { scrollTrigger: { trigger: ref.current, start: 'top 70%' }, opacity: 0, y: '100%', stagger: 0.1, duration: 0.9, ease: 'power3.out' });
    gsap.from(ref.current.querySelectorAll('.fbs-body, .fbs-eyebrow'), { scrollTrigger: { trigger: ref.current, start: 'top 65%' }, opacity: 0, y: 30, stagger: 0.12, duration: 0.8, ease: 'power3.out', delay: 0.3 });
    return () => lines.revert();
  }, { scope: ref });
  return (
    <div ref={ref} className={\`watch-fbs \${flipped ? 'flipped' : ''}\`}>
      <div className="fbs-img-wrap">
        <img src={img} alt={alt} className="fbs-img" loading="lazy" />
        <div className="fbs-img-overlay" />
      </div>
      <div className="fbs-text-wrap">
        <div className="fbs-text-inner">
          <p className="fbs-eyebrow">{eyebrow}</p>
          <h2 className="fbs-text-h2">{headline}</h2>
          <p className="fbs-body">{body}</p>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   SECTION: MODEL SECTIONS (Ultra 2 / Series 10 / SE 2)
───────────────────────────────────────────────────────────────── */
const ULTRA2_COLORS   = [
  { label: 'Natural Titanium', hex: '#b0a99f', bg: '#1a1814' },
  { label: 'Black Titanium',   hex: '#2c2c2e', bg: '#0a0a0a' },
];
const SERIES10_COLORS = [
  { label: 'Jet Black',  hex: '#1c1c1e', bg: '#111' },
  { label: 'Silver',     hex: '#e2e2e2', bg: '#1a1a1a' },
  { label: 'Rose Gold',  hex: '#e8b4a0', bg: '#1a1210' },
  { label: 'Slate',      hex: '#5a5a5f', bg: '#111' },
  { label: 'Natural',    hex: '#c8c0b4', bg: '#181714' },
  { label: 'Gold',       hex: '#c9a96e', bg: '#16130a' },
];
const SE2_COLORS = [
  { label: 'Midnight',  hex: '#1c1c1e', bg: '#0a0a0a' },
  { label: 'Starlight', hex: '#f2e8d5', bg: '#181614' },
  { label: 'Silver',    hex: '#e0e0e0', bg: '#161616' },
];

function ColorStrip({ colors, active, onChange }) {
  return (
    <div className="ms-color-strip">
      <p className="ms-color-name">{colors[active].label}</p>
      <div className="ms-color-dots">
        {colors.map((c, i) => (
          <button key={i} className={\`ms-dot \${i === active ? 'active' : ''}\`} style={{ background: c.hex }} onClick={() => onChange(i)} aria-label={c.label} title={c.label} />
        ))}
      </div>
    </div>
  );
}

function Ultra2Section() {
  const [activeColor, setActiveColor] = useState(0);
  const ref = useRef();
  useGSAP(() => {
    const tl = gsap.timeline({ scrollTrigger: { trigger: ref.current, start: 'top 70%', once: true } });
    tl.from('.u2-eyebrow',         { opacity: 0, y: 20, duration: 0.6, ease: 'power3.out' })
      .from('.u2-title',           { opacity: 0, y: 50, duration: 0.9, ease: 'power3.out' }, '-=0.3')
      .from('.u2-sub',             { opacity: 0, y: 30, duration: 0.7, ease: 'power3.out' }, '-=0.4')
      .from('.u2-media',           { opacity: 0, scale: 0.96, duration: 1.2, ease: 'expo.out' }, '-=0.5')
      .from('.u2-specs-strip > *', { opacity: 0, y: 20, stagger: 0.08, duration: 0.6, ease: 'power3.out' }, '-=0.3')
      .from('.u2-color-strip',     { opacity: 0, y: 20, duration: 0.5, ease: 'power3.out' }, '-=0.2');
  }, { scope: ref });
  return (
    <section ref={ref} id="ultra2" className="ms-section" style={{ background: ULTRA2_COLORS[activeColor].bg }}>
      <div className="ms-header">
        <p className="u2-eyebrow ms-eyebrow">Apple Watch Ultra 2</p>
        <span className="ms-badge ms-badge--gold">Most Capable</span>
      </div>
      <h2 className="u2-title ms-title">Built for<br />the extreme.</h2>
      <p className="u2-sub ms-sub">The most rugged and capable Apple Watch. Designed for endurance athletes, divers and adventurers who never stop.</p>
      {/* ── MEDIA SLOT — replace placeholder with <img> or <video> when ready ── */}
      <div className="u2-media ms-media-wrap">
        <div className="ms-placeholder">
          <span className="ms-placeholder-label">Ultra 2 — Hero Image / Video</span>
          <span className="ms-placeholder-hint">public/watch/ultra2/hero.jpg</span>
        </div>
      </div>
      <div className="u2-specs-strip ms-specs-strip">
        {[{ k: 'Case', v: '49mm Titanium' }, { k: 'Display', v: '3000 nits LTPO OLED' }, { k: 'Battery', v: '36 hrs · 72 hrs LP' }, { k: 'Water', v: 'WR100m · Dive 40m' }, { k: 'GPS', v: 'Precision Dual-freq' }, { k: 'Price', v: 'From $799' }].map(({ k, v }) => (
          <div key={k} className="ms-spec-chip"><span className="ms-spec-k">{k}</span><span className="ms-spec-v">{v}</span></div>
        ))}
      </div>
      <div className="u2-color-strip">
        <ColorStrip colors={ULTRA2_COLORS} active={activeColor} onChange={setActiveColor} />
      </div>
      <div className="ms-features-row">
        {['Action Button', 'Emergency Siren', 'Cellular', 'Double Tap', 'Night Mode', 'Depth Gauge'].map(f => <span key={f} className="ms-feat-badge">{f}</span>)}
      </div>
      <div className="ms-cta-row">
        <button className="ms-btn-primary" style={{ background: '#ff9f0a', color: '#000' }}>Buy Ultra 2</button>
        <button className="ms-btn-ghost">Learn more ↓</button>
      </div>
    </section>
  );
}

function Series10Section() {
  const [activeColor, setActiveColor] = useState(0);
  const ref = useRef();
  useGSAP(() => {
    const tl = gsap.timeline({ scrollTrigger: { trigger: ref.current, start: 'top 70%', once: true } });
    tl.from('.s10-eyebrow',          { opacity: 0, y: 20, duration: 0.6, ease: 'power3.out' })
      .from('.s10-title',            { opacity: 0, y: 50, duration: 0.9, ease: 'power3.out' }, '-=0.3')
      .from('.s10-sub',              { opacity: 0, y: 30, duration: 0.7, ease: 'power3.out' }, '-=0.4')
      .from('.s10-media-left',       { opacity: 0, x: -60, duration: 1.1, ease: 'power3.out' }, '-=0.5')
      .from('.s10-media-right',      { opacity: 0, x: 60, duration: 1.1, ease: 'power3.out' }, '<')
      .from('.s10-specs-strip > *',  { opacity: 0, y: 20, stagger: 0.08, duration: 0.6, ease: 'power3.out' }, '-=0.3')
      .from('.s10-color-strip',      { opacity: 0, y: 20, duration: 0.5, ease: 'power3.out' }, '-=0.2');
  }, { scope: ref });
  return (
    <section ref={ref} id="series10" className="ms-section ms-section--light-alt" style={{ background: SERIES10_COLORS[activeColor].bg }}>
      <div className="ms-header">
        <p className="s10-eyebrow ms-eyebrow">Apple Watch Series 10</p>
        <span className="ms-badge ms-badge--blue">Most Popular</span>
      </div>
      <h2 className="s10-title ms-title">Thinstant<br />Classic.</h2>
      <p className="s10-sub ms-sub">Our thinnest Apple Watch ever. Biggest display in Series history. The one most people love — for a reason.</p>
      {/* ── DUAL MEDIA — replace placeholders with real images ── */}
      <div className="ms-media-duo">
        <div className="s10-media-left ms-media-half">
          <div className="ms-placeholder"><span className="ms-placeholder-label">Series 10 — Main Image</span><span className="ms-placeholder-hint">public/watch/series10/hero.jpg</span></div>
        </div>
        <div className="s10-media-right ms-media-half">
          <div className="ms-placeholder"><span className="ms-placeholder-label">Series 10 — Colours Spread</span><span className="ms-placeholder-hint">public/watch/series10/colors.jpg</span></div>
        </div>
      </div>
      <div className="s10-specs-strip ms-specs-strip">
        {[{ k: 'Sizes', v: '42mm / 46mm' }, { k: 'Display', v: '2000 nits Wide-Angle OLED' }, { k: 'Battery', v: '18 hrs · Fast Charge' }, { k: 'Chip', v: 'Apple S10 SiP' }, { k: 'Water', v: 'WR50m · IP6X' }, { k: 'Price', v: 'From $399' }].map(({ k, v }) => (
          <div key={k} className="ms-spec-chip"><span className="ms-spec-k">{k}</span><span className="ms-spec-v">{v}</span></div>
        ))}
      </div>
      <div className="s10-color-strip">
        <ColorStrip colors={SERIES10_COLORS} active={activeColor} onChange={setActiveColor} />
      </div>
      <div className="ms-features-row">
        {['Thinnest ever', 'Always-On Display', 'ECG', 'Sleep Apnea', 'Double Tap', 'Siri on-device'].map(f => <span key={f} className="ms-feat-badge">{f}</span>)}
      </div>
      <div className="ms-cta-row">
        <button className="ms-btn-primary" style={{ background: '#2997ff' }}>Buy Series 10</button>
        <button className="ms-btn-ghost">Learn more ↓</button>
      </div>
    </section>
  );
}

function SE2Section() {
  const [activeColor, setActiveColor] = useState(0);
  const ref = useRef();
  useGSAP(() => {
    const tl = gsap.timeline({ scrollTrigger: { trigger: ref.current, start: 'top 70%', once: true } });
    tl.from('.se2-eyebrow',          { opacity: 0, y: 20, duration: 0.6, ease: 'power3.out' })
      .from('.se2-title',            { opacity: 0, y: 50, duration: 0.9, ease: 'power3.out' }, '-=0.3')
      .from('.se2-sub',              { opacity: 0, y: 30, duration: 0.7, ease: 'power3.out' }, '-=0.4')
      .from('.se2-media',            { opacity: 0, scale: 0.96, duration: 1.2, ease: 'expo.out' }, '-=0.5')
      .from('.se2-specs-strip > *',  { opacity: 0, y: 20, stagger: 0.08, duration: 0.6, ease: 'power3.out' }, '-=0.3')
      .from('.se2-color-strip',      { opacity: 0, y: 20, duration: 0.5, ease: 'power3.out' }, '-=0.2');
  }, { scope: ref });
  return (
    <section ref={ref} id="se2" className="ms-section" style={{ background: SE2_COLORS[activeColor].bg }}>
      <div className="ms-header">
        <p className="se2-eyebrow ms-eyebrow">Apple Watch SE</p>
        <span className="ms-badge ms-badge--green">Best Value</span>
      </div>
      <h2 className="se2-title ms-title">All you need.<br />Nothing you don't.</h2>
      <p className="se2-sub ms-sub">The essentials, refined. Everything that makes Apple Watch Apple Watch, at a price that makes it easy to say yes.</p>
      {/* ── MEDIA SLOT — replace placeholder with real image ── */}
      <div className="se2-media ms-media-wrap">
        <div className="ms-placeholder"><span className="ms-placeholder-label">SE 2 — Hero Image</span><span className="ms-placeholder-hint">public/watch/se2/hero.jpg</span></div>
      </div>
      <div className="se2-specs-strip ms-specs-strip">
        {[{ k: 'Sizes', v: '40mm / 44mm' }, { k: 'Display', v: 'Retina OLED' }, { k: 'Battery', v: '18 hrs' }, { k: 'Chip', v: 'Apple S8 SiP' }, { k: 'Water', v: 'WR50m' }, { k: 'Price', v: 'From $249' }].map(({ k, v }) => (
          <div key={k} className="ms-spec-chip"><span className="ms-spec-k">{k}</span><span className="ms-spec-v">{v}</span></div>
        ))}
      </div>
      <div className="se2-color-strip">
        <ColorStrip colors={SE2_COLORS} active={activeColor} onChange={setActiveColor} />
      </div>
      <div className="ms-features-row">
        {['Crash Detection', 'Fall Detection', 'Family Setup', 'Fitness Tracking', 'Sleep Tracking'].map(f => <span key={f} className="ms-feat-badge">{f}</span>)}
      </div>
      <p className="ms-not-included">✗ No Always-On Display &nbsp;·&nbsp; ✗ No ECG &nbsp;·&nbsp; ✗ No Blood Oxygen &nbsp;·&nbsp; ✗ No Temperature</p>
      <div className="ms-cta-row">
        <button className="ms-btn-primary" style={{ background: '#30d158' }}>Buy Watch SE</button>
        <button className="ms-btn-ghost">Learn more ↓</button>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────
   SECTION: SPECS TABLE
───────────────────────────────────────────────────────────────── */
const specRows = [
  { label: 'Case Size',          ultra2: '49mm',                        s10: '42mm / 46mm',                 se2: '40mm / 44mm' },
  { label: 'Display',            ultra2: 'LTPO OLED · Always-On',       s10: 'Wide-Angle OLED · Always-On', se2: 'Retina OLED' },
  { label: 'Brightness',         ultra2: 'Up to 3000 nits',             s10: 'Up to 2000 nits',             se2: 'Standard' },
  { label: 'Chip',               ultra2: 'Apple S9 SiP',                s10: 'Apple S10 SiP',               se2: 'Apple S8 SiP' },
  { label: 'Battery',            ultra2: '36 hrs · 72 hrs Low Power',   s10: '18 hrs · Fast Charge',        se2: '18 hrs' },
  { label: 'Water Resistance',   ultra2: 'WR100m · Dive 40m · IP6X',   s10: 'WR50m · IP6X',                se2: 'WR50m · IP6X' },
  { label: 'Material',           ultra2: 'Titanium',                    s10: 'Aluminum or Titanium',        se2: 'Aluminum' },
  { label: 'ECG',                ultra2: '✓', s10: '✓',  se2: '✗' },
  { label: 'Blood Oxygen',       ultra2: '✓', s10: '✓*', se2: '✗' },
  { label: 'Temperature',        ultra2: '✓', s10: '✓',  se2: '✗' },
  { label: 'Sleep Apnea',        ultra2: '✓', s10: '✓',  se2: '✗' },
  { label: 'GPS',                ultra2: 'Precision Dual-frequency',    s10: 'Dual-frequency L1 & L5',      se2: 'Built-in GPS' },
  { label: 'Always-On Display',  ultra2: '✓', s10: '✓',  se2: '✗' },
  { label: 'Double Tap',         ultra2: '✓', s10: '✓',  se2: '✗' },
  { label: 'Crash Detection',    ultra2: '✓', s10: '✓',  se2: '✓' },
  { label: 'Starting Price',     ultra2: 'From $799',                   s10: 'From $399',                   se2: 'From $249' },
];

function SpecsTable() {
  const ref = useRef();
  useGSAP(() => {
    gsap.from('.specs-row', { scrollTrigger: { trigger: ref.current, start: 'top 80%' }, opacity: 0, x: -20, stagger: 0.05, duration: 0.6, ease: 'power3.out' });
  }, { scope: ref });
  return (
    <section ref={ref} className="watch-specs" aria-label="Specs comparison">
      <div className="watch-specs-inner">
        <p className="watch-feat-eyebrow">Compare</p>
        <h2 className="watch-feat-heading" style={{ marginBottom: '3rem' }}>Which Apple Watch is right for you?</h2>
        <div className="specs-table-wrap">
          <table className="specs-table">
            <thead>
              <tr className="specs-header">
                <th></th>
                <th><span className="specs-th-label">Ultra 2</span><span className="specs-th-price">From $799</span></th>
                <th><span className="specs-th-label">Series 10</span><span className="specs-th-price">From $399</span></th>
                <th><span className="specs-th-label">SE 2</span><span className="specs-th-price">From $249</span></th>
              </tr>
            </thead>
            <tbody>
              {specRows.map((s, i) => (
                <tr key={i} className="specs-row">
                  <td className="specs-label">{s.label}</td>
                  <td className={s.ultra2 === '✓' ? 'specs-yes' : s.ultra2 === '✗' ? 'specs-no' : ''}>{s.ultra2}</td>
                  <td className={s.s10 === '✓' ? 'specs-yes' : s.s10 === '✗' ? 'specs-no' : ''}>{s.s10}</td>
                  <td className={s.se2 === '✓' ? 'specs-yes' : s.se2 === '✗' ? 'specs-no' : ''}>{s.se2}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="specs-footnote">* Blood oxygen app available in select countries. Features subject to regulatory approval.</p>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────
   SECTION: FINAL CTA
───────────────────────────────────────────────────────────────── */
function FinalCTA() {
  const ref = useRef();
  useGSAP(() => {
    const split = new SplitType('.final-cta-h2', { types: 'words' });
    gsap.from(split.words, { scrollTrigger: { trigger: ref.current, start: 'top 75%' }, opacity: 0, y: 80, stagger: 0.06, duration: 1, ease: 'power3.out' });
    gsap.from(['.final-cta-price', '.final-cta-btns'], { scrollTrigger: { trigger: ref.current, start: 'top 65%' }, opacity: 0, y: 40, stagger: 0.15, duration: 0.8, ease: 'power3.out', delay: 0.4 });
    gsap.from('.final-cta-img', { scrollTrigger: { trigger: ref.current, start: 'top 80%', scrub: 1.5 }, scale: 1.12, opacity: 0 });
    return () => split.revert();
  }, { scope: ref });
  return (
    <section ref={ref} className="watch-final-cta">
      <div className="final-cta-img-wrap">
        <img src={bandsImg} alt="Apple Watch bands" className="final-cta-img" loading="lazy" />
        <div className="final-cta-overlay" />
      </div>
      <div className="final-cta-content">
        <h2 className="final-cta-h2">Smarter.<br />Healthier.<br />Stronger.</h2>
        <p className="final-cta-price">From <strong>$249</strong> — a Watch for everyone.</p>
        <div className="final-cta-btns">
          <button className="watch-btn-primary">Shop Apple Watch</button>
          <button className="watch-btn-secondary">Compare all models</button>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────
   ROOT: WATCH PAGE
───────────────────────────────────────────────────────────────── */
export default function Watch() {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.2, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    const raf = (time) => { lenis.raf(time); requestAnimationFrame(raf); };
    const rafId = requestAnimationFrame(raf);
    lenis.on('scroll', ScrollTrigger.update);
    return () => { cancelAnimationFrame(rafId); lenis.destroy(); };
  }, []);

  return (
    <main className="watch-page">
      <Hero />
      <PinnedReveal />
      <ColorSelector />
      <FeatureGrid />
      <FullBleedSection img={healthImg} alt="Apple Watch health monitoring" eyebrow="Health" headline={"Know your heart.\\nIn a heartbeat."} body="Apple Watch Series 10 has advanced sensors that monitor your heart continuously — ECG, irregular rhythm notifications, and FDA-approved sleep apnea detection." />
      <FullBleedSection img={fitnessImg} alt="Apple Watch fitness tracking" eyebrow="Fitness" headline={"Every move\\ncounts."} body="Advanced workout metrics, automatic exercise detection, and all-day activity tracking make Apple Watch the ultimate fitness companion." flipped />
      <FullBleedSection img={underwaterImg} alt="Apple Watch underwater" eyebrow="Built for adventure" headline={"Go further\\nthan ever."} body="Water resistant to 50 metres. Whether you're swimming laps or surfing the coast — Apple Watch Ultra holds its own." />
      <Ultra2Section />
      <Series10Section />
      <SE2Section />
      <SpecsTable />
      <FinalCTA />
      <Footer />
    </main>
  );
}
`;

fs.writeFileSync('src/pages/Watch/Watch.jsx', content);
console.log('Written. Lines:', content.split('\n').length);
