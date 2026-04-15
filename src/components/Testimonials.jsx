import React, { useState, useEffect, useRef } from 'react';
import './Testimonials.css';

const TESTIMONIALS = [
    { 
        id: 1, 
        text: "Ordered a custom resin platter for my wedding and it was absolutely stunning. Everyone kept asking where I got it from.", 
        name: "Priya Sharma", 
        location: "Delhi" 
    },
    { 
        id: 2, 
        text: "The candles burn so evenly and the scent fills the whole room. Already on my third order!", 
        name: "Sneha Kapoor", 
        location: "Mumbai" 
    },
    { 
        id: 3, 
        text: "Got a hamper as a birthday gift for my best friend. She cried. Worth every rupee.", 
        name: "Ananya Singh", 
        location: "Bangalore" 
    },
    { 
        id: 4, 
        text: "The resin bookmark with my name preserved inside is the most thoughtful thing I own. Absolutely one of a kind.", 
        name: "Meera Joshi", 
        location: "Pune" 
    },
    { 
        id: 5, 
        text: "Fast delivery, beautiful packaging and the product quality is exceptional. Will definitely order again.", 
        name: "Riya Patel", 
        location: "Ahmedabad" 
    }
];

export default function Testimonials() {
    const [activeIndex, setActiveIndex] = useState(0);
    const sliderRef = useRef(null);
    const cardRefs = useRef([]);

    useEffect(() => {
        const observerOptions = {
            root: sliderRef.current,
            threshold: 0.6 // Card must be 60% visible to be considered active
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const index = cardRefs.current.findIndex(el => el === entry.target);
                    if (index !== -1) {
                        setActiveIndex(index);
                    }
                }
            });
        }, observerOptions);

        const currentRefs = cardRefs.current;
        currentRefs.forEach(card => {
            if (card) observer.observe(card);
        });

        return () => {
            currentRefs.forEach(card => {
                if (card) observer.unobserve(card);
            });
        };
    }, []);

    const scrollTo = (index) => {
        if (cardRefs.current[index] && sliderRef.current) {
            // Using scrollIntoView for smooth horizontal snapping
            cardRefs.current[index].scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'center'
            });
        }
    };

    return (
        <section className="testimonials-section">
            <h2 className="testimonials-heading">What Our Customers Say</h2>

            <div className="testimonials-slider" ref={sliderRef}>
                {TESTIMONIALS.map((item, index) => (
                    <div 
                        key={item.id} 
                        className={`testimonial-card ${activeIndex === index ? 'active' : ''}`}
                        ref={el => cardRefs.current[index] = el}
                    >
                        <span className="testimonial-quote-mark">“</span>
                        <p className="testimonial-text">{item.text}</p>
                        <div className="testimonial-divider"></div>
                        <div className="testimonial-reviewer">
                            <img 
                                src="https://placehold.co/40x40/E8E0D5/7A7068" 
                                alt={item.name} 
                                className="reviewer-avatar" 
                                loading="lazy"
                            />
                            <div className="reviewer-info">
                                <p className="reviewer-name">{item.name}</p>
                                <p className="reviewer-location">{item.location}</p>
                            </div>
                            <div className="reviewer-stars">★★★★★</div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="testimonial-dots">
                {TESTIMONIALS.map((_, index) => (
                    <button 
                        key={index} 
                        className={`testimonial-dot ${activeIndex === index ? 'active' : ''}`}
                        onClick={() => scrollTo(index)}
                        aria-label={`Go to testimonial ${index + 1}`}
                    />
                ))}
            </div>
        </section>
    );
}
