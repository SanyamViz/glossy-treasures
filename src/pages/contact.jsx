import React from 'react';
import Footer from '../components/Footer';

const Contact = () => {
  return (
    <div className="gt-page contact-page" style={{ paddingTop: '120px', textAlign: 'center', paddingBottom: '100px' }}>
      <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '3rem', marginBottom: '24px' }}>Contact Us</h1>
      <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 40px' }}>
        Have questions about our custom resin pieces or scented candles? We'd love to hear from you.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <p>Email: hello@glossytreasures.com</p>
        <p>Instagram: @glossy_treasures</p>
        <p>WhatsApp: +91 98765 43210</p>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
