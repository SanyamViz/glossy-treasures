import React from 'react';
import { Link } from 'react-router-dom';
import { getCollectionProducts } from '../data/collections';
import styles from './CollectionCard.module.css';
const CollectionCard = ({ collection, index, onMouseEnter, onMouseLeave }) => {
  const { slug, name, tagline, mood, color, heroGradient, productSlugs, productCount, badge } = collection;

  // Get first 3 actual products for preview thumbnails
  const previewProducts = getCollectionProducts(productSlugs).slice(0, 3);
  const remainingCount = productCount - 3;

  return (
    <Link
      to={`/collections/${slug}`}
      className={styles.card}
      style={{ '--index': index, '--accent': color, '--gradient': heroGradient }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className={styles.backgroundLayer}>
        <div className={styles.orb}></div>
      </div>

      <div className={styles.thumbnailStrip}>
        {previewProducts.map((product, i) => (
          <div 
            key={product.slug} 
            className={styles.thumbnail}
            style={{ '--i': i }}
          >
            <img 
              src={product.image} 
              alt={product.name} 
            />
          </div>
        ))}
        {remainingCount > 0 && (
          <div className={styles.moreThumbnail}>
            <span>+{remainingCount}</span>
          </div>
        )}
      </div>

      <div className={styles.content}>
        {badge && (
          <span className={styles.badge} style={{ color }}>
            {badge}
          </span>
        )}
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.mood}>{mood}</p>
        <p className={styles.count}>{productCount} pieces</p>

        <div className={styles.bottomRow}>
          <span className={styles.tagline}>{tagline}</span>
          <div className={styles.arrowCircle}>
            <span className={styles.arrow}>→</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CollectionCard;
