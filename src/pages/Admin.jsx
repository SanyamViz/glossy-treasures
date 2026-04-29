import React, { useState, useEffect } from 'react';
import styles from './Admin.module.css';

const ADMIN_PASSWORD = 'glossy2024';

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('admin_auth') === 'true');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0,
    todayOrders: 0
  });

  // Login handler
  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem('admin_auth', 'true');
      setError('');
    } else {
      setError('Incorrect password');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('admin_auth');
  };

  // Fetch orders
  const fetchOrders = async () => {
    if (!isAuthenticated) return;
    
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/orders`, {
        headers: {
          'Authorization': `Bearer ${ADMIN_PASSWORD}`
        }
      });
      const data = await response.json();
      
      if (Array.isArray(data)) {
        setOrders(data);
        calculateStats(data);
      }
    } catch (err) {
      console.error('Failed to fetch orders:', err);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (data) => {
    const today = new Date().toDateString();
    const statsObj = data.reduce((acc, order) => {
      acc.totalOrders += 1;
      acc.totalRevenue += order.total;
      if (order.status === 'PENDING') acc.pendingOrders += 1;
      if (new Date(order.createdAt).toDateString() === today) acc.todayOrders += 1;
      return acc;
    }, { totalOrders: 0, totalRevenue: 0, pendingOrders: 0, todayOrders: 0 });
    
    setStats(statsObj);
  };

  const updateStatus = async (orderNumber, newStatus) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/orders/${orderNumber}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${ADMIN_PASSWORD}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      
      if (response.ok) {
        // Optimistic update or refetch
        setOrders(prev => prev.map(o => 
          o.orderNumber === orderNumber ? { ...o, status: newStatus } : o
        ));
        // Recalculate stats since pending might change
        calculateStats(orders.map(o => 
          o.orderNumber === orderNumber ? { ...o, status: newStatus } : o
        ));
      }
    } catch (err) {
      alert('Failed to update status');
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 30000);
    return () => clearInterval(interval);
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className={styles.loginContainer}>
        <div className={styles.loginCard}>
          <h1>Admin Login</h1>
          <form onSubmit={handleLogin}>
            <input 
              type="password" 
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
            />
            {error && <p style={{ color: 'red', fontSize: '12px', marginBottom: '10px' }}>{error}</p>}
            <button type="submit" className={styles.loginBtn}>Login</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.adminPage}>
      <header className={styles.header}>
        <h1>Angel's Dashboard</h1>
        <button onClick={handleLogout} className={styles.logoutBtn}>Logout</button>
      </header>

      <section className={styles.statsGrid}>
        <div className={styles.statCard}>
          <p className={styles.statLabel}>Total Orders</p>
          <p className={styles.statValue}>{stats.totalOrders}</p>
        </div>
        <div className={styles.statCard}>
          <p className={styles.statLabel}>Total Revenue</p>
          <p className={styles.statValue}>₹{stats.totalRevenue.toLocaleString('en-IN')}</p>
        </div>
        <div className={styles.statCard}>
          <p className={styles.statLabel}>Pending Orders</p>
          <p className={styles.statValue}>{stats.pendingOrders}</p>
        </div>
        <div className={styles.statCard}>
          <p className={styles.statLabel}>Today's Orders</p>
          <p className={styles.statValue}>{stats.todayOrders}</p>
        </div>
      </section>

      <main className={styles.content}>
        <div className={styles.tableContainer}>
          {loading && orders.length === 0 ? (
            <div className={styles.loading}>Loading orders...</div>
          ) : orders.length === 0 ? (
            <div className={styles.emptyState}>No orders found yet.</div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Order Info</th>
                  <th>Customer</th>
                  <th>Items</th>
                  <th>Payment</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td data-label="Order Info">
                      <div style={{ fontWeight: 600 }}>#{order.orderNumber}</div>
                      <div style={{ fontSize: '11px', color: '#888' }}>
                        {new Date(order.createdAt).toLocaleString('en-IN', {
                          dateStyle: 'medium',
                          timeStyle: 'short'
                        })}
                      </div>
                    </td>
                    <td data-label="Customer" className={styles.customerInfo}>
                      <div>{order.name}</div>
                      <div>{order.phone}</div>
                      <div style={{ fontSize: '11px' }}>{order.city}, {order.state}</div>
                    </td>
                    <td data-label="Items">
                      <ul className={styles.itemsList}>
                        {order.items.map((item, idx) => (
                          <li key={idx}>
                            {item.quantity}x {item.productName}
                            <div style={{ fontSize: '10px', color: '#999' }}>
                              {item.selectedSize} {item.selectedFragrance && `| ${item.selectedFragrance}`}
                            </div>
                          </li>
                        ))}
                      </ul>
                      <div className={styles.amount}>₹{order.total.toLocaleString('en-IN')}</div>
                    </td>
                    <td data-label="Payment">
                      <span className={`${styles.paymentBadge} ${styles[`payment${order.paymentMethod.toUpperCase()}`]}`}>
                        {order.paymentMethod}
                      </span>
                    </td>
                    <td data-label="Status">
                      <select 
                        className={styles.statusSelect}
                        value={order.status}
                        onChange={(e) => updateStatus(order.orderNumber, e.target.value)}
                      >
                        <option value="PENDING">PENDING</option>
                        <option value="CONFIRMED">CONFIRMED</option>
                        <option value="PROCESSING">PROCESSING</option>
                        <option value="SHIPPED">SHIPPED</option>
                        <option value="DELIVERED">DELIVERED</option>
                        <option value="CANCELLED">CANCELLED</option>
                      </select>
                    </td>
                    <td data-label="Actions">
                      <div className={styles.actions}>
                        <a 
                          href={`https://wa.me/91${order.phone}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className={`${styles.actionBtn} ${styles.whatsappBtn}`}
                          title="Message on WhatsApp"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793 0-.853.448-1.273.607-1.446.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.173.088.274.072.376-.043.101-.116.433-.506.548-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564c.173.087.289.129.332.202.043.073.043.419-.101.824z"/>
                          </svg>
                        </a>
                        <button 
                          className={styles.actionBtn}
                          onClick={() => copyToClipboard(order.orderNumber)}
                          title="Copy Order Number"
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
}
