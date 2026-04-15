import { Link } from 'react-router-dom'
import './ShopByCategory.css'

const categories = [
    { label: 'Soy Candles', slug: 'soy-candles' },
    { label: 'Scented Candles', slug: 'scented-candles' },
    { label: 'Jar Candles', slug: 'jar-candles' },
    { label: 'Platters', slug: 'platters' },
    { label: 'Frames', slug: 'frames' },
    { label: 'Coasters', slug: 'coasters' },
    { label: 'Bookmarks', slug: 'bookmarks' },
    { label: 'Pendants', slug: 'pendants' },
    { label: 'Wall Art', slug: 'wall-art' },
    { label: 'Wedding Special', slug: 'wedding-special' },
    { label: 'Hampers', slug: 'hampers' },
    { label: 'Custom Orders', slug: 'custom-orders' },
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
                    <Link to={`/shop/${cat.slug}`} key={cat.slug} className="shop-category-item">
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