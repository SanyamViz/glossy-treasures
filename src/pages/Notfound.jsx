import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Notfound.module.css';

const Notfound = () => {
    const navigate = useNavigate();
    const [mounted, setMounted] = useState(false);
    const [countdown, setCountdown] = useState(10);

    useEffect(() => {
        const t = setTimeout(() => setMounted(true), 50);
        return () => clearTimeout(t);
    }, []);

    // Auto-redirect countdown
    useEffect(() => {
        if (countdown === 0) {
            navigate('/');
            return;
        }
        const timer = setTimeout(() => setCountdown(c => c - 1), 1000);
        return () => clearTimeout(timer);
    }, [countdown, navigate]);

    return (
        <div className={`${styles.page} ${mounted ? styles.visible : ''}`}>

            {/* Floating elements background */}
            <div className={styles.floatingBg}>
                <div className={styles.floatItem} style={{ '--i': 0 }}>🕯️</div>
                <div className={styles.floatItem} style={{ '--i': 1 }}>✨</div>
                <div className={styles.floatItem} style={{ '--i': 2 }}>🎁</div>
                <div className={styles.floatItem} style={{ '--i': 3 }}>🕯️</div>
                <div className={styles.floatItem} style={{ '--i': 4 }}>✨</div>
            </div>

            <div className={styles.container}>

                {/* 404 Number */}
                <div className={`${styles.number} ${mounted ? styles.numberIn : ''}`}>
                    <span className={styles.digit}>4</span>
                    <span className={`${styles.digit} ${styles.digitMiddle}`}>0</span>
                    <span className={styles.digit}>4</span>
                </div>

                {/* Content */}
                <div className={`${styles.content} ${mounted ? styles.contentIn : ''}`}>
                    <h1 className={styles.title}>This page took a detour.</h1>
                    <p className={styles.description}>
                        We couldn't find what you're looking for, but we have plenty of beautiful things waiting for you.
                    </p>

                    {/* Action buttons */}
                    <div className={styles.actions}>
                        <Link to="/" className={styles.btnPrimary}>
                            Back to Home
                        </Link>
                        <Link to="/shop/candles" className={styles.btnOutline}>
                            Shop Candles
                        </Link>
                    </div>

                    {/* Auto-redirect notice */}
                    <p className={styles.countdown}>
                        Redirecting to home in <strong>{countdown}</strong> seconds
                    </p>
                </div>

                {/* Helpful links */}
                <div className={`${styles.links} ${mounted ? styles.linksIn : ''}`}>
                    <span className={styles.linksLabel}>Looking for something?</span>
                    <div className={styles.linksGrid}>
                        <Link to="/shop/candles" className={styles.linkCard}>
                            <span className={styles.linkIcon}>🕯️</span>
                            <span className={styles.linkLabel}>Candles</span>
                        </Link>
                        <Link to="/shop/resin" className={styles.linkCard}>
                            <span className={styles.linkIcon}>✨</span>
                            <span className={styles.linkLabel}>Resin Art</span>
                        </Link>
                        <Link to="/collections" className={styles.linkCard}>
                            <span className={styles.linkIcon}>🎁</span>
                            <span className={styles.linkLabel}>Collections</span>
                        </Link>
                        <Link to="/build-hamper" className={styles.linkCard}>
                            <span className={styles.linkIcon}>📦</span>
                            <span className={styles.linkLabel}>Custom Hamper</span>
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Notfound;