import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

const FeaturedBanner = ({ type }) => {
  if (type === 'iphone') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{
          width: '100%',
          background: '#141414',
          border: '1px solid #242424',
          borderRadius: '24px',
          overflow: 'hidden',
          display: 'flex',
          flexWrap: 'wrap',
          marginBottom: '8px',
          minHeight: '340px',
        }}
      >
        {/* Text */}
        <div style={{ flex: '1 1 340px', padding: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'center', zIndex: 1 }}>
          <span style={{ display: 'inline-block', width: 'fit-content', padding: '3px 10px', background: '#0071e3', color: '#fff', fontSize: '10px', fontWeight: 700, borderRadius: '4px', letterSpacing: '0.1em', marginBottom: '20px' }}>
            FEATURED
          </span>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 700, color: '#fff', lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: '12px' }}>
            iPhone 15 Pro Max
          </h2>
          <p style={{ fontSize: '15px', color: '#86868b', marginBottom: '24px', maxWidth: '300px', lineHeight: 1.6 }}>
            Titanium. So strong. So light. So Pro.
          </p>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '32px' }}>
            <span style={{ fontSize: '20px', fontWeight: 700, color: '#fff' }}>$1,199</span>
            <span style={{ fontSize: '14px', color: '#86868b', textDecoration: 'line-through' }}>$1,399</span>
            <span style={{ fontSize: '10px', fontWeight: 700, color: '#fff', background: '#0071e3', padding: '2px 8px', borderRadius: '4px' }}>14% OFF</span>
          </div>
          <button style={{ display: 'flex', alignItems: 'center', gap: '6px', width: 'fit-content', padding: '10px 20px', background: '#2a2a2a', color: '#fff', borderRadius: '20px', fontSize: '13px', fontWeight: 500, border: 'none', cursor: 'pointer' }}>
            Explore iPhone <ChevronRight size={15} />
          </button>
        </div>

        {/* Image */}
        <div style={{ flex: '1 1 340px', minHeight: '240px', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0', position: 'relative', overflow: 'hidden' }}>
          <img
            src="https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-7inch-naturaltitanium?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1692845702708"
            alt="iPhone 15 Pro Max"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          {/* Dots */}
          <div style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '6px' }}>
            <div style={{ width: '24px', height: '4px', background: '#0071e3', borderRadius: '4px' }} />
            <div style={{ width: '24px', height: '4px', background: '#ccc', borderRadius: '4px' }} />
            <div style={{ width: '24px', height: '4px', background: '#ccc', borderRadius: '4px' }} />
          </div>
        </div>
      </motion.div>
    );
  }

  if (type === 'college') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{
          width: '100%',
          background: '#141414',
          border: '1px solid #242424',
          borderRadius: '24px',
          overflow: 'hidden',
          display: 'flex',
          flexWrap: 'wrap',
          marginTop: '32px',
          minHeight: '300px',
        }}
      >
        {/* Text */}
        <div style={{ flex: '1 1 340px', padding: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'center', zIndex: 1 }}>
          <span style={{ color: '#0071e3', fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', marginBottom: '16px' }}>
            LIMITED TIME
          </span>
          <h2 style={{ fontSize: 'clamp(24px, 4vw, 38px)', fontWeight: 700, color: '#fff', lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: '16px' }}>
            Save on Mac or iPad<br />for college.
          </h2>
          <p style={{ fontSize: '14px', color: '#86868b', marginBottom: '32px', maxWidth: '280px', lineHeight: 1.6 }}>
            Get education pricing on select Mac and iPad. Plus AirPods.
          </p>
          <button style={{ display: 'flex', alignItems: 'center', gap: '6px', width: 'fit-content', padding: '10px 20px', background: '#2a2a2a', color: '#fff', borderRadius: '20px', fontSize: '13px', fontWeight: 500, border: 'none', cursor: 'pointer' }}>
            Shop Now <ChevronRight size={15} />
          </button>
        </div>

        {/* Image */}
        <div style={{ flex: '1 1 340px', minHeight: '220px', background: '#0d0d0d', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', padding: '32px 32px 0', overflow: 'hidden' }}>
          <img
            src="https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/macbook-air-midnight-select-20220606?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1653084303665"
            alt="MacBook Air"
            style={{ maxWidth: '90%', maxHeight: '260px', objectFit: 'contain', filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.5))' }}
          />
        </div>
      </motion.div>
    );
  }

  return null;
};

export default FeaturedBanner;
