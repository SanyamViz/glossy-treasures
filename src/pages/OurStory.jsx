import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from './OurStory.module.css';

// ── Reusable scroll reveal hook ───────────────────────
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

// ── Animated number counter ───────────────────────────
function Counter({ to, suffix = '', duration = 1800 }) {
    const [count, setCount] = useState(0);
    const [ref, visible] = useReveal(0.3);
    const started = useRef(false);

    useEffect(() => {
        if (!visible || started.current) return;
        started.current = true;
        const start = performance.now();
        const tick = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(ease * to));
            if (progress < 1) requestAnimationFrame(tick);
            else setCount(to);
        };
        requestAnimationFrame(tick);
    }, [visible]);

    return <span ref={ref}>{count}{suffix}</span>;
}

// ── Chapter block ─────────────────────────────────────
function Chapter({ number, title, body, align = 'left', delay = 0 }) {
    const [ref, visible] = useReveal(0.1);
    return (
        <div
            ref={ref}
            className={`${styles.chapter} ${styles[`align${align}`]} ${visible ? styles.chapterVisible : ''}`}
            style={{ '--delay': `${delay}ms` }}
        >
            <span className={styles.chapterNumber}>{number}</span>
            <h3 className={styles.chapterTitle}>{title}</h3>
            <p className={styles.chapterBody}>{body}</p>
        </div>
    );
}

// ── Value pill ────────────────────────────────────────
function ValuePill({ icon, label, delay }) {
    const [ref, visible] = useReveal(0.2);
    return (
        <div
            ref={ref}
            className={`${styles.valuePill} ${visible ? styles.valuePillVisible : ''}`}
            style={{ '--delay': `${delay}ms` }}
        >
            <span className={styles.valueIcon}>{icon}</span>
            <span className={styles.valueLabel}>{label}</span>
        </div>
    );
}

