import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './BestSellers.css';
import candleImg from '../assets/candlebest.png'
const TABS = ["See All", "Candles", "Platters", "Frames", "Keepsakes", "Hampers", "Jewellery"];

const DUMMY_PRODUCTS = [
    { id: 1, name: "Signature Rose Candle", description: "Soy blend, 50h burn", price: "₹1,249", category: "Candles", img: candleImg, slug: "signature-rose-candle" },
    { id: 2, name: "Marble Swirl Platter", description: "Handcrafted resin", price: "₹45.00", category: "Platters", image: "https://placehold.co/300x300/E8E0D5/7A7068", slug: "marble-swirl-platter" },
    { id: 3, name: "Vintage Brass Frame", description: "4x6 photo frame", price: "$32.00", category: "Frames", image: "https://placehold.co/300x300/E8E0D5/7A7068", slug: "vintage-brass-frame" },
    { id: 4, name: "Cherished Keepsake Box", description: "Velvet lined interior", price: "$55.00", category: "Keepsakes", image: "https://placehold.co/300x300/E8E0D5/7A7068", slug: "cherished-keepsake-box" },
    { id: 5, name: "Festive Joy Hamper", description: "Box of 4 items", price: "$120.00", category: "Hampers", image: "https://placehold.co/300x300/E8E0D5/7A7068", slug: "festive-joy-hamper" },
    { id: 6, name: "Crystal Drop Necklace", description: "Sterling silver", price: "$85.00", category: "Jewellery", image: "https://placehold.co/300x300/E8E0D5/7A7068", slug: "crystal-drop-necklace" },
];

export default function BestSellers() {
    const [activeTab, setActiveTab] = useState("See All");

    const filteredProducts = activeTab === "See All"
        ? DUMMY_PRODUCTS
        : DUMMY_PRODUCTS.filter(product => product.category === activeTab);

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
                            to={`/shop/${product.category.toLowerCase() === 'candles' ? 'candles' : 'resin'}/${product.slug}`} 
                            className="product-card" 
                            key={product.id}
                        >
                            <div className="product-image-container">
                                <span className="best-seller-badge">BEST SELLER</span>
                                <img src={product.image} alt={product.name} className="product-image" loading="lazy" />
                            </div>
                            <div className="product-info">
                                <h3 className="product-name">{product.name}</h3>
                                <p className="product-description">{product.description}</p>
                                <p className="product-price">{product.price}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
