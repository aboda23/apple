import React, { useEffect } from 'react';
import { useCartStore } from '../Store/index';
import { Trash2, Package, MapPin, HelpCircle, Box, RotateCcw, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

const selectStyle = {
  background: 'transparent',
  border: '1px solid #333',
  color: '#fff',
  padding: '8px 32px 8px 12px',
  borderRadius: '8px',
  fontSize: '14px',
  appearance: 'none',
  outline: 'none',
  cursor: 'pointer',
  backgroundImage: `url('data:image/svg+xml;utf8,<svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L5 5L9 1" stroke="%2386868b" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>')`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'right 12px center'
};

export default function Cart() {
  const { cartItems, removeFromCart, updateCartItem } = useCartStore();

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#000', 
      color: '#fff',
      paddingTop: '120px',
      paddingBottom: '80px',
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <div style={{ maxWidth: '980px', margin: '0 auto', padding: '0 24px' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '40px', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <h1 style={{ fontSize: 'clamp(32px, 5vw, 40px)', fontWeight: 600, letterSpacing: '-0.02em', marginBottom: '12px' }}>
              Your Cart
            </h1>
            <p style={{ fontSize: '17px', color: '#86868b', marginBottom: '8px' }}>
              {totalItems} {totalItems === 1 ? 'item' : 'items'}
            </p>
            <p style={{ fontSize: '17px', color: '#86868b' }}>
              Free delivery and free returns.
            </p>
          </div>
          {totalItems > 0 && (
            <Link to="/checkout" style={{ 
              background: '#fff', 
              color: '#000', 
              border: 'none', 
              padding: '12px 24px', 
              borderRadius: '8px', 
              fontSize: '15px', 
              fontWeight: 600, 
              cursor: 'pointer',
              minWidth: '140px',
              textDecoration: 'none',
              textAlign: 'center',
              display: 'inline-block'
            }}>
              Check Out
            </Link>
          )}
        </div>

        {cartItems.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0', borderTop: '1px solid #333', borderBottom: '1px solid #333' }}>
            <h2 style={{ fontSize: '28px', fontWeight: 600, marginBottom: '24px' }}>Your bag is empty.</h2>
            <Link to="/store" style={{ color: '#2997ff', textDecoration: 'none', fontSize: '17px' }}>Continue Shopping</Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
              {cartItems.map((item, index) => (
                <div key={item.cartItemId || index} style={{ 
                  display: 'flex', 
                  flexDirection: 'column',
                  gap: '32px', 
                  paddingTop: index !== 0 ? '40px' : '0',
                  borderTop: index !== 0 ? '1px solid #333' : 'none'
                }}>
                  <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
                    
                    <div style={{ 
                      flex: '0 0 260px', 
                      height: '260px', 
                      background: '#111', 
                      borderRadius: '16px', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      padding: '20px'
                    }}>
                      <img 
                        src={item.thumbnail} 
                        alt={item.name} 
                        style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
                      />
                    </div>

                    <div style={{ flex: 1, minWidth: '280px', display: 'flex', flexDirection: 'column' }}>
                      
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '20px', marginBottom: '16px' }}>
                        <h2 style={{ fontSize: '24px', fontWeight: 600, lineHeight: 1.2 }}>
                          {item.name}
                        </h2>
                        <span style={{ fontSize: '24px', fontWeight: 600 }}>${item.price.toLocaleString()}.00</span>
                      </div>

                      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '24px' }}>
                        {item.colors && item.colors.length > 0 && (
                          <select 
                            value={item.selectedColor?.name || ''}
                            onChange={(e) => updateCartItem(item.cartItemId, { selectedColor: item.colors.find(c => c.name === e.target.value) })}
                            style={selectStyle}
                          >
                            {item.colors.map(c => <option key={c.name} value={c.name} style={{background: '#1a1a1a'}}>{c.name}</option>)}
                          </select>
                        )}

                        {item.storage && item.storage.length > 0 && (
                          <select 
                            value={item.selectedStorage || ''}
                            onChange={(e) => updateCartItem(item.cartItemId, { selectedStorage: e.target.value })}
                            style={selectStyle}
                          >
                            {item.storage.map(s => <option key={s} value={s} style={{background: '#1a1a1a'}}>{s}</option>)}
                          </select>
                        )}

                        {item.sizes && item.sizes.length > 0 && (
                          <select 
                            value={item.selectedSize || ''}
                            onChange={(e) => updateCartItem(item.cartItemId, { selectedSize: e.target.value })}
                            style={selectStyle}
                          >
                            {item.sizes.map(s => <option key={s} value={s} style={{background: '#1a1a1a'}}>{s}</option>)}
                          </select>
                        )}
                      </div>

                      <div style={{ flexGrow: 1 }} />

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '20px', marginTop: '24px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                          <div style={{ display: 'flex', gap: '12px' }}>
                            <Package size={20} color="#86868b" />
                            <div>
                              <p style={{ fontSize: '13px', fontWeight: 600, margin: 0 }}>Delivers to <span style={{ color: '#2997ff' }}>12345</span></p>
                              <p style={{ fontSize: '13px', color: '#86868b', margin: '4px 0 0 0' }}>Delivers Tue, May 28 – Free</p>
                            </div>
                          </div>
                          
                          <div style={{ display: 'flex', gap: '12px' }}>
                            <MapPin size={20} color="#86868b" />
                            <div>
                              <p style={{ fontSize: '13px', fontWeight: 600, margin: 0 }}>Pick up, in-store:</p>
                              <p style={{ fontSize: '13px', color: '#86868b', margin: '4px 0 0 0' }}>Today at <span style={{ color: '#2997ff' }}>Apple Store</span></p>
                            </div>
                          </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                          <select 
                            value={item.quantity}
                            onChange={(e) => updateCartItem(item.cartItemId, { quantity: Number(e.target.value) })}
                            style={selectStyle}
                          >
                            {[1,2,3,4,5,6,7,8,9,10].map(n => (
                              <option key={n} value={n} style={{background: '#1a1a1a'}}>{n}</option>
                            ))}
                          </select>
                          
                          <button 
                            onClick={() => removeFromCart(item.cartItemId)}
                            style={{ 
                              width: '40px', height: '40px', 
                              borderRadius: '50%', background: '#222', border: 'none', 
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                              cursor: 'pointer', color: '#86868b'
                            }}
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ borderTop: '1px solid #333', paddingTop: '40px', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '40px' }}>
              <div style={{ display: 'flex', gap: '16px', flex: '1 1 300px' }}>
                <HelpCircle size={24} color="#86868b" />
                <div>
                  <p style={{ fontSize: '15px', fontWeight: 600, margin: '0 0 4px 0' }}>Need some help?</p>
                  <p style={{ fontSize: '14px', color: '#86868b', margin: 0 }}>
                    <span style={{ color: '#2997ff', cursor: 'pointer' }}>Chat now</span> or call 1-800-MY-APPLE.
                  </p>
                </div>
              </div>

              <div style={{ flex: '1 1 400px', maxWidth: '500px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', fontSize: '17px' }}>
                  <span>Subtotal</span>
                  <span>${subtotal.toLocaleString()}.00</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '32px', fontSize: '17px' }}>
                  <span>Shipping</span>
                  <span>FREE</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '16px', borderTop: '1px solid #333', paddingTop: '24px' }}>
                  <span style={{ fontSize: '24px', fontWeight: 600 }}>Total</span>
                  <span style={{ fontSize: '32px', fontWeight: 600 }}>${subtotal.toLocaleString()}.00</span>
                </div>
                <div style={{ textAlign: 'right', fontSize: '12px', color: '#86868b' }}>
                  Pay in 4 interest-free payments of ${(subtotal / 4).toFixed(2)} with <strong style={{ color: '#fff' }}>Apple Pay Later</strong>
                </div>
              </div>
            </div>
          </div>
        )}

        <div style={{ 
          marginTop: '80px', 
          paddingTop: '40px', 
          borderTop: '1px solid #333', 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '32px' 
        }}>
          <div style={{ display: 'flex', gap: '16px' }}>
            <Box size={32} strokeWidth={1} color="#86868b" />
            <div>
              <p style={{ fontSize: '15px', fontWeight: 600, margin: '0 0 4px 0' }}>Fast and free delivery</p>
              <p style={{ fontSize: '14px', color: '#86868b', margin: 0 }}>Get free delivery on all orders.</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '16px' }}>
            <RotateCcw size={32} strokeWidth={1} color="#86868b" />
            <div>
              <p style={{ fontSize: '15px', fontWeight: 600, margin: '0 0 4px 0' }}>Free and easy returns</p>
              <p style={{ fontSize: '14px', color: '#86868b', margin: 0 }}>Return your items within 14 days.</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '16px' }}>
            <Lock size={32} strokeWidth={1} color="#86868b" />
            <div>
              <p style={{ fontSize: '15px', fontWeight: 600, margin: '0 0 4px 0' }}>Secure checkout</p>
              <p style={{ fontSize: '14px', color: '#86868b', margin: 0 }}>Your data is protected at every step.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
