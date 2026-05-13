import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styles from './YouMayAlsoLike.module.css';

export default function YouMayAlsoLike() {
  const { slug } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Determine category from URL (resin or candles). Here we fetch all products and filter later.
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/products`);
        const data = await res.json();
        // Exclude the current product
        const filtered = data.filter(p => p.slug !== slug);
        // Optionally narrow to same category (if needed)
        const sameCategory = filtered.filter(p => p.category === 'resin' || p.category === 'candle');
        const shuffled = sameCategory.sort(() => Math.random() - 0.5);
        setProducts(shuffled.slice(0, 5));
      } catch (e) {
        console.error('Failed to fetch recommendations', e);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [slug]);

  if (loading) {
    return <div className={styles.container}>Loading recommendations…</div>;
  }

  if (!products.length) {
    return null;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>You May Also Like</h2>
      <div className={styles.scrollRow}>
        {products.map(product => (
          <Link
            key={product.id}
            to={`/shop/${product.category === 'candle' ? 'candles' : 'resin'}/${product.slug}`}
            className={styles.card}
          >
            <div className={styles.imgWrapper}>
              <img src={product.image || product.images?.[0]} alt={product.name} />
              <button className={styles.addBtn} onClick={e => e.preventDefault()}>+</button>
            </div>
            <div className={styles.info}>
              <p className={styles.name}>{product.name}</p>
              <p className={styles.price}>₹{(product.basePrice || product.price || 0).toLocaleString('en-IN')}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
