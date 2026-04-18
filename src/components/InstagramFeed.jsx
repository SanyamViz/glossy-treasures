import React from 'react';
import './InstagramFeed.css';
import reel1 from '../assets/reel1.mp4';
import reel2 from '../assets/reel2.mp4';
import reel3 from '../assets/reel3.mp4';
import reel4 from '../assets/reel4.mp4';
import reel5 from '../assets/reel5.mp4';
import reel6 from '../assets/reel6.mp4';
const INSTA_REELS = [
    { id: 1, video: reel1, link: "https://www.instagram.com/reel/DLsLK7dv7D2/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==" },
    { id: 2, video: reel2, link: "https://www.instagram.com/reel/DWgM0URkpLt/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==" },
    { id: 3, video: reel3, link: "https://www.instagram.com/reel/DUdaHdlkexi/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==" },
    { id: 4, video: reel4, link: "https://www.instagram.com/reel/DUdaHdlkexi/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==" },
    { id: 5, video: reel5, link: "https://www.instagram.com/reel/DQ8xWRXkWg3/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==" },
    { id: 6, video: reel6, link: "https://www.instagram.com/reel/DPwHAQfEWrP/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==" }
];

export default function InstagramFeed() {
    // Group reels into pairs for each slide
    const slides = [];
    for (let i = 0; i < INSTA_REELS.length; i += 2) {
        slides.push(INSTA_REELS.slice(i, i + 2));
    }

    return (
        <section className="insta-feed-section">
            <div className="insta-feed-header">
                <p className="insta-feed-label">As seen on Instagram</p>
                <h2 className="insta-feed-heading">
                    <a
                        href="https://www.instagram.com/glossy_treasures"
                        target="_blank"
                        rel="noreferrer"
                        className="ig-handle-link"
                        style={{ color: 'inherit', textDecoration: 'none' }}
                    >
                        @glossy_treasures
                    </a>
                </h2>
                <p className="insta-feed-subtext">Tag us in your photos for a chance to be featured</p>
            </div>

            <div className="insta-feed-slider">
                {slides.map((slide, index) => (
                    <div className="insta-slide" key={index}>
                        {slide.map((reel) => (
                            <a
                                key={reel.id}
                                href="https://www.instagram.com/reel/DLsLK7dv7D2/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
                                target="_blank"
                                rel="noreferrer"
                                className="insta-reel-item"
                            >
                                <video
                                    src={reel.video}
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    className="reel-video"
                                />
                                <div className="insta-hover-overlay">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                                    </svg>
                                </div>
                            </a>
                        ))}
                    </div>
                ))}
            </div>

            <a
                href="https://www.instagram.com/glossy_treasures"
                target="_blank"
                rel="noreferrer"
                className="ig-follow-cta"
            >
                Follow us · @glossy_treasures ↗
            </a>
        </section>
    );
}
