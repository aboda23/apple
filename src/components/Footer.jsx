import React from 'react';
import logo from "../assets/images/logo.svg";
import { footerLinks } from '../Store';

const Footer = () => {
  return (
    <footer className="bg-black pt-16 pb-24 px-4 sm:px-6 lg:px-8 border-t border-white/[0.05]">
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center gap-8">
        
        {/* Logo */}
        <img src={logo} alt="Apple logo" className="w-8 h-8 opacity-80" />

        {/* Top Info */}
        <p className="text-white/60 text-sm leading-relaxed max-w-2xl">
          More ways to shop: <a href="#" className="text-[#2997FF] hover:underline">Find an Apple Store</a> or <a href="#" className="text-[#2997FF] hover:underline">other retailer</a> near you. Or call 000800 040 1966.
        </p>

        {/* Links */}
        <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-4">
          {footerLinks.map(({ label, link }) => (
            <li key={label}>
              <a 
                href={link} 
                className="text-white/60 text-sm hover:text-white transition-colors tracking-wide"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        <div className="w-16 h-px bg-white/20"></div>

        {/* Copyright */}
        <p className="text-white/40 text-xs">
          Copyright © {new Date().getFullYear()} Apple Inc. All rights reserved.
        </p>

      </div>
    </footer>
  );
};

export default Footer;