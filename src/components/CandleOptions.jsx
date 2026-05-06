import React, { useState, useEffect } from 'react';
import styles from './CandleOptions.module.css';

export default function CandleOptions({ onPriceChange, basePrice, fragrances = [], sizes = [], colors = [], onOptionsChange }) {
  const [selectedFragrance, setSelectedFragrance] = useState(fragrances[0] || null);
  const [selectedSize, setSelectedSize] = useState(sizes[0] || null);
  const [selectedColor, setSelectedColor] = useState(colors[0] || null);

  // Sync state and price with parent
  useEffect(() => {
    // 1. Calculate Price
    const newPrice = selectedSize?.price || basePrice;
    if (onPriceChange) onPriceChange(newPrice);

    // 2. Notify Parent of Options
    if (onOptionsChange) {
      onOptionsChange({
        fragrance: selectedFragrance?.label || null,
        size: selectedSize?.label || null,
        color: selectedColor?.name || null,
      });
    }
  }, [selectedFragrance, selectedSize, selectedColor, basePrice, onPriceChange, onOptionsChange]);

  return (
    <div className={styles.options}>
      {fragrances.length > 0 && (
        <div className={styles.optionGroup}>
          <span className={styles.label}>Choose Fragrance</span>
          <div className={styles.chipScroll}>
            {fragrances.map(f => (
              <button
                key={f.id}
                className={`${styles.chip} ${selectedFragrance?.id === f.id ? styles.active : ''}`}
                onClick={() => setSelectedFragrance(f)}
                disabled={!f.available}
              >
                {f.label}
              </button>
            ))}
          </div>
          {selectedFragrance?.desc && (
            <p className={styles.fragranceDesc}>{selectedFragrance.desc}</p>
          )}
        </div>
      )}

      {sizes.length > 0 && (
        <div className={styles.optionGroup}>
          <span className={styles.label}>Choose Size</span>
          <div className={styles.sizeGrid}>
            {sizes.map(s => (
              <button
                key={s.id || s.label}
                className={`${styles.sizeBtn} ${selectedSize?.label === s.label ? styles.active : ''}`}
                onClick={() => setSelectedSize(s)}
              >
                {s.label} — ₹{(s.price || 0).toLocaleString('en-IN')}
              </button>
            ))}
          </div>
        </div>
      )}

      {colors.length > 0 && (
        <div className={styles.optionGroup}>
          <span className={styles.label}>Choose Color</span>
          <div className={styles.colorRow}>
            {colors.map(c => (
              <button
                key={c.id || c.name}
                className={`${styles.colorBtn} ${selectedColor?.name === c.name ? styles.colorActive : ''}`}
                onClick={() => setSelectedColor(c)}
                title={c.name}
              >
                <span
                  className={styles.colorSwatch}
                  style={{ background: c.hex || c.color || '#ccc' }}
                />
                <span className={styles.colorLabel}>{c.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}