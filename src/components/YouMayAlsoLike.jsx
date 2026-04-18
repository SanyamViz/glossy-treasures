import React from 'react';
import { Link } from 'react-router-dom';
import styles from './YouMayAlsoLike.module.css';

const RECOMMENDATIONS = [
  { id: 1, name: 'Lavender Haze Candle', price: 699, slug: 'lavender-haze-candle', category: 'candle', image: 'https://images.unsplash.com/photo-1549388604-817d15aa0110?w=400&q=70' },
  { id: 2, name: 'Blush Resin Tray', price: 1499, slug: 'blush-resin-tray', category: 'resin', image: 'https://images.unsplash.com/photo-1615796153287-98eacf0abb13?w=400&q=70' },
  { id: 3, name: 'Rose & Musk Candle', price: 699, slug: 'rose-musk-candle', category: 'candle', image: 'https://images.unsplash.com/photo-1603207894673-6f0bf0efab0f?w=400&q=70' },
  { id: 4, name: 'Ivory Keepsake Box', price: 1899, slug: 'ivory-keepsake-box', category: 'resin', image: 'https://images.unsplash.com/photo-1582281298055-e25b84a30b0b?w=400&q=70' },
  { id: 5, name: 'Cedarwood Candle', price: 799, slug: 'cedarwood-candle', category: 'candle', image: 'https://images.unsplash.com/photo-1529651737248-dad5e287768e?w=400&q=70' }
];

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
