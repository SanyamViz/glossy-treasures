import React from 'react';
import styles from './StickyCartBar.module.css';

export default function StickyCartBar({ price, onAddToCart, isVisible }) {
  return (
    <div className={`${styles.bar} ${isVisible ? styles.visible : ''}`}>
      <div className={styles.info}>
        <span className={styles.label}>PRICE</span>
        <span className={styles.price}>₹{(price || 0).toLocaleString('en-IN')}</span>
      </div>
      <button className={styles.btn} onClick={onAddToCart}>
        ADD TO BAG
      </button>
    </div>
  );
}
