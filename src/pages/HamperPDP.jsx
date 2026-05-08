import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import ProductGallery from '../components/ProductGallery';
import ProductAccordion from '../components/ProductAccordion';
import StickyCartBar from '../components/StickyCartBar';
import ProductReviews from '../components/ProductReviews';
import YouMayAlsoLike from '../components/YouMayAlsoLike';
import MadeByAngel from '../components/MadeByAngel';
import styles from './ResinPDP.module.css'; // Reuse Resin styles for consistency

export default function HamperPDP() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [pdpLoading, setPdpLoading] = useState(true);

  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);
  const [currentPrice, setCurrentPrice] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isMainCTAVisible, setIsMainCTAVisible] = useState(true);

  const mainCTARef = useRef(null);
  const sectionRefs = useRef([]);

  useEffect(() => {
    setPdpLoading(true);
    fetch(`${import.meta.env.VITE_API_URL}/api/products/${slug}`)
      .then(r => r.json())
      .then(data => {
        setProduct(data);
        setCurrentPrice(data.basePrice || data.price || 0);
        setPdpLoading(false);
      })
      .catch(() => setPdpLoading(false));
  }, [slug]);

  useEffect(() => {
    window.scrollTo(0, 0);
    setQty(1);
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
    if (!product) return;
    const timers = sectionRefs.current.map((ref, i) =>
      setTimeout(() => { if (ref) ref.classList.add(styles.visible); }, i * 80)
    );
    return () => timers.forEach(clearTimeout);
  }, [product]);

  const handleAddToCart = () => {
    if (!product) return;
    setIsSuccess(true);
    addToCart({
      ...product,
      price: currentPrice,
      basePrice: currentPrice,
    }, qty);
    setTimeout(() => setIsSuccess(false), 1000);
  };

  if (pdpLoading) return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: '#FAF8F5' }}>
      <p style={{ fontFamily: 'Jost, sans-serif', color: '#7A7068', letterSpacing: '0.1em', fontSize: '13px' }}>Loading...</p>
    </div>
  );

  if (!product) {
    return (
      <div className={styles.page} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh', flexDirection: 'column' }}>
        <h2>Product not found</h2>
        <button onClick={() => navigate('/shop')} className={styles.atcBtn} style={{ marginTop: '20px', maxWidth: '200px' }}>
          Back to Shop
        </button>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <button className={styles.backBtn} onClick={() => navigate(-1)} aria-label="Go back">←</button>

      <ProductGallery images={product.images || []} productType="hamper" slug={product.slug} />

      <header className={`${styles.section} ${styles.header}`} ref={el => sectionRefs.current[0] = el}>
        <div className={styles.titleRow}>
          <h1 className={styles.productName}>{product.name}</h1>
          {product.badge && <span className={styles.typeBadge}>{product.badge}</span>}
        </div>
        <div className={styles.priceRow}>
          <span className={styles.currentPrice}>₹{currentPrice.toLocaleString('en-IN')}</span>
          {product.originalPrice && <span className={styles.oldPrice}>₹{product.originalPrice.toLocaleString('en-IN')}</span>}
        </div>
        <div className={styles.detailsRow}>
          <span className={styles.detailItem}>🎁 Pre-curated Hamper</span>
          <span className={styles.detailItem}>📍 Only {product.stock} left</span>
        </div>
        <p className={styles.tagline}>{product.tagline}</p>
      </header>

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
      </div>

      <div className={styles.section} ref={el => sectionRefs.current[3] = el}>
        <ProductAccordion type="hamper" product={product} />
      </div>

      <div className={styles.section} ref={el => sectionRefs.current[5] = el}>
        <ProductReviews />
      </div>

      <div className={styles.section} ref={el => sectionRefs.current[6] = el}>
        <YouMayAlsoLike />
      </div>

      <div className={styles.section} ref={el => sectionRefs.current[7] = el}>
        <MadeByAngel />
      </div>

      <StickyCartBar price={currentPrice} onAddToCart={handleAddToCart} isVisible={!isMainCTAVisible} />
    </div>
  );
}
