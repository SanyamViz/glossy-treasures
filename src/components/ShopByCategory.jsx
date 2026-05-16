import { Link } from 'react-router-dom'
import './ShopByCategory.css'
import giftingImg from '../assets/categoryicons/gifting.jpg';
import weddingImg from '../assets/categoryicons/wedding.jpg';
import selfcareImg from '../assets/categoryicons/selfcare.jpg';
import homeImg from '../assets/categoryicons/home.jpg';
import newImg from '../assets/categoryicons/new.jpg';
import bestsellerImg from '../assets/categoryicons/bestseller.jpg';
import candleImg from '../assets/categoryicons/candle.jpg';
import resinImg from '../assets/categoryicons/resin.jpg';

const categories = [
    { label: 'Gifting', to: '/collections/gifting', img: giftingImg },
    { label: 'Wedding Special', to: '/collections/wedding', img: weddingImg },
    { label: 'Self Care', to: '/collections/self-care', img: selfcareImg },
    { label: 'Home Decor', to: '/collections/home-decor', img: homeImg },
    { label: 'New Arrivals', to: '/collections/new-arrivals', img: newImg },
    { label: 'Bestsellers', to: '/collections/bestsellers', img: bestsellerImg },
    { label: 'Candles', to: '/shop/candles', img: candleImg },
    { label: 'Resin Art', to: '/shop/resin', img: resinImg },
];

export default function ShopByCategory() {
    return (
        <section className="shop-category-section">
            <h2 className="shop-category-heading">
                <span className="shop-category-line"></span>
                · Shop by Category ·
                <span className="shop-category-line"></span>
            </h2>
            <div className="shop-category-grid">
                {categories.map((cat) => (
                    <Link to={cat.to} key={cat.label} className="shop-category-item">
                        <div className="shop-category-circle">
                            <img src={cat.img} alt={cat.label} />
                        </div>
                        <p className="shop-category-label">{cat.label}</p>
                    </Link>
                ))}
            </div>
        </section>
    )
}