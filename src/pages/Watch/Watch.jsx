import React, { useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import Footer from '../../components/Footer';
import './watch.css';

// Assets - Videos
import ultraVideo from '../../assets/watch/ultra/main.MP4';
import s10Video1 from '../../assets/watch/se10/725D8B39-E087-42D6-8EA5-DC271F791A2E.mp4';
import s10Video2 from '../../assets/watch/se10/544F026F-1DDF-4933-BFD9-F076A6C31504.mp4';

// Assets - Ultra Images
import c1 from '../../assets/watch/ultra/c-1.JPG';
import c2 from '../../assets/watch/ultra/c-2.JPG';
import c3 from '../../assets/watch/ultra/c-3.JPG';
import c4 from '../../assets/watch/ultra/c-4.JPG';
import ultraHero from '../../assets/watch/ultra/main2.JPG';
import ultraWrist1 from '../../assets/watch/ultra/IMG_0244.JPG';
import ultraWrist2 from '../../assets/watch/ultra/IMG_0245.JPG';
import ultraWrist3 from '../../assets/watch/ultra/IMG_0246.JPG';

// Assets - Series 10 Images
import s10Wrist1 from '../../assets/watch/se10/IMG_0252.JPG';
import s10Wrist2 from '../../assets/watch/se10/IMG_0257.JPG';
import s10Wrist3 from '../../assets/watch/se10/IMG_0260.JPG';

// Assets - General Images
import healthImg from '../../assets/images/watch/health.jpg';
import fitnessImg from '../../assets/images/watch/fitness.jpg';
import bandsImg from '../../assets/images/watch/bands.jpg';
import underwaterImg from '../../assets/images/watch/underwater.jpg';

/* ── Framer Motion Variants ── */
const fadeUp = {
  hidden: { opacity: 0, y: 35 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const fadeScale = {
  hidden: { opacity: 0, scale: 0.94, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const slideLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const slideRight = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const tableRowVariant = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export default function Watch() {
  const [activeTab, setActiveTab] = useState('ultra2');
  const [activeBand, setActiveBand] = useState(0);

  const { scrollY } = useScroll();
  const heroTextY = useTransform(scrollY, [0, 400], [0, 80]);
  const heroTextOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  const bands = [
    { name: 'Alpine Loop - Indigo', img: c1 },
    { name: 'Trail Loop - Green/Grey', img: c2 },
    { name: 'Ocean Band - Orange', img: c3 },
    { name: 'Alpine Loop - Olive', img: c4 },
  ];

  const ultraGallery = [
    { img: ultraWrist1, title: 'Extreme Climate', desc: 'Tested on frozen summits and scorching deserts.' },
    { img: ultraWrist2, title: 'Premium Build', desc: 'Buttons designed for heavy gloves and wet hands.' },
    { img: ultraWrist3, title: 'Trail-Tested', desc: 'Titanium loops that hold under serious force.' },
  ];

  const comparisonRows = [
    { name: 'Case size', u2: '49mm', s10: '46 / 42mm', se: '44 / 40mm' },
    { name: 'Display', u2: '3000 nits OLED', s10: '2000 nits Wide-Angle', se: '1000 nits OLED' },
    { name: 'Material', u2: 'Titanium', s10: 'Titanium / Aluminium', se: 'Aluminium' },
    { name: 'Sleep Apnea', u2: '✓', s10: '✓', se: '✗' },
    { name: 'ECG + SpO₂', u2: '✓', s10: '✓', se: '✗' },
    { name: 'Temperature', u2: '✓', s10: '✓', se: '✗' },
    { name: 'Water', u2: '100m Dive', s10: '50m Swim', se: '50m Swim' },
    { name: 'GPS', u2: 'Dual-Frequency', s10: 'L1', se: 'L1' },
    { name: 'Action Button', u2: '✓', s10: '✗', se: '✗' },
    { name: 'Fast Charge', u2: '✓', s10: '✓', se: '✗' },
    { name: 'Battery', u2: '36h (72h LP)', s10: '18h (36h LP)', se: '18h' },
  ];

  return (
    <div className="watch-root">

      {/* ═══════ 1. HERO ═══════ */}
      <section className="watch-hero">
        <div className="watch-hero__bg">
          <video src={ultraVideo} autoPlay loop muted playsInline className="watch-hero__video" />
          <div className="watch-hero__overlay" />
        </div>

        <motion.div
          style={{ y: heroTextY, opacity: heroTextOpacity }}
          className="watch-hero__content"
        >
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="watch-hero__tag"
          >
            Apple Watch Ultra 2 & Series 10
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="watch-hero__title"
          >
            Thinstant Classic.<br />Ruggedly Refined.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="watch-hero__sub"
          >
            The most capable outdoor companion meets the thinnest everyday health powerhouse.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.45 }}
            className="watch-hero__btns"
          >
            <a href="#compare" className="watch-btn-solid">Compare Models</a>
            <a href="#showcase" className="watch-btn-outline">Learn More</a>
          </motion.div>
        </motion.div>
      </section>

      {/* ═══════ 2. TABS (With sliding LayoutId animation) ═══════ */}
      <nav id="showcase" className="watch-tabs">
        <div className="watch-tabs__inner">
          {['ultra2', 'series10'].map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`watch-tabs__btn ${
                  isActive 
                    ? (tab === 'ultra2' ? 'watch-tabs__btn--active-u2' : 'watch-tabs__btn--active-s10') 
                    : ''
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeWatchTab"
                    className={`watch-tabs__pill ${
                      tab === 'ultra2' ? 'watch-tabs__pill--u2' : 'watch-tabs__pill--s10'
                    }`}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span style={{ position: 'relative', zIndex: 2 }}>
                  {tab === 'ultra2' ? 'Ultra 2' : 'Series 10'}
                </span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* ═══════ 3. CONTENT ═══════ */}
      <AnimatePresence mode="wait">
        {activeTab === 'ultra2' ? (
          <motion.div
            key="u2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            {/* ── U2 Intro ── */}
            <section className="watch-sect watch-sect--lg">
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                className="watch-center"
              >
                <motion.span variants={fadeUp} custom={0} className="watch-eyebrow watch-eyebrow--orange">Adventure & Endurance</motion.span>
                <motion.h2 variants={fadeUp} custom={1} className="watch-heading watch-heading--xl watch-gradient-u2">Apple Watch Ultra 2</motion.h2>
                <motion.p variants={fadeUp} custom={2} className="watch-body watch-body--lg">
                  Forged from aerospace-grade titanium with dual-frequency GPS, a stunning 3000-nit display, and specialised bands. Built for extreme climates, deep dives, and rugged terrain.
                </motion.p>
              </motion.div>
            </section>

            {/* ── U2 Details ── */}
            <section className="watch-sect">
              <div className="watch-wrap">
                <div className="watch-grid watch-grid--2 watch-grid--gap-md watch-grid--center">
                  <motion.div
                    variants={slideLeft}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    className="watch-stack watch-stack--md"
                  >
                    <h3 className="watch-heading watch-heading--lg">Designed for athletes.<br />Built to last.</h3>
                    <p className="watch-body">
                      A raised titanium bezel protects the flat sapphire crystal. The Action Button gives instant physical control over key functions — no screen needed.
                    </p>
                    <motion.div 
                      variants={staggerContainer}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      className="watch-specs-row"
                    >
                      {[
                        { val: '49mm', label: 'Titanium Case' },
                        { val: '36 hrs', label: 'Battery Life' },
                        { val: '3000', label: 'Nits Brightness' },
                        { val: '100m', label: 'Water Resist.' },
                      ].map((s, i) => (
                        <motion.div
                          key={i}
                          variants={fadeUp}
                          custom={i}
                          className="watch-spec-pill"
                        >
                          <span className="watch-spec-pill__val">{s.val}</span>
                          <span className="watch-spec-pill__label">{s.label}</span>
                        </motion.div>
                      ))}
                    </motion.div>
                  </motion.div>

                  <motion.div
                    variants={slideRight}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    className="watch-img-card watch-img-card--square"
                  >
                    <img src={ultraHero} alt="Apple Watch Ultra 2" />
                  </motion.div>
                </div>
              </div>
            </section>

            {/* ── U2 Band Picker ── */}
            <section className="watch-sect watch-sect--alt">
              <div className="watch-wrap">
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  className="watch-center watch-center--mb"
                >
                  <motion.span variants={fadeUp} className="watch-eyebrow">Straps</motion.span>
                  <motion.h3 variants={fadeUp} custom={1} className="watch-heading watch-heading--lg">Choose Your Style</motion.h3>
                </motion.div>

                <div className="watch-grid watch-grid--2 watch-grid--gap-md watch-grid--center">
                  {/* Preview */}
                  <div className="watch-band-preview">
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.img
                        key={activeBand}
                        initial={{ opacity: 0, x: 40, scale: 0.92 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: -40, scale: 0.92 }}
                        transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                        src={bands[activeBand].img}
                        alt={bands[activeBand].name}
                        className="watch-band-preview__img"
                      />
                    </AnimatePresence>
                    <span className="watch-band-preview__label">{bands[activeBand].name}</span>
                  </div>

                  {/* Picker */}
                  <motion.div 
                    variants={slideRight}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    className="watch-stack watch-stack--sm"
                  >
                    <h4 className="watch-heading watch-heading--sm">Three specialised bands.<br/>Built for adventure.</h4>
                    <p className="watch-body watch-body--sm">
                      Choose the perfect loop for trails, dives, or runs. Swap in seconds.
                    </p>
                    <div className="watch-band-list">
                      {bands.map((b, i) => (
                        <button
                          key={i}
                          onClick={() => setActiveBand(i)}
                          className={`watch-band-btn ${activeBand === i ? 'watch-band-btn--active' : ''}`}
                        >
                          <img src={b.img} alt="" className="watch-band-btn__thumb" />
                          <span className="watch-band-btn__name">{b.name}</span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>
            </section>

            {/* ── U2 Gallery ── */}
            <section className="watch-sect">
              <div className="watch-wrap">
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  className="watch-center watch-center--mb"
                >
                  <motion.span variants={fadeUp} className="watch-eyebrow">In Action</motion.span>
                  <motion.h3 variants={fadeUp} custom={1} className="watch-heading watch-heading--lg">Built For the Wild</motion.h3>
                </motion.div>

                <motion.div 
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.15 }}
                  className="watch-grid watch-grid--3 watch-grid--gap-sm"
                >
                  {ultraGallery.map((item, i) => (
                    <motion.div
                      key={i}
                      variants={fadeScale}
                      custom={i}
                      className="watch-card"
                    >
                      <div className="watch-card__img">
                        <img src={item.img} alt={item.title} />
                      </div>
                      <div className="watch-card__body">
                        <h4 className="watch-card__title">{item.title}</h4>
                        <p className="watch-card__desc">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </section>

            {/* ── U2 Dive Block ── */}
            <motion.section
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 1 }}
              className="watch-fullbleed"
            >
              <img src={underwaterImg} alt="Underwater" className="watch-fullbleed__img" />
              <div className="watch-fullbleed__overlay" />
              <div className="watch-fullbleed__content">
                <span className="watch-eyebrow watch-eyebrow--cyan">Dive Ready</span>
                <h3 className="watch-heading watch-heading--xl watch-heading--white">Water resistant<br />up to 100 metres.</h3>
                <p className="watch-body watch-body--light">
                  Integrated depth gauge with the Oceanic+ app — dive planning, decompression tracking, and real-time depth warnings.
                </p>
              </div>
            </motion.section>
          </motion.div>
        ) : (
          <motion.div
            key="s10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            {/* ── S10 Intro ── */}
            <section className="watch-sect watch-sect--lg">
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                className="watch-center"
              >
                <motion.span variants={fadeUp} custom={0} className="watch-eyebrow watch-eyebrow--blue">Sleek & Advanced</motion.span>
                <motion.h2 variants={fadeUp} custom={1} className="watch-heading watch-heading--xl watch-gradient-s10">Apple Watch Series 10</motion.h2>
                <motion.p variants={fadeUp} custom={2} className="watch-body watch-body--lg">
                  Our thinnest display ever. Wide-angle OLED always-on. Sleep apnea detection. 80% charged in just 30 minutes.
                </motion.p>
              </motion.div>
            </section>

            {/* ── S10 Videos ── */}
            <section className="watch-sect">
              <div className="watch-wrap">
                <motion.div 
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.15 }}
                  className="watch-grid watch-grid--2 watch-grid--gap-sm"
                >
                  {[
                    { video: s10Video1, tag: 'Wide-Angle OLED', title: 'Thinnest Display Ever.', desc: 'Up to 40% brighter at angles. Curves elegantly over the bezel edge.' },
                    { video: s10Video2, tag: 'Fast Charging', title: '80% In 30 Minutes.', desc: 'Redesigned coil. 15 minutes gives 8 hours of use.' },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      variants={fadeScale}
                      custom={i}
                      className="watch-video-card"
                    >
                      <div className="watch-video-card__media">
                        <video src={item.video} autoPlay loop muted playsInline />
                      </div>
                      <div className="watch-video-card__body">
                        <span className="watch-eyebrow watch-eyebrow--blue">{item.tag}</span>
                        <h4 className="watch-heading watch-heading--sm">{item.title}</h4>
                        <p className="watch-body watch-body--sm">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </section>

            {/* ── S10 Metrics ── */}
            <section className="watch-sect">
              <div className="watch-wrap">
                <motion.div 
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  className="watch-grid watch-grid--3 watch-grid--gap-sm"
                >
                  {[
                    { val: '9.7mm', label: 'Thin Profile' },
                    { val: '2000', label: 'Nits Brightness' },
                    { val: '80%', label: 'Charge in 30 min' },
                  ].map((s, i) => (
                    <motion.div
                      key={i}
                      variants={fadeUp}
                      custom={i}
                      className="watch-metric"
                    >
                      <span className="watch-metric__val">{s.val}</span>
                      <span className="watch-metric__label">{s.label}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </section>

            {/* ── S10 Image Grid ── */}
            <section className="watch-sect">
              <div className="watch-wrap">
                <motion.div 
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.15 }}
                  className="watch-grid watch-grid--2 watch-grid--gap-sm"
                >
                  {[
                    { img: s10Wrist1, label: 'Jet Black Aluminium' },
                    { img: bandsImg, label: 'Anodized Finishes' },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      variants={fadeScale}
                      custom={i}
                      className="watch-img-card watch-img-card--wide"
                    >
                      <img src={item.img} alt={item.label} />
                      <span className="watch-img-card__badge">{item.label}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </section>

            {/* ── S10 Health ── */}
            <section className="watch-sect">
              <div className="watch-wrap">
                <div className="watch-grid watch-grid--2 watch-grid--gap-md watch-grid--center">
                  <motion.div 
                    variants={slideLeft} 
                    initial="hidden" 
                    whileInView="visible" 
                    viewport={{ once: true, amount: 0.3 }}
                    className="watch-img-card watch-img-card--landscape"
                  >
                    <img src={healthImg} alt="Health tracking" />
                  </motion.div>
                  <motion.div 
                    variants={slideRight} 
                    initial="hidden" 
                    whileInView="visible" 
                    viewport={{ once: true, amount: 0.3 }}
                    className="watch-stack watch-stack--md"
                  >
                    <span className="watch-eyebrow watch-eyebrow--blue">Health First</span>
                    <h3 className="watch-heading watch-heading--lg">Your health, simplified.</h3>
                    <p className="watch-body">
                      Blood oxygen, ECG, abnormal rhythm warnings, and FDA-approved sleep apnea detection — all on your wrist, stored securely.
                    </p>
                  </motion.div>
                </div>
              </div>
            </section>

            {/* ── S10 Fitness ── */}
            <section className="watch-sect">
              <div className="watch-wrap">
                <div className="watch-grid watch-grid--2 watch-grid--gap-md watch-grid--center watch-grid--reverse">
                  <motion.div 
                    variants={slideRight} 
                    initial="hidden" 
                    whileInView="visible" 
                    viewport={{ once: true, amount: 0.3 }}
                    className="watch-img-card watch-img-card--landscape"
                  >
                    <img src={fitnessImg} alt="Fitness tracking" />
                  </motion.div>
                  <motion.div 
                    variants={slideLeft} 
                    initial="hidden" 
                    whileInView="visible" 
                    viewport={{ once: true, amount: 0.3 }}
                    className="watch-stack watch-stack--md"
                  >
                    <span className="watch-eyebrow watch-eyebrow--blue">Fitness</span>
                    <h3 className="watch-heading watch-heading--lg">Advanced workout algorithms.</h3>
                    <p className="watch-body">
                      Distance, training load, splits, elevation, calories — fully integrated with Apple Fitness+ for guided sessions.
                    </p>
                  </motion.div>
                </div>
              </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══════ 4. COMPARISON TABLE ═══════ */}
      <section id="compare" className="watch-sect watch-sect--alt watch-sect--lg">
        <div className="watch-wrap">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="watch-center watch-center--mb"
          >
            <motion.span variants={fadeUp} className="watch-eyebrow">Compare</motion.span>
            <motion.h2 variants={fadeUp} custom={1} className="watch-heading watch-heading--xl">Which Apple Watch<br />is right for you?</motion.h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.7 }}
            className="watch-table-wrap"
          >
            <table className="watch-table">
              <thead>
                <tr>
                  <th></th>
                  <th><span className="watch-table__model watch-table__model--u2">Ultra 2</span><span className="watch-table__price">$799</span></th>
                  <th><span className="watch-table__model watch-table__model--s10">Series 10</span><span className="watch-table__price">$399</span></th>
                  <th><span className="watch-table__model">SE</span><span className="watch-table__price">$249</span></th>
                </tr>
              </thead>
              <motion.tbody
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
              >
                {comparisonRows.map((r, i) => (
                  <motion.tr key={i} variants={tableRowVariant}>
                    <td className="watch-table__label">{r.name}</td>
                    <td className="watch-table__u2">{r.u2}</td>
                    <td className="watch-table__s10">{r.s10}</td>
                    <td className="watch-table__se">{r.se}</td>
                  </motion.tr>
                ))}
              </motion.tbody>
            </table>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
