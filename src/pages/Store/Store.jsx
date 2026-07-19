import React, { useState } from 'react';
import { storeProducts } from './dummyData';
import ProductCard from './components/ProductCard';
import ProductModal from './components/ProductModal';
import SearchBar from './components/SearchBar';
import CategoryFilters from './components/CategoryFilters';
import FeaturedBanner from './components/FeaturedBanner';
import { Truck, CreditCard, Wrench, RefreshCw } from 'lucide-react';

const Store = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState(null);

  const filteredProducts = storeProducts.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const showBanners = activeCategory === 'All' && !searchQuery;

  return (
    <section className="min-h-screen bg-black text-white overflow-x-hidden">
      <div style={{ width: '100%', maxWidth: '1200px', margin: '0 auto', padding: '80px 24px 80px' }}>

        {/* ── Header ─────────────────────────── */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '28px' }}>
          <div>
            <h1 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1, marginBottom: '6px', color: '#fff' }}>
              Apple Store
            </h1>
            <p style={{ fontSize: '15px', color: '#86868b' }}>
              Discover every Apple product in one place.
            </p>
          </div>
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        </div>

        {/* ── Categories ─────────────────────── */}
        <CategoryFilters activeCategory={activeCategory} setActiveCategory={setActiveCategory} />

        {/* ── Featured Banner ────────────────── */}
        {showBanners && <FeaturedBanner type="iphone" />}

        {/* ── Product Grid ───────────────────── */}
        {filteredProducts.length > 0 ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: '20px',
            marginTop: '32px'
          }}>
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={() => setSelectedProduct(product)}
              />
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '120px 0' }}>
            <h3 style={{ fontSize: '22px', fontWeight: 600, marginBottom: '8px' }}>No products found</h3>
            <p style={{ fontSize: '15px', color: '#86868b' }}>Try a different keyword or category.</p>
          </div>
        )}

        {/* ── College Banner ─────────────────── */}
        {showBanners && <FeaturedBanner type="college" />}

        {/* ── Services ───────────────────────── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '24px',
          marginTop: '64px',
          paddingTop: '40px',
          borderTop: '1px solid #1d1d1f'
        }}>
          {[
            { Icon: Truck,      title: 'Free Delivery',  desc: 'And free returns.' },
            { Icon: CreditCard, title: 'Pay Monthly',    desc: 'Get 3% Daily Cash.' },
            { Icon: Wrench,     title: 'Personal Setup', desc: "We'll help you get started." },
            { Icon: RefreshCw,  title: 'Apple Trade In', desc: 'Get credit for your device.' },
          ].map(({ Icon, title, desc }) => (
            <div key={title} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <Icon size={24} color="#86868b" strokeWidth={1.5} style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <h4 style={{ fontSize: '13px', fontWeight: 600, color: '#fff', marginBottom: '2px' }}>{title}</h4>
                <p style={{ fontSize: '12px', color: '#86868b' }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* ── Modal ────────────────────────────── */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </section>
  );
};

export default Store;
