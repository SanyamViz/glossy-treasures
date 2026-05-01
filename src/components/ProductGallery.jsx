import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import styles from './ProductGallery.module.css';

export default function ProductGallery({ images, productType, slug }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showHint, setShowHint] = useState(true);
  const touchStart = useRef(null);
  const touchEnd = useRef(null);

  // Normalize images — always work with an array of strings
  const imageList = Array.isArray(images)
    ? images.filter(Boolean)
    : images && typeof images === 'string'
      ? [images]
      : [];

  useEffect(() => {
    setCurrentIndex(0);
  }, [slug]);

  useEffect(() => {
    const timer = setTimeout(() => setShowHint(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleTouchStart = (e) => {
    touchStart.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEnd.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStart.current || !touchEnd.current) return;
    const distance = touchStart.current - touchEnd.current;
    if (distance > 50 && currentIndex < imageList.length - 1) setCurrentIndex(p => p + 1);
    if (distance < -50 && currentIndex > 0) setCurrentIndex(p => p - 1);
    touchStart.current = null;
    touchEnd.current = null;
  };

  // No images fallback
  if (imageList.length === 0) {
    return (
      <div className={styles.gallery}>
        <div className={styles.slide}>
          <img src="/placeholder.jpg" alt="Product" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      </div>
    );
  }

  return (
    <div
      className={styles.gallery}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className={styles.track}
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {imageList.map((img, idx) => (
          <motion.div
            key={idx}
            className={styles.slide}
            layout={idx === 0}
            transition={{ duration: 0.5, type: 'spring', stiffness: 300, damping: 30 }}
          >
            <motion.img
              src={img}
              alt={`${productType || 'product'} view ${idx + 1}`}
              layoutId={idx === 0 && slug ? slug : undefined}
              transition={{ duration: 0.5, type: 'spring', stiffness: 300, damping: 30 }}
            />
          </motion.div>
        ))}
      </div>

      {showHint && imageList.length > 0 && (
        <div className={styles.zoomHint}>TAP TO ZOOM</div>
      )}

      {imageList.length > 1 && (
        <div className={styles.dots}>
          {imageList.map((_, idx) => (
            <button
              key={idx}
              className={`${styles.dot} ${currentIndex === idx ? styles.active : ''}`}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}