import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CartProvider } from './context/CartContext.jsx'
import { WishlistProvider } from './context/WishlistContext'; 

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <WishlistProvider>
    <CartProvider>
    <App />
    </CartProvider>
    </WishlistProvider>
  </StrictMode>,
)
