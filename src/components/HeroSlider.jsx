import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import candleImg from '../assets/candle.png';
import hampersImg from '../assets/hampers.png';
import resinImg from '../assets/resin.png';
import weddingImg from '../assets/wedding.png';
import './HeroSlider.css';

const SLIDES = [
  { id: 1, image: candleImg, label: 'Shop Candles', link: '/shop/candles' },
  { id: 2, image: hampersImg, label: 'Build a Hamper', link: '/build-hamper' },
  { id: 3, image: resinImg, label: 'Shop Resin', link: '/shop/resin' },
  { id: 4, image: weddingImg, label: 'Shop Wedding', link: '/shop/wedding' },
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === SLIDES.length - 1 ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;

    const diff = touchStartX.current - touchEndX.current;

    if (diff > 50) {
      // swipe left (next slide)
      setCurrentSlide((prev) => (prev === SLIDES.length - 1 ? 0 : prev + 1));
    } else if (diff < -50) {
      // swipe right (prev slide)
      setCurrentSlide((prev) => (prev === 0 ? SLIDES.length - 1 : prev - 1));
    }

  };

  return (
    <div
      className="gt-hero-slider"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      aria-roledescription="carousel"
    >
      <div
        className="gt-hero-track"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {SLIDES.map((slide, idx) => (
          <div
            key={slide.id}
            className="gt-hero-slide"
            aria-hidden={idx !== currentSlide}
          >
            <img src={slide.image} alt={slide.label} className="gt-hero-image" />
            <Link
              to={slide.link}
              className="gt-hero-btn"
              tabIndex={idx !== currentSlide ? -1 : 0}
            >
              {slide.label}
            </Link>
          </div>
        ))}
      </div>
      <div className="gt-hero-dots">
        {SLIDES.map((_, idx) => (
          <button
            key={idx}
            className={`gt-hero-dot ${idx === currentSlide ? 'active' : ''}`}
            onClick={() => setCurrentSlide(idx)}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
