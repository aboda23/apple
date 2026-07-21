import React from 'react';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { useWishlist } from '../../../context/WishlistContext';
import { useCartStore } from '../../../Store/index';
import toast from 'react-hot-toast';

const ProductCard = ({ product, onClick }) => {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const isWished = isInWishlist(product.id);
  const addToCart = useCartStore(state => state.addToCart);

  const handleWishlistClick = (e) => {
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <motion.div
      onClick={onClick}
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      style={{
        cursor: 'pointer',
        background: '#141414',
        border: '1px solid #242424',
        borderRadius: '20px',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
        height: '100%',
      }}
    >
      {/* Heart */}
      <button
        onClick={handleWishlistClick}
        style={{ position: 'absolute', top: '16px', right: '16px', zIndex: 10, background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: isWished ? '#ff453a' : '#555', transition: 'color 0.2s' }}
      >
        <Heart size={18} strokeWidth={1.5} fill={isWished ? '#ff453a' : 'none'} />
      </button>

      {/* Image */}
      <div style={{ width: '100%', padding: '16px', position: 'relative' }}>
        <div style={{ 
          width: '100%', 
          aspectRatio: '1', 
          backgroundColor: '#fff', // White background hides JPEG borders
          borderRadius: '16px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          overflow: 'hidden',
          position: 'relative' 
        }}>
          <img
            src={product.thumbnail}
            alt={product.name}
            loading="lazy"
            style={{ width: '85%', height: '85%', objectFit: 'contain' }}
          />
        </div>
        {/* Swatches */}
        {product.colors && product.colors.length > 0 && (
          <div style={{ position: 'absolute', bottom: '24px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '6px', padding: '4px 8px', background: 'rgba(0,0,0,0.5)', borderRadius: '12px', backdropFilter: 'blur(4px)' }}>
            {product.colors.map((c, i) => (
              <div
                key={i}
                title={c.name}
                style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: c.hex, boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.2)' }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Info */}
      <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, padding: '0 20px 20px', gap: '6px' }}>
        {/* Name */}
        <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#fff', lineHeight: 1.3, margin: 0 }}>{product.name}</h3>
        <p style={{ fontSize: '12px', color: '#86868b', lineHeight: 1.5, margin: 0, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{product.description}</p>

        {/* Stars */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
          <div style={{ display: 'flex', color: '#f5c518', gap: '1px' }}>
            {[1,2,3,4,5].map((s) => <Star key={s} size={11} fill="currentColor" />)}
          </div>
          <span style={{ fontSize: '11px', color: '#86868b' }}>({product.reviews})</span>
        </div>

        <div style={{ flexGrow: 1 }} />

        {/* Price */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginTop: '8px' }}>
          <span style={{ fontSize: '15px', fontWeight: 700, color: '#fff' }}>${product.discountPrice ?? product.price}</span>
          {product.discountPrice && (
            <>
              <span style={{ fontSize: '13px', color: '#86868b', textDecoration: 'line-through' }}>${product.price}</span>
              <span style={{ fontSize: '10px', fontWeight: 700, color: '#fff', background: '#0071e3', padding: '2px 6px', borderRadius: '3px' }}>{product.discount}</span>
            </>
          )}
        </div>

        {/* Stock + Cart */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '12px', borderTop: '1px solid #242424', marginTop: '8px' }}>
          {product.stock ? (
            <span style={{ fontSize: '12px', fontWeight: 500, color: '#34c759' }}>In Stock</span>
          ) : (
            <span style={{ fontSize: '12px', fontWeight: 500, color: '#86868b' }}>Out of Stock</span>
          )}
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (!product.stock) return;
              addToCart({
                ...product,
                cartItemId: Date.now() + Math.random(),
                selectedColor: product.colors?.[0] || null,
                selectedStorage: product.storage?.[0] || null,
                selectedSize: product.sizes?.[0] || null,
                quantity: 1
              });
              toast.success('Added to your bag.', {
                style: { background: '#222', color: '#fff', border: '1px solid #333' }
              });
            }}
            disabled={!product.stock}
            style={{
              width: '36px', height: '36px', borderRadius: '50%', border: '1px solid #3a3a3a', background: 'transparent',
              display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', cursor: product.stock ? 'pointer' : 'not-allowed',
              opacity: product.stock ? 1 : 0.4,
              transition: 'all 0.2s'
            }}
            onMouseOver={(e) => {
              if(product.stock) {
                e.currentTarget.style.background = '#0071e3';
                e.currentTarget.style.borderColor = '#0071e3';
              }
            }}
            onMouseOut={(e) => {
              if(product.stock) {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.borderColor = '#3a3a3a';
              }
            }}
          >
            <ShoppingCart size={15} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
