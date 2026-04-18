import React, { useState, useEffect } from 'react';
import styles from './HamperBuilder.module.css';

const SUGGESTED_PRODUCTS = [
  { id: 1, name: "Lavender Haze Candle", price: 699, image: "https://images.unsplash.com/photo-1602028915047-37269d1a73f7?w=400&q=70" },
  { id: 2, name: "Blush Coaster Set", price: 899, image: "https://images.unsplash.com/photo-1615796153287-98eacf0abb13?w=400&q=70" },
  { id: 3, name: "Rose & Musk Candle", price: 699, image: "https://images.unsplash.com/photo-1603207894673-6f0bf0efab0f?w=400&q=70" },
  { id: 4, name: "Ivory Jewellery Dish", price: 1199, image: "https://images.unsplash.com/photo-1580893246395-52aead8960dc?w=400&q=70" },
  { id: 5, name: "Sandalwood Candle", price: 799, image: "https://images.unsplash.com/photo-1529651737248-dad5e287768e?w=400&q=70" }
];

export default function HamperBuilder({ currentProduct }) {
  const [items, setItems] = useState([]);
  const [showNote, setShowNote] = useState(false);
  const [usePremiumPkg, setUsePremiumPkg] = useState(false);
  const [total, setTotal] = useState(currentProduct.basePrice);

  useEffect(() => {
    let newTotal = currentProduct.basePrice;
    items.forEach(item => newTotal += item.price);
    if (usePremiumPkg) newTotal += 99;
    setTotal(newTotal);
  }, [items, usePremiumPkg, currentProduct.basePrice]);

  const addItem = (e, product) => {
    e.preventDefault();
    if (items.find(i => i.id === product.id)) return;
    setItems(prev => [...prev, product]);
    
    // Bounce animation on the button/card could be added via ref or state class
  };

  const removeItem = (id) => {
    setItems(prev => prev.filter(i => i.id !== id));
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Build a Hamper</h2>
      <p className={styles.subtext}>Pair this with something beautiful.</p>

      <div className={styles.horizontalScroll}>
        {SUGGESTED_PRODUCTS.map(product => (
          <div key={product.id} className={styles.productCard}>
            <div className={styles.imgWrapper}>
              <img src={product.image} alt={product.name} />
              <button 
                className={`${styles.addBtn} ${items.find(i => i.id === product.id) ? styles.added : ''}`}
                onClick={(e) => addItem(e, product)}
              >
                {items.find(i => i.id === product.id) ? '✓' : '+'}
              </button>
            </div>
            <div className={styles.cardInfo}>
              <p className={styles.cardName}>{product.name}</p>
              <p className={styles.cardPrice}>₹{product.price.toLocaleString('en-IN')}</p>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.summaryBox}>
        <p className={styles.summaryTitle}>Hamper Summary</p>
        
        <div className={styles.summaryList}>
          <div className={styles.summaryRow}>
            <span>🔒 {currentProduct.name}</span>
            <span>₹{currentProduct.basePrice.toLocaleString('en-IN')}</span>
          </div>
          
          {items.map(item => (
            <div key={item.id} className={`${styles.summaryRow} ${styles.slideDown}`}>
              <span>{item.name}</span>
              <div className={styles.rowRight}>
                <span>₹{item.price.toLocaleString('en-IN')}</span>
                <button className={styles.removeBtn} onClick={() => removeItem(item.id)}>✕</button>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.options}>
          <div className={styles.toggleRow}>
            <span className={styles.optionLabel}>
               Premium Gift Packaging
            </span>
            <div className={styles.toggleSection}>
              <span className={styles.plusPrice}>+₹99</span>
              <button 
                className={`${styles.toggleSwitch} ${usePremiumPkg ? styles.on : ''}`}
                onClick={() => setUsePremiumPkg(!usePremiumPkg)}
              />
            </div>
          </div>

          <button className={styles.noteBtn} onClick={() => setShowNote(!showNote)}>
            {showNote ? '− Hide Gift Note' : '＋ Add Gift Note'}
          </button>
          
          {showNote && (
            <textarea 
              className={styles.noteInput} 
              placeholder="Write a heart-felt message..." 
              rows="2"
            />
          )}
        </div>

        <div className={styles.totalRow}>
          <span>Total</span>
          <span className={styles.totalVal}>₹{total.toLocaleString('en-IN')}</span>
        </div>

        <button className={styles.proceedBtn}>
          PROCEED WITH HAMPER
        </button>
      </div>
    </div>
  );
}
