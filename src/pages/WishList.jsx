import React, { useState } from 'react';
import { useWishlist } from '../context/WishlistContext';
import ProductCard from './Store/components/ProductCard';
import ProductModal from './Store/components/ProductModal';
import { HeartCrack, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function WishList() {
  const { wishlist } = useWishlist();
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <section className="min-h-screen bg-black text-white overflow-x-hidden pt-[100px]">
      <div style={{ width: '100%', maxWidth: '1200px', margin: '0 auto', padding: '40px 24px 80px' }}>
        
        {/* Header */}
        <div style={{ marginBottom: '40px', borderBottom: '1px solid #1d1d1f', paddingBottom: '24px' }}>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1, marginBottom: '8px', color: '#fff' }}>
            Your Wishlist
          </h1>
          <p style={{ fontSize: '15px', color: '#86868b' }}>
            {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'} saved for later.
          </p>
        </div>

        {wishlist.length > 0 ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: '20px',
            marginTop: '32px'
          }}>
            {wishlist.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={() => setSelectedProduct(product)}
              />
            ))}
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '100px 0', textAlign: 'center' }}>
            <HeartCrack size={48} color="#333" strokeWidth={1} style={{ marginBottom: '24px' }} />
            <h2 style={{ fontSize: '28px', fontWeight: 600, color: '#fff', marginBottom: '12px' }}>
              Your wishlist is empty.
            </h2>
            <p style={{ fontSize: '15px', color: '#86868b', marginBottom: '32px', maxWidth: '400px', lineHeight: 1.5 }}>
              Save items you love so you can easily find them later. Discover the latest products in the Apple Store.
            </p>
            <Link to="/store" style={{ textDecoration: 'none' }}>
              <button style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                padding: '12px 24px', background: '#0071e3', color: '#fff',
                border: 'none', borderRadius: '24px', fontSize: '15px', fontWeight: 600,
                cursor: 'pointer', transition: 'background 0.2s'
              }}
              onMouseOver={(e) => e.currentTarget.style.background = '#0077ed'}
              onMouseOut={(e) => e.currentTarget.style.background = '#0071e3'}
              >
                Continue Shopping
                <ArrowRight size={18} />
              </button>
            </Link>
          </div>
        )}

      </div>

      {/* Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </section>
  );
}
