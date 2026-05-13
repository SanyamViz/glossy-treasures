import React from 'react'
import ReactDOM from 'react-dom/client'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import './styles/globals.css'
import App from './App.jsx'
import { ClerkProvider } from "@clerk/react";

import { CartProvider } from './context/CartContext'
import { WishlistProvider } from './context/WishlistContext'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <HelmetProvider>
            <ClerkProvider afterSignOutUrl="/">
            <WishlistProvider>
                <CartProvider>
                <BrowserRouter>
                    <div className="bg-blobs"></div>
                    <App />
                </BrowserRouter>
                </CartProvider>
            </WishlistProvider>
            </ClerkProvider>
        </HelmetProvider>
    </StrictMode>
)