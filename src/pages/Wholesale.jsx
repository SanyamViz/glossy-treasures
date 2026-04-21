import React, { useState, useEffect, useRef } from 'react';
import styles from './Wholesale.module.css';

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

const Wholesale = () => {
    const [mounted, setMounted] = useState(false);
    const [form, setForm] = useState({
        name: '', business: '', email: '', phone: '',
        interest: '', quantity: '', message: ''
    });
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const [formRef, formVisible] = useReveal(0.1);
    const [benefitsRef, benefitsVisible] = useReveal(0.1);

    useEffect(() => {
        const t = setTimeout(() => setMounted(true), 50);
        return () => clearTimeout(t);
    }, []);

    const setField = (key, val) => {
        setForm(f => ({ ...f, [key]: val }));
        if (errors[key]) setErrors(e => ({ ...e, [key]: null }));
    };

    const validate = () => {
        const e = {};
        if (!form.name.trim()) e.name = 'Please enter your name';
        if (!form.business.trim()) e.business = 'Please enter your business name';
        if (!form.email.includes('@')) e.email = 'Please enter a valid email';
        if (form.phone && form.phone.replace(/\D/g, '').length < 10) e.phone = 'Enter a valid 10-digit number';
        if (!form.interest) e.interest = 'Please select what you\'re interested in';
        if (!form.message.trim()) e.message = 'Please tell us about your needs';
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;
        setSubmitting(true);
        await new Promise(r => setTimeout(r, 1500));
        setSubmitting(false);
        setSubmitted(true);
        setForm({ name: '', business: '', email: '', phone: '', interest: '', quantity: '', message: '' });
        setTimeout(() => setSubmitted(false), 5000);
    };

    return (
        <div className={`${styles.page} ${mounted ? styles.visible : ''}`}>

            {/* ── HERO ── */}
            <section className={styles.hero}>
                <div className={`${styles.heroContent} ${mounted ? styles.heroContentIn : ''}`}>
                    <p className={styles.heroEyebrow}>For Businesses</p>
                    <h1 className={styles.heroTitle}>Wholesale & Bulk Orders</h1>
                    <p className={styles.heroSub}>
                        Partner with Glossy Treasures for hotels, events, corporate gifting, and retail.
                    </p>
                </div>
            </section>

            <div className={styles.container}>

                <div className={styles.layout}>

                    {/* ── LEFT: INFO ── */}
                    <div
                        ref={benefitsRef}
                        className={`${styles.infoWrap} ${benefitsVisible ? styles.infoWrapIn : ''}`}
                    >
                        <h2 className={styles.infoTitle}>Why work with us?</h2>

                        <div className={styles.benefit}>
                            <span className={styles.benefitIcon}>🎨</span>
                            <div>
                                <h3 className={styles.benefitTitle}>Handcrafted Quality</h3>
                                <p className={styles.benefitText}>
                                    Every piece is made by Angel herself. No mass production, no shortcuts.
                                </p>
                            </div>
                        </div>

                        <div className={styles.benefit}>
                            <span className={styles.benefitIcon}>📦</span>
                            <div>
                                <h3 className={styles.benefitTitle}>Custom Branding</h3>
                                <p className={styles.benefitText}>
                                    Add your logo, custom scents, or personalized packaging for corporate gifts.
                                </p>
                            </div>
                        </div>

                        <div className={styles.benefit}>
                            <span className={styles.benefitIcon}>💰</span>
                            <div>
                                <h3 className={styles.benefitTitle}>Volume Discounts</h3>
                                <p className={styles.benefitText}>
                                    Competitive pricing for bulk orders starting at 20+ pieces.
                                </p>
                            </div>
                        </div>

                        <div className={styles.benefit}>
                            <span className={styles.benefitIcon}>⏱️</span>
                            <div>
                                <h3 className={styles.benefitTitle}>Flexible Lead Times</h3>
                                <p className={styles.benefitText}>
                                    We work around your event dates and delivery schedules.
                                </p>
                            </div>
                        </div>

                        <div className={styles.benefit}>
                            <span className={styles.benefitIcon}>✨</span>
                            <div>
                                <h3 className={styles.benefitTitle}>Bespoke Designs</h3>
                                <p className={styles.benefitText}>
                                    Need something unique? We'll create custom pieces tailored to your brand.
                                </p>
                            </div>
                        </div>

                        {/* Use cases */}
                        <div className={styles.useCases}>
                            <h3 className={styles.useCasesTitle}>Perfect for</h3>
                            <div className={styles.useCasesGrid}>
                                <span className={styles.useCase}>🏨 Hotels & Spas</span>
                                <span className={styles.useCase}>💼 Corporate Gifts</span>
                                <span className={styles.useCase}>💍 Weddings & Events</span>
                                <span className={styles.useCase}>🏪 Retail Stores</span>
                                <span className={styles.useCase}>🎁 Hamper Companies</span>
                                <span className={styles.useCase}>🎉 Party Favors</span>
                            </div>
                        </div>

                        {/* Quick contact */}
                        <div className={styles.quickContact}>
                            <p className={styles.quickContactText}>Prefer to talk? Reach Angel directly:</p>
                            <a
                                href="https://wa.me/918544911357"
                                target="_blank"
                                rel="noreferrer"
                                className={styles.whatsappBtn}
                            >
                                <span>💬</span>
                                WhatsApp: +91 85449 11357
                            </a>
                            <a
                                href="mailto:glossytreasures@gmail.com"
                                className={styles.emailBtn}
                            >
                                <span>✉️</span>
                                glossytreasures@gmail.com
                            </a>
                        </div>
                    </div>

                    {/* ── RIGHT: FORM ── */}
                    <div
                        ref={formRef}
                        className={`${styles.formWrap} ${formVisible ? styles.formWrapIn : ''}`}
                    >
                        {!submitted ? (
                            <form className={styles.form} onSubmit={handleSubmit}>
                                <h2 className={styles.formTitle}>Request a Quote</h2>
                                <p className={styles.formDesc}>
                                    Tell us about your project and we'll get back to you within 24 hours.
                                </p>

                                <div className={styles.field}>
                                    <label className={styles.label}>Your Name</label>
                                    <input
                                        className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
                                        type="text"
                                        placeholder="Priya Sharma"
                                        value={form.name}
                                        onChange={e => setField('name', e.target.value)}
                                    />
                                    {errors.name && <span className={styles.error}>{errors.name}</span>}
                                </div>

                                <div className={styles.field}>
                                    <label className={styles.label}>Business Name</label>
                                    <input
                                        className={`${styles.input} ${errors.business ? styles.inputError : ''}`}
                                        type="text"
                                        placeholder="The Oberoi Hotels"
                                        value={form.business}
                                        onChange={e => setField('business', e.target.value)}
                                    />
                                    {errors.business && <span className={styles.error}>{errors.business}</span>}
                                </div>

                                <div className={styles.row}>
                                    <div className={styles.field}>
                                        <label className={styles.label}>Email</label>
                                        <input
                                            className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                                            type="email"
                                            placeholder="you@company.com"
                                            value={form.email}
                                            onChange={e => setField('email', e.target.value)}
                                        />
                                        {errors.email && <span className={styles.error}>{errors.email}</span>}
                                    </div>
                                    <div className={styles.field}>
                                        <label className={styles.label}>
                                            Phone <span className={styles.optional}>(optional)</span>
                                        </label>
                                        <input
                                            className={`${styles.input} ${errors.phone ? styles.inputError : ''}`}
                                            type="tel"
                                            placeholder="98765 43210"
                                            value={form.phone}
                                            onChange={e => setField('phone', e.target.value.replace(/\D/g, '').slice(0, 10))}
                                            inputMode="numeric"
                                        />
                                        {errors.phone && <span className={styles.error}>{errors.phone}</span>}
                                    </div>
                                </div>

                                <div className={styles.field}>
                                    <label className={styles.label}>Interested In</label>
                                    <select
                                        className={`${styles.select} ${errors.interest ? styles.inputError : ''}`}
                                        value={form.interest}
                                        onChange={e => setField('interest', e.target.value)}
                                    >
                                        <option value="">Select an option</option>
                                        <option value="candles">Candles</option>
                                        <option value="resin">Resin Art</option>
                                        <option value="both">Both Candles & Resin</option>
                                        <option value="custom">Custom/Bespoke Design</option>
                                    </select>
                                    {errors.interest && <span className={styles.error}>{errors.interest}</span>}
                                </div>

                                <div className={styles.field}>
                                    <label className={styles.label}>
                                        Estimated Quantity <span className={styles.optional}>(optional)</span>
                                    </label>
                                    <input
                                        className={styles.input}
                                        type="text"
                                        placeholder="e.g., 50 pieces, 100 candles"
                                        value={form.quantity}
                                        onChange={e => setField('quantity', e.target.value)}
                                    />
                                </div>

                                <div className={styles.field}>
                                    <label className={styles.label}>Tell Us About Your Project</label>
                                    <textarea
                                        className={`${styles.textarea} ${errors.message ? styles.inputError : ''}`}
                                        placeholder="What's your timeline? Do you need custom branding? Any specific requirements?"
                                        value={form.message}
                                        onChange={e => setField('message', e.target.value)}
                                        rows={5}
                                    />
                                    {errors.message && <span className={styles.error}>{errors.message}</span>}
                                </div>

                                <button
                                    type="submit"
                                    className={`${styles.submitBtn} ${submitting ? styles.submitBtnLoading : ''}`}
                                    disabled={submitting}
                                >
                                    {submitting ? (
                                        <>
                                            <span className={styles.spinner} />
                                            Sending...
                                        </>
                                    ) : (
                                        'Request Quote'
                                    )}
                                </button>
                            </form>
                        ) : (
                            <div className={styles.successCard}>
                                <div className={styles.successIcon}>✓</div>
                                <h3 className={styles.successTitle}>Quote request sent!</h3>
                                <p className={styles.successText}>
                                    Angel will review your request and get back to you within 24 hours with pricing and next steps.
                                </p>
                                <button
                                    className={styles.successBtn}
                                    onClick={() => setSubmitted(false)}
                                >
                                    Send another request
                                </button>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Wholesale;