import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import ProductGallery from '../components/ProductGallery';
import CandleOptions from '../components/CandleOptions';
import HamperBuilder from '../components/HamperBuilder';
import ProductAccordion from '../components/ProductAccordion';
import StickyCartBar from '../components/StickyCartBar';
import ProductReviews from '../components/ProductReviews';
import YouMayAlsoLike from '../components/YouMayAlsoLike';
import MadeByAngel from '../components/MadeByAngel';
import styles from './CandlePDP.module.css';

const CANDLE_PRODUCTS = {
  'amber-oud-candle': {
    slug: 'amber-oud-candle',
    name: 'Amber & Oud Soy Candle',
    badge: '45 HRS BURN TIME',
    basePrice: 1299,
    originalPrice: 1599,
    discount: '19% OFF',
    tagline: 'Hand-poured in small batches. A slow, meditative release of warmth.',
    stock: 4,
    images: [
      'https://images.unsplash.com/photo-1602028915047-37269d1a73f7?w=800&q=80',
      'https://images.unsplash.com/photo-1529651737248-dad5e287768e?w=800&q=80',
      'https://images.unsplash.com/photo-1603207894673-6f0bf0efab0f?w=800&q=80'
    ]
  },
  'lavender-haze-candle': {
    slug: 'lavender-haze-candle',
    name: 'Lavender Haze Candle',
    badge: '45 HRS BURN TIME',
    basePrice: 699,
    originalPrice: 899,
    discount: '22% OFF',
    tagline: 'Fields at dusk. Quiet and unhurried, soft on the air.',
    stock: 6,
    images: [
      'https://images.unsplash.com/photo-1549388604-817d15aa0110?w=800&q=80',
      'https://images.unsplash.com/photo-1603207894673-6f0bf0efab0f?w=800&q=80',
      'https://images.unsplash.com/photo-1529651737248-dad5e287768e?w=800&q=80'
    ]
  }
};

const DEFAULT_CANDLE = CANDLE_PRODUCTS['amber-oud-candle'];

export default function CandlePDP() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const product = CANDLE_PRODUCTS[slug] || DEFAULT_CANDLE;

  const [qty, setQty] = useState(1);
  const { addToCart } = useCart();
  const [currentPrice, setCurrentPrice] = useState(product.basePrice);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isMainCTAVisible, setIsMainCTAVisible] = useState(true);

  const mainCTARef = useRef(null);
  const hamperRef = useRef(null);
  const sectionRefs = useRef([]);

  useEffect(() => {
    setCurrentPrice(product.basePrice);
    window.scrollTo(0, 0);
  }, [slug]);

  // Sticky bar observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsMainCTAVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (mainCTARef.current) observer.observe(mainCTARef.current);
    return () => observer.disconnect();
  }, []);

  // Staggered fade-in
  useEffect(() => {
    const timers = sectionRefs.current.map((ref, i) => {
      return setTimeout(() => {
        if (ref) ref.classList.add(styles.visible);
      }, i * 80);
    });
    return () => timers.forEach(clearTimeout);
  }, [product]);

  const handleAddToCart = () => {
    setIsSuccess(true);
    addToCart({ ...product, basePrice: currentPrice }, qty);
    setTimeout(() => setIsSuccess(false), 1000);
  };

  return (
    <div className={styles.page}>
      {/* Back button — overlaid on gallery */}
      <button
        className={styles.backBtn}
        onClick={() => navigate(-1)}
        aria-label="Go back"
      >
        ←
      </button>

      {/* 1. Gallery */}
      <ProductGallery images={product.images} productType="candle" />

      {/* 2. Product Header */}
      <header className={`${styles.section} ${styles.header}`} ref={el => sectionRefs.current[0] = el}>
        <div className={styles.titleRow}>
          <h1 className={styles.productName}>{product.name}</h1>
          <span className={styles.typeBadge}>{product.badge}</span>
        </div>
        <div className={styles.priceRow}>
          <span className={styles.currentPrice}>₹{currentPrice.toLocaleString('en-IN')}</span>
          <span className={styles.oldPrice}>₹{product.originalPrice.toLocaleString('en-IN')}</span>
          <span className={styles.discountBadge}>{product.discount}</span>
        </div>
        <p className={styles.stockNudge}>🔥 Only {product.stock} left</p>
        <p className={styles.tagline}>{product.tagline}</p>
      </header>

      {/* 3. Candle Options */}
      <div className={styles.section} ref={el => sectionRefs.current[1] = el}>
        <CandleOptions onPriceChange={setCurrentPrice} basePrice={product.basePrice} />
      </div>

      {/* 4. Qty + ATC */}
      <div className={`${styles.section} ${styles.ctaSection}`} ref={el => sectionRefs.current[2] = el}>
        <div className={styles.ctaRow}>
          <div className={styles.stepper}>
            <button onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
            <span>{qty}</span>
            <button onClick={() => setQty(q => q + 1)}>+</button>
          </div>
          <button
            ref={mainCTARef}
            className={`${styles.atcBtn} ${isSuccess ? styles.success : ''}`}
            onClick={handleAddToCart}
          >
            {isSuccess ? '✓ ADDED' : 'ADD TO CART'}
          </button>
        </div>
        <div className={styles.altLinks}>
          <button className={styles.wishBtn}>♡ Save to Wishlist</button>
          <button className={styles.hamperLink} onClick={() => hamperRef.current?.scrollIntoView({ behavior: 'smooth' })}>
            🎁 Add to a Hamper →
          </button>
        </div>
      </div>

      {/* 5. Accordion */}
      <div className={styles.section} ref={el => sectionRefs.current[3] = el}>
        <ProductAccordion type="candle" />
      </div>

      {/* 6. Hamper Builder */}
      <div className={styles.section} ref={(el) => { hamperRef.current = el; sectionRefs.current[4] = el; }}>
        <HamperBuilder currentProduct={product} />
      </div>

      {/* 7. Reviews */}
      <div className={styles.section} ref={el => sectionRefs.current[5] = el}>
        <ProductReviews />
      </div>

      {/* 8. You May Also Like */}
      <div className={styles.section} ref={el => sectionRefs.current[6] = el}>
        <YouMayAlsoLike />
      </div>

      {/* 9. Made By Angel */}
      <div className={styles.section} ref={el => sectionRefs.current[7] = el}>
        <MadeByAngel />
      </div>

      <StickyCartBar price={currentPrice} onAddToCart={handleAddToCart} isVisible={!isMainCTAVisible} />
    </div>
  );
}
