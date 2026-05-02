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



export default function CandlePDP() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [pdpLoading, setPdpLoading] = useState(true);

  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);
  const [currentPrice, setCurrentPrice] = useState(product?.price || 0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [isSuccess, setIsSuccess] = useState(false);
  const [isMainCTAVisible, setIsMainCTAVisible] = useState(true);

  const mainCTARef = useRef(null);
  const hamperRef = useRef(null);
  const sectionRefs = useRef([]);

  useEffect(() => {
    setPdpLoading(true);
    fetch(`${import.meta.env.VITE_API_URL}/api/products/${slug}`)
      .then(r => r.json())
      .then(data => { setProduct(data); setPdpLoading(false); })
      .catch(() => setPdpLoading(false));
  }, [slug]);

  useEffect(() => {
    window.scrollTo(0, 0);
    setQty(1);
    setCurrentPrice(product?.basePrice || product?.price || 0);
    setSelectedOptions({});
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
    if (!product) return;
    const timers = sectionRefs.current.map((ref, i) => {
      return setTimeout(() => {
        if (ref) ref.classList.add(styles.visible);
      }, i * 80);
    });
    return () => timers.forEach(clearTimeout);
  }, [product]);

  const handleAddToCart = () => {
    if (!product) return;
    setIsSuccess(true);
    addToCart({
      ...product,
      price: currentPrice,
      selectedOptions
    }, qty);
    setTimeout(() => setIsSuccess(false), 1000);
  };


  if (pdpLoading) return (
    <div className={styles.page} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
      <p>Loading...</p>
    </div>
  );

  if (!product) {
    return (
      <div className={styles.page} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh', flexDirection: 'column' }}>
        <h2>Product not found</h2>
        <button onClick={() => navigate('/shop/candles')} className={styles.atcBtn} style={{ marginTop: '20px', maxWidth: '200px' }}>
          Back to Shop
        </button>
      </div>
    );
  }

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
      <ProductGallery images={product.images || []} productType="candle" slug={product.slug} />

      {/* 2. Product Header */}
      <header className={`${styles.section} ${styles.header}`} ref={el => sectionRefs.current[0] = el}>
        <div className={styles.titleRow}>
          <h1 className={styles.productName}>{product.name}</h1>
          {product.badge && <span className={styles.typeBadge}>{product.badge}</span>}
        </div>
        <div className={styles.priceRow}>
          <span className={styles.currentPrice}>₹{currentPrice.toLocaleString('en-IN')}</span>
          {product.originalPrice && <span className={styles.oldPrice}>₹{product.originalPrice.toLocaleString('en-IN')}</span>}
          {product.discount && <span className={styles.discountBadge}>{product.discount}</span>}
        </div>
        <div className={styles.detailsRow}>
          {product.weight && <span className={styles.detailItem}>⚖️ {product.weight}</span>}
          {product.burnTime && <span className={styles.detailItem}>🔥 {product.burnTime} Burn</span>}
          <span className={styles.detailItem}>📍 Only {product.stock} left</span>
        </div>
        <p className={styles.tagline}>{product.tagline}</p>
      </header>

      {/* 3. Candle Options */}
      <div className={styles.section} ref={el => sectionRefs.current[1] = el}>
        <CandleOptions
          onPriceChange={setCurrentPrice}
          basePrice={product.basePrice || product.price || 0}
          fragrances={product.fragrances || []}
          sizes={product.sizes || []}
          colors={product.colors || []}
          onOptionsChange={setSelectedOptions}
        />
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
        <ProductAccordion type="candle" product={product} />
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
