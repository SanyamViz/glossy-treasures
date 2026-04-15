import React from 'react';
import { Link } from 'react-router-dom';
import './GiftBuilder.css';

export default function GiftBuilder() {
    return (
        <section className="gift-builder-section">
            <div className="gift-builder-container">
                <p className="gift-builder-label">A PERSONALISED EXPERIENCE</p>
                <h2 className="gift-builder-heading">The Gift Builder</h2>

                <div className="gift-builder-steps">
                    <div className="gb-step">
                        <div className="gb-step-circle">1</div>
                        <div className="gb-step-text">
                            <h3 className="gb-step-title">Select Your Candle</h3>
                            <p className="gb-step-desc">Choose a scent that speaks to them.</p>
                        </div>
                    </div>

                    <div className="gb-step">
                        <div className="gb-step-circle">2</div>
                        <div className="gb-step-text">
                            <h3 className="gb-step-title">Pair with Resin Art</h3>
                            <p className="gb-step-desc">A tray, coaster or frame for the finish.</p>
                        </div>
                    </div>

                    <div className="gb-step">
                        <div className="gb-step-circle">3</div>
                        <div className="gb-step-text">
                            <h3 className="gb-step-title">Add a Personal Note</h3>
                            <p className="gb-step-desc">We hand-write every card with love.</p>
                        </div>
                    </div>
                </div>

                <Link to="/build-hamper" className="gb-cta-btn">
                    START CURATING
                </Link>
            </div>
        </section>
    );
}
