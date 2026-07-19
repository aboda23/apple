import React, { createContext, useState, useEffect, useContext } from 'react';
import toast from 'react-hot-toast';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('apple_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('apple_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const toggleWishlist = (product) => {
    const isExist = wishlist.find(item => item.id === product.id);
    if (isExist) {
      setWishlist(wishlist.filter(item => item.id !== product.id));
      toast.success(`${product.name} removed from Wishlist`, {
        style: {
          background: '#222',
          color: '#fff',
          borderRadius: '12px',
          border: '1px solid #333'
        },
        iconTheme: {
          primary: '#ff453a',
          secondary: '#fff',
        },
      });
    } else {
      setWishlist([...wishlist, product]);
      toast.success(`${product.name} added to Wishlist`, {
        style: {
          background: '#222',
          color: '#fff',
          borderRadius: '12px',
          border: '1px solid #333'
        },
        iconTheme: {
          primary: '#ff453a',
          secondary: '#fff',
        },
      });
    }
  };

  const isInWishlist = (productId) => {
    return wishlist.some(item => item.id === productId);
  };

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
