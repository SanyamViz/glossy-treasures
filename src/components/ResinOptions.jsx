import React, { useState, useEffect } from 'react';
import styles from './ResinOptions.module.css';

export default function ResinOptions({ colors = [], frameSizes = [], standMaterials = [], basePrice = 0, onPriceChange, onOptionsChange }) {
  const [selectedColor, setSelectedColor] = useState(colors[0] || { label: 'Custom', hex: 'custom' });
  const [selectedFrameSize, setSelectedFrameSize] = useState(frameSizes[0] || null);
  const [selectedStand, setSelectedStand] = useState(standMaterials[0] || null);
  const [customColor, setCustomColor] = useState('');
  const [msg, setMsg] = useState('');

  // Update total price whenever frame size or stand material changes
  useEffect(() => {
    let totalPrice = basePrice;
    if (selectedFrameSize) {
      totalPrice = selectedFrameSize.price; // frameSizes in products.js have absolute prices
    }
    if (selectedStand) {
      totalPrice += (selectedStand.priceAdd || 0);
    }
    if (onPriceChange) onPriceChange(totalPrice);

    // Also notify parent of all selected options
    if (onOptionsChange) {
      onOptionsChange({
        color: selectedColor.hex === 'custom' ? `Custom: ${customColor}` : selectedColor.label,
        size: selectedFrameSize?.label,
        stand: selectedStand?.label,
        personalization: msg
      });
    }
  }, [selectedFrameSize, selectedStand, selectedColor, customColor, msg, basePrice, onPriceChange, onOptionsChange]);

  const handleFrameSizeChange = (s) => {
    setSelectedFrameSize(s);
  };

  const handleStandChange = (m) => {
    setSelectedStand(m);
  };

  return (
    <div className={styles.options}>
      {colors.length > 0 && (
        <div className={styles.optionGroup}>
          <span className={styles.label}>Color Palette</span>
          <div className={styles.swatchRow}>
            {colors.map(c => (
              <button
                key={c.id || c.name}
                className={`${styles.swatchBtn} ${selectedColor.id === c.id || selectedColor.name === c.name ? styles.active : ''}`}
                onClick={() => setSelectedColor(c)}
                title={c.label || c.name}
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
      )}

      {frameSizes.length > 0 && (
        <div className={styles.optionGroup}>
          <span className={styles.label}>Frame Size</span>
          <div className={styles.chipScroll}>
            {frameSizes.map(s => (
              <button
                key={s.id}
                className={`${styles.chip} ${selectedFrameSize?.id === s.id ? styles.active : ''}`}
                onClick={() => handleFrameSizeChange(s)}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {standMaterials.length > 0 && (
        <div className={styles.optionGroup}>
          <span className={styles.label}>Stand Material</span>
          <div className={styles.chipScroll}>
            {standMaterials.map(m => (
              <button
                key={m.id}
                className={`${styles.chip} ${selectedStand?.id === m.id ? styles.active : ''}`}
                onClick={() => handleStandChange(m)}
              >
                {m.label} {m.priceAdd > 0 ? `(+₹${m.priceAdd})` : ''}
              </button>
            ))}
          </div>
        </div>
      )}

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
