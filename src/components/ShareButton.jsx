import React, { useState } from 'react';

export default function ShareButton({ product }) {
  const [copied, setCopied] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const productUrl = `${window.location.origin}/shop/${product.category === 'candle' ? 'candles' : 'resin'}/${product.slug}`;
  const shareText = `Check out ${product.name} on Glossy Treasures! 🕯️✨`;

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: shareText,
          url: productUrl,
        });
      } catch (err) { /* user cancelled */ }
    } else {
      setShowMenu(true);
    }
  };

  const copyLink = () => {
    navigator.clipboard.writeText(productUrl);
    setCopied(true);
    setTimeout(() => { setCopied(false); setShowMenu(false); }, 2000);
  };

  const shareWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(shareText + ' ' + productUrl)}`, '_blank');
  };

  const shareInstagram = () => {
    navigator.clipboard.writeText(productUrl);
    alert('Link copied! Paste it in your Instagram story or bio.');
  };

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <button
        onClick={handleNativeShare}
        style={{
          background: 'none',
          border: '1px solid var(--card, #E8E0D5)',
          borderRadius: '8px',
          padding: '8px 14px',
          cursor: 'pointer',
          fontFamily: 'Jost, sans-serif',
          fontSize: '12px',
          color: 'var(--text-secondary, #7A7068)',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          transition: 'border-color 0.2s',
        }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
          <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
        </svg>
        Share
      </button>

      {showMenu && (
        <div style={{
          position: 'absolute', bottom: '110%', left: 0,
          background: 'white', borderRadius: '12px', padding: '8px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.12)', zIndex: 100,
          minWidth: '180px', border: '1px solid var(--card, #E8E0D5)'
        }}>
          <button onClick={copyLink} style={{ width: '100%', padding: '10px 14px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Jost, sans-serif', fontSize: '13px', textAlign: 'left', borderRadius: '8px' }}>
            {copied ? '✓ Link Copied!' : '🔗 Copy Link'}
          </button>
          <button onClick={shareWhatsApp} style={{ width: '100%', padding: '10px 14px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Jost, sans-serif', fontSize: '13px', textAlign: 'left', borderRadius: '8px' }}>
            💬 Share on WhatsApp
          </button>
          <button onClick={shareInstagram} style={{ width: '100%', padding: '10px 14px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Jost, sans-serif', fontSize: '13px', textAlign: 'left', borderRadius: '8px' }}>
            📸 Share on Instagram
          </button>
          <button onClick={() => setShowMenu(false)} style={{ width: '100%', padding: '10px 14px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Jost, sans-serif', fontSize: '11px', color: '#9c7c5a', textAlign: 'left' }}>
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}
