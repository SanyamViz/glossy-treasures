import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './FeaturedProducts.css';
import candleImg from '../assets/candlebest.png';
import candleImg2 from '../assets/candle2.png';
import resinimg from '../assets/resinframe.png';
import resinimg2 from '../assets/resinframe2.png';

import { ALL_PRODUCTS } from '../data/products';

const FEATURED_PRODUCTS = ALL_PRODUCTS.filter(p => p.featured);

const MotionLink = motion(Link);

const cardVariants = {
    hidden: { opacity: 0, y: 70, scale: 0.96 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1],
        },
    },
};

const imageVariants = {
    hidden: { scale: 1.15 },
    visible: {
        scale: 1,
        transition: {
            duration: 1.4,
            ease: 'easeOut',
        },
    },
};

export default function FeaturedProducts() {
    // Distribute products into columns dynamically
    const leftColumnProducts = FEATURED_PRODUCTS.filter((_, idx) => idx % 2 === 0);
    const rightColumnProducts = FEATURED_PRODUCTS.filter((_, idx) => idx % 2 !== 0);

    const ProductCard = ({ product }) => (
        <MotionLink
            to={`/shop/${product.category === 'candle' ? 'candles' : 'resin'}/${product.slug}`}
            className="featured-card"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            whileHover={{ y: -6, scale: 1.02 }}
        >
            <div className="featured-img-wrapper">
                <motion.img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    variants={imageVariants}
                />
            </div>

            <div className="featured-card-body">
                <h3 className="fp-name">{product.name}</h3>
                <p className="fp-price">₹{product.price.toLocaleString('en-IN')}</p>
            </div>
        </MotionLink>
    );

    return (
        <section className="featured-products-section">
            <div className="fp-header">
                <h2 className="fp-title-line1">Handpicked</h2>
                <h2 className="fp-title-line2">with love</h2>
                <div className="fp-divider"></div>
            </div>

            <motion.div
                className="featured-grid"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ staggerChildren: 0.2 }} // 🔥 stagger effect
            >
                <div className="featured-col featured-col-left">
                    {leftColumnProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>

                <div className="featured-col featured-col-right">
                    {rightColumnProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </motion.div>
        </section>
    );
}