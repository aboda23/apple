import React from 'react';
import './Airpods.css';
import VideoHero from './components/VideoHero';
import AirPodsHighlights from './components/AirPodsHighlights';
import AirPodsDesign from './components/AirPodsDesign';
import AirPodsTech from './components/AirPodsTech';
import Footer from '../../components/Footer';

import { airpodsVideos } from './utils';

export default function Airpods() {
  return (
    <main className="bg-black text-white w-full overflow-hidden">
      
      {/* 1. Hero Section */}
      <VideoHero videoSrc={airpodsVideos.sec} title="AirPods Pro" />
      
      {/* 2. Highlights Carousel */}
      <AirPodsHighlights />

      {/* 3. Design Showcase (like iPhone Titanium) */}
      <AirPodsDesign />

      {/* 4. Performance & Tech (like iPhone A17 Pro) */}
      <AirPodsTech />

      <Footer />
    </main>
  );
}
