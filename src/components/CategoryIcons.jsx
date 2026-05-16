import { Link } from 'react-router-dom'
import './CategoryIcons.css'
import candleImg from '../assets/candleicon.png'
import resinImg from '../assets/resinicon.png'
import hampersImg from '../assets/hampericon.png'

const categories = [
    { label: 'Candles', link: '/shop/candles', img: candleImg },
    { label: 'Resin Art', link: '/shop/resin', img: resinImg },
    { label: 'Hampers', link: '/hamper-builder', img: hampersImg },
]


export default function CategoryIcons() {
    return (
        <section className="category-icons">
            {categories.map((cat) => (
                <Link to={cat.link} key={cat.label} className="category-item">
                    <div className="category-circle">
                        <img src={cat.img} alt={cat.label} />
                    </div>
                    <p className="category-label">{cat.label}</p>
                </Link>
            ))}
        </section>
    )
}