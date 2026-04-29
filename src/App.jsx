import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Layout from './components/Layout';
import PageTransition from './components/PageTransition';
import Home from './pages/home';
import Shop from './pages/shop';
import OurStory from './pages/OurStory';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderConfirmed from './pages/Orderconfirmed';
import Collections from './pages/Collections';
import CollectionDetail from './pages/CollectionDetail';
import CandleShop from './pages/CandleShop';
import ResinShop from './pages/ResinShop';
import CandlePDP from './pages/CandlePDP';
import Shipping from './pages/Shipping';
import Hamperbuilder from './pages/Hamperbuilder';
import ResinPDP from './pages/ResinPDP';
import Contact from './pages/Contact';
import NotFound from './pages/Notfound';
import Wholesale from './pages/Wholesale';
import PrivacyPolicy from './pages/Privacypolicy';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return <div style={{ color: 'red', background: 'white', padding: '20px', zIndex: 9999, position: 'relative' }}><h1>Error: {this.state.error.message}</h1><pre>{this.state.error.stack}</pre></div>;
    }
    return this.props.children;
  }
}

function App() {
  const location = useLocation();
  
  return (
    <ErrorBoundary>
      <Layout>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageTransition><Home /></PageTransition>} />
            <Route path="/Shipping" element={<PageTransition><Shipping /></PageTransition>} />
            <Route path="/hamper-builder" element={<PageTransition><Hamperbuilder /></PageTransition>} />
            <Route path="/shop" element={<PageTransition><Shop /></PageTransition>} />
            <Route path="/our-story" element={<PageTransition><OurStory /></PageTransition>} />
            <Route path="/Contact" element={<PageTransition><Contact /></PageTransition>} />
            <Route path="/Cart" element={<PageTransition><Cart /></PageTransition>} />
            <Route path="/Wholesale" element={<PageTransition><Wholesale /></PageTransition>} />
            <Route path="/checkout" element={<PageTransition><Checkout /></PageTransition>} />
            <Route path="/order-confirmed" element={<PageTransition><OrderConfirmed /></PageTransition>} />
            <Route path="/collections" element={<PageTransition><Collections /></PageTransition>} />
            <Route path="/collections/:slug" element={<PageTransition><CollectionDetail /></PageTransition>} />
            <Route path="/shop/candles" element={<CandleShop />} />
            <Route path="/Privacypolicy" element={<PageTransition><PrivacyPolicy /></PageTransition>} />
            <Route path="/shop/resin" element={<ResinShop />} />
            <Route path="/shop/candles/:slug" element={<PageTransition><CandlePDP /></PageTransition>} />
            <Route path="/shop/resin/:slug" element={<PageTransition><ResinPDP /></PageTransition>} />
            <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
          </Routes>
        </AnimatePresence>
      </Layout>
    </ErrorBoundary>
  );
}

export default App;