import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import styles from './CartDrawer.module.css';

const CartDrawer = ({ isOpen, onClose }) => {
  const { cartItems, updateQuantity, removeFromCart, cartTotal } = useCart();
  const navigate = useNavigate();

  // Lock scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleCheckout = () => {
    onClose();
    navigate('/checkout');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className={styles.backdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            className={styles.drawer}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 400, damping: 40 }}
          >
            <div className={styles.header}>
              <h2>Your Cart</h2>
              <button onClick={onClose} className={styles.closeBtn} aria-label="Close cart">
                &times;
              </button>
            </div>

            <div className={styles.content}>
              {cartItems.length === 0 ? (
                <div className={styles.emptyCart}>
                  <p>Your cart is empty.</p>
                  <button onClick={onClose} className={styles.continueBtn}>
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className={styles.itemsList}>
                  {cartItems.map((item) => (
                    <div key={item.cartId} className={styles.cartItem}>
                      <img src={item.image} alt={item.name} className={styles.itemImage} />
                      <div className={styles.itemDetails}>
                        <div className={styles.itemHeader}>
                          <div>
                            <h3 className={styles.itemName}>{item.name}</h3>
                            {item.selectedOptions && (
                              <div className={styles.itemOptions}>
                                {Object.entries(item.selectedOptions).map(([key, value]) => {
                                  if (!value) return null;
                                  const display = typeof value === 'object'
                                    ? Object.values(value).filter(Boolean).join(' · ')
                                    : value;
                                  return display ? <span key={key} className={styles.optionTag}>{display}</span> : null;
                                })}
                              </div>
                            )}
                          </div>
                          <button onClick={() => removeFromCart(item.cartId)} className={styles.removeBtn}>
                            Remove
                          </button>
                        </div>
                        <p className={styles.itemPrice}>₹{(item.price || 0).toLocaleString('en-IN')}</p>
                        <div className={styles.quantityControls}>
                          <button onClick={() => updateQuantity(item.cartId, item.quantity - 1)}>−</button>
                          <span>{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.cartId, item.quantity + 1)}>+</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cartItems.length > 0 && (
              <div className={styles.footer}>
                <div className={styles.totalRow}>
                  <span>Subtotal</span>
                  <span>₹{cartTotal.toLocaleString('en-IN')}</span>
                </div>
                <p className={styles.taxesInfo}>Taxes and shipping calculated at checkout</p>
                <button onClick={handleCheckout} className={styles.checkoutBtn}>
                  CHECKOUT
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
