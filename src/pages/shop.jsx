import React from 'react';
import DesktopFeatured from '../components/FeaturedProducts';
import Footer from '../components/Footer';

const Shop = () => {
  return (
    <div className="gt-page shop-page" style={{ paddingTop: '100px' }}>
      <DesktopFeatured />
      <Footer />
    </div>
  );
};

export default Shop;
