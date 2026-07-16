import React, { useState, useEffect } from 'react';
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

const pageFade = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  exit:   { opacity: 0, y: -20, transition: { duration: 0.3 } },
};

export default function Airpods() {
  const [activeTab, setActiveTab] = useState('pro');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  return (
    <main className="bg-black text-white w-full overflow-hidden font-sans selection:bg-[#2997ff] selection:text-white">
      
      {/* ── 1. HERO ── */}
      <VideoHero 
        videoSrc={activeTab === 'pro' ? airpodsVideos.sec : airpodsVideos.max} 
        title={activeTab === 'pro' ? "AirPods Pro" : "AirPods Max"} 
      />

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
                {isActive && (
                  <motion.div
                    layoutId="activeAirpodsTab"
                    className={`airpods-tabs__pill ${
                      id === 'pro' ? 'airpods-tabs__pill--pro' : 'airpods-tabs__pill--max'
                    }`}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
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
          <motion.div key="pro" variants={pageFade} initial="hidden" animate="visible" exit="exit">
            <AirPodsHighlights />
            <AirPodsDesign />
            <AirPodsTech />
            <AirPodsProSection />
          </motion.div>
        )}

        {activeTab === 'max' && (
          <motion.div key="max" variants={pageFade} initial="hidden" animate="visible" exit="exit">
            <AirPodsMaxSection />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── 4. COMPARISON TABLE ── */}
      <CompareModels />

      <Footer />
    </main>
  );
}
