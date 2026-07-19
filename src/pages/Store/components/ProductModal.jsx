import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Star, Minus, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { useCartStore } from '../../../Store/index';
import toast from 'react-hot-toast';

const ProductModal = ({ product, onClose }) => {
  const addToCart = useCartStore(state => state.addToCart);
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] || null);
  const [selectedStorage, setSelectedStorage] = useState(product?.storage?.[0] || null);
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || null);
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = product?.images?.length ? product.images : (product?.thumbnail ? [product.thumbnail] : []);
  const isInStock = product?.stock === true;

  // Auto-play slider every 20 seconds
  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 20000);
    return () => clearInterval(timer);
  }, [images.length]);

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (!product) return null;

  return (
    <AnimatePresence>
      <div style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: window.innerWidth > 768 ? '40px' : '0' }}>
        
        {/* Backdrop */}
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
          style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(10px)' }}
        />

        {/* Modal Window */}
        <motion.div
          key="modal"
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.98 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'relative',
            zIndex: 10000,
            width: '100%',
            height: '100%',
            maxWidth: '1000px',
            maxHeight: window.innerWidth > 768 ? '85vh' : '100%',
            background: '#141414',
            borderRadius: window.innerWidth > 768 ? '24px' : '0px',
            border: window.innerWidth > 768 ? '1px solid #2a2a2a' : 'none',
            display: 'flex',
            flexDirection: window.innerWidth > 768 ? 'row' : 'column',
            overflow: 'hidden',
            boxShadow: '0 40px 100px rgba(0,0,0,0.8)'
          }}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            style={{
              position: 'absolute', top: '16px', right: '16px', zIndex: 50,
              width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff',
              border: 'none', cursor: 'pointer', backdropFilter: 'blur(10px)'
            }}
          >
            <X size={18} />
          </button>

          {/* ─── Left: Image Slider ─────────────────────── */}
          <div style={{
            width: window.innerWidth > 768 ? '55%' : '100%',
            height: window.innerWidth > 768 ? '100%' : '45vh',
            background: '#0a0a0a',
            display: 'flex', flexDirection: 'column', position: 'relative'
          }}>
            
            {/* Main image */}
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px', position: 'relative' }}>
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImageIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  src={images[currentImageIndex]}
                  alt={product.name}
                  style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.5))' }}
                />
              </AnimatePresence>

              {/* Slider Arrows */}
              {images.length > 1 && (
                <>
                  <button onClick={prevImage} style={{
                    position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)',
                    width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', border: 'none', cursor: 'pointer'
                  }}>
                    <ChevronLeft size={20} />
                  </button>
                  <button onClick={nextImage} style={{
                    position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)',
                    width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', border: 'none', cursor: 'pointer'
                  }}>
                    <ChevronRight size={20} />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', paddingBottom: '24px' }}>
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    style={{
                      width: '48px', height: '48px', borderRadius: '12px', padding: '4px',
                      background: '#1a1a1a', cursor: 'pointer',
                      border: currentImageIndex === idx ? '2px solid #0071e3' : '2px solid transparent',
                      transition: 'all 0.2s'
                    }}
                  >
                    <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ─── Right: Details ──────────────────── */}
          <div style={{
            width: window.innerWidth > 768 ? '45%' : '100%',
            height: window.innerWidth > 768 ? '100%' : '55vh',
            overflowY: 'auto',
            padding: '32px',
            display: 'flex',
            flexDirection: 'column',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}>
            
            <span style={{ color: '#0071e3', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>
              {product.category}
            </span>

            <h2 style={{ fontSize: '32px', fontWeight: 700, color: '#fff', lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: '12px' }}>
              {product.name}
            </h2>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <div style={{ display: 'flex', color: '#f5c518', gap: '2px' }}>
                {[1,2,3,4,5].map((s) => <Star key={s} size={12} fill="currentColor" />)}
              </div>
              <span style={{ fontSize: '12px', color: '#86868b' }}>({product.reviews})</span>
            </div>

            <p style={{ fontSize: '14px', color: '#86868b', lineHeight: 1.6, marginBottom: '24px' }}>
              {product.description}
            </p>

            <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '32px', paddingBottom: '24px', borderBottom: '1px solid #2a2a2a' }}>
              <span style={{ fontSize: '24px', fontWeight: 700, color: '#fff' }}>
                ${product.discountPrice ?? product.price}
              </span>
              {product.discountPrice && (
                <>
                  <span style={{ fontSize: '14px', color: '#86868b', textDecoration: 'line-through' }}>${product.price}</span>
                  <span style={{ fontSize: '10px', fontWeight: 700, color: '#fff', background: '#0071e3', padding: '2px 6px', borderRadius: '4px' }}>{product.discount}</span>
                </>
              )}
            </div>

            {/* Colors */}
            {product.colors && product.colors.length > 0 && (
              <div style={{ marginBottom: '24px' }}>
                <h3 style={{ fontSize: '13px', color: '#86868b', fontWeight: 500, marginBottom: '12px' }}>
                  Color — <span style={{ color: '#fff' }}>{selectedColor?.name}</span>
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                  {product.colors.map((color, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedColor(color)}
                      title={color.name}
                      style={{
                        width: '36px', height: '36px', borderRadius: '50%', backgroundColor: color.hex, cursor: 'pointer',
                        border: selectedColor?.name === color.name ? '2px solid #0071e3' : '1px solid #444',
                        outline: selectedColor?.name === color.name ? '2px solid #141414' : 'none',
                        outlineOffset: '-4px'
                      }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Storage */}
            {product.storage && product.storage.length > 0 && (
              <div style={{ marginBottom: '24px' }}>
                <h3 style={{ fontSize: '13px', color: '#86868b', fontWeight: 500, marginBottom: '12px' }}>Storage</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                  {product.storage.map((st, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedStorage(st)}
                      style={{
                        height: '40px', borderRadius: '8px', fontSize: '13px', fontWeight: 500, cursor: 'pointer',
                        border: selectedStorage === st ? '1px solid #0071e3' : '1px solid #333',
                        background: selectedStorage === st ? 'rgba(0,113,227,0.1)' : 'transparent',
                        color: selectedStorage === st ? '#0071e3' : '#fff',
                        transition: 'all 0.2s'
                      }}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size */}
            {product.sizes && product.sizes.length > 0 && (
              <div style={{ marginBottom: '24px' }}>
                <h3 style={{ fontSize: '13px', color: '#86868b', fontWeight: 500, marginBottom: '12px' }}>Size</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
                  {product.sizes.map((sz, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedSize(sz)}
                      style={{
                        height: '40px', borderRadius: '8px', fontSize: '13px', fontWeight: 500, cursor: 'pointer',
                        border: selectedSize === sz ? '1px solid #0071e3' : '1px solid #333',
                        background: selectedSize === sz ? 'rgba(0,113,227,0.1)' : 'transparent',
                        color: selectedSize === sz ? '#0071e3' : '#fff',
                        transition: 'all 0.2s'
                      }}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Stock */}
            <div style={{ marginBottom: '24px' }}>
              {isInStock ? (
                <span style={{ fontSize: '12px', fontWeight: 500, color: '#34c759' }}>● In Stock</span>
              ) : (
                <span style={{ fontSize: '12px', fontWeight: 500, color: '#ff453a' }}>● Out of Stock</span>
              )}
            </div>

            <div style={{ flexGrow: 1 }} />

            {/* Actions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', paddingTop: '24px', borderTop: '1px solid #2a2a2a' }}>
              {isInStock && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                  <span style={{ fontSize: '13px', color: '#86868b' }}>Qty</span>
                  <div style={{ display: 'flex', alignItems: 'center', height: '36px', background: '#222', border: '1px solid #333', borderRadius: '8px', overflow: 'hidden' }}>
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} style={{ width: '36px', height: '100%', background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer' }}>
                      <Minus size={14} style={{ margin: 'auto' }} />
                    </button>
                    <span style={{ width: '36px', textAlign: 'center', fontSize: '14px', fontWeight: 500 }}>{quantity}</span>
                    <button onClick={() => setQuantity(quantity + 1)} style={{ width: '36px', height: '100%', background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer' }}>
                      <Plus size={14} style={{ margin: 'auto' }} />
                    </button>
                  </div>
                </div>
              )}

              {isInStock ? (
                <>
                  <button 
                    onClick={() => {
                      addToCart({
                        ...product,
                        cartItemId: Date.now() + Math.random(), // unique ID for cart instance
                        selectedColor,
                        selectedStorage,
                        selectedSize,
                        quantity
                      });
                      toast.success('Added to your bag.', {
                        style: { background: '#222', color: '#fff', border: '1px solid #333' }
                      });
                      onClose();
                    }}
                    style={{ width: '100%', height: '48px', background: '#0071e3', color: '#fff', fontSize: '15px', fontWeight: 600, borderRadius: '12px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                  >
                    <ShoppingBag size={18} />
                    Add to Bag
                  </button>
                  <button style={{ width: '100%', height: '48px', background: '#fff', color: '#000', fontSize: '15px', fontWeight: 600, borderRadius: '12px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    Buy Now
                  </button>
                </>
              ) : (
                <button disabled style={{ width: '100%', height: '48px', background: '#222', border: '1px solid #333', color: '#555', fontSize: '15px', fontWeight: 600, borderRadius: '12px', cursor: 'not-allowed' }}>
                  Currently Unavailable
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ProductModal;
