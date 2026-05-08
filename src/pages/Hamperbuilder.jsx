import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import styles from './Hamperbuilder.module.css';

// ── Product data ──────────────────────────────────────
// Now using dbProducts from API

const BOX_SIZES = [
    { id: 'small', label: 'Cozy', capacity: 5, basePrice: 0, desc: '3-5 items · Perfect starter' },
    { id: 'medium', label: 'Delight', capacity: 7, basePrice: 100, desc: '5-7 items · Most popular' },
    { id: 'large', label: 'Luxe', capacity: 10, basePrice: 200, desc: '8-10 items · Ultimate indulgence' },
];

const RIBBON_COLORS = [
    { id: 'rose', label: 'Rose Gold', hex: '#C4948A' },
    { id: 'champagne', label: 'Champagne', hex: '#B8965A' },
    { id: 'plum', label: 'Deep Plum', hex: '#5C4A5A' },
];

// ── Main ──────────────────────────────────────────────
const HamperBuilder = () => {
    const navigate = useNavigate();
    const { addToCart } = useCart();

    const [step, setStep] = useState(1); // 1=box 2=products 3=personalize 4=review
    const [boxSize, setBoxSize] = useState(null);
    const [selected, setSelected] = useState([]); // [{ product, qty }]
    const [filter, setFilter] = useState('all');
    const [giftNote, setGiftNote] = useState('');
    const [recipientName, setRecipientName] = useState('');
    const [ribbon, setRibbon] = useState('rose');
    const [includeCard, setIncludeCard] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);
    const [dbProducts, setDbProducts] = useState([]);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/api/products/hamper`)
            .then(r => r.json())
            .then(data => setDbProducts(Array.isArray(data) ? data : []))
            .catch(err => console.error('Hamper products error:', err));
    }, []);

    const canvasRef = useRef(null);

    useEffect(() => {
        const t = setTimeout(() => setMounted(true), 50);
        return () => clearTimeout(t);
    }, []);

    // ── Confetti ──
    useEffect(() => {
        if (!showConfetti) return;
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const particles = [];
        const colors = ['#C4948A', '#B8965A', '#E8E0D5', '#F0EBE3'];
        for (let i = 0; i < 80; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: -10 - Math.random() * 100,
                w: 4 + Math.random() * 4,
                h: 8 + Math.random() * 6,
                color: colors[Math.floor(Math.random() * colors.length)],
                vx: (Math.random() - 0.5) * 2,
                vy: 2 + Math.random() * 2,
                alpha: 1,
            });
        }

        let animId;
        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;
                if (p.y > canvas.height * 0.7) p.alpha -= 0.01;
                ctx.globalAlpha = p.alpha;
                ctx.fillStyle = p.color;
                ctx.fillRect(p.x, p.y, p.w, p.h);
            });
            if (particles.some(p => p.alpha > 0)) animId = requestAnimationFrame(draw);
            else ctx.clearRect(0, 0, canvas.width, canvas.height);
        };
        animId = requestAnimationFrame(draw);
        return () => cancelAnimationFrame(animId);
    }, [showConfetti]);

    // ── Helpers ──
    const currentBox = BOX_SIZES.find(b => b.id === boxSize);
    const totalItems = selected.reduce((sum, s) => sum + s.qty, 0);
    const slotsRemaining = currentBox ? currentBox.capacity - totalItems : 0;
    const productsTotal = selected.reduce((sum, s) => sum + (s.product.price * s.qty), 0);
    const boxPrice = currentBox?.basePrice || 0;
    const cardPrice = includeCard ? 50 : 0;
    const grandTotal = boxPrice + productsTotal + cardPrice;

    const filteredProducts = filter === 'all'
        ? dbProducts
        : dbProducts.filter(p => p.category?.toLowerCase() === filter);

    const getProductQty = (productId) => {
        const item = selected.find(s => s.product.id === productId);
        return item ? item.qty : 0;
    };

    const addProduct = (product) => {
        if (!currentBox) return;
        if (totalItems >= currentBox.capacity) return;
        const existing = selected.find(s => s.product.id === product.id);
        if (existing) {
            setSelected(selected.map(s =>
                s.product.id === product.id ? { ...s, qty: s.qty + 1 } : s
            ));
        } else {
            setSelected([...selected, { product, qty: 1 }]);
        }
    };

    const removeProduct = (productId) => {
        const existing = selected.find(s => s.product.id === productId);
        if (!existing) return;
        if (existing.qty === 1) {
            setSelected(selected.filter(s => s.product.id !== productId));
        } else {
            setSelected(selected.map(s =>
                s.product.id === productId ? { ...s, qty: s.qty - 1 } : s
            ));
        }
    };

    const handleNext = () => {
        if (step === 1 && !boxSize) return;
        if (step === 2 && selected.length === 0) return;
        if (step === 3) {
            setShowConfetti(true);
            setTimeout(() => setShowConfetti(false), 3000);
        }
        setStep(s => s + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleBack = () => {
        setStep(s => s - 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleAddToCart = () => {
        const hamperItem = {
            slug: 'custom-hamper-' + Date.now(),
            name: `Custom ${currentBox.label} Hamper`,
            price: grandTotal,
            image: '/placeholder-hamper.jpg',
            quantity: 1,
            customDetails: {
                boxSize: currentBox.label,
                items: selected,
                giftNote,
                recipientName,
                ribbon,
                includeCard,
            }
        };
        addToCart(hamperItem);
        navigate('/Cart');
    };

    // ── Step renders ──
    const stepContent = [
        null, // step 0 unused

        // ── STEP 1: BOX SIZE ──
        <div key="step1" className={styles.stepWrap}>
            <h2 className={styles.stepTitle}>Choose your box size</h2>
            <p className={styles.stepDesc}>Start with the perfect foundation for your gift.</p>
            <div className={styles.boxGrid}>
                {BOX_SIZES.map(box => (
                    <button
                        key={box.id}
                        className={`${styles.boxCard} ${boxSize === box.id ? styles.boxCardActive : ''}`}
                        onClick={() => setBoxSize(box.id)}
                    >
                        <div className={styles.boxVisual}>
                            <div className={`${styles.boxIllustration} ${styles[`box${box.id}`]}`} />
                        </div>
                        <span className={styles.boxLabel}>{box.label}</span>
                        <span className={styles.boxDesc}>{box.desc}</span>
                        {box.basePrice > 0 && <span className={styles.boxPrice}>+₹{box.basePrice}</span>}
                    </button>
                ))}
            </div>
        </div>,

        // ── STEP 2: PRODUCTS ──
        <div key="step2" className={styles.stepWrap}>
            <div className={styles.stepHeader}>
                <div>
                    <h2 className={styles.stepTitle}>Fill your {currentBox?.label} box</h2>
                    <p className={styles.stepDesc}>
                        {totalItems} / {currentBox?.capacity} items selected
                    </p>
                </div>
                <div className={styles.slotBars}>
                    {Array.from({ length: currentBox?.capacity || 0 }).map((_, i) => (
                        <div
                            key={i}
                            className={`${styles.slotBar} ${i < totalItems ? styles.slotBarFilled : ''}`}
                        />
                    ))}
                </div>
            </div>

            <div className={styles.filterTabs}>
                {['all', 'candle', 'resin'].map(f => (
                    <button
                        key={f}
                        className={`${styles.filterTab} ${filter === f ? styles.filterTabActive : ''}`}
                        onClick={() => setFilter(f)}
                    >
                        {f === 'all' ? 'All' : f === 'candle' ? '🕯️ Candles' : '✨ Resin Art'}
                    </button>
                ))}
            </div>

            <div className={styles.productGrid}>
                {filteredProducts.map(p => {
                    const qty = getProductQty(p.id);
                    const isFull = totalItems >= (currentBox?.capacity || 0);
                    return (
                        <div key={p.id} className={styles.productCard}>
                            <img
                                src={p.images?.[0] || p.image || '/placeholder.jpg'}
                                alt={p.name}
                                className={styles.productImg}
                            />
                            <div className={styles.productInfo}>
                                <span className={styles.productName}>{p.name}</span>
                                <span className={styles.productPrice}>₹{p.price}</span>
                            </div>
                            <div className={styles.productActions}>
                                <button
                                    className={styles.productBtn}
                                    onClick={() => removeProduct(p.id)}
                                    disabled={qty === 0}
                                >
                                    −
                                </button>
                                <span className={styles.productQty}>{qty}</span>
                                <button
                                    className={styles.productBtn}
                                    onClick={() => addProduct(p)}
                                    disabled={isFull && qty === 0}
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>,

        // ── STEP 3: PERSONALIZE ──
        <div key="step3" className={styles.stepWrap}>
            <h2 className={styles.stepTitle}>Make it personal</h2>
            <p className={styles.stepDesc}>Add the finishing touches that make it uniquely theirs.</p>

            <div className={styles.personalizeSection}>
                <label className={styles.fieldLabel}>Gift Note</label>
                <p className={styles.fieldHint}>Handwritten by Angel and tucked inside the box</p>
                <textarea
                    className={styles.textarea}
                    placeholder="Happy birthday! Hope this brightens your day. Love, you ✨"
                    value={giftNote}
                    onChange={e => setGiftNote(e.target.value)}
                    maxLength={200}
                    rows={4}
                />
                <span className={styles.charCount}>{giftNote.length}/200</span>
            </div>

            <div className={styles.personalizeSection}>
                <label className={styles.fieldLabel}>Recipient Name (for gift tag)</label>
                <input
                    className={styles.input}
                    type="text"
                    placeholder="Sarah"
                    value={recipientName}
                    onChange={e => setRecipientName(e.target.value)}
                />
            </div>

            <div className={styles.personalizeSection}>
                <label className={styles.fieldLabel}>Ribbon Color</label>
                <div className={styles.ribbonOptions}>
                    {RIBBON_COLORS.map(r => (
                        <button
                            key={r.id}
                            className={`${styles.ribbonBtn} ${ribbon === r.id ? styles.ribbonBtnActive : ''}`}
                            onClick={() => setRibbon(r.id)}
                        >
                            <span className={styles.ribbonSwatch} style={{ background: r.hex }} />
                            <span className={styles.ribbonLabel}>{r.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            <div className={styles.personalizeSection}>
                <label className={styles.checkboxWrap}>
                    <input
                        type="checkbox"
                        checked={includeCard}
                        onChange={e => setIncludeCard(e.target.checked)}
                    />
                    <span>Include handmade greeting card (+₹50)</span>
                </label>
            </div>
        </div>,

        // ── STEP 4: REVIEW ──
        <div key="step4" className={styles.stepWrap}>
            <h2 className={styles.stepTitle}>Your custom hamper is ready! 🎉</h2>
            <p className={styles.stepDesc}>Here's what you've created.</p>

            {/* Visual preview */}
            <div className={styles.hamperPreview}>
                <div className={styles.hamperBox}>
                    <div className={styles.hamperRibbon} style={{ background: RIBBON_COLORS.find(r => r.id === ribbon)?.hex }} />
                    <div className={styles.hamperItems}>
                        {selected.map((s, i) => (
                            <div
                                key={s.product.id}
                                className={styles.hamperItem}
                                style={{ '--i': i }}
                            >
                                <span className={styles.hamperItemIcon}>
                                    {s.product.category === 'candle' ? '🕯️' : s.product.category === 'resin' ? '✨' : '🎁'}
                                </span>
                                <span className={styles.hamperItemName}>{s.product.name}</span>
                                {s.qty > 1 && <span className={styles.hamperItemQty}>×{s.qty}</span>}
                            </div>
                        ))}
                    </div>
                    {giftNote && (
                        <div className={styles.hamperNote}>
                            <span className={styles.hamperNoteIcon}>💌</span>
                            <span>"{giftNote.slice(0, 50)}{giftNote.length > 50 ? '...' : ''}"</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Price breakdown */}
            <div className={styles.breakdown}>
                <div className={styles.breakdownRow}>
                    <span>{currentBox?.label} Box</span>
                    <span>₹{boxPrice}</span>
                </div>
                <div className={styles.breakdownRow}>
                    <span>{totalItems} Items</span>
                    <span>₹{productsTotal}</span>
                </div>
                {includeCard && (
                    <div className={styles.breakdownRow}>
                        <span>Greeting Card</span>
                        <span>₹50</span>
                    </div>
                )}
                <div className={styles.breakdownDivider} />
                <div className={styles.breakdownTotal}>
                    <span>Total</span>
                    <span>₹{grandTotal.toLocaleString('en-IN')}</span>
                </div>
            </div>
        </div>
    ];

    if (dbProducts.length === 0) return (
        <div style={{ textAlign: 'center', padding: '100px 40px', fontFamily: 'Jost, sans-serif', color: '#7A7068', fontSize: '13px' }}>
            Loading products...
        </div>
    );

    return (
        <div className={`${styles.page} ${mounted ? styles.visible : ''}`}>
            {showConfetti && <canvas ref={canvasRef} className={styles.confetti} />}

            <div className={styles.container}>
                {/* Progress bar */}
                <div className={styles.progress}>
                    {[1, 2, 3, 4].map(s => (
                        <div
                            key={s}
                            className={`${styles.progressDot} ${s <= step ? styles.progressDotActive : ''} ${s === step ? styles.progressDotCurrent : ''}`}
                        >
                            {s < step ? '✓' : s}
                        </div>
                    ))}
                    <div className={styles.progressBar}>
                        <div className={styles.progressFill} style={{ width: `${((step - 1) / 3) * 100}%` }} />
                    </div>
                </div>

                {/* Step content */}
                <div className={styles.stepContent}>
                    {stepContent[step]}
                </div>

                {/* Navigation */}
                <div className={styles.navBtns}>
                    {step > 1 && (
                        <button className={styles.backBtn} onClick={handleBack}>
                            ← Back
                        </button>
                    )}
                    {step < 4 && (
                        <button
                            className={styles.nextBtn}
                            onClick={handleNext}
                            disabled={
                                (step === 1 && !boxSize) ||
                                (step === 2 && selected.length === 0)
                            }
                        >
                            Continue →
                        </button>
                    )}
                    {step === 4 && (
                        <button className={styles.addBtn} onClick={handleAddToCart}>
                            Add to Cart · ₹{grandTotal.toLocaleString('en-IN')}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HamperBuilder;