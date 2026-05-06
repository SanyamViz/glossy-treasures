import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useUser } from "@clerk/react";
import styles from './ProductReviews.module.css';

const Stars = ({ count, interactive = false, onSelect }) => (
  <span className={styles.stars}>
    {[1, 2, 3, 4, 5].map(num => (
      <span 
        key={num} 
        onClick={() => interactive && onSelect(num)}
        style={{ cursor: interactive ? 'pointer' : 'default', color: num <= count ? '#B8965A' : '#E8D5B5' }}
      >
        ★
      </span>
    ))}
  </span>
);

export default function ProductReviews() {
  const { slug } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '', customerName: '' });
  const { user, isSignedIn } = useUser();

  const fetchReviews = () => {
    if (!slug) return;
    fetch(`${import.meta.env.VITE_API_URL}/api/reviews/${slug}`)
      .then(r => r.json())
      .then(data => { setReviews(Array.isArray(data) ? data : []); setLoading(false); })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchReviews();
  }, [slug]);

  const handleSubmitReview = async () => {
    if (!newReview.comment.trim()) return alert("Please write a comment.");
    
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productSlug: slug,
          customerName: newReview.customerName || user?.fullName || 'Anonymous',
          rating: newReview.rating,
          comment: newReview.comment,
        })
      });
      if (res.ok) {
        setShowForm(false);
        setNewReview({ rating: 5, comment: '', customerName: '' });
        fetchReviews();
      }
    } catch (err) {
      console.error("Review submission failed:", err);
    }
  };

  const avgRating = reviews.length > 0 
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
    : 0;

  if (loading) return <div className={styles.container}><p>Loading reviews...</p></div>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>Customer Reviews</h2>
          {reviews.length > 0 && (
            <div className={styles.avgWrapper}>
              <span className={styles.avgScore}>{avgRating}</span>
              <Stars count={Math.round(avgRating)} />
              <span className={styles.countText}>Based on {reviews.length} reviews</span>
            </div>
          )}
        </div>
        {isSignedIn && (
          <button className={styles.writeBtn} onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Cancel' : 'Write a Review'}
          </button>
        )}
      </div>

      {showForm && (
        <div className={styles.reviewForm}>
          <h3>Share your experience</h3>
          <div className={styles.formGroup}>
            <label>Rating</label>
            <Stars 
              count={newReview.rating} 
              interactive={true} 
              onSelect={num => setNewReview(prev => ({ ...prev, rating: num }))} 
            />
          </div>
          <div className={styles.formGroup}>
            <label>Your Name (Optional)</label>
            <input 
              type="text" 
              placeholder={user?.fullName || "Anonymous"} 
              value={newReview.customerName}
              onChange={e => setNewReview(prev => ({ ...prev, customerName: e.target.value }))}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Review</label>
            <textarea 
              placeholder="What did you like or dislike?" 
              rows="4"
              value={newReview.comment}
              onChange={e => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
            />
          </div>
          <button className={styles.submitBtn} onClick={handleSubmitReview}>Submit Review</button>
        </div>
      )}

      <div className={styles.reviewsList}>
        {reviews.length === 0 ? (
          <p className={styles.emptyText}>No reviews yet. Be the first to share your thoughts!</p>
        ) : (
          reviews.map(review => (
            <div key={review.id} className={styles.reviewItem}>
              <div className={styles.itemHeader}>
                <Stars count={review.rating} />
                <span className={styles.itemDate}>{new Date(review.createdAt).toLocaleDateString()}</span>
              </div>
              <p className={styles.itemAuthor}>{review.customerName}</p>
              <p className={styles.itemComment}>{review.comment}</p>
              {review.verified && <span className={styles.verifiedBadge}>✓ Verified Purchase</span>}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
