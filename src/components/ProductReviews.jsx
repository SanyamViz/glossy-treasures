import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useUser } from "@clerk/react";
import styles from './ProductReviews.module.css';

const StarRating = ({ rating, interactive = false, onRate }) => (
  <div className={styles.starRating} style={{ display: 'flex', gap: '4px' }}>
    {[1, 2, 3, 4, 5].map(star => (
      <span
        key={star}
        onClick={() => interactive && onRate && onRate(star)}
        style={{
          fontSize: interactive ? '28px' : '16px',
          color: star <= rating ? '#C4948A' : '#E8E0D5',
          cursor: interactive ? 'pointer' : 'default',
          transition: 'color 0.15s'
        }}
      >
        ★
      </span>
    ))}
  </div>
);

export default function ProductReviews() {
  const { slug } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '', customerName: '' });
  const [submitting, setSubmitting] = useState(false);
  const { user, isSignedIn } = useUser();

  const fetchReviews = () => {
    if (!slug) return;
    fetch(`${import.meta.env.VITE_API_URL}/api/reviews/${slug}`)
      .then(r => r.json())
      .then(data => {
        setReviews(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchReviews();
  }, [slug]);

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!newReview.comment.trim()) return alert("Please write a comment.");
    setSubmitting(true);
    
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
    } finally {
      setSubmitting(false);
    }
  };

  const avgRating = reviews.length > 0 
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
    : 0;

  if (loading) return <div className={styles.loading}>Loading reviews...</div>;

  return (
    <div className={styles.container}>
      <div className={styles.topSection}>
        <div className={styles.avgContainer}>
          <span className={styles.avgNumber}>{avgRating}</span>
          <div className={styles.avgMeta}>
            <StarRating rating={Math.round(avgRating)} />
            <span className={styles.totalCount}>Based on {reviews.length} reviews</span>
          </div>
        </div>
        <button 
          className={styles.writeBtn} 
          onClick={() => {
            if (!isSignedIn) {
              alert("Please sign in to write a review.");
              return;
            }
            setShowForm(!showForm);
          }}
        >
          {showForm ? 'CANCEL' : 'WRITE A REVIEW'}
        </button>
      </div>

      {showForm && isSignedIn && (
        <div className={styles.reviewForm}>
          <h3>Share your experience</h3>
          <form onSubmit={handleSubmitReview}>
            <div className={styles.formGroup}>
              <label>How would you rate it?</label>
              <StarRating 
                rating={newReview.rating} 
                interactive={true} 
                onRate={num => setNewReview(prev => ({ ...prev, rating: num }))} 
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
              <label>Your Review</label>
              <textarea 
                placeholder="What did you like or dislike about this product?" 
                rows="4"
                value={newReview.comment}
                onChange={e => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
                required
              />
            </div>
            <button type="submit" className={styles.submitBtn} disabled={submitting}>
              {submitting ? 'SUBMITTING...' : 'SUBMIT REVIEW'}
            </button>
          </form>
        </div>
      )}

      <div className={styles.reviewsList}>
        {reviews.length === 0 ? (
          <div className={styles.emptyState}>
            <p>No reviews yet. Be the first to share your experience!</p>
          </div>
        ) : (
          reviews.map(review => (
            <div key={review.id} className={styles.reviewCard}>
              <div className={styles.cardHeader}>
                <div className={styles.authorInfo}>
                  <span className={styles.authorName}>{review.customerName}</span>
                  {review.verified && <span className={styles.verifiedBadge}>✓ Verified Purchase</span>}
                </div>
                <span className={styles.reviewDate}>
                  {new Date(review.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                </span>
              </div>
              <StarRating rating={review.rating} />
              <p className={styles.comment}>{review.comment}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
