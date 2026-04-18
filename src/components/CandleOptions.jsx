import React, { useState } from 'react';
import styles from './CandleOptions.module.css';

const FRAGRANCES = [
  { name: 'Amber & Oud', desc: 'Warm resin and smokey agarwood. A golden, meditative hour.' },
  { name: 'Lavender Haze', desc: 'Fields at dusk. Quiet and unhurried, soft on the air.' },
  { name: 'Vanilla Sandalwood', desc: 'Creamy warmth wrapped in wood. Like a long Sunday morning.' },
  { name: 'Rose & Musk', desc: 'Petals pressed into skin. Tender and deeply familiar.' },
  { name: 'Cedarwood Rain', desc: 'Earthy cedar after rainfall. Grounded and alive.' },
  { name: 'Jasmine Nights', desc: 'Night-blooming jasmine. Heady, dreamy, luminous.' }
];

const SIZES = [
  { label: '100g — ₹699', value: '100g', price: 699 },
  { label: '200g — ₹1,299', value: '200g', price: 1299 },
  { label: '300g — ₹1,799', value: '300g', price: 1799 }
];

export default function CandleOptions({ onPriceChange, basePrice }) {
  const [selectedFragrance, setSelectedFragrance] = useState(FRAGRANCES[0]);
  const [selectedSize, setSelectedSize] = useState(SIZES[1]);

  const handleFragranceChange = (f) => {
    setSelectedFragrance(f);
  };

  const handleSizeChange = (s) => {
    setSelectedSize(s);
    onPriceChange(s.price);
  };

  return (
    <div className={styles.options}>
      <div className={styles.optionGroup}>
        <span className={styles.label}>Choose Fragrance</span>
        <div className={styles.chipScroll}>
          {FRAGRANCES.map(f => (
            <button
              key={f.name}
              className={`${styles.chip} ${selectedFragrance.name === f.name ? styles.active : ''}`}
              onClick={() => handleFragranceChange(f)}
            >
              {f.name}
            </button>
          ))}
        </div>
        <p className={styles.fragranceDesc}>{selectedFragrance.desc}</p>
      </div>

      <div className={styles.optionGroup}>
        <span className={styles.label}>Choose Size</span>
        <div className={styles.sizeGrid}>
          {SIZES.map(s => (
            <button
              key={s.value}
              className={`${styles.sizeBtn} ${selectedSize.value === s.value ? styles.active : ''}`}
              onClick={() => handleSizeChange(s)}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
