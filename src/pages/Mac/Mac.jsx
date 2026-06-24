import React from 'react'
import Hero from './components/Hero'
import ProductViewer from './components/ProductViewer'
import Showcase from './components/Showcase'
import Performance from './components/Performance'
import Features from './components/Features'
import Highlights from './components/Highlights'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'

gsap.registerPlugin(ScrollTrigger);

export default function Mac() {
    return (
        <div>
            <Hero />
            <ProductViewer />
            <Showcase />
            <Performance />
            <Features />
            <Highlights />
        </div>
    );
}
