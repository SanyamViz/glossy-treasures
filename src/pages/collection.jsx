import React from 'react';
import ShopByCategory from '../components/ShopByCategory';
import Footer from '../components/Footer';

const Collection = () => {
  return (
    <div className="gt-page collection-page" style={{ paddingTop: '100px' }}>
      <ShopByCategory />
      <Footer />
    </div>
  );
};

export default Collection;
