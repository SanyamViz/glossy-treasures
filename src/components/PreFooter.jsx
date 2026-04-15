import React from 'react';
import './PreFooter.css';

export default function PreFooter() {
    return (
        <section className="pre-footer-section">
            <div className="pre-footer-container">
                <div className="pf-col-left">
                    <h2 className="pf-heading">Need Help?</h2>
                    <p className="pf-subtext">We're here for you</p>
                    <div className="pf-buttons-wrap">
                        <a 
                            href="https://wa.me/918544911357" 
                            target="_blank" 
                            rel="noreferrer" 
                            className="pf-btn"
                        >
                            Chat on WhatsApp
                        </a>
                        <a 
                            href="mailto:glossytreasures@gmail.com" 
                            className="pf-btn"
                        >
                            Email Us
                        </a>
                    </div>
                </div>
                
                <div className="pf-col-right">
                    <h2 className="pf-heading">Stay in Touch</h2>
                    <p className="pf-subtext">New launches, offers and more — straight to your inbox</p>
                    <div className="pf-form-row">
                        <input 
                            type="email" 
                            className="pf-input" 
                            placeholder="Your email address" 
                            aria-label="Your email address"
                        />
                        <button className="pf-submit-btn">Subscribe</button>
                    </div>
                </div>
            </div>
        </section>
    );
}
