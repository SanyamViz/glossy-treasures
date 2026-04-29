import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './BestSellers.css';
import candleImg from '../assets/candlebest.png'
import { getBestsellers } from '../data/products';

const TABS = ["See All", "Candles", "Platters", "Frames", "Keepsakes", "Hampers", "Jewellery"];

export default function BestSellers() {
    const [activeTab, setActiveTab] = useState("See All");
    const bestSellers = getBestsellers();

    const filteredProducts = activeTab === "See All"
        ? bestSellers
        : bestSellers.filter(product => {
            const cat = product.category.toLowerCase();
            const type = product.type?.toLowerCase();
            const tab = activeTab.toLowerCase();

            if (tab === 'candles') return cat === 'candle';
            if (tab === 'platters') return type === 'platter';
            if (tab === 'frames') return type === 'frame';
            if (tab === 'keepsakes') return type === 'box' || type === 'keepsake';
            if (tab === 'hampers') return cat === 'hamper';
            if (tab === 'jewellery') return type === 'dish' || type === 'jewellery';
            
            return cat === tab || type === tab;
        });

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
                            to={`/shop/${product.category === 'candle' ? 'candles' : 'resin'}/${product.slug}`}
                            className="product-card"
                            key={product.id}
                        >
                            <div className="product-image-container">
                                <span className="best-seller-badge">BEST SELLER</span>
                                <img src={product.image} alt={product.name} className="product-image" loading="lazy" />
                            </div>
                            <div className="product-info">
                                <h3 className="product-name">{product.name}</h3>
                                <p className="product-description">{product.tagline || product.description}</p>
                                <p className="product-price">₹{product.price.toLocaleString('en-IN')}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
