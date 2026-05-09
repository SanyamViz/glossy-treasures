import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './BestSellers.css';

const TABS = ["See All", "Candles", "Platters", "Frames", "keychain", "Wedding Invitations", "Jewellery"];

export default function BestSellers() {
    const [activeTab, setActiveTab] = useState("See All");
    const [bestSellers, setBestSellers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/api/products?bestseller=true`)
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    // Double check filtering on frontend
                    const onlyBestsellers = data.filter(p => p.bestseller === true);
                    setBestSellers(onlyBestsellers);
                }
                setLoading(false);
            })
            .catch(err => {
                console.error('Bestseller fetch error:', err);
                setLoading(false);
            });
    }, []);

    const filteredProducts = activeTab === "See All"
        ? bestSellers
        : bestSellers.filter(product => {
            const cat = product.category?.toLowerCase() || '';
            const type = product.type?.toLowerCase() || '';
            const tab = activeTab.toLowerCase();

            if (tab === 'candles') return cat === 'candle';
            if (tab === 'platters') return type === 'platter';
            if (tab === 'frames') return type === 'frame';
            if (tab === 'keychain') return type === 'keychain' || type === 'box' || type === 'keepsake';
            if (tab === 'wedding invitations') return cat === 'hamper' || type === 'invitation';
            if (tab === 'jewellery') return type === 'dish' || type === 'jewellery';

            return cat === tab || type === tab;
        });

    if (loading && bestSellers.length === 0) return null;

    return (
        <section className="best-sellers-section">
            <h2 className="best-sellers-title">Best Sellers</h2>

            <div className="filter-tabs-container">
                <div className="filter-tabs">
                    {TABS.map(tab => (
                        <button
                            key={tab}
                            className={`filter-tab ${activeTab === tab ? 'active' : ''}`}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            <div className="products-grid-container">
                <div className="products-grid">
                    {filteredProducts.map(product => (
                        <Link
                            to={(product.category || '').toLowerCase() === 'hamper' ? '/shop/hamper-builder' : `/shop/${
                              (product.category || '').toLowerCase() === 'candle' ? 'candles' : 'resin'
                            }/${product.slug}`}
                            className="product-card"
                            key={product.id}
                        >
                            <div className="product-image-container">
                                <span className="best-seller-badge">BEST SELLER</span>
                                <img src={product.image || product.images?.[0]} alt={product.name} className="product-image" loading="lazy" />
                            </div>
                            <div className="product-info">
                                <h3 className="product-name">{product.name}</h3>
                                <p className="product-description">{product.tagline || product.description}</p>
                                <p className="product-price">₹{(product.basePrice || product.price || 0).toLocaleString('en-IN')}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
