import React from 'react';

const ApiErrorBoundary = ({ error, onRetry, message }) => {
  if (!error) return null;

  return (
    <div style={{
      padding: '40px 20px',
      textAlign: 'center',
      background: '#fff5f5',
      borderRadius: '12px',
      border: '1px solid #feb2b2',
      margin: '20px 0',
      fontFamily: 'Jost, sans-serif'
    }}>
      <div style={{ fontSize: '24px', marginBottom: '12px' }}>⚠️</div>
      <h3 style={{ color: '#c53030', margin: '0 0 8px 0' }}>Unable to load content</h3>
      <p style={{ color: '#718096', fontSize: '14px', margin: '0 0 20px 0' }}>
        {message || "We're having trouble connecting to our servers. Please check your internet or try again later."}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          style={{
            padding: '10px 24px',
            background: '#C4948A',
            color: 'white',
            border: 'none',
            borderRadius: '25px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '600',
            transition: 'opacity 0.2s'
          }}
          onMouseOver={(e) => e.target.style.opacity = '0.9'}
          onMouseOut={(e) => e.target.style.opacity = '1'}
        >
          Try Again
        </button>
      )}
    </div>
  );
};

export const LoadingSpinner = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '60px',
    width: '100%'
  }}>
    <div className="spinner" style={{
      width: '40px',
      height: '40px',
      border: '3px solid rgba(196, 148, 138, 0.2)',
      borderTop: '3px solid #C4948A',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    }} />
    <style>{`
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `}</style>
  </div>
);

export default ApiErrorBoundary;
