import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function SEOMeta({ title, description, image, url, type = 'website' }) {
  const siteTitle = 'Glossy Treasures | Handmade Luxury Candles & Resin Art';
  const fullTitle = title ? `${title} | Glossy Treasures` : siteTitle;
  const siteDesc = description || 'Exquisite handmade soy candles and preservation resin art from India. Shop unique home decor and personalized gifts.';
  const siteUrl = url || 'https://glossytreasures.shop';
  const siteImg = image || 'https://glossytreasures.shop/og-image.jpg';

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={siteDesc} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={siteDesc} />
      <meta property="og:image" content={siteImg} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={siteUrl} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={siteDesc} />
      <meta property="twitter:image" content={siteImg} />

      {/* Canonical Link */}
      <link rel="canonical" href={siteUrl} />
    </Helmet>
  );
}
