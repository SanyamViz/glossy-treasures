import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';
import styles from './ProductCard.module.css';

const ProductCard = ({ product, category }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const handleQuickAdd = (e) => {
    e.stopPropagation();
    setIsAdded(true);
    addToCart(product, 1);
    setTimeout(() => setIsAdded(false), 1000);
  };

  const handleNavigate = () => {
    const basePath = category === 'candle' ? '/shop/candles' : '/shop/resin';
    navigate(`${basePath}/${product.slug}`);
  };

  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <div className={styles.card} onClick={handleNavigate}>
      <motion.div 
        className={styles.imageContainer} 
        layout 
        transition={{ duration: 0.5, type: "spring", stiffness: 300, damping: 30 }}
      >
        <motion.img 
          src={product.image} 
          alt={product.name} 
          className={styles.image} 
          layoutId={product.slug}
          transition={{ duration: 0.5, type: "spring", stiffness: 300, damping: 30 }}
        />
        
        {product.badge && (
          <span className={`${styles.badge} ${styles[product.badge.toLowerCase()]}`}>
            {product.badge}
          </span>
        )}

        <button 
          className={`${styles.quickAdd} ${isAdded ? styles.added : ''}`} 
          onClick={handleQuickAdd}
          aria-label="Quick add to cart"
        >
          {isAdded ? '✓' : '+'}
        </button>
      </motion.div>

      <div className={styles.content}>
        <h3 className={styles.name}>{product.name}</h3>
        <div className={styles.priceRow}>
          <div className={styles.prices}>
            <span className={styles.price}>₹{product.price.toLocaleString('en-IN')}</span>
            {product.originalPrice && (
              <span className={styles.originalPrice}>₹{product.originalPrice.toLocaleString('en-IN')}</span>
            )}
          </div>
          {discount && <span className={styles.discountPill}>{discount}% OFF</span>}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
