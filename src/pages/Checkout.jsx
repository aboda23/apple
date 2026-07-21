import React, { useState, useEffect } from 'react';
import { useCartStore } from '../Store/index';
import { useNavigate } from 'react-router-dom';
import { Package, RotateCcw, Lock, CreditCard, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';

const inputStyle = {
  width: '100%',
  background: 'transparent',
  border: '1px solid #2C2C2E',
  borderRadius: '8px',
  color: '#fff',
  padding: '14px 16px',
  fontSize: '15px',
  outline: 'none',
  transition: 'border-color 0.2s'
};

const sectionTitleStyle = {
  fontSize: '18px',
  fontWeight: 600,
  marginBottom: '20px',
  display: 'flex',
  alignItems: 'center',
  gap: '12px'
};

const numberCircleStyle = {
  width: '24px',
  height: '24px',
  borderRadius: '50%',
  border: '1px solid #8E8E93',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '13px',
  color: '#8E8E93'
};

export default function Checkout() {
  const { cartItems, clearCart } = useCartStore();
  const navigate = useNavigate();
  
  const [deliveryMethod, setDeliveryMethod] = useState('standard');
  const [paymentMethod, setPaymentMethod] = useState('card');

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = deliveryMethod === 'express' ? 10 : 0;
  const tax = subtotal * 0.08; // 8% tax example
  const total = subtotal + shipping + tax;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (cartItems.length === 0) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#000', color: '#fff' }}>
        <div style={{ textAlign: 'center' }}>
          <h2>Your cart is empty.</h2>
          <button onClick={() => navigate('/store')} style={{ marginTop: '20px', padding: '10px 20px', background: '#fff', color: '#000', borderRadius: '8px', cursor: 'pointer' }}>Go to Store</button>
        </div>
      </div>
    );
  }

  const handleCheckout = (e) => {
    e.preventDefault();
    toast.success('Purchase completed successfully!');
    clearCart();
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#000000', 
      color: '#fff',
      paddingTop: '120px',
      paddingBottom: '80px',
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 24px' }}>
        
        <div style={{ marginBottom: '40px', display: 'flex', alignItems: 'flex-start', gap: '20px' }}>
          <button 
            onClick={() => navigate(-1)}
            style={{ 
              width: '40px', 
              height: '40px', 
              borderRadius: '50%', 
              background: 'rgba(255, 255, 255, 0.05)', 
              border: '1px solid rgba(255, 255, 255, 0.1)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              cursor: 'pointer',
              color: '#fff',
              marginTop: '4px', // Align with the heading slightly
              transition: 'all 0.2s',
              flexShrink: 0
            }}
            onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
            onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'}
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 style={{ fontSize: '40px', fontWeight: 600, letterSpacing: '-0.02em', marginBottom: '8px', lineHeight: 1 }}>Checkout</h1>
            <p style={{ fontSize: '17px', color: '#8E8E93', margin: 0 }}>Complete your order securely.</p>
          </div>
        </div>

        <form onSubmit={handleCheckout} style={{ display: 'flex', gap: '40px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
          
          {/* Left Column (Forms) */}
          <div style={{ flex: '1 1 500px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
            
            {/* 1. Shipping Address */}
            <div style={{ borderBottom: '1px solid #2C2C2E', paddingBottom: '32px' }}>
              <h2 style={sectionTitleStyle}>
                <div style={numberCircleStyle}>1</div> Shipping Address
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <input required type="text" placeholder="Full Name" style={inputStyle} onFocus={e => e.target.style.borderColor='#0071e3'} onBlur={e => e.target.style.borderColor='#2C2C2E'} />
                <input required type="tel" placeholder="Phone Number" style={inputStyle} onFocus={e => e.target.style.borderColor='#0071e3'} onBlur={e => e.target.style.borderColor='#2C2C2E'} />
                <input required type="email" placeholder="Email Address" style={{ ...inputStyle, gridColumn: 'span 2' }} onFocus={e => e.target.style.borderColor='#0071e3'} onBlur={e => e.target.style.borderColor='#2C2C2E'} />
                <select required style={{ ...inputStyle, appearance: 'none' }} onFocus={e => e.target.style.borderColor='#0071e3'} onBlur={e => e.target.style.borderColor='#2C2C2E'}>
                  <option value="">Country / Region</option>
                  <option value="US">United States</option>
                  <option value="UK">United Kingdom</option>
                  <option value="EG">Egypt</option>
                </select>
                <input required type="text" placeholder="City" style={inputStyle} onFocus={e => e.target.style.borderColor='#0071e3'} onBlur={e => e.target.style.borderColor='#2C2C2E'} />
                <input required type="text" placeholder="Street Address" style={{ ...inputStyle, gridColumn: 'span 2' }} onFocus={e => e.target.style.borderColor='#0071e3'} onBlur={e => e.target.style.borderColor='#2C2C2E'} />
                <input type="text" placeholder="Apartment / Building (Optional)" style={{ ...inputStyle, gridColumn: 'span 2' }} onFocus={e => e.target.style.borderColor='#0071e3'} onBlur={e => e.target.style.borderColor='#2C2C2E'} />
                <input required type="text" placeholder="ZIP / Postal Code" style={{ ...inputStyle, gridColumn: 'span 2' }} onFocus={e => e.target.style.borderColor='#0071e3'} onBlur={e => e.target.style.borderColor='#2C2C2E'} />
              </div>
            </div>

            {/* 2. Delivery Method */}
            <div style={{ borderBottom: '1px solid #2C2C2E', paddingBottom: '32px' }}>
              <h2 style={sectionTitleStyle}>
                <div style={numberCircleStyle}>2</div> Delivery Method
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <label style={{ 
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between', 
                  padding: '16px', background: deliveryMethod === 'standard' ? 'rgba(0,113,227,0.1)' : 'transparent', 
                  border: deliveryMethod === 'standard' ? '1px solid #0071e3' : '1px solid #2C2C2E', 
                  borderRadius: '12px', cursor: 'pointer', transition: 'all 0.2s'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <input type="radio" name="delivery" checked={deliveryMethod === 'standard'} onChange={() => setDeliveryMethod('standard')} style={{ accentColor: '#0071e3', width: '18px', height: '18px' }} />
                    <Package size={24} color="#fff" />
                    <div>
                      <div style={{ fontSize: '15px', fontWeight: 500, color: '#fff' }}>Standard Delivery</div>
                      <div style={{ fontSize: '13px', color: '#8E8E93', marginTop: '2px' }}>Delivers Tue, May 28 – Free</div>
                    </div>
                  </div>
                  <span style={{ fontSize: '15px', fontWeight: 600 }}>FREE</span>
                </label>

                <label style={{ 
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between', 
                  padding: '16px', background: deliveryMethod === 'express' ? 'rgba(0,113,227,0.1)' : 'transparent', 
                  border: deliveryMethod === 'express' ? '1px solid #0071e3' : '1px solid #2C2C2E', 
                  borderRadius: '12px', cursor: 'pointer', transition: 'all 0.2s'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <input type="radio" name="delivery" checked={deliveryMethod === 'express'} onChange={() => setDeliveryMethod('express')} style={{ accentColor: '#0071e3', width: '18px', height: '18px' }} />
                    <Package size={24} color="#fff" />
                    <div>
                      <div style={{ fontSize: '15px', fontWeight: 500, color: '#fff' }}>Express Delivery</div>
                      <div style={{ fontSize: '13px', color: '#8E8E93', marginTop: '2px' }}>Delivers Tomorrow – $10.00</div>
                    </div>
                  </div>
                  <span style={{ fontSize: '15px', fontWeight: 600 }}>$10.00</span>
                </label>
              </div>
            </div>

            {/* 3. Payment Method */}
            <div style={{ borderBottom: '1px solid #2C2C2E', paddingBottom: '32px' }}>
              <h2 style={sectionTitleStyle}>
                <div style={numberCircleStyle}>3</div> Payment Method
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <label style={{ 
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between', 
                  padding: '16px', background: paymentMethod === 'apple' ? 'rgba(0,113,227,0.1)' : 'transparent', 
                  border: paymentMethod === 'apple' ? '1px solid #0071e3' : '1px solid #2C2C2E', 
                  borderRadius: '12px', cursor: 'pointer', transition: 'all 0.2s'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <input type="radio" name="payment" checked={paymentMethod === 'apple'} onChange={() => setPaymentMethod('apple')} style={{ accentColor: '#0071e3', width: '18px', height: '18px' }} />
                    <div style={{ fontSize: '15px', fontWeight: 500, color: '#fff' }}>Apple Pay</div>
                  </div>
                  <svg width="40" height="25" viewBox="0 0 40 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="40" height="25" rx="4" fill="#fff"/>
                    <path d="M16.5 12C16.5 10.8 17.3 10.2 18.5 9.4C17.7 8.4 16.5 8.2 15.8 8.2C14.6 8.1 13.5 8.9 12.8 8.9C12.2 8.9 11.2 8.2 10.2 8.2C9 8.2 7.8 8.9 7.2 10C6 12.2 6.9 15.4 8.1 17.1C8.7 17.9 9.3 18.9 10.2 18.9C11.1 18.8 11.5 18.3 12.5 18.3C13.5 18.3 13.8 18.9 14.8 18.9C15.8 18.9 16.3 18 16.9 17.1C17.6 16.1 17.8 15.1 17.9 15C17.9 15 16.5 14.5 16.5 12ZM14.1 7.2C14.6 6.6 14.9 5.8 14.8 5C14 5.1 13 5.5 12.5 6.1C12.1 6.6 11.7 7.5 11.8 8.3C12.6 8.3 13.6 7.8 14.1 7.2Z" fill="black"/>
                    <text x="20" y="17" fill="black" fontSize="12" fontWeight="bold">Pay</text>
                  </svg>
                </label>

                <label style={{ 
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between', 
                  padding: '16px', background: paymentMethod === 'card' ? 'rgba(0,113,227,0.1)' : 'transparent', 
                  border: paymentMethod === 'card' ? '1px solid #0071e3' : '1px solid #2C2C2E', 
                  borderRadius: '12px', cursor: 'pointer', transition: 'all 0.2s'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <input type="radio" name="payment" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} style={{ accentColor: '#0071e3', width: '18px', height: '18px' }} />
                    <CreditCard size={20} color="#fff" />
                    <div style={{ fontSize: '15px', fontWeight: 500, color: '#fff' }}>Credit or Debit Card</div>
                  </div>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    <div style={{ width: '30px', height: '20px', background: '#1A1F71', borderRadius: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '8px', fontWeight: 'bold' }}>VISA</div>
                    <div style={{ width: '30px', height: '20px', background: '#FF5F00', borderRadius: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
                      <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#EB001B', position: 'absolute', left: '4px' }}></div>
                      <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#F79E1B', position: 'absolute', right: '4px' }}></div>
                    </div>
                  </div>
                </label>

                {paymentMethod === 'card' && (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', padding: '16px 0 8px 34px' }}>
                    <input required type="text" placeholder="Card Number" style={{ ...inputStyle, gridColumn: 'span 2' }} onFocus={e => e.target.style.borderColor='#0071e3'} onBlur={e => e.target.style.borderColor='#2C2C2E'} />
                    <input required type="text" placeholder="Cardholder Name" style={{ ...inputStyle, gridColumn: 'span 2' }} onFocus={e => e.target.style.borderColor='#0071e3'} onBlur={e => e.target.style.borderColor='#2C2C2E'} />
                    <input required type="text" placeholder="Expiry Date (MM/YY)" style={inputStyle} onFocus={e => e.target.style.borderColor='#0071e3'} onBlur={e => e.target.style.borderColor='#2C2C2E'} />
                    <input required type="text" placeholder="CVV" style={inputStyle} onFocus={e => e.target.style.borderColor='#0071e3'} onBlur={e => e.target.style.borderColor='#2C2C2E'} />
                  </div>
                )}

                <label style={{ 
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between', 
                  padding: '16px', background: paymentMethod === 'paypal' ? 'rgba(0,113,227,0.1)' : 'transparent', 
                  border: paymentMethod === 'paypal' ? '1px solid #0071e3' : '1px solid #2C2C2E', 
                  borderRadius: '12px', cursor: 'pointer', transition: 'all 0.2s'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <input type="radio" name="payment" checked={paymentMethod === 'paypal'} onChange={() => setPaymentMethod('paypal')} style={{ accentColor: '#0071e3', width: '18px', height: '18px' }} />
                    <div style={{ fontSize: '15px', fontWeight: 500, color: '#fff' }}>PayPal</div>
                  </div>
                  <div style={{ color: '#0079C1', fontWeight: 'bold', fontSize: '18px', fontStyle: 'italic' }}>PayPal</div>
                </label>
              </div>
              <div style={{ fontSize: '12px', color: '#8E8E93', marginTop: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Lock size={12} /> All transactions are secure and encrypted.
              </div>
            </div>
            
          </div>

          {/* Right Column (Order Summary) */}
          <div style={{ flex: '1 1 350px' }}>
            <div style={{ 
              background: '#1C1C1E', 
              borderRadius: '16px', 
              padding: '24px',
              border: '1px solid #2C2C2E',
              position: 'sticky',
              top: '120px'
            }}>
              <h2 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '24px' }}>Order Summary</h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px', maxHeight: '400px', overflowY: 'auto' }}>
                {cartItems.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: '16px' }}>
                    <div style={{ width: '64px', height: '64px', background: '#000', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '8px' }}>
                      <img src={item.thumbnail} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '14px', fontWeight: 500 }}>{item.name} {item.selectedStorage}</div>
                      <div style={{ fontSize: '13px', color: '#8E8E93' }}>{item.selectedColor?.name || 'Standard'}</div>
                      <div style={{ fontSize: '13px', color: '#8E8E93', marginTop: '4px' }}>Qty {item.quantity}</div>
                    </div>
                    <div style={{ fontSize: '14px', fontWeight: 500 }}>${(item.price * item.quantity).toLocaleString()}.00</div>
                  </div>
                ))}
              </div>

              <div style={{ borderTop: '1px solid #2C2C2E', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '15px' }}>
                  <span>Subtotal</span>
                  <span>${subtotal.toLocaleString()}.00</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '15px' }}>
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '15px' }}>
                  <span>Tax <span style={{ color: '#8E8E93', fontSize: '12px', marginLeft: '4px', cursor: 'pointer' }}>ⓘ</span></span>
                  <span>${tax.toFixed(2)}</span>
                </div>
              </div>

              <div style={{ borderTop: '1px solid #2C2C2E', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '16px' }}>
                <span style={{ fontSize: '20px', fontWeight: 600 }}>Total</span>
                <span style={{ fontSize: '24px', fontWeight: 600 }}>${total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </div>

              <div style={{ fontSize: '12px', color: '#8E8E93', marginBottom: '24px' }}>
                Pay in 4 interest-free payments of ${(total / 4).toFixed(2)} with <strong style={{ color: '#fff' }}>Apple Pay Later</strong> <span style={{ cursor: 'pointer' }}>ⓘ</span>
              </div>

              <button type="submit" style={{ 
                width: '100%', 
                background: '#fff', 
                color: '#000', 
                border: 'none', 
                padding: '16px', 
                borderRadius: '12px', 
                fontSize: '17px', 
                fontWeight: 600, 
                cursor: 'pointer',
                transition: 'transform 0.1s'
              }}
              onMouseDown={e => e.currentTarget.style.transform = 'scale(0.98)'}
              onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
              >
                Complete Purchase
              </button>

              <div style={{ fontSize: '12px', color: '#8E8E93', marginTop: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                <Lock size={12} /> Your payment information is secure.
              </div>
            </div>
          </div>
          
        </form>

        {/* Footer */}
        <div style={{ 
          marginTop: '60px', 
          paddingTop: '32px', 
          borderTop: '1px solid #2C2C2E', 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '24px' 
        }}>
          <div style={{ display: 'flex', gap: '12px' }}>
            <Package size={24} color="#8E8E93" />
            <div>
              <p style={{ fontSize: '14px', fontWeight: 600, margin: '0 0 4px 0', color: '#fff' }}>Free delivery</p>
              <p style={{ fontSize: '13px', color: '#8E8E93', margin: 0 }}>Get free delivery on all orders.</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <RotateCcw size={24} color="#8E8E93" />
            <div>
              <p style={{ fontSize: '14px', fontWeight: 600, margin: '0 0 4px 0', color: '#fff' }}>Easy returns</p>
              <p style={{ fontSize: '13px', color: '#8E8E93', margin: 0 }}>Return your items within 14 days.</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <Lock size={24} color="#8E8E93" />
            <div>
              <p style={{ fontSize: '14px', fontWeight: 600, margin: '0 0 4px 0', color: '#fff' }}>Secure checkout</p>
              <p style={{ fontSize: '13px', color: '#8E8E93', margin: 0 }}>Your data is protected at every step.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
