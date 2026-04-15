import React from 'react';
import './TrustBar.css';

export default function TrustBar() {
    return (
        <section className="trust-bar-section">
            <div className="trust-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#B8965A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 3h15v11H1zM16 8h4l2 3v3h-6V8z M5.5 17a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM18.5 17a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/>
                </svg>
                <div className="trust-text-wrap">
                    <p className="trust-label">Free Delivery</p>
                    <p className="trust-sublabel">On orders above ₹999</p>
                </div>
            </div>

            <div className="trust-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#B8965A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z"/>
                </svg>
                <div className="trust-text-wrap">
                    <p className="trust-label">Handmade with Love</p>
                    <p className="trust-sublabel">Every piece crafted by Angel</p>
                </div>
            </div>

            <div className="trust-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#B8965A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2L3 7v6c0 5.25 3.75 10.15 9 11.25C17.25 23.15 21 18.25 21 13V7L12 2z"/>
                </svg>
                <div className="trust-text-wrap">
                    <p className="trust-label">Secure COD</p>
                    <p className="trust-sublabel">Pay safely on delivery</p>
                </div>
            </div>

            <div className="trust-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#B8965A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M23 4v6h-6M1 20v-6h6M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"/>
                </svg>
                <div className="trust-text-wrap">
                    <p className="trust-label">Easy Returns</p>
                    <p className="trust-sublabel">Hassle-free 7 day returns</p>
                </div>
            </div>
        </section>
    );
}
