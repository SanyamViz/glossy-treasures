import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import styles from './HamperBuilder.module.css';
import ScrunchieImg from '../assets/ss.jpeg';
import DriedFlowerImg from '../assets/pp.jpeg';
import HandwrittenCardImg from '../assets/gc.jpeg';
import WaxSealStickerImg from '../assets/kk.jpeg';
import MiniPerfumeVialImg from '../assets/kj.jpeg';
import CrystalCharmImg from '../assets/chocolate.jpeg';
import flowerclawclips from '../assets/bestseller/hampers/hamper.jpeg';

const ADD_ONS = [
  { id: 'a1', name: 'Silk Scrunchie', category: 'addon', price: 50, image: ScrunchieImg },
  { id: 'a2', name: '4 Poloroid Photos', category: 'addon', price: 60, image: DriedFlowerImg },
  { id: 'a3', name: 'Greeting Card', category: 'addon', price: 40, image: HandwrittenCardImg },
  { id: 'a4', name: 'Kit Kat', category: 'addon', price: 50, image: WaxSealStickerImg },
  { id: 'a5', name: 'Kinder Joy', category: 'addon', price: 60, image: MiniPerfumeVialImg },
  { id: 'a6', name: 'Choclate', category: 'addon', price: 180, image: CrystalCharmImg },
  { id: 'a7', name: 'Flower Clawclips', category: 'addon', price: 50, image: flowerclawclips },
];

export default function HamperBuilder({ currentProduct }) {
  const { addToCart } = useCart();
  const [availableProducts, setAvailableProducts] = useState([]);
  const [items, setItems] = useState([]);
  const [showNote, setShowNote] = useState(false);
  const [usePremiumPkg, setUsePremiumPkg] = useState(false);
  const baseProductPrice = currentProduct?.price || currentProduct?.basePrice || 0;
  const [total, setTotal] = useState(baseProductPrice);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/products/hamper`)
      .then(r => r.json())
      .then(data => setAvailableProducts([...(Array.isArray(data) ? data : []), ...ADD_ONS]))
      .catch(console.error);
  }, []);

  useEffect(() => {
    let newTotal = baseProductPrice;
    items.forEach(item => newTotal += (item.basePrice || item.price || 0));
    if (usePremiumPkg) newTotal += 99;
    setTotal(newTotal);
  }, [items, usePremiumPkg, baseProductPrice]);

  const addItem = (e, product) => {
    e.preventDefault();
    if (items.find(i => i.id === product.id)) return;
    setItems(prev => [...prev, product]);
  };

  const removeItem = (id) => {
    setItems(prev => prev.filter(i => i.id !== id));
  };

  const handleProceed = () => {
    const selectedItems = items.map(i => ({
      id: i.id,
      name: i.name,
      price: i.basePrice || i.price || 0
    }));

    // Add current product as well
    selectedItems.unshift({
      id: currentProduct.id,
      name: currentProduct.name,
      price: baseProductPrice
    });

    addToCart({
      slug: 'custom-hamper-' + Date.now(),
      name: 'Custom Hamper',
      price: total,
      basePrice: total,
      category: 'hamper',
      images: [hamperbox],
      quantity: 1,
      selectedOptions: { items: selectedItems, premiumPackaging: usePremiumPkg }
    }, 1);

    // Provide some feedback
    // The cart pulse animation now handles feedback
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Build a Hamper</h2>
      <p className={styles.subtext}>Pair this with something beautiful.</p>

      <div className={styles.horizontalScroll}>
        {availableProducts.filter(p => p.slug !== currentProduct?.slug).map(product => (
          <div key={product.id} className={styles.productCard}>
            <div className={styles.imgWrapper}>
              <img src={product.images?.[0] || product.image || 'https://via.placeholder.com/400'} alt={product.name} />
              <button
                className={`${styles.addBtn} ${items.find(i => i.id === product.id) ? styles.added : ''}`}
                onClick={(e) => addItem(e, product)}
              >
                {items.find(i => i.id === product.id) ? '✓' : '+'}
              </button>
            </div>
            <div className={styles.cardInfo}>
              <p className={styles.cardName}>{product.name}</p>
              <p className={styles.cardPrice}>₹{(product.basePrice || product.price || 0).toLocaleString('en-IN')}</p>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.summaryBox}>
        <p className={styles.summaryTitle}>Hamper Summary</p>

        <div className={styles.summaryList}>
          <div className={styles.summaryRow}>
            <span>🔒 {currentProduct?.name}</span>
            <span>₹{baseProductPrice.toLocaleString('en-IN')}</span>
          </div>

          {items.map(item => (
            <div key={item.id} className={`${styles.summaryRow} ${styles.slideDown}`}>
              <span>{item.name}</span>
              <div className={styles.rowRight}>
                <span>₹{(item.basePrice || item.price || 0).toLocaleString('en-IN')}</span>
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

        <button className={styles.proceedBtn} onClick={handleProceed}>
          PROCEED WITH HAMPER
        </button>
      </div>
    </div>
  );
}
