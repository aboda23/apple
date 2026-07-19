import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import AppRouter from './routes/Router';
import { Toaster } from 'react-hot-toast';
import { WishlistProvider } from './context/WishlistContext';


export default function App() {
  return (
      <WishlistProvider>
        <BrowserRouter>
            <Toaster position="top-center" reverseOrder={false} />
            <AppRouter />
        </BrowserRouter>
      </WishlistProvider>
  );
}
