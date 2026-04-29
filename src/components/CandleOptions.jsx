import React, { useState, useEffect } from 'react';
import styles from './CandleOptions.module.css';

export default function CandleOptions({ onPriceChange, basePrice, fragrances = [], sizes = [], onOptionsChange }) {
  // Use props if available, otherwise fall back to empty array or defaults
  const [selectedFragrance, setSelectedFragrance] = useState(fragrances[0] || { label: 'Default', available: true });
  const [selectedSize, setSelectedSize] = useState(sizes[0] || { label: 'Standard', value: 'standard', price: basePrice });

  // Notify parent whenever options change
  useEffect(() => {
    if (onOptionsChange) {
      onOptionsChange({
        fragrance: selectedFragrance.label,
        size: selectedSize.label
      });
    }
  }, [selectedFragrance, selectedSize, onOptionsChange]);

  const handleFragranceChange = (f) => {
    setSelectedFragrance(f);
  };

  const handleSizeChange = (s) => {
    setSelectedSize(s);
    if (onPriceChange) onPriceChange(s.price);
  };

  return (
    <div className={styles.options}>
      {fragrances.length > 0 && (
        <div className={styles.optionGroup}>
          <span className={styles.label}>Choose Fragrance</span>
          <div className={styles.chipScroll}>
            {fragrances.map(f => (
              <button
                key={f.id}
                className={`${styles.chip} ${selectedFragrance.id === f.id ? styles.active : ''}`}
                onClick={() => handleFragranceChange(f)}
                disabled={!f.available}
              >
                {f.label}
              </button>
            ))}
          </div>
          {selectedFragrance.desc && <p className={styles.fragranceDesc}>{selectedFragrance.desc}</p>}
        </div>
      )}

      {sizes.length > 0 && (
        <div className={styles.optionGroup}>
          <span className={styles.label}>Choose Size</span>
          <div className={styles.sizeGrid}>
            {sizes.map(s => (
              <button
                key={s.id}
                className={`${styles.sizeBtn} ${selectedSize.id === s.id ? styles.active : ''}`}
                onClick={() => handleSizeChange(s)}
              >
                {s.label} — ₹{s.price.toLocaleString('en-IN')}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
