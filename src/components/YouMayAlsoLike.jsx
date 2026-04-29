import React from 'react';
import { Link } from 'react-router-dom';
import styles from './YouMayAlsoLike.module.css';

import { ALL_PRODUCTS } from '../data/products';

const RECOMMENDATIONS = ALL_PRODUCTS.slice(0, 5); // Take first 5 for now, or randomize later

export default function YouMayAlsoLike() {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>You May Also Like</h2>
      <div className={styles.scrollRow}>
        {RECOMMENDATIONS.map(product => (
          <Link key={product.id} to={`/shop/${product.category === 'candle' ? 'candles' : 'resin'}/${product.slug}`} className={styles.card}>
            <div className={styles.imgWrapper}>
              <img src={product.image} alt={product.name} />
              <button className={styles.addBtn} onClick={e => e.preventDefault()}>+</button>
            </div>
            <div className={styles.info}>
              <p className={styles.name}>{product.name}</p>
              <p className={styles.price}>₹{product.price.toLocaleString('en-IN')}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
