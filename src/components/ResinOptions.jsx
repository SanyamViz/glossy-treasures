import React, { useState } from 'react';
import styles from './ResinOptions.module.css';

const TYPES = ['Decorative Plate', 'Wall Frame', 'Tray', 'Coaster Set', 'Keepsake Box', 'Jewellery Dish'];
const COLORS = [
  { name: 'Blush Pink', hex: '#F4C2C2' },
  { name: 'Ocean Teal', hex: '#7EC8C8' },
  { name: 'Midnight', hex: '#2C2C54' },
  { name: 'Ivory Gold', hex: '#F5E6C8' },
  { name: 'Forest', hex: '#6B8F6B' },
  { name: 'Custom', hex: 'custom' }
];

export default function ResinOptions() {
  const [selectedType, setSelectedType] = useState(TYPES[0]);
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);
  const [customColor, setCustomColor] = useState('');
  const [msg, setMsg] = useState('');

  return (
    <div className={styles.options}>
      <div className={styles.optionGroup}>
        <span className={styles.label}>Choose Product</span>
        <div className={styles.chipScroll}>
          {TYPES.map(t => (
            <button
              key={t}
              className={`${styles.chip} ${selectedType === t ? styles.active : ''}`}
              onClick={() => setSelectedType(t)}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.optionGroup}>
        <span className={styles.label}>Color Palette</span>
        <div className={styles.swatchRow}>
          {COLORS.map(c => (
            <button
              key={c.name}
              className={`${styles.swatchBtn} ${selectedColor.name === c.name ? styles.active : ''}`}
              onClick={() => setSelectedColor(c)}
              title={c.name}
            >
              {c.hex === 'custom' ? (
                <span className={styles.swatchInner} style={{ background: 'var(--bg-card)' }}>✏️</span>
              ) : (
                <span className={styles.swatchInner} style={{ background: c.hex }} />
              )}
            </button>
          ))}
        </div>
        {selectedColor.hex === 'custom' && (
          <input
            type="text"
            className={styles.customInput}
            placeholder="Describe your color idea..."
            value={customColor}
            onChange={(e) => setCustomColor(e.target.value)}
          />
        )}
      </div>

      <div className={styles.personalCard}>
        <p className={styles.personalTitle}>Personalize This Piece</p>
        <p className={styles.personalSub}>Add a name, date, or message — cast right into the resin.</p>
        
        <div className={styles.fields}>
          <input type="text" placeholder="Name / Initial" className={styles.input} />
          <input type="text" placeholder="Date (e.g. 14 Feb 2024)" className={styles.input} />
          <div className={styles.textareaWrap}>
            <textarea
              placeholder="Special message..."
              className={styles.textarea}
              rows="2"
              maxLength="80"
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
            />
            <span className={styles.counter}>{msg.length}/80</span>
          </div>
        </div>
        
        <p className={styles.note}>Made to order · Crafted in 5–7 days · Ships with a handwritten note</p>
      </div>
    </div>
  );
}
