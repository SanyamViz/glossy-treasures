import React, { useState } from 'react';
import './PreFooter.css';

export default function PreFooter() {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('idle'); // idle, loading, success, error
    const [msg, setMsg] = useState('');

    const handleSubscribe = async () => {
        if (!email || !email.includes('@')) {
            setStatus('error');
            setMsg('Please enter a valid email address.');
            return;
        }

        setStatus('loading');
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/newsletter/subscribe`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });
            const data = await res.json();
            if (res.ok) {
                setStatus('success');
                setMsg('Subscribed successfully!');
                setEmail('');
            } else {
                setStatus('error');
                setMsg(data.error || 'Failed to subscribe.');
            }
        } catch (err) {
            setStatus('error');
            setMsg('Network error. Please try again later.');
        }
    };
    return (
        <section className="pre-footer-section">
            <div className="pre-footer-container">
                <div className="pf-col-left">
                    <h2 className="pf-heading">Need Help?</h2>
                    <p className="pf-subtext">We're here for you</p>
                    <div className="pf-buttons-wrap">
                        <a 
                            href="https://wa.me/918544911357" 
                            target="_blank" 
                            rel="noreferrer" 
                            className="pf-btn"
                        >
                            Chat on WhatsApp
                        </a>
                        <a 
                            href="mailto:glossytreasures@gmail.com" 
                            className="pf-btn"
                        >
                            Email Us
                        </a>
                    </div>
                </div>
                
                <div className="pf-col-right">
                    <h2 className="pf-heading">Stay in Touch</h2>
                    <p className="pf-subtext">New launches, offers and more — straight to your inbox</p>
                    <div className="pf-form-row">
                        <input 
                            type="email" 
                            className="pf-input" 
                            placeholder="Your email address" 
                            aria-label="Your email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={status === 'loading'}
                        />
                        <button 
                            className="pf-submit-btn"
                            onClick={handleSubscribe}
                            disabled={status === 'loading'}
                        >
                            {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
                        </button>
                    </div>
                    {msg && (
                        <p style={{ marginTop: '10px', fontSize: '13px', color: status === 'success' ? '#25D366' : '#C4948A' }}>
                            {msg}
                        </p>
                    )}
                </div>
            </div>
        </section>
    );
}
