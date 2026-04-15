import React, { useEffect, useRef } from 'react';
import './ForeverInResin.css';

export default function ForeverInResin() {
    const sectionRef = useRef(null);
    const stepRefs = useRef([]);

    useEffect(() => {
        const observer = new IntersectionObserver((entries, observerInstance) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observerInstance.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        stepRefs.current.forEach(step => {
            if (step) observer.observe(step);
        });

        return () => {
            if (sectionRef.current) observer.unobserve(sectionRef.current);
            stepRefs.current.forEach(step => {
                if (step) observer.unobserve(step);
            });
        };
    }, []);

    const addToStepRefs = (el) => {
        if (el && !stepRefs.current.includes(el)) {
            stepRefs.current.push(el);
        }
    };

    return (
        <section className="forever-in-resin">
            <div className="forever-container" ref={sectionRef}>
                <div className="forever-label">A SERVICE WITH HEART</div>

                <h2 className="forever-headline">
                    <span className="first-line">Some things deserve</span>
                    <span className="shimmer-line">to last forever.</span>
                </h2>

                <p className="forever-subtext">
                    Send us what matters most — a rose from your anniversary, your wedding
                    bouquet, a dried flower from someone you've lost. Angel will preserve it
                    by hand and return it to you, encased in resin, beautiful forever.
                </p>

                <div className="forever-divider"></div>

                <div className="forever-grid">
                    <div className="grid-card">
                        <svg className="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 22V12" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 12c-2-1-3-3-2-5 .7-1.4 3-2 3-2s2.3.6 3 2c1 2 0 4-2 5-1 .5-2 0-2 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 5c-1-2-3-2-3-2s.6-2 2-3c1.4-.7 3 0 3 0s1.6-.7 3 0c1.4 1 2 3 2 3s-2 0-3 2-2 1-2 1" />
                        </svg>
                        <span className="card-label">Flowers & Bouquets</span>
                    </div>

                    <div className="grid-card">
                        <svg className="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                        </svg>
                        <span className="card-label">Wedding Keepsakes</span>
                    </div>

                    <div className="grid-card">
                        <svg className="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2 22l10-10" />
                        </svg>
                        <span className="card-label">Dried Botanicals</span>
                    </div>

                    <div className="grid-card">
                        <svg className="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                        </svg>
                        <span className="card-label">Special Mementos</span>
                    </div>
                </div>

                <div className="forever-steps">
                    <div className="mobile-connecting-line"></div>

                    <div className="forever-step" ref={addToStepRefs} style={{ transitionDelay: '0ms' }}>
                        <div className="step-number">1</div>
                        <div className="step-content">
                            <h3 className="step-title">Send Your Treasure</h3>
                            <p className="step-desc">Package your item carefully and ship it to us with a note sharing its story. We handle everything with love.</p>
                        </div>
                    </div>

                    <div className="forever-step" ref={addToStepRefs} style={{ transitionDelay: '150ms' }}>
                        <div className="step-number">2</div>
                        <div className="step-content">
                            <h3 className="step-title">Angel Creates Your Piece</h3>
                            <p className="step-desc">Each item is hand-preserved and set in crystal-clear resin. No moulds, no machines — just craft and care.</p>
                        </div>
                    </div>

                    <div className="forever-step" ref={addToStepRefs} style={{ transitionDelay: '300ms' }}>
                        <div className="step-number">3</div>
                        <div className="step-content">
                            <h3 className="step-title">Yours Forever</h3>
                            <p className="step-desc">Your finished piece is delivered back to you, ready to display, gift, or treasure for a lifetime.</p>
                        </div>
                    </div>
                </div>

                <div className="price-section">
                    <div className="price-badge">Starting from ₹500</div>
                    <p className="price-subtext">Every piece is one-of-a-kind. Pricing depends on item size and complexity.</p>
                </div>

                <div className="forever-actions">
                    <button className="action-btn btn-primary">PRESERVE MY MEMORY</button>
                    <button className="action-btn btn-secondary">SEE PAST CREATIONS &rarr;</button>
                </div>

                <div className="trust-line">
                    <svg className="trust-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2 22l10-10" />
                    </svg>
                    <span>We handle your items with the same care we'd want for our own.</span>
                </div>
            </div>
        </section>
    );
}
