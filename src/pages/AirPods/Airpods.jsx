import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Airpods.css';

import VideoHero      from './components/VideoHero';
import AirPodsHighlights from './components/AirPodsHighlights';
import AirPodsDesign  from './components/AirPodsDesign';
import AirPodsTech    from './components/AirPodsTech';
import AirPodsProSection from './components/AirPodsProSection';
import AirPodsMaxSection from './components/AirPodsMaxSection';
import CompareModels  from './components/CompareModels';
import Footer         from '../../components/Footer';

import { airpodsVideos } from './utils';

/* ── page-level fade variant ── */
const pageFade = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.38 } },
  exit:   { opacity: 0, transition: { duration: 0.25 } },
};

export default function Airpods() {
  const [activeTab, setActiveTab] = useState('pro');

  return (
    <main className="bg-black text-white w-full overflow-hidden">

      {/* ── 1. HERO (original video – untouched) ── */}
      <VideoHero videoSrc={airpodsVideos.sec} title="AirPods Pro" />

      {/* ── 2. STICKY TAB SWITCHER ── */}
      <nav className="airpods-tabs">
        <div className="airpods-tabs__inner">
          {[
            { id: 'pro', label: 'AirPods Pro' },
            { id: 'max', label: 'AirPods Max' },
          ].map(({ id, label }) => {
            const isActive = activeTab === id;
            return (
              <button
                key={id}
                id={`airpods-tab-${id}`}
                onClick={() => setActiveTab(id)}
                className={`airpods-tabs__btn ${
                  isActive
                    ? id === 'pro'
                      ? 'airpods-tabs__btn--active-pro'
                      : 'airpods-tabs__btn--active-max'
                    : ''
                }`}
              >
                {/* Framer Motion spring sliding pill */}
                {isActive && (
                  <motion.div
                    layoutId="activeAirpodsTab"
                    className={`airpods-tabs__pill ${
                      id === 'pro' ? 'airpods-tabs__pill--pro' : 'airpods-tabs__pill--max'
                    }`}
                    transition={{ type: 'spring', stiffness: 340, damping: 28 }}
                  />
                )}
                <span style={{ position: 'relative', zIndex: 2 }}>{label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* ── 3. CONTENT SECTIONS ── */}
      <AnimatePresence mode="wait">

        {activeTab === 'pro' && (
          <motion.div
            key="pro"
            variants={pageFade}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Highlights carousel – GSAP driven */}
            <AirPodsHighlights />

            {/* Design / explore block – GSAP driven */}
            <AirPodsDesign />

            {/* H2 chip / sensor tech */}
            <AirPodsTech />

            {/* ANC simulator + Heart Rate + Battery – Framer Motion + GSAP */}
            <AirPodsProSection />
          </motion.div>
        )}

        {activeTab === 'max' && (
          <motion.div
            key="max"
            variants={pageFade}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Full AirPods Max premium showcase */}
            <AirPodsMaxSection />
          </motion.div>
        )}

      </AnimatePresence>

      {/* ── 4. COMPARISON TABLE (always visible) ── */}
      <section className="border-t border-zinc-900">
        <CompareModels />
      </section>

      <Footer />
    </main>
  );
}
