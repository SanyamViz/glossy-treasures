import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import styles from './OrderConfirmed.module.css';

// ── Confetti particle system ──────────────────────────
const CONFETTI_COLORS = ['#C4948A', '#B8965A', '#E8E0D5', '#1A1A1A', '#F0EBE3', '#D4A55A'];

function useConfetti(trigger) {
    const canvasRef = useRef(null);
    const animRef = useRef(null);
    const particles = useRef([]);

    useEffect(() => {
        if (!trigger) return;
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Spawn particles
        for (let i = 0; i < 120; i++) {
            particles.current.push({
                x: Math.random() * canvas.width,
                y: -10 - Math.random() * 200,
                w: 4 + Math.random() * 6,
                h: 8 + Math.random() * 8,
                color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
                rot: Math.random() * Math.PI * 2,
                rotV: (Math.random() - 0.5) * 0.15,
                vx: (Math.random() - 0.5) * 2,
                vy: 2 + Math.random() * 3,
                alpha: 1,
            });
        }

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.current = particles.current.filter(p => p.alpha > 0.01);
            particles.current.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;
                p.rot += p.rotV;
                if (p.y > canvas.height * 0.7) p.alpha -= 0.015;
                ctx.save();
                ctx.globalAlpha = p.alpha;
                ctx.translate(p.x, p.y);
                ctx.rotate(p.rot);
                ctx.fillStyle = p.color;
                ctx.beginPath();
                ctx.roundRect(-p.w / 2, -p.h / 2, p.w, p.h, 2);
                ctx.fill();
                ctx.restore();
            });
            if (particles.current.length > 0) {
                animRef.current = requestAnimationFrame(draw);
            } else {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }
        };
        animRef.current = requestAnimationFrame(draw);
        return () => cancelAnimationFrame(animRef.current);
    }, [trigger]);

    return canvasRef;
}

// ── Animated check mark SVG ───────────────────────────
function CheckMark({ visible }) {
    return (
        <svg className={`${styles.check} ${visible ? styles.checkVisible : ''}`}
            viewBox="0 0 52 52" fill="none">
            <circle
                className={styles.checkCircle}
                cx="26" cy="26" r="24"
                stroke="currentColor" strokeWidth="2"
            />
            <polyline
                className={styles.checkTick}
                points="14,27 22,35 38,18"
                stroke="currentColor" strokeWidth="2.5"
                strokeLinecap="round" strokeLinejoin="round"
                fill="none"
            />
        </svg>
    );
}

// ── Timeline step ─────────────────────────────────────
function TimelineStep({ icon, label, sub, active, done, delay }) {
    return (
        <div
            className={`${styles.timelineStep} ${active ? styles.timelineActive : ''} ${done ? styles.timelineDone : ''}`}
            style={{ '--delay': `${delay}ms` }}
        >
            <div className={styles.timelineIconWrap}>
                <span className={styles.timelineIcon}>{icon}</span>
            </div>
            <div className={styles.timelineText}>
                <span className={styles.timelineLabel}>{label}</span>
                <span className={styles.timelineSub}>{sub}</span>
            </div>
        </div>
    );
}

