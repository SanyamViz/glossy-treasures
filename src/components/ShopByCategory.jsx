import { Link } from 'react-router-dom'
import './ShopByCategory.css'

const categories = [
    { label: 'Gifting Edit', to: '/collections/gifting-edit' },
    { label: 'Wedding Special', to: '/collections/wedding-season' },
    { label: 'Self Care', to: '/collections/self-care-rituals' },
    { label: 'Home Sanctuary', to: '/collections/home-sanctuary' },
    { label: 'New Arrivals', to: '/collections/new-arrivals' },
    { label: 'Bestsellers', to: '/collections/bestsellers' },
    { label: 'Soy Candles', to: '/shop/candles' },
    { label: 'Resin Art', to: '/shop/resin' },
]

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
                            <img src={`https://placehold.co/72x72/E8E0D5/7A7068`} alt={cat.label} />
                        </div>
                        <p className="shop-category-label">{cat.label}</p>
                    </Link>
                ))}
            </div>
        </section>
    )
}