import React, { useState, useEffect } from 'react';
import { useUser, useClerk } from "@clerk/react";
import { useNavigate, Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import styles from './Account.module.css';

const Account = () => {
  const { user, isLoaded, isSignedIn } = useUser();
  const { signOut } = useClerk();
  const navigate = useNavigate();
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('orders'); // 'orders' or 'wishlist'

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      navigate('/');
    }
  }, [isLoaded, isSignedIn, navigate]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (isSignedIn && user?.primaryEmailAddress?.emailAddress) {
        try {
          const email = user.primaryEmailAddress.emailAddress;
          const response = await fetch(`${import.meta.env.VITE_API_URL}/api/orders/customer/${email}`);
          if (response.ok) {
            const data = await response.json();
            setOrders(data);
          }
        } catch (error) {
          console.error('Failed to fetch orders:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    if (isSignedIn) {
      fetchOrders();
    }
  }, [isSignedIn, user]);

  if (!isLoaded || !isSignedIn) {
    return <div className={styles.loading}>Loading your profile...</div>;
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.greeting}>
          <h1 className={styles.title}>Hello, {user.firstName || 'there'} ✦</h1>
          <p className={styles.email}>{user.primaryEmailAddress?.emailAddress}</p>
        </div>
        <button className={styles.signOutBtn} onClick={() => signOut()}>Sign Out</button>
      </header>

      <div className={styles.tabs}>
        <button 
          className={`${styles.tab} ${activeTab === 'orders' ? styles.tabActive : ''}`} 
          onClick={() => setActiveTab('orders')}
        >
          Order History
        </button>
        <button 
          className={`${styles.tab} ${activeTab === 'wishlist' ? styles.tabActive : ''}`} 
          onClick={() => setActiveTab('wishlist')}
        >
          Wishlist ({wishlist.length})
        </button>
      </div>

      {activeTab === 'orders' ? (
        <section className={styles.ordersSection}>
          {loading ? (
            <div className={styles.loading}>Fetching your treasures...</div>
          ) : orders.length > 0 ? (
            <div className={styles.orderGrid}>
              {orders.map(order => (
                <div key={order.id} className={styles.orderCard}>
                  <div className={styles.orderHeader}>
                    <div>
                      <span className={styles.orderNum}>{order.orderNumber}</span>
                      <p className={styles.orderDate}>{new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                    </div>
                    <span className={`${styles.statusBadge} ${styles['status' + order.status]}`}>
                      {order.status}
                    </span>
                  </div>

                  <div className={styles.orderItems}>
                    {order.items.map((item, idx) => (
                      <div key={idx} className={styles.itemRow}>
                        <span>{item.productName} <span className={styles.itemQty}>x{item.quantity}</span></span>
                        <span>₹{(item.price || 0).toLocaleString('en-IN')}</span>
                      </div>
                    ))}
                  </div>

                  <div className={styles.orderFooter}>
                    <span className={styles.totalLabel}>Grand Total</span>
                    <span className={styles.totalAmount}>₹{order.total.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.empty}>
              <p>You haven't placed any orders yet.</p>
              <button className={styles.signOutBtn} style={{ marginTop: '20px' }} onClick={() => navigate('/shop/candles')}>Start Shopping</button>
            </div>
          )}
        </section>
      ) : (
        <section className={styles.wishlistSection}>
          {wishlist.length > 0 ? (
            <div className={styles.wishlistGrid}>
              {wishlist.map(item => (
                <div key={item.productSlug} className={styles.wishlistCard}>
                  <Link to={`/shop/${item.category === 'candle' ? 'candles' : 'resin'}/${item.productSlug}`}>
                    <img src={item.productImage || '/placeholder.jpg'} alt={item.productName} className={styles.wishlistImg} />
                  </Link>
                  <div className={styles.wishlistInfo}>
                    <Link to={`/shop/${item.category === 'candle' ? 'candles' : 'resin'}/${item.productSlug}`}>
                      <h3 className={styles.wishlistName}>{item.productName}</h3>
                    </Link>
                    <p className={styles.wishlistPrice}>₹{item.price.toLocaleString('en-IN')}</p>
                    <div className={styles.wishlistActions}>
                      <button 
                        className={styles.atcBtnSmall}
                        onClick={() => {
                          addToCart({ ...item, name: item.productName, slug: item.productSlug, image: item.productImage }, 1);
                          removeFromWishlist(item.productSlug);
                        }}
                      >
                        Add to Cart
                      </button>
                      <button 
                        className={styles.removeBtnSmall}
                        onClick={() => removeFromWishlist(item.productSlug)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.empty}>
              <p>Your wishlist is empty.</p>
              <button className={styles.signOutBtn} style={{ marginTop: '20px' }} onClick={() => navigate('/shop/candles')}>Browse Products</button>
            </div>
          )}
        </section>
      )}
    </div>
  );
};

export default Account;
