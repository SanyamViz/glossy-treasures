import React from 'react';
import { Link } from 'react-router-dom';
import './WholesaleTeaser.css';

export default function WholesaleTeaser() {
    return (
        <section className="wholesale-teaser-section">
            <div className="wholesale-container">
                <div className="wt-left">
                    <p className="wt-label">FOR BUSINESSES & EVENTS</p>
                    <h2 className="wt-heading">Buying in Bulk?</h2>
                    <p className="wt-subtext">
                        We work with wedding planners, corporate gifters, boutiques and event organizers. Custom quantities, custom packaging, crafted with the same love.
                    </p>
                    <div className="wt-divider"></div>
                    <div className="wt-trust-points">
                        <span className="wt-trust-point">&middot; Minimum 10 units</span>
                        <span className="wt-trust-point">&middot; Custom packaging available</span>
                        <span className="wt-trust-point">&middot; Bulk pricing on request</span>
                    </div>
                </div>
                
                <div className="wt-right">
                    <div className="wt-buttons-group">
                        <a 
                            href="https://wa.me/918544911357" 
                            target="_blank" 
                            rel="noreferrer" 
                            className="wt-btn wt-btn-wa"
                        >
                            WhatsApp Us
                        </a>
                        <a 
                            href="mailto:glossytreasures@gmail.com" 
                            className="wt-btn wt-btn-email"
                        >
                            Send an Enquiry
                        </a>
                        <Link to="/wholesale" className="wt-btn-link">
                            View Wholesale Details &rarr;
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
