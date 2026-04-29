import React, { useState } from 'react';
import styles from './ProductAccordion.module.css';

const CONTENT = {
  candle: [
    {
      title: 'Ingredients',
      content: 'Soy wax blend, cotton wick, phthalate-free fragrance oils, natural essential oils. Clean burning and non-toxic.'
    },
    {
      title: 'Care Instructions',
      content: 'Trim wick to 5mm before each burn. Never burn for more than 4 hours. Keep away from children and pets. Burn on a level, heat-resistant surface.'
    },
    {
      title: 'Shipping & Delivery',
      content: 'Standard delivery in 4–6 business days. Cash on Delivery available. Ships in a gift-ready box with a handwritten note from Angel.'
    }
  ],
  resin: [
    {
      title: 'Materials',
      content: 'UV-stabilised epoxy resin, non-toxic pigments, mica powder, gold leaf. Crystal clear finish with high durability.'
    },
    {
      title: 'Care Instructions',
      content: 'Wipe with a soft, dry cloth. Avoid prolonged direct sunlight to prevent yellowing. Do not submerge in water or use harsh chemicals.'
    },
    {
      title: 'Shipping & Delivery',
      content: 'Standard delivery in 4–6 business days. Cash on Delivery available. Each order includes a personalised note and premium packaging.'
    },
    {
      title: 'Customisation Details',
      content: 'Made to order after confirmation. Angel shares a WhatsApp preview of your piece before dispatch. Final product may vary slightly as each is unique.'
    }
  ]
};

export default function ProductAccordion({ type, product }) {
  const [openIndex, setOpenIndex] = useState(0);
  
  let items = [...(CONTENT[type] || CONTENT.candle)];

  // Inject product-specific data if available
  if (product) {
    if (type === 'candle' && product.ingredients) {
      items[0] = { ...items[0], content: product.ingredients };
    } else if (type === 'resin' && product.materials) {
      items[0] = { ...items[0], content: product.materials };
    }
  }

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className={styles.accordion}>
      {items.map((item, idx) => (
        <div key={idx} className={`${styles.item} ${openIndex === idx ? styles.active : ''}`}>
          <button className={styles.header} onClick={() => toggle(idx)}>
            <span>{item.title}</span>
            <span className={styles.chevron}>▾</span>
          </button>
          <div className={styles.body}>
            <div className={styles.content}>
              {item.content}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
