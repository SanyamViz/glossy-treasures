import React from 'react';
import styles from './MadeByAngel.module.css';

export default function MadeByAngel() {
  const openWhatsApp = () => {
    window.open('https://wa.me/918544911357', '_blank');
  };

  return (
    <div className={styles.container}>
      <div className={styles.profileRow}>
        <div className={styles.avatar}>A</div>
        <div className={styles.text}>
          <p className={styles.name}>Handcrafted by Angel</p>
          <p className={styles.tagline}>Every piece leaves our studio with care and intention.</p>
        </div>
      </div>
      <button className={styles.waBtn} onClick={openWhatsApp}>
        💬 Chat with Angel
      </button>
    </div>
  );
}
