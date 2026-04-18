import React, { useState, useEffect, useRef } from 'react';
import { COLLECTIONS } from '../data/collections';
import CollectionCard from '../components/CollectionCard';
import useScrollReveal from '../hooks/useScrollReveal';
import styles from './Collections.module.css';

const Collections = () => {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [cursorVisible, setCursorVisible] = useState(false);
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  
  const [heroRef, heroVisible] = useScrollReveal();
  const [brandRef, brandVisible] = useScrollReveal();

  useEffect(() => {
    setIsPageLoaded(true);
    
    const handleMouseMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Intersection Observer for each card to trigger animations on scroll
  const cardRefs = useRef([]);
  const [visibleCards, setVisibleCards] = useState({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = entry.target.getAttribute('data-index');
            setVisibleCards((prev) => ({ ...prev, [index]: true }));
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className={`${styles.page} ${isPageLoaded ? styles.pageVisible : ''}`}>
      {/* Custom Cursor */}
      <div 
        className={styles.customCursor}
        style={{ 
          transform: `translate(${cursorPos.x + 16}px, ${cursorPos.y + 16}px)`,
          opacity: cursorVisible ? 1 : 0
        }}
      >
        EXPLORE
      </div>

      {/* Hero Section */}
      <header className={styles.hero} ref={heroRef}>
        <div className={`${styles.heroContent} ${heroVisible ? styles.visible : ''}`}>
          <span className={styles.heroLabel}>Collections</span>
          <h1 className={styles.heroTitle}>Curated with intention.</h1>
          <p className={styles.heroSubtext}>Six stories. Each one a feeling.</p>
          <div className={styles.heroLine}></div>
        </div>
      </header>

      {/* Collections Grid */}
      <section className={styles.gridSection}>
        <div className={styles.grid}>
          {COLLECTIONS.map((collection, index) => (
            <div 
              key={collection.id}
              ref={(el) => (cardRefs.current[index] = el)}
              data-index={index}
              className={`${styles.cardWrapper} ${visibleCards[index] ? styles.showCard : ''}`}
            >
              <CollectionCard 
                collection={collection} 
                index={index}
                onMouseEnter={() => setCursorVisible(true)}
                onMouseLeave={() => setCursorVisible(false)}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Brand Strip */}
      <section className={styles.brandStrip} ref={brandRef}>
        <div className={`${styles.brandContent} ${brandVisible ? styles.visible : ''}`}>
          <div className={styles.brandItem}>
            <span className={styles.diamond}>✦</span>
            <p>Handcrafted in small batches</p>
          </div>
          <div className={styles.brandItem}>
            <span className={styles.diamond}>✦</span>
            <p>Made to order</p>
          </div>
          <div className={styles.brandItem}>
            <span className={styles.diamond}>✦</span>
            <p>Ships with a note from Angel</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Collections;
