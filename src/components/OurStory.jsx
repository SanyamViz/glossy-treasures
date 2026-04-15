import React from 'react';
import { Link } from 'react-router-dom';
import './OurStory.css';
import angel from '../assets/angel.jpeg';

export default function OurStory() {
    return (
        <section className="our-story-section">
            <div className="our-story-container">
                <div className="our-story-image-wrapper">
                    <img 
                        src={angel} 
                        alt="Hi, I'm Angel" 
                        className="our-story-image" 
                        loading="lazy" 
                    />
                </div>
                <div className="our-story-content">
                    <p className="our-story-label">OUR STORY</p>
                    <h2 className="our-story-heading">Hi, I'm Angel</h2>
                    <p className="our-story-text">
                        Every piece starts with a feeling — the warmth of a candle, the beauty of a flower frozen in resin.
                    </p>
                    <div className="our-story-divider"></div>
                    <Link to="/our-story" className="our-story-link">Our Story &rarr;</Link>
                </div>
            </div>
        </section>
    );
}