// ── Main ──────────────────────────────────────────────
const OurStory = () => {
    const [phase, setPhase] = useState(0);
    const [scrollY, setScrollY] = useState(0);
    const heroRef = useRef(null);

    // Mount stagger
    useEffect(() => {
        const timers = [
            setTimeout(() => setPhase(1), 80),
            setTimeout(() => setPhase(2), 400),
            setTimeout(() => setPhase(3), 700),
        ];
        return () => timers.forEach(clearTimeout);
    }, []);

    // Parallax
    useEffect(() => {
        const onScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const [statsRef, statsVisible] = useReveal(0.2);
    const [imgRef, imgVisible] = useReveal(0.15);
    const [ctaRef, ctaVisible] = useReveal(0.2);

    return (
        <div className={styles.page}>

            {/* ── HERO ── */}
            <section className={styles.hero} ref={heroRef}>
                {/* Parallax background layer */}
                <div
                    className={styles.heroBg}
                    style={{ transform: `translateY(${scrollY * 0.35}px)` }}
                />
                {/* Grain overlay */}
                <div className={styles.heroGrain} />

                <div className={styles.heroContent}>
                    <p className={`${styles.heroEyebrow} ${phase >= 1 ? styles.heroEyebrowIn : ''}`}>
                        Our Story
                    </p>
                    <h1 className={`${styles.heroTitle} ${phase >= 2 ? styles.heroTitleIn : ''}`}>
                        Made by hand.<br />Felt by heart.
                    </h1>
                    <p className={`${styles.heroSub} ${phase >= 3 ? styles.heroSubIn : ''}`}>
                        A one-woman studio tucked in Ludhiana, crafting pieces
                        that carry warmth, intention, and a quiet kind of beauty.
                    </p>
                </div>

                {/* Scroll hint */}
                <div className={`${styles.scrollHint} ${phase >= 3 ? styles.scrollHintIn : ''}`}>
                    <span className={styles.scrollLine} />
                    <span className={styles.scrollText}>scroll</span>
                </div>
            </section>

            {/* ── STATS BAR ── */}
            <section
                ref={statsRef}
                className={`${styles.stats} ${statsVisible ? styles.statsIn : ''}`}
            >
                {[
                    { value: 500, suffix: '+', label: 'Orders Delivered' },
                    { value: 3, suffix: '+', label: 'Years of Craft' },
                    { value: 100, suffix: '%', label: 'Handmade' },
                    { value: 12, suffix: '+', label: 'Scents & Styles' },
                ].map((s, i) => (
                    <div
                        key={s.label}
                        className={styles.stat}
                        style={{ '--delay': `${i * 80}ms` }}
                    >
                        <span className={styles.statNumber}>
                            <Counter to={s.value} suffix={s.suffix} />
                        </span>
                        <span className={styles.statLabel}>{s.label}</span>
                    </div>
                ))}
            </section>

            {/* ── CHAPTERS ── */}
            <section className={styles.chapters}>
                <Chapter
                    number="01"
                    title="It started with a candle."
                    body="In 2021, Angel found herself in the middle of a quiet evening, melting her first batch of soy wax on a kitchen stove. There was no plan. Just curiosity, a fragrance oil that smelled like sandalwood and rain, and the gentle ritual of pouring something by hand."
                    align="left"
                    delay={0}
                />
                <Chapter
                    number="02"
                    title="Then came the resin."
                    body="A year in, she discovered epoxy resin — and fell completely in love. The way colour blooms through it. The way gold leaf settles. The way each pour is entirely its own. No two pieces the same. She started gifting them to friends. Then friends started asking to buy them."
                    align="right"
                    delay={100}
                />
                <Chapter
                    number="03"
                    title="Glossy Treasures was born."
                    body="The name came naturally — glossy for the finish, treasures for what they hold. Not just beautiful objects, but vessels for moments. A birthday. An anniversary. A quiet Tuesday that deserved something beautiful anyway."
                    align="left"
                    delay={0}
                />
                <Chapter
                    number="04"
                    title="Every piece, still by hand."
                    body="Today every candle is still hand-poured in small batches. Every resin piece is still cast, sanded, and finished by Angel herself. Orders ship with a handwritten note. Because this isn't a factory — it's a studio, and every piece that leaves it carries that."
                    align="right"
                    delay={100}
                />
            </section>

            {/* ── ANGEL PORTRAIT SECTION ── */}
            <section
                ref={imgRef}
                className={`${styles.portrait} ${imgVisible ? styles.portraitIn : ''}`}
            >
                <div className={styles.portraitImageWrap}>
                    <img
                        src="/src/assets/angel.jpeg"
                        alt="Angel — founder of Glossy Treasures"
                        className={styles.portraitImage}
                        onError={e => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                        }}
                    />
                    {/* Fallback if image missing */}
                    <div className={styles.portraitFallback} style={{ display: 'none' }}>
                        <span>A</span>
                    </div>
                    {/* Decorative frame */}
                    <div className={styles.portraitFrame} />
                </div>

                <div className={styles.portraitText}>
                    <span className={styles.portraitEyebrow}>The maker</span>
                    <h2 className={styles.portraitName}>Angel</h2>
                    <p className={styles.portraitBio}>
                        Self-taught, detail-obsessed, and deeply passionate about the
                        tactile world. Angel believes beautiful things shouldn't be
                        reserved for special occasions — they should live in your everyday.
                    </p>
                    <blockquote className={styles.portraitQuote}>
                        "I want every person who holds something from my studio to feel
                        like it was made just for them."
                    </blockquote>
                    <a
                        href="https://instagram.com/glossy_treasures"
                        target="_blank"
                        rel="noreferrer"
                        className={styles.portraitInstagram}
                    >
                        @glossy_treasures ↗
                    </a>
                </div>
            </section>

            {/* ── VALUES ── */}
            <section className={styles.values}>
                <div className={styles.valueHeading}>
                    <span className={styles.valueEyebrow}>What we believe in</span>
                    <h2 className={styles.valueTitleText}>The Glossy way.</h2>
                </div>
                <div className={styles.valuePills}>
                    <ValuePill icon="🤲" label="Handcrafted always" delay={0} />
                    <ValuePill icon="🌿" label="Small batch, always fresh" delay={80} />
                    <ValuePill icon="💛" label="Every order gets a note" delay={160} />
                    <ValuePill icon="✨" label="No two pieces identical" delay={240} />
                    <ValuePill icon="🇮🇳" label="Proudly made in India" delay={320} />
                    <ValuePill icon="📦" label="Gift-ready packaging" delay={400} />
                </div>
            </section>

            {/* ── PROCESS STRIP ── */}
            <section className={styles.process}>
                <div className={styles.processHeading}>
                    <h2 className={styles.processTitle}>How it gets made.</h2>
                </div>
                <div className={styles.processSteps}>
                    {[
                        { step: '01', label: 'You order', desc: 'Your order comes in and Angel reads every note personally.' },
                        { step: '02', label: 'She crafts', desc: 'Poured, cast, cured, and hand-finished in the studio.' },
                        { step: '03', label: 'She packs', desc: 'Wrapped in tissue, sealed with wax, and tucked into a gift box.' },
                        { step: '04', label: 'It ships to you', desc: 'With a handwritten note. Always.' },
                    ].map((s, i) => {
                        const [ref, vis] = useReveal(0.15);
                        return (
                            <div
                                key={s.step}
                                ref={ref}
                                className={`${styles.processStep} ${vis ? styles.processStepVisible : ''}`}
                                style={{ '--delay': `${i * 120}ms` }}
                            >
                                <span className={styles.processStepNum}>{s.step}</span>
                                <span className={styles.processStepLabel}>{s.label}</span>
                                <p className={styles.processStepDesc}>{s.desc}</p>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* ── CTA SECTION ── */}
            <section
                ref={ctaRef}
                className={`${styles.cta} ${ctaVisible ? styles.ctaIn : ''}`}
            >
                <div className={styles.ctaGlow} />
                <p className={styles.ctaEyebrow}>Ready to bring something beautiful home?</p>
                <h2 className={styles.ctaTitle}>Shop the collection.</h2>
                <div className={styles.ctaBtns}>
                    <Link to="/shop/candles" className={styles.ctaBtnPrimary}>
                        Shop Candles
                    </Link>
                    <Link to="/shop/resin" className={styles.ctaBtnOutline}>
                        Shop Resin Art
                    </Link>
                </div>
                <a
                    href="https://wa.me/918544911357"
                    target="_blank"
                    rel="noreferrer"
                    className={styles.ctaWhatsapp}
                >
                    💬 Or chat with Angel on WhatsApp
                </a>
            </section>

        </div>
    );
};

export default OurStory;