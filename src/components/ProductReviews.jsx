import React from 'react';
import styles from './ProductReviews.module.css';

const REVIEWS = [
  {
    id: 1,
    text: "I ordered the Amber & Oud candle and it completely changed the energy of my room. Will reorder.",
    author: "Priya M.",
    location: "Delhi",
    rating: 5,
    pinned: true
  },
  {
    id: 2,
    text: "The resin tray was exactly as shown — the colours are even more beautiful in person.",
    author: "Shreya K.",
    location: "Mumbai",
    rating: 5
  },
  {
    id: 3,
    text: "Gifted this to my best friend and she cried. The packaging alone is stunning.",
    author: "Ananya R.",
    location: "Bangalore",
    rating: 5
  }
];

const Stars = ({ count }) => (
  <span className={styles.stars}>
    {'★'.repeat(count)}
  </span>
);

export default function ProductReviews() {
  const pinned = REVIEWS.find(r => r.pinned);
  const scrollable = REVIEWS.filter(r => !r.pinned);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>What people are saying</h2>

      {/* Pinned Review */}
      <div className={styles.pinnedCard}>
        <Stars count={pinned.rating} />
        <p className={styles.pinnedText}>"{pinned.text}"</p>
        <p className={styles.author}>— {pinned.author}, {pinned.location}</p>
      </div>

      {/* Scrollable Reviews */}
      <div className={styles.scrollRow}>
        {scrollable.map(review => (
          <div key={review.id} className={styles.reviewCard}>
            <Stars count={review.rating} />
            <p className={styles.reviewText}>{review.text}</p>
            <p className={styles.author}>— {review.author}, {review.location}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
