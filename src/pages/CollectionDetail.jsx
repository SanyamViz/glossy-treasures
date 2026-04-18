import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { COLLECTIONS, getCollectionProducts } from '../data/collections';
import { CANDLES, RESIN } from '../data/products';
import ProductCard from '../components/ProductCard';
import CollectionCard from '../components/CollectionCard';
import useScrollReveal from '../hooks/useScrollReveal';
import styles from './CollectionDetail.module.css';

const CollectionDetail = () => {
  const { slug } = useParams();
  const [collection, setCollection] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [scrollY, setScrollY] = useState(0);

  const [heroRef, heroVisible] = useScrollReveal({ threshold: 0 });
  const [storyRef, storyVisible] = useScrollReveal();
  const [gridRef, gridVisible] = useScrollReveal();

  useEffect(() => {
    const found = COLLECTIONS.find(c => c.slug === slug);
    if (found) {
      setCollection(found);
      // Simulate loading state
      const timer = setTimeout(() => {
        setProducts(getCollectionProducts(found.productSlugs));
        setLoading(false);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [slug]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.matchMedia('(pointer: coarse)').matches) return;
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const otherCollections = COLLECTIONS.filter(c => c.slug !== slug).slice(0, 3);

  // Horizontal scroll wheel handler
  const scrollRef = useRef(null);
  const handleWheel = (e) => {
    if (scrollRef.current) {
      e.preventDefault();
      scrollRef.current.scrollLeft += e.deltaY * 0.8;
    }
  };

  if (!collection) return <div className={styles.notFound}>Collection not found</div>;

  return (
    <div className={styles.page}>
      {/* Hero Section */}
      <section 
        className={styles.hero} 
        ref={heroRef}
        style={{ 
          background: collection.heroGradient,
          backgroundPositionY: `${scrollY * 0.4}px`
        }}
      >
        <div className={`${styles.heroContent} ${heroVisible ? styles.visibleContent : ''}`}>
          <nav className={styles.breadcrumbs}>
            <Link to="/collections">Collections</Link>
            <span className={styles.separator}>/</span>
            <span>{collection.name}</span>
          </nav>
          
          <span className={styles.label}>Collection</span>
          
          <h1 className={styles.title}>
            {collection.name.split('').map((char, i) => (
              <span key={i} style={{ animationDelay: `${i * 30}ms` }}>
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </h1>
          
          <p className={styles.mood}>{collection.mood}</p>
          <p className={styles.description}>{collection.description}</p>
          
          <div className={styles.countPill}>
            {collection.productCount} pieces in this collection
          </div>
        </div>

        {/* Floating Decoration Stack */}
        <div className={styles.decorationStack}>
          {[1, 2, 3].map((num) => (
            <div 
              key={num} 
              className={`${styles.docCard} ${styles[`card${num}`]}`}
              style={{ animationDelay: `${num * 200}ms` }}
            >
              <img src={`https://placehold.co/160x200/${collection.color.replace('#', '')}/ffffff?text=Product+${num}`} alt="" />
            </div>
          ))}
        </div>
      </section>

      {/* Product Grid Section */}
      <section className={styles.gridSection} ref={gridRef}>
        <div className={styles.gridHeader}>
          <h2 className={styles.gridTitle}>The Edit</h2>
          <p className={styles.gridSubtext}>{collection.mood}</p>
        </div>

        <div className={`${styles.grid} ${gridVisible ? styles.visibleGrid : ''}`}>
          {loading ? (
            // Shimmer Loading State
            Array(collection.productCount).fill(0).map((_, i) => (
              <div key={i} className={styles.skeleton}>
                <div className={styles.shimmer}></div>
              </div>
            ))
          ) : (
            products.map((product, index) => {
              const isCandle = CANDLES.some(c => c.slug === product.slug);
              return (
                <div 
                  key={product.id} 
                  className={styles.productWrapper}
                  style={{ '--delay': `${index * 80}ms` }}
                >
                  <ProductCard 
                    product={product} 
                    category={isCandle ? 'candle' : 'resin'} 
                  />
                </div>
              );
            })
          )}
        </div>
      </section>

      {/* Story Section */}
      <section className={styles.storySection} ref={storyRef}>
        <div className={`${styles.storyContent} ${storyVisible ? styles.visibleStory : ''}`}>
          <div className={styles.storyLine}></div>
          <div className={styles.storyText}>
            <p className={styles.quote}>{collection.description}</p>
            <span className={styles.signature}>— Curated by Angel</span>
          </div>
        </div>
      </section>

      {/* Recommendations */}
      <section className={styles.recommendations}>
        <div className={styles.recHeader}>
          <h2 className={styles.recTitle}>You Might Also Love</h2>
          <p className={styles.recSubtext}>From other collections.</p>
        </div>
        
        <div 
          className={styles.horizontalScroll} 
          ref={scrollRef}
          onWheel={handleWheel}
        >
          {otherCollections.map((col) => (
            <div key={col.id} className={styles.miniCardWrapper}>
              <CollectionCard collection={col} index={0} />
            </div>
          ))}
        </div>
      </section>

      {/* Footer Navigation */}
      <section className={styles.backSection}>
        <Link to="/collections" className={styles.backLink}>
          ← Back to all Collections
        </Link>
        <div className={styles.separatorRow}>
          <div className={styles.line}></div>
          <span>or</span>
          <div className={styles.line}></div>
        </div>
        <div className={styles.shopLinks}>
          <Link to="/shop/candles" className={styles.shopPill}>Shop Candles →</Link>
          <Link to="/shop/resin" className={styles.shopPill}>Shop Resin Art →</Link>
        </div>
      </section>
    </div>
  );
};

export default CollectionDetail;
