import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from './Shipping.module.css';
// ── Scroll reveal hook ────────────────────────────────
function useReveal(threshold = 0.15) {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const fallback = setTimeout(() => setVisible(true), 900);
        const obs = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) { setVisible(true); clearTimeout(fallback); obs.disconnect(); } },
            { threshold }
        );
        if (ref.current) obs.observe(ref.current);
        return () => { clearTimeout(fallback); obs.disconnect(); };
    }, []);
    return [ref, visible];
}

// ── Info card component ───────────────────────────────
function InfoCard({ icon, title, children, delay = 0 }) {
    const [ref, visible] = useReveal(0.1);
    return (
        <div
            ref={ref}
            className={`${styles.card} ${visible ? styles.cardVisible : ''}`}
            style={{ '--delay': `${delay}ms` }}
        >
            <div className={styles.cardIcon}>{icon}</div>
            <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{title}</h3>
                <div className={styles.cardText}>{children}</div>
            </div>
        </div>
    );
}

const Shipping = () => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const t = setTimeout(() => setMounted(true), 50);
        return () => clearTimeout(t);
    }, []);

    return (
        <div className={`${styles.page} ${mounted ? styles.visible : ''}`}>

            {/* ── HERO ── */}
            <section className={styles.hero}>
                <div className={`${styles.heroContent} ${mounted ? styles.heroContentIn : ''}`}>
                    <p className={styles.heroEyebrow}>Policies</p>
                    <h1 className={styles.heroTitle}>Shipping & Returns</h1>
                    <p className={styles.heroSub}>
                        Everything you need to know about delivery, returns, and exchanges.
                    </p>
                </div>
            </section>

            <div className={styles.container}>

                {/* ── QUICK OVERVIEW ── */}
                <section className={styles.overview}>
                    <div className={styles.overviewGrid}>
                        <div className={styles.overviewCard}>
                            <span className={styles.overviewIcon}>📦</span>
                            <span className={styles.overviewLabel}>5-7 Days</span>
                            <span className={styles.overviewText}>Delivery Time</span>
                        </div>
                        <div className={styles.overviewCard}>
                            <span className={styles.overviewIcon}>🚚</span>
                            <span className={styles.overviewLabel}>Free Shipping</span>
                            <span className={styles.overviewText}>Orders ₹999+</span>
                        </div>
                        <div className={styles.overviewCard}>
                            <span className={styles.overviewIcon}>🔄</span>
                            <span className={styles.overviewLabel}>7 Days</span>
                            <span className={styles.overviewText}>Return Window</span>
                        </div>
                        <div className={styles.overviewCard}>
                            <span className={styles.overviewIcon}>✓</span>
                            <span className={styles.overviewLabel}>Trackable</span>
                            <span className={styles.overviewText}>All Orders</span>
                        </div>
                    </div>
                </section>

                {/* ── SHIPPING SECTION ── */}
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Shipping Information</h2>

                    <InfoCard icon="🌍" title="Delivery Coverage" delay={0}>
                        <p>We deliver across India via trusted courier partners. Every order is carefully packed and shipped with tracking.</p>
                    </InfoCard>

                    <InfoCard icon="⏱️" title="Processing Time" delay={100}>
                        <p>
                            <strong>Made-to-order items:</strong> 2-3 business days to craft<br />
                            <strong>In-stock items:</strong> Ships within 1 business day
                        </p>
                        <p className={styles.note}>
                            Orders placed on weekends or holidays ship the next working day.
                        </p>
                    </InfoCard>

                    <InfoCard icon="📍" title="Delivery Timeline" delay={200}>
                        <p>
                            <strong>Metro cities:</strong> 3-5 business days<br />
                            <strong>Other locations:</strong> 5-7 business days
                        </p>
                        <p className={styles.note}>
                            Delays may occur during peak seasons (Diwali, Valentine's, Christmas).
                        </p>
                    </InfoCard>

                    <InfoCard icon="💰" title="Shipping Costs" delay={300}>
                        <p>
                            <strong>Orders ₹999 and above:</strong> FREE shipping<br />
                            <strong>Orders below ₹999:</strong> ₹99 flat rate
                        </p>
                    </InfoCard>

                    <InfoCard icon="📦" title="Packaging" delay={400}>
                        <p>
                            Every item is hand-wrapped in tissue paper, sealed with our wax stamp, and packed in a branded gift box. We take extra care with fragile resin pieces — they're cushioned with bubble wrap and secured to prevent damage.
                        </p>
                    </InfoCard>

                    <InfoCard icon="📬" title="Tracking Your Order" delay={500}>
                        <p>
                            Once your order ships, you'll receive an email with a tracking link. You can monitor your delivery in real-time. No tracking number? Check your spam folder or WhatsApp Angel at <a href="https://wa.me/918544911357" target="_blank" rel="noreferrer">+91 85449 11357</a>.
                        </p>
                    </InfoCard>
                </section>

                {/* ── RETURNS SECTION ── */}
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Returns & Exchanges</h2>

                    <InfoCard icon="🔄" title="Return Window" delay={0}>
                        <p>
                            You have <strong>7 days from delivery</strong> to initiate a return or exchange. The product must be unused, in original packaging, with all tags intact.
                        </p>
                    </InfoCard>

                    <InfoCard icon="✅" title="What's Returnable" delay={100}>
                        <ul className={styles.list}>
                            <li>Items that arrived damaged or defective</li>
                            <li>Incorrect items shipped by mistake</li>
                            <li>Products that don't match the description</li>
                        </ul>
                    </InfoCard>

                    <InfoCard icon="❌" title="What's Not Returnable" delay={200}>
                        <ul className={styles.list}>
                            <li>Personalized or custom-made items</li>
                            <li>Candles that have been lit or used</li>
                            <li>Items without original packaging or tags</li>
                            <li>Products purchased during sale or clearance</li>
                        </ul>
                    </InfoCard>

                    <InfoCard icon="📸" title="How to Return" delay={300}>
                        <ol className={styles.list}>
                            <li>WhatsApp us at <a href="https://wa.me/918544911357" target="_blank" rel="noreferrer">+91 85449 11357</a> within 7 days of delivery</li>
                            <li>Share photos of the issue (if damaged/defective)</li>
                            <li>We'll arrange a reverse pickup or provide return instructions</li>
                            <li>Once we receive and inspect the item, we'll process your refund or exchange</li>
                        </ol>
                    </InfoCard>

                    <InfoCard icon="💳" title="Refunds" delay={400}>
                        <p>
                            Refunds are processed within <strong>5-7 business days</strong> after we receive the returned item. The amount will be credited to your original payment method. For COD orders, we'll issue a bank transfer or store credit.
                        </p>
                    </InfoCard>

                    <InfoCard icon="🔁" title="Exchanges" delay={500}>
                        <p>
                            Want a different size, scent, or color? We're happy to exchange! Just let us know within 7 days and we'll help you swap it. Shipping for exchanges is free if it's our mistake; otherwise, standard shipping applies.
                        </p>
                    </InfoCard>
                </section>

                {/* ── DAMAGED ITEMS ── */}
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Damaged or Missing Items</h2>

                    <InfoCard icon="📦" title="Damaged Delivery" delay={0}>
                        <p>
                            If your package arrives damaged, <strong>don't accept it</strong> from the courier. Take photos and WhatsApp us immediately. We'll send a replacement at no extra cost.
                        </p>
                        <p className={styles.note}>
                            Already accepted it? No worries — send us photos within 24 hours and we'll still help you out.
                        </p>
                    </InfoCard>

                    <InfoCard icon="❓" title="Missing Items" delay={100}>
                        <p>
                            If something's missing from your order, reach out within 48 hours of delivery. We'll either send the missing item or issue a partial refund.
                        </p>
                    </InfoCard>
                </section>

                {/* ── CTA ── */}
                <section className={styles.cta}>
                    <div className={styles.ctaContent}>
                        <h2 className={styles.ctaTitle}>Still have questions?</h2>
                        <p className={styles.ctaText}>
                            We're here to help. Reach out and we'll get back to you within 24 hours.
                        </p>
                        <div className={styles.ctaButtons}>
                            <Link to="/contact" className={styles.ctaBtn}>
                                Contact Us
                            </Link>
                            <a
                                href="https://wa.me/918544911357"
                                target="_blank"
                                rel="noreferrer"
                                className={styles.ctaBtnOutline}
                            >
                                WhatsApp Angel
                            </a>
                        </div>
                    </div>
                </section>

            </div>
        </div>
    );
};

export default Shipping;