// ── Main component ────────────────────────────────────
const OrderConfirmed = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const state = location.state || {};

    const {
        orderNumber = 'GT' + Date.now().toString().slice(-6),
        name = 'there',
        payMethod = 'cod',
        total = 0,
        email = '',
    } = state;

    const firstName = name.split(' ')[0];
    const deliveryDate = (() => {
        const d = new Date();
        d.setDate(d.getDate() + 5);
        return d.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' });
    })();

    const [phase, setPhase] = useState(0);
    const [confettiOn, setConfettiOn] = useState(false);
    const canvasRef = useConfetti(confettiOn);

    // Staggered entrance sequence
    useEffect(() => {
        const timers = [
            setTimeout(() => setPhase(1), 100),   // check mark draws
            setTimeout(() => setPhase(2), 900),   // heading + order # appear
            setTimeout(() => setConfettiOn(true), 1000),
            setTimeout(() => setPhase(3), 1400),  // details card
            setTimeout(() => setPhase(4), 1900),  // timeline
            setTimeout(() => setPhase(5), 2400),  // CTA buttons
        ];
        return () => timers.forEach(clearTimeout);
    }, []);

    const payLabel = {
        upi: 'UPI Payment',
        card: 'Card Payment',
        cod: 'Cash on Delivery',
    }[payMethod] || 'Payment';

    return (
        <div className={styles.page}>
            {/* Confetti canvas */}
            <canvas ref={canvasRef} className={styles.canvas} aria-hidden />

            {/* Soft radial glow behind check */}
            <div className={`${styles.glow} ${phase >= 1 ? styles.glowVisible : ''}`} />

            <div className={styles.container}>

                {/* ── CHECK + HEADING ── */}
                <div className={styles.hero}>
                    <div className={styles.checkWrap}>
                        <CheckMark visible={phase >= 1} />
                    </div>

                    <div className={`${styles.heroText} ${phase >= 2 ? styles.heroTextIn : ''}`}>
                        <p className={styles.greeting}>Thank you, {firstName} ✦</p>
                        <h1 className={styles.title}>Your order is confirmed.</h1>
                        <p className={styles.orderNum}>Order #{orderNumber}</p>
                    </div>

                    <p className={`${styles.subline} ${phase >= 2 ? styles.sublineIn : ''}`}>
                        {email
                            ? <>We've sent a confirmation to <strong>{email}</strong></>
                            : 'A confirmation has been sent to your email.'
                        }
                    </p>
                </div>

                {/* ── DETAILS CARD ── */}
                <div className={`${styles.card} ${phase >= 3 ? styles.cardIn : ''}`}>
                    <div className={styles.cardRow}>
                        <span className={styles.cardLabel}>Order Number</span>
                        <span className={styles.cardValue}>#{orderNumber}</span>
                    </div>
                    <div className={styles.cardDivider} />
                    <div className={styles.cardRow}>
                        <span className={styles.cardLabel}>Order Total</span>
                        <span className={styles.cardValue}>₹{total.toLocaleString('en-IN')}</span>
                    </div>
                    <div className={styles.cardDivider} />
                    <div className={styles.cardRow}>
                        <span className={styles.cardLabel}>Payment</span>
                        <span className={styles.cardValue}>{payLabel}</span>
                    </div>
                    <div className={styles.cardDivider} />
                    <div className={styles.cardRow}>
                        <span className={styles.cardLabel}>Estimated Delivery</span>
                        <span className={`${styles.cardValue} ${styles.cardValueAccent}`}>{deliveryDate}</span>
                    </div>
                </div>

                {/* ── DELIVERY TIMELINE ── */}
                <div className={`${styles.timeline} ${phase >= 4 ? styles.timelineIn : ''}`}>
                    <TimelineStep icon="✓" label="Order Placed" sub="Just now" done delay={0} />
                    <TimelineStep icon="🎨" label="Being Crafted" sub="1–2 days" active delay={100} />
                    <TimelineStep icon="📦" label="Packed with Love" sub="Day 2–3" delay={200} />
                    <TimelineStep icon="🚚" label="Out for Delivery" sub="Day 4–5" delay={300} />
                    <TimelineStep icon="🏠" label="Delivered" sub={deliveryDate} delay={400} />
                </div>

                {/* ── ANGEL NOTE ── */}
                <div className={`${styles.note} ${phase >= 4 ? styles.noteIn : ''}`}>
                    <div className={styles.noteAvatar}>A</div>
                    <div className={styles.noteBody}>
                        <p className={styles.noteText}>
                            "Every piece leaves my studio with a little piece of my heart.
                            I hope it brings you so much joy."
                        </p>
                        <span className={styles.noteName}>— Angel, Glossy Treasures</span>
                    </div>
                </div>

                {/* ── CTA BUTTONS ── */}
                <div className={`${styles.actions} ${phase >= 5 ? styles.actionsIn : ''}`}>
                    <Link to="/shop/candles" className={styles.btnPrimary}>
                        Continue Shopping
                    </Link>
                    <Link to="/collections" className={styles.btnOutline}>
                        Browse Collections
                    </Link>
                </div>

                {/* ── INSTAGRAM NUDGE ── */}
                <div className={`${styles.instaNote} ${phase >= 5 ? styles.instaNoteIn : ''}`}>
                    <span>Tag us when it arrives</span>
                    <a
                        href="https://instagram.com/glossy_treasures"
                        target="_blank"
                        rel="noreferrer"
                        className={styles.instaHandle}
                    >
                        @glossy_treasures ↗
                    </a>
                </div>

            </div>
        </div>
    );
};

export default OrderConfirmed;