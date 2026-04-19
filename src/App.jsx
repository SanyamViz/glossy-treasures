import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
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
import Hamperbuilder from './pages/Hamperbuilder';
import ResinPDP from './pages/ResinPDP';
import Contact from './pages/contact';

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
  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/hamper-builder" element={<Layout><Hamperbuilder /></Layout>} />
        <Route path="/shop" element={<Layout><Shop /></Layout>} />
        <Route path="/our-story" element={<Layout><OurStory /></Layout>} />
        <Route path="/Contact" element={<Layout><Contact /></Layout>} />
        <Route path="/cart" element={<Layout><Cart /></Layout>} />
        <Route path="/checkout" element={<Layout><Checkout /></Layout>} />
        <Route path="/order-confirmed" element={<Layout><OrderConfirmed /></Layout>} />
        <Route path="/collections" element={<Layout><Collections /></Layout>} />
        <Route path="/collections/:slug" element={<Layout><CollectionDetail /></Layout>} />
        <Route path="/shop/candles" element={<Layout><CandleShop /></Layout>} />
        <Route path="/shop/resin" element={<Layout><ResinShop /></Layout>} />
        <Route path="/shop/candles/:slug" element={<Layout><CandlePDP /></Layout>} />
        <Route path="/shop/resin/:slug" element={<Layout><ResinPDP /></Layout>} />
      </Routes>
    </ErrorBoundary>
  );
}

export default App;