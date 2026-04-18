import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/home';
import Shop from './pages/shop';
import OurStory from './pages/OurStory';
import Contact from './pages/contact';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderConfirmed from './pages/Orderconfirmed';
import Collections from './pages/Collections';
import CollectionDetail from './pages/CollectionDetail';
import CandleShop from './pages/CandleShop';
import ResinShop from './pages/ResinShop';
import CandlePDP from './pages/CandlePDP';
import ResinPDP from './pages/ResinPDP';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout><Home /></Layout>} />
      <Route path="/shop" element={<Layout><Shop /></Layout>} />
      <Route path="/our-story" element={<Layout><OurStory /></Layout>} />
      <Route path="/contact" element={<Layout><Contact /></Layout>} />
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
  );
}

export default App;