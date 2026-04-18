import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import ProductGallery from '../components/ProductGallery';
import ResinOptions from '../components/ResinOptions';
import HamperBuilder from '../components/HamperBuilder';
import ProductAccordion from '../components/ProductAccordion';
import StickyCartBar from '../components/StickyCartBar';
import ProductReviews from '../components/ProductReviews';
import YouMayAlsoLike from '../components/YouMayAlsoLike';
import MadeByAngel from '../components/MadeByAngel';
import styles from './ResinPDP.module.css';

const RESIN_PRODUCTS = {
  'blush-decorative-plate': {
    slug: 'blush-decorative-plate',
    name: 'Handmade Resin Decorative Plate',
    badge: 'HANDMADE TO ORDER',
    basePrice: 1299,
    originalPrice: 1599,
    discount: '19% OFF',
    tagline: 'Each piece is one-of-a-kind. Cast by hand, finished with intention.',
    stock: 4,
    images: [
      'https://images.unsplash.com/photo-1615796153287-98eacf0abb13?w=800&q=80',
      'https://images.unsplash.com/photo-1582281298055-e25b84a30b0b?w=800&q=80',
      'https://images.unsplash.com/photo-1580893246395-52aead8960dc?w=800&q=80'
    ]
  },
  'ivory-jewellery-dish': {
    slug: 'ivory-jewellery-dish',
    name: 'Ivory Gold Jewellery Dish',
    badge: 'HANDMADE TO ORDER',
    basePrice: 1199,
    originalPrice: 1499,
    discount: '20% OFF',
    tagline: 'A soft place to rest the things you treasure most.',
    stock: 3,
    images: [
      'https://images.unsplash.com/photo-1580893246395-52aead8960dc?w=800&q=80',
      'https://images.unsplash.com/photo-1615796153287-98eacf0abb13?w=800&q=80',
      'https://images.unsplash.com/photo-1582281298055-e25b84a30b0b?w=800&q=80'
    ]
  }
};

const DEFAULT_RESIN = RESIN_PRODUCTS['blush-decorative-plate'];

export default function ResinPDP() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const product = RESIN_PRODUCTS[slug] || DEFAULT_RESIN;

  const [qty, setQty] = useState(1);
  const { addToCart } = useCart();
  const [isSuccess, setIsSuccess] = useState(false);
  const [isMainCTAVisible, setIsMainCTAVisible] = useState(true);

  const mainCTARef = useRef(null);
  const hamperRef = useRef(null);
  const sectionRefs = useRef([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsMainCTAVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (mainCTARef.current) observer.observe(mainCTARef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const timers = sectionRefs.current.map((ref, i) =>
      setTimeout(() => { if (ref) ref.classList.add(styles.visible); }, i * 80)
    );
    return () => timers.forEach(clearTimeout);
  }, [product]);

  const handleAddToCart = () => {
    setIsSuccess(true);
    addToCart(product, qty);
    setTimeout(() => setIsSuccess(false), 1000);
  };

  return (
    <div className={styles.page}>
      {/* Back button */}
      <button
        className={styles.backBtn}
        onClick={() => navigate(-1)}
        aria-label="Go back"
      >
        ←
      </button>

      {/* 1. Gallery */}
      <ProductGallery images={product.images} productType="resin" />

      {/* 2. Product Header */}
      <header className={`${styles.section} ${styles.header}`} ref={el => sectionRefs.current[0] = el}>
        <div className={styles.titleRow}>
          <h1 className={styles.productName}>{product.name}</h1>
          <span className={styles.typeBadge}>{product.badge}</span>
        </div>
        <div className={styles.priceRow}>
          <span className={styles.currentPrice}>₹{product.basePrice.toLocaleString('en-IN')}</span>
          <span className={styles.oldPrice}>₹{product.originalPrice.toLocaleString('en-IN')}</span>
          <span className={styles.discountBadge}>{product.discount}</span>
        </div>
        <p className={styles.stockNudge}>🔥 Only {product.stock} left</p>
        <p className={styles.tagline}>{product.tagline}</p>
      </header>

      {/* 3. Resin Options */}
      <div className={styles.section} ref={el => sectionRefs.current[1] = el}>
        <ResinOptions />
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
        <ProductAccordion type="resin" />
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

      <StickyCartBar price={product.basePrice} onAddToCart={handleAddToCart} isVisible={!isMainCTAVisible} />
    </div>
  );
}
