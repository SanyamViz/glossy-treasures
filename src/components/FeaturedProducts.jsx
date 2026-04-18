import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './FeaturedProducts.css';
import candleImg from '../assets/candlebest.png';
import candleImg2 from '../assets/candle2.png';
import resinimg from '../assets/resinframe.png';
import resinimg2 from '../assets/resinframe2.png';

const MotionLink = motion(Link);

const FEATURED_PRODUCTS = [
    {
        id: 1,
        name: 'Amber & Oud Candle',
        price: '₹1,299',
        category: 'candles',
        image: candleImg,
        slug: 'amber-oud-candle',
    },
    {
        id: 2,
        name: 'Floral Resin Platter',
        price: '₹2,499',
        category: 'platters',
        image: candleImg2,
        slug: 'floral-resin-platter',
    },
    {
        id: 3,
        name: 'Pressed Flower Frame',
        price: '₹1,899',
        category: 'frames',
        image: resinimg,
        slug: 'pressed-flower-frame',
    },
    {
        id: 4,
        name: 'Rose Gold Hamper',
        price: '₹3,499',
        category: 'hampers',
        image: resinimg2,
        slug: 'rose-gold-hamper',
    },
];

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
    const leftColumnProducts = [FEATURED_PRODUCTS[0], FEATURED_PRODUCTS[2]];
    const rightColumnProducts = [FEATURED_PRODUCTS[1], FEATURED_PRODUCTS[3]];

    const ProductCard = ({ product }) => (
        <MotionLink
            to={`/shop/${product.category === 'candles' ? 'candles' : 'resin'}/${product.slug}`}
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
                <p className="fp-price">{product.price}</p>
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