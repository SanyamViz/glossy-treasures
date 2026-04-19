import React, { useState, useEffect, useRef } from 'react';
import styles from './contact.module.css';

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

const Contact = () => {
  const [mounted, setMounted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [formRef, formVisible] = useReveal(0.1);
  const [infoRef, infoVisible] = useReveal(0.1);

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
    if (!form.email.includes('@')) e.email = 'Please enter a valid email';
    if (form.phone && form.phone.replace(/\D/g, '').length < 10) e.phone = 'Enter a valid 10-digit number';
    if (!form.message.trim()) e.message = 'Please tell us how we can help';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);

    // Simulate form submission (replace with real API in Phase 2)
    await new Promise(r => setTimeout(r, 1500));

    setSubmitting(false);
    setSubmitted(true);
    setForm({ name: '', email: '', phone: '', message: '' });

    // Reset success state after 5s
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className={`${styles.page} ${mounted ? styles.visible : ''}`}>

      {/* ── HERO ── */}
      <section className={styles.hero}>
        <div className={`${styles.heroContent} ${mounted ? styles.heroContentIn : ''}`}>
          <p className={styles.heroEyebrow}>Get in Touch</p>
          <h1 className={styles.heroTitle}>Let's create something beautiful together.</h1>
          <p className={styles.heroSub}>
            Whether you have a question, want a custom piece, or just want to say hi — Angel is here to help.
          </p>
        </div>
      </section>

      <div className={styles.container}>

        <div className={styles.layout}>

          {/* ── LEFT: FORM ── */}
          <div
            ref={formRef}
            className={`${styles.formWrap} ${formVisible ? styles.formWrapIn : ''}`}
          >
            {!submitted ? (
              <form className={styles.form} onSubmit={handleSubmit}>
                <h2 className={styles.formTitle}>Send a message</h2>

                <div className={styles.field}>
                  <label className={styles.label}>Your Name</label>
                  <input
                    className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
                    type="text"
                    placeholder="Priya Sharma"
                    value={form.name}
                    onChange={e => setField('name', e.target.value)}
                    autoComplete="name"
                  />
                  {errors.name && <span className={styles.error}>{errors.name}</span>}
                </div>

                <div className={styles.row}>
                  <div className={styles.field}>
                    <label className={styles.label}>Email</label>
                    <input
                      className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                      type="email"
                      placeholder="you@email.com"
                      value={form.email}
                      onChange={e => setField('email', e.target.value)}
                      autoComplete="email"
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
                      autoComplete="tel"
                    />
                    {errors.phone && <span className={styles.error}>{errors.phone}</span>}
                  </div>
                </div>

                <div className={styles.field}>
                  <label className={styles.label}>Your Message</label>
                  <textarea
                    className={`${styles.textarea} ${errors.message ? styles.inputError : ''}`}
                    placeholder="Tell us what you're looking for or if you have any questions..."
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
                    <>
                      Send Message
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="22" y1="2" x2="11" y2="13" />
                        <polygon points="22 2 15 22 11 13 2 9 22 2" />
                      </svg>
                    </>
                  )}
                </button>
              </form>
            ) : (
              <div className={styles.successCard}>
                <div className={styles.successIcon}>✓</div>
                <h3 className={styles.successTitle}>Message sent!</h3>
                <p className={styles.successText}>
                  Angel will get back to you within 24 hours. Check your inbox (and spam, just in case).
                </p>
                <button
                  className={styles.successBtn}
                  onClick={() => setSubmitted(false)}
                >
                  Send another message
                </button>
              </div>
            )}
          </div>

          {/* ── RIGHT: INFO ── */}
          <aside
            ref={infoRef}
            className={`${styles.info} ${infoVisible ? styles.infoIn : ''}`}
          >
            {/* WhatsApp */}
            <div className={styles.infoCard}>
              <div className={styles.infoCardIcon}>💬</div>
              <div className={styles.infoCardContent}>
                <h3 className={styles.infoCardTitle}>WhatsApp</h3>
                <p className={styles.infoCardText}>
                  Fastest way to reach Angel directly.
                </p>
                <a
                  href="https://wa.me/918544911357"
                  target="_blank"
                  rel="noreferrer"
                  className={styles.infoCardLink}
                >
                  +91 85449 11357 →
                </a>
              </div>
            </div>

            {/* Email */}
            <div className={styles.infoCard}>
              <div className={styles.infoCardIcon}>✉️</div>
              <div className={styles.infoCardContent}>
                <h3 className={styles.infoCardTitle}>Email</h3>
                <p className={styles.infoCardText}>
                  For detailed inquiries or custom orders.
                </p>
                <a
                  href="mailto:glossytreasures@gmail.com"
                  className={styles.infoCardLink}
                >
                  glossytreasures@gmail.com →
                </a>
              </div>
            </div>

            {/* Phone */}
            <div className={styles.infoCard}>
              <div className={styles.infoCardIcon}>📞</div>
              <div className={styles.infoCardContent}>
                <h3 className={styles.infoCardTitle}>Call</h3>
                <p className={styles.infoCardText}>
                  Mon–Sat, 10 AM – 7 PM IST
                </p>
                <a
                  href="tel:+918544911357"
                  className={styles.infoCardLink}
                >
                  +91 85449 11357 →
                </a>
              </div>
            </div>

            {/* Instagram */}
            <div className={styles.infoCard}>
              <div className={styles.infoCardIcon}>📸</div>
              <div className={styles.infoCardContent}>
                <h3 className={styles.infoCardTitle}>Instagram</h3>
                <p className={styles.infoCardText}>
                  DM us or browse new launches.
                </p>
                <a
                  href="https://instagram.com/glossy_treasures"
                  target="_blank"
                  rel="noreferrer"
                  className={styles.infoCardLink}
                >
                  @glossy_treasures →
                </a>
              </div>
            </div>

            {/* Location */}
            <div className={`${styles.infoCard} ${styles.infoCardFull}`}>
              <div className={styles.infoCardIcon}>📍</div>
              <div className={styles.infoCardContent}>
                <h3 className={styles.infoCardTitle}>Studio Location</h3>
                <p className={styles.infoCardText}>
                  Based in Ludhiana, Punjab<br />
                  <span className={styles.infoCardNote}>
                    (Pick-up available by appointment only)
                  </span>
                </p>
              </div>
            </div>
          </aside>

        </div>

        {/* ── FAQ STRIP ── */}
        <section className={styles.faq}>
          <h2 className={styles.faqTitle}>Quick Answers</h2>
          <div className={styles.faqGrid}>
            <div className={styles.faqCard}>
              <h3 className={styles.faqQuestion}>How long does shipping take?</h3>
              <p className={styles.faqAnswer}>
                5-7 business days across India. We ship via courier with tracking.
              </p>
            </div>
            <div className={styles.faqCard}>
              <h3 className={styles.faqQuestion}>Do you do custom orders?</h3>
              <p className={styles.faqAnswer}>
                Absolutely! WhatsApp Angel with your idea and she'll bring it to life.
              </p>
            </div>
            <div className={styles.faqCard}>
              <h3 className={styles.faqQuestion}>Can I return or exchange?</h3>
              <p className={styles.faqAnswer}>
                Yes, within 7 days if the item arrives damaged. See our policy for details.
              </p>
            </div>
            <div className={styles.faqCard}>
              <h3 className={styles.faqQuestion}>Bulk/wholesale orders?</h3>
              <p className={styles.faqAnswer}>
                We work with businesses and events. Email us for wholesale pricing.
              </p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default Contact;