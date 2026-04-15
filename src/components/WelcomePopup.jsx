import { useEffect, useState } from 'react';
import './WelcomePopup.css';

export default function WelcomePopup({ setIsPopupOpen }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isRendered, setIsRendered] = useState(false);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const checkPopupStatus = () => {
      // Bypass for development testing
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('showPopup') === 'true') return false;

      const popupData = localStorage.getItem('gt_popup_seen');
      if (!popupData) return false;

      try {
        const parsed = JSON.parse(popupData);
        if (parsed && parsed.timestamp) {
          const now = Date.now();
          const oneHour = 60 * 60 * 1000; // 1 Hour in milliseconds
          return now - parsed.timestamp < oneHour;
        }
      } catch (e) {
        if (popupData === 'true') return true;
      }
      return false;
    };

    if (checkPopupStatus()) return;

    const timer = setTimeout(() => {
      setIsRendered(true);
      setTimeout(() => {
        setIsVisible(true);
        if (setIsPopupOpen) setIsPopupOpen(true);
      }, 50);
    }, 3000);

    return () => clearTimeout(timer);
  }, [setIsPopupOpen]);

  const closePopup = () => {
    setIsVisible(false);
    if (setIsPopupOpen) setIsPopupOpen(false);

    // Save timestamp to block for 1 hour
    localStorage.setItem(
      'gt_popup_seen',
      JSON.stringify({ timestamp: Date.now() })
    );

    setTimeout(() => {
      setIsRendered(false);
    }, 400);
  };

  const handleSubscribe = () => {
    if (!email.includes('@') || !email.includes('.')) {
      setError('Please enter a valid email');
      return;
    }

    setError('');
    setIsSuccess(true);
    
    // Also block for 1 hour after successful subscription
    localStorage.setItem(
      'gt_popup_seen',
      JSON.stringify({ timestamp: Date.now() })
    );
  };

  if (!isRendered) return null;

  return (
    <div className={`welcome-popup-overlay ${isVisible ? 'popup-enter' : 'popup-exit'}`}>
      <div className={`welcome-popup-card ${isVisible ? 'card-enter' : 'card-exit'}`}>
        <button className="popup-close-btn" onClick={closePopup} aria-label="Close popup">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div className="popup-top-label">WELCOME TO GLOSSY TREASURES</div>

        <h2 className="popup-headline">
          <div className="line-1">A little</div>
          <div className="line-2">welcome gift.</div>
        </h2>

        <p className="popup-subtext">
          10% off your first order — no conditions, no minimum.
          <br />
          Just our way of saying hello.
        </p>

        <div className="popup-divider"></div>

        {!isSuccess ? (
          <div className="popup-form-area">
            <div className="email-input-row">
              <input
                type="email"
                className={`popup-input ${error ? 'input-error' : ''}`}
                placeholder="Your email address"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError('');
                }}
              />
              {error && <div className="popup-error-text">{error}</div>}

              <button className="popup-cta-btn" onClick={handleSubscribe}>
                CLAIM MY 10% OFF
              </button>
            </div>

            <div className="popup-no-thanks" onClick={closePopup}>
              No thanks, I&apos;ll pay full price
            </div>
          </div>
        ) : (
          <div className="popup-success-state">
            <div className="success-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <p className="success-message">You&apos;re in! Check your inbox for your code.</p>
          </div>
        )}

        <div className="popup-trust-line">
          <svg className="lock-icon" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          </svg>
          We respect your privacy. No spam, ever.
        </div>
      </div>
    </div>
  );
}