import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Privacypolicy.module.css';

const PrivacyPolicy = () => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const t = setTimeout(() => setMounted(true), 50);
        return () => clearTimeout(t);
    }, []);

    const lastUpdated = "April 21, 2026";

    return (
        <div className={`${styles.page} ${mounted ? styles.visible : ''}`}>

            {/* ── HERO ── */}
            <section className={styles.hero}>
                <div className={`${styles.heroContent} ${mounted ? styles.heroContentIn : ''}`}>
                    <p className={styles.heroEyebrow}>Legal</p>
                    <h1 className={styles.heroTitle}>Privacy Policy</h1>
                    <p className={styles.heroSub}>
                        How we collect, use, and protect your information.
                    </p>
                    <p className={styles.lastUpdated}>Last updated: {lastUpdated}</p>
                </div>
            </section>

            <div className={styles.container}>

                {/* ── TLDR ── */}
                <section className={styles.tldr}>
                    <h2 className={styles.tldrTitle}>TL;DR</h2>
                    <p className={styles.tldrText}>
                        We collect your name, email, phone, and address to fulfill orders.
                        We don't sell your data to anyone. Ever. We only share what's necessary
                        with shipping partners to deliver your order. You can request to see or
                        delete your data anytime by emailing us at{' '}
                        <a href="mailto:glossytreasures7@gmail.com">glossytreasures7@gmail.com</a>.
                    </p>
                </section>

                {/* ── CONTENT ── */}
                <section className={styles.content}>

                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>1. Information We Collect</h2>
                        <p className={styles.text}>
                            When you place an order, we collect:
                        </p>
                        <ul className={styles.list}>
                            <li><strong>Personal details:</strong> Name, email, phone number</li>
                            <li><strong>Shipping address:</strong> To deliver your order</li>
                            <li><strong>Payment information:</strong> Processed securely via our payment partners (we never store card details)</li>
                            <li><strong>Order history:</strong> To help with support and future purchases</li>
                        </ul>
                        <p className={styles.text}>
                            We also collect basic browsing data like IP address and device type to improve your experience on our site.
                        </p>
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>2. How We Use Your Information</h2>
                        <p className={styles.text}>We use your data to:</p>
                        <ul className={styles.list}>
                            <li>Process and fulfill your orders</li>
                            <li>Send order confirmations and shipping updates</li>
                            <li>Respond to your questions and support requests</li>
                            <li>Send occasional updates about new products or offers (you can opt out anytime)</li>
                            <li>Improve our website and customer experience</li>
                        </ul>
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>3. Who We Share Your Data With</h2>
                        <p className={styles.text}>
                            We share your information only when necessary:
                        </p>
                        <ul className={styles.list}>
                            <li><strong>Shipping partners:</strong> To deliver your order (they only get your name, phone, and address)</li>
                            <li><strong>Payment processors:</strong> To handle transactions securely (Razorpay, etc.)</li>
                            <li><strong>Legal requirements:</strong> If required by law or to protect our rights</li>
                        </ul>
                        <p className={styles.text}>
                            <strong>We do not sell, rent, or trade your personal information to third parties. Period.</strong>
                        </p>
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>4. Data Security</h2>
                        <p className={styles.text}>
                            We take security seriously. Your data is stored securely and encrypted during transmission.
                            Payment information is handled by certified payment processors and never stored on our servers.
                        </p>
                        <p className={styles.text}>
                            While we use industry-standard security measures, no system is 100% foolproof.
                            If you notice any suspicious activity, contact us immediately at{' '}
                            <a href="mailto:glossytreasures7@gmail.com">glossytreasures7@gmail.com</a>.
                        </p>
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>5. Cookies</h2>
                        <p className={styles.text}>
                            We use cookies to remember your cart, keep you logged in, and analyze site traffic.
                            You can disable cookies in your browser settings, but some features may not work properly.
                        </p>
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>6. Your Rights</h2>
                        <p className={styles.text}>You have the right to:</p>
                        <ul className={styles.list}>
                            <li><strong>Access your data:</strong> Request a copy of the information we have about you</li>
                            <li><strong>Update your data:</strong> Correct any inaccurate information</li>
                            <li><strong>Delete your data:</strong> Request that we remove your personal information</li>
                            <li><strong>Opt out of marketing:</strong> Unsubscribe from promotional emails anytime</li>
                        </ul>
                        <p className={styles.text}>
                            To exercise any of these rights, email us at{' '}
                            <a href="mailto:glossytreasures@gmail.com">glossytreasures@gmail.com</a> and we'll respond within 7 business days.
                        </p>
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>7. Data Retention</h2>
                        <p className={styles.text}>
                            We keep your order history and personal information for as long as your account is active,
                            or as needed to provide services, comply with legal obligations, resolve disputes, and enforce our agreements.
                        </p>
                        <p className={styles.text}>
                            If you request deletion, we'll remove your data within 30 days, except where we're required to keep it by law.
                        </p>
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>8. Third-Party Links</h2>
                        <p className={styles.text}>
                            Our website may contain links to Instagram, WhatsApp, or other external sites.
                            We're not responsible for the privacy practices of those platforms.
                            Please review their privacy policies before sharing information.
                        </p>
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>9. Children's Privacy</h2>
                        <p className={styles.text}>
                            Our services are not directed to anyone under 18. We don't knowingly collect personal
                            information from children. If you believe we've collected data from a child, contact us
                            immediately and we'll delete it.
                        </p>
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>10. Changes to This Policy</h2>
                        <p className={styles.text}>
                            We may update this policy from time to time. Any changes will be posted on this page
                            with a new "Last updated" date. If we make major changes, we'll notify you via email
                            or a notice on our website.
                        </p>
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>11. Contact Us</h2>
                        <p className={styles.text}>
                            Questions about this policy? Reach out to us:
                        </p>
                        <ul className={styles.contactList}>
                            <li>
                                <strong>Email:</strong>{' '}
                                <a href="mailto:glossytreasures7@gmail.com">glossytreasures7@gmail.com</a>
                            </li>
                            <li>
                                <strong>WhatsApp:</strong>{' '}
                                <a href="https://wa.me/918544911357" target="_blank" rel="noreferrer">+91 85449 11357</a>
                            </li>
                            <li>
                                <strong>Address:</strong> Abohar, Punjab, India
                            </li>
                        </ul>
                    </div>

                </section>

                {/* ── CTA ── */}
                <section className={styles.cta}>
                    <div className={styles.ctaContent}>
                        <h2 className={styles.ctaTitle}>Ready to shop with confidence?</h2>
                        <p className={styles.ctaText}>
                            Your privacy matters to us. Browse our collection knowing your data is safe.
                        </p>
                        <div className={styles.ctaButtons}>
                            <Link to="/shop/candles" className={styles.ctaBtn}>
                                Shop Candles
                            </Link>
                            <Link to="/shop/resin" className={styles.ctaBtnOutline}>
                                Shop Resin Art
                            </Link>
                        </div>
                    </div>
                </section>

            </div>
        </div>
    );
};

export default PrivacyPolicy;