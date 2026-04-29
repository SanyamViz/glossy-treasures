import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Show, SignInButton } from "@clerk/react";
import styles from './Cart.module.css';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, totalItems } = useCart();
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);
  const [removingId, setRemovingId] = useState(null);
  const [pulse, setPulse] = useState(false);
  const summaryRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

  // Pulse total when cart changes
  useEffect(() => {
    if (!mounted) return;
    setPulse(true);
    const t = setTimeout(() => setPulse(false), 600);
    return () => clearTimeout(t);
  }, [cartTotal]);

  const handleRemove = (slug) => {
    setRemovingId(slug);
    setTimeout(() => {
      removeFromCart(slug);
      setRemovingId(null);
    }, 400);
  };

  const handleQuantity = (slug, newQty) => {
    if (newQty < 1) {
      handleRemove(slug);
      return;
    }
    updateQuantity(slug, newQty);
  };

  const freeShipping = cartTotal >= 999;

  // ── EMPTY STATE ──────────────────────────────────────
  if (cartItems.length === 0) {
    return (
      <div className={`${styles.page} ${styles.emptyPage} ${mounted ? styles.visible : ''}`}>
        <div className={styles.emptyInner}>
          <div className={styles.emptyIcon}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
          </div>
          <h2 className={styles.emptyTitle}>Your bag is empty</h2>
          <p className={styles.emptyText}>
            Nothing here yet — but something beautiful is waiting.
          </p>
          <div className={styles.emptyActions}>
            <Link to="/shop/candles" className={styles.emptyBtn}>Shop Candles</Link>
            <Link to="/shop/resin" className={styles.emptyBtnOutline}>Shop Resin Art</Link>
          </div>
        </div>
      </div>
    );
  }

  // ── FILLED CART ──────────────────────────────────────
  return (
    <div className={`${styles.page} ${mounted ? styles.visible : ''}`}>
      <div className={styles.container}>

        {/* ── HEADER ── */}
        <header className={`${styles.header} ${mounted ? styles.headerIn : ''}`}>
          <div className={styles.headerLeft}>
            <span className={styles.headerLabel}>Your Bag</span>
            <h1 className={styles.headerTitle}>
              {totalItems} {totalItems === 1 ? 'item' : 'items'}
            </h1>
          </div>
          <Link to="/shop/candles" className={styles.continueLink}>
            ← Continue shopping
          </Link>
        </header>

        <div className={styles.layout}>

          {/* ── ITEMS LIST ── */}
          <div className={styles.itemsList}>
            {cartItems.map((item, i) => (
              <div
                key={item.slug}
                className={`
                  ${styles.item}
                  ${mounted ? styles.itemIn : ''}
                  ${removingId === item.slug ? styles.itemOut : ''}
                `}
                style={{ '--i': i }}
              >
                {/* Image */}
                <Link
                  to={`/shop/${item.category === 'resin' ? 'resin' : 'candles'}/${item.slug}`}
                  className={styles.itemImageWrap}
                >
                  <img
                    src={item.image || item.images?.[0]}
                    alt={item.name}
                    className={styles.itemImage}
                  />
                </Link>

                {/* Details */}
                <div className={styles.itemBody}>
                  <div className={styles.itemTop}>
                    <div>
                      <h3 className={styles.itemName}>{item.name}</h3>
                      {item.selectedFragrance && (
                        <p className={styles.itemVariant}>Fragrance: {item.selectedFragrance}</p>
                      )}
                      {item.selectedSize && (
                        <p className={styles.itemVariant}>{item.selectedSize}</p>
                      )}
                      {item.selectedType && (
                        <p className={styles.itemVariant}>{item.selectedType}</p>
                      )}
                    </div>
                    <span className={styles.itemPrice}>
                      ₹{((item.basePrice || item.price) * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div className={styles.itemBottom}>
                    {/* Qty stepper */}
                    <div className={styles.stepper}>
                      <button
                        className={styles.stepBtn}
                        onClick={() => handleQuantity(item.slug, item.quantity - 1)}
                        aria-label="Decrease quantity"
                      >−</button>
                      <span className={styles.stepCount}>{item.quantity}</span>
                      <button
                        className={styles.stepBtn}
                        onClick={() => handleQuantity(item.slug, item.quantity + 1)}
                        aria-label="Increase quantity"
                      >+</button>
                    </div>

                    <button
                      className={styles.removeBtn}
                      onClick={() => handleRemove(item.slug)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* Free shipping nudge */}
            {!freeShipping && (
              <div className={styles.shippingNudge}>
                <div
                  className={styles.shippingBar}
                  style={{ '--progress': `${Math.min((cartTotal / 999) * 100, 100)}%` }}
                />
                <p className={styles.shippingText}>
                  Add <strong>₹{(999 - cartTotal).toLocaleString('en-IN')}</strong> more for free delivery
                </p>
              </div>
            )}
            {freeShipping && (
              <div className={styles.shippingWon}>
                <span>✦</span> You've unlocked free delivery
              </div>
            )}
          </div>

          {/* ── ORDER SUMMARY ── */}
          <aside
            ref={summaryRef}
            className={`${styles.summary} ${mounted ? styles.summaryIn : ''}`}
          >
            <div className={styles.summaryInner}>
              <h2 className={styles.summaryTitle}>Order Summary</h2>

              <div className={styles.summaryRows}>
                <div className={styles.summaryRow}>
                  <span>Subtotal ({totalItems} {totalItems === 1 ? 'item' : 'items'})</span>
                  <span>₹{cartTotal.toLocaleString('en-IN')}</span>
                </div>
                <div className={styles.summaryRow}>
                  <span>Shipping</span>
                  <span className={freeShipping ? styles.free : ''}>
                    {freeShipping ? 'FREE' : '₹99'}
                  </span>
                </div>
                <div className={styles.summaryRow}>
                  <span>Payment</span>
                  <span>Cash on Delivery</span>
                </div>
              </div>

              <div className={styles.summaryDivider} />

              <div className={`${styles.summaryTotal} ${pulse ? styles.pulse : ''}`}>
                <span>Total</span>
                <span>₹{(cartTotal + (freeShipping ? 0 : 99)).toLocaleString('en-IN')}</span>
              </div>

              <Show when="signed-in">
                <button
                  className={styles.checkoutBtn}
                  onClick={() => navigate('/checkout')}
                >
                  <span>PROCEED TO CHECKOUT</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </button>
              </Show>

              <Show when="signed-out">
                <SignInButton mode="modal">
                  <button className={styles.checkoutBtn}>
                    <span>SIGN IN TO CHECKOUT</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </button>
                </SignInButton>
              </Show>

              <div className={styles.trust}>
                <span>🔒 Safe &amp; Secure</span>
                <span>·</span>
                <span>COD Available</span>
                <span>·</span>
                <span>Free Returns</span>
              </div>

              {/* Gift note teaser */}
              <div className={styles.giftNote}>
                <span className={styles.giftIcon}>🎁</span>
                <span>Want to add a gift note? You can do this at checkout.</span>
              </div>
            </div>
          </aside>

        </div>
      </div>

      {/* ── STICKY MOBILE CHECKOUT BAR ── */}
      <div className={`${styles.stickyBar} ${mounted ? styles.stickyIn : ''}`}>
        <div className={styles.stickyLeft}>
          <span className={styles.stickyLabel}>Total</span>
          <span className={styles.stickyPrice}>
            ₹{(cartTotal + (freeShipping ? 0 : 99)).toLocaleString('en-IN')}
          </span>
        </div>
        <Show when="signed-in">
          <button
            className={styles.stickyBtn}
            onClick={() => navigate('/checkout')}
          >
            CHECKOUT
          </button>
        </Show>

        <Show when="signed-out">
          <SignInButton mode="modal">
            <button className={styles.stickyBtn}>
              SIGN IN
            </button>
          </SignInButton>
        </Show>
      </div>
    </div>
  );
};

export default Cart;