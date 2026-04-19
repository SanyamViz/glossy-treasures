import React from 'react'
import ReactDOM from 'react-dom/client'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './styles/globals.css'
import App from './App.jsx'

import { CartProvider } from './context/CartContext'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <CartProvider>
            <BrowserRouter>
                <div className="bg-blobs"></div>
                <App />
            </BrowserRouter>
        </CartProvider>
    </StrictMode>
)