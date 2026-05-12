import React from 'react';
import styles from './StickyCartBar.module.css';

export default function StickyCartBar({ price, onBuyNow, isVisible }) {
  return (
    <div className={`${styles.bar} ${isVisible ? styles.visible : ''}`}>
      <div className={styles.info}>
        <span className={styles.label}>TOTAL</span>
        <span className={styles.price}>₹{(price || 0).toLocaleString('en-IN')}</span>
      </div>
      <button className={styles.btn} onClick={onBuyNow}>
        BUY NOW
      </button>
    </div>
  );
}
