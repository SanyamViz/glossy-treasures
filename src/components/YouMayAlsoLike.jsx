import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from './ProductCard';
import styles from './YouMayAlsoLike.module.css';

export default function YouMayAlsoLike() {
  const { slug } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/products`);
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        
        if (!Array.isArray(data)) {
          setProducts([]);
          return;
        }

        // Exclude current product
        let pool = data.filter(p => p.slug !== slug && p.active !== false);
        
        // Try to match same category (case-insensitive)
        // Since we don't know the current product's category here without fetching it,
        // we'll just prioritize products that are in the standard categories.
        const sameCategory = pool.filter(p => 
          p.category?.toLowerCase() === 'resin' || 
          p.category?.toLowerCase() === 'candle'
        );
        
        const finalSelection = sameCategory.length > 0 ? sameCategory : pool;
        
        const shuffled = finalSelection.sort(() => Math.random() - 0.5);
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
    return (
      <div className={styles.container}>
        <h2 className={styles.title}>You May Also Like</h2>
        <div className={styles.loading}>Loading recommendations...</div>
      </div>
    );
  }

  if (!products.length) {
    return null;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>You May Also Like</h2>
      <div className={styles.scrollRow}>
        {products.map(product => (
          <div key={product.id} className={styles.cardWrapper}>
            <ProductCard product={product} category={product.category} />
          </div>
        ))}
      </div>
    </div>
  );
}
