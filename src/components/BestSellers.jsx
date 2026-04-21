import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './BestSellers.css';
import candleImg from '../assets/candlebest.png'
const TABS = ["See All", "Candles", "Platters", "Frames", "Keepsakes", "Hampers", "Jewellery"];
import platterImg1 from '../assets/bestseller/platters/platter1.jpeg';
import frame1 from '../assets/bestseller/frames/frame.jpeg';
import candle from '../assets/bestseller/candle/candle2.jpeg';
import keepsakes from '../assets/bestseller/keepsakes/keepsake.jpeg';
import hamper from '../assets/bestseller/hampers/hamper.jpeg';
import Jewellery from '../assets/bestseller/jwellery/jwellery.jpeg';

const DUMMY_PRODUCTS = [
    { id: 1, name: "Teddy Candle", description: "Soy blend, 70h burn", price: "₹350.00", category: "Candles", image: candle, slug: "Teddy Candle" },
    { id: 2, name: "Haldi Platter", description: "Handcrafted resin", price: "₹1200.00", category: "Platters", image: platterImg1, slug: "Haldi platter" },
    { id: 3, name: "Resin Frame ", description: "6-inch", price: "₹800.00", category: "Frames", image: frame1, slug: "vintage-brass-frame" },
    { id: 4, name: "Cherished Keepsake Box", description: "Velvet lined interior", price: "₹1200.00", category: "Keepsakes", image: keepsakes, slug: "cherished-keepsake-box" },
    { id: 5, name: "Festive Joy Hamper", description: "Box of 4 items", price: "₹2500.00", category: "Hampers", image: hamper, slug: "festive-joy-hamper" },
    { id: 6, name: "Crystal Drop Necklace", description: "Sterling silver", price: "₹1200.00", category: "Jewellery", image: Jewellery, slug: "crystal-drop-necklace" },
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
