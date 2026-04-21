import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    // 1. Scroll the standard window
    window.scrollTo({ top: 0, behavior: 'instant' });

    // 2. Scroll the document body
    document.documentElement.scrollTo({ top: 0, behavior: 'instant' });

    // 3. Scroll the Vite root container (This usually fixes the SPA scroll bug)
    const rootElement = document.getElementById('root');
    if (rootElement) {
      rootElement.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [pathname]);

  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;