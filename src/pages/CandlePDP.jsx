import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useUser, SignInButton } from '@clerk/react';
import ProductGallery from '../components/ProductGallery';
import CandleOptions from '../components/CandleOptions';
import HamperBuilder from '../components/HamperBuilder';
import ProductAccordion from '../components/ProductAccordion';
import StickyCartBar from '../components/StickyCartBar';
import ProductReviews from '../components/ProductReviews';
import YouMayAlsoLike from '../components/YouMayAlsoLike';
import MadeByAngel from '../components/MadeByAngel';
import ShareButton from '../components/ShareButton';
import SEOMeta from '../components/SEOMeta';
import { trackViewItem, trackAddToCart } from '../utils/analytics';
import styles from './CandlePDP.module.css';



export default function CandlePDP() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [pdpLoading, setPdpLoading] = useState(true);

  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);
  const [currentPrice, setCurrentPrice] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [isSuccess, setIsSuccess] = useState(false);
  const [isMainCTAVisible, setIsMainCTAVisible] = useState(true);

  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { isSignedIn, user } = useUser();
  const [wishlistMsg, setWishlistMsg] = useState('');

  const mainCTARef = useRef(null);
  const hamperRef = useRef(null);
  const sectionRefs = useRef([]);

  useEffect(() => {
    if (product) {
      setCurrentPrice(product.basePrice || product.price || 0);
    }
  }, [product]);

  useEffect(() => {
    setPdpLoading(true);
    fetch(`${import.meta.env.VITE_API_URL}/api/products/${slug}`)
      .then(r => r.json())
      .then(data => { 
        setProduct(data); 
        setPdpLoading(false); 
        if (data) trackViewItem(data);
      })
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
      basePrice: currentPrice,
      selectedColor: selectedOptions?.color || null,
      selectedSize: selectedOptions?.size || null,
      selectedFragrance: selectedOptions?.fragrance || null,
      personalization: selectedOptions?.personalization || null,
      selectedOptions,
    }, qty);
    trackAddToCart(product);
    setTimeout(() => setIsSuccess(false), 1000);
  };

  const handleBuyNow = () => {
    if (!product) return;
    addToCart({
      ...product,
      price: currentPrice,
      basePrice: currentPrice,
      selectedColor: selectedOptions?.color || null,
      selectedSize: selectedOptions?.size || null,
      selectedFragrance: selectedOptions?.fragrance || null,
      personalization: selectedOptions?.personalization || null,
      selectedOptions,
    }, qty);
    navigate('/checkout');
  };

  const handleWishlist = React.useCallback(async () => {
    if (!isSignedIn) return;
    if (isInWishlist(product.slug)) {
      await removeFromWishlist(product.slug);
      setWishlistMsg('Removed from wishlist');
    } else {
      await addToWishlist(product);
      setWishlistMsg('Added to wishlist ♡');
    }
    setTimeout(() => setWishlistMsg(''), 2000);
  }, [isSignedIn, product, isInWishlist, removeFromWishlist, addToWishlist]);


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
      <SEOMeta 
        title={product.name} 
        description={product.description || product.tagline} 
        image={product.images?.[0] || product.image}
        url={window.location.href}
        type="product"
      />
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
        <div className={styles.reviewsShortcut} onClick={() => sectionRefs.current[5]?.scrollIntoView({ behavior: 'smooth' })}>
          <span className={styles.shortcutStars}>★★★★★</span>
          <span className={styles.shortcutText}>Reviews</span>
        </div>
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
          <motion.button
            ref={mainCTARef}
            className={`${styles.atcBtn} ${isSuccess ? styles.success : ''}`}
            onClick={handleAddToCart}
            whileTap={{ scale: 0.96 }}
            animate={isSuccess ? { 
              scale: [1, 1.04, 1],
            } : { scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            {isSuccess ? (
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                ✓ ADDED
              </motion.span>
            ) : 'ADD TO CART'}
          </motion.button>
        </div>
        <div className={styles.altLinks}>
          {isSignedIn ? (
            <button className={styles.wishBtn} onClick={handleWishlist}>
              {isInWishlist(product.slug) ? '♥ Saved' : '♡ Save to Wishlist'}
            </button>
          ) : (
            <SignInButton mode="modal">
              <button className={styles.wishBtn}>♡ Save to Wishlist</button>
            </SignInButton>
          )}
          <ShareButton product={product} />
          <button className={styles.hamperLink} onClick={() => hamperRef.current?.scrollIntoView({ behavior: 'smooth' })}>
            🎁 Add to a Hamper →
          </button>
        </div>
        {wishlistMsg && <p style={{ fontSize: '11px', color: '#C4948A', textAlign: 'center', marginTop: '4px' }}>{wishlistMsg}</p>}
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

      <StickyCartBar price={currentPrice} onBuyNow={handleBuyNow} isVisible={!isMainCTAVisible} />
    </div>
  );
}
