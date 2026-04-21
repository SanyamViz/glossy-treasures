import { Link } from 'react-router-dom'
import './ShopByCategory.css'
import giftingImg from '../assets/categoryicons/gifting.jpeg';
import weddingImg from '../assets/categoryicons/wedding.jpeg';
import selfcareImg from '../assets/categoryicons/selfcare.jpeg';
import homeImg from '../assets/categoryicons/home.jpeg';
import newImg from '../assets/categoryicons/new.jpeg';
import bestsellerImg from '../assets/categoryicons/bestseller.jpeg';
import candleImg from '../assets/categoryicons/candle.jpeg';
import resinImg from '../assets/categoryicons/resin.jpeg';

const categories = [
    { label: 'Gifting Edit', to: '/collections/gifting-edit', img: giftingImg },
    { label: 'Wedding Special', to: '/collections/wedding-season', img: weddingImg },
    { label: 'Self Care', to: '/collections/self-care-rituals', img: selfcareImg },
    { label: 'Home Sanctuary', to: '/collections/home-sanctuary', img: homeImg },
    { label: 'New Arrivals', to: '/collections/new-arrivals', img: newImg },
    { label: 'Bestsellers', to: '/collections/bestsellers', img: bestsellerImg },
    { label: 'Soy Candles', to: '/shop/candles', img: candleImg },
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