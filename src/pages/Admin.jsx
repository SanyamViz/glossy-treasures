import React, { useState, useEffect } from 'react';
import styles from './Admin.module.css';

const ADMIN_PASSWORD = 'glossy2024';

const STATUS_COLORS = {
  PENDING: { bg: '#FFF3CD', text: '#856404' },
  CONFIRMED: { bg: '#CCE5FF', text: '#004085' },
  PROCESSING: { bg: '#E2D9F3', text: '#512DA8' },
  SHIPPED: { bg: '#FFE5CC', text: '#856404' },
  DELIVERED: { bg: '#D4EDDA', text: '#155724' },
  CANCELLED: { bg: '#F8D7DA', text: '#721c24' },
};

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('admin_auth') === 'true');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [orders, setOrders] = useState([]);
  const [discounts, setDiscounts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('orders'); // 'orders' or 'discounts'
  const [searchTerm, setSearchTerm] = useState('');
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0,
    todayOrders: 0
  });

  // Discount Form State
  const [newDiscount, setNewDiscount] = useState({
    code: '', type: 'percentage', value: '', minOrder: '', maxUses: '', expiresAt: '', active: true
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
        headers: { 'Authorization': `Bearer ${ADMIN_PASSWORD}` }
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

  // Fetch discounts
  const fetchDiscounts = async () => {
    if (!isAuthenticated) return;
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/discounts`, {
        headers: { 'Authorization': `Bearer ${ADMIN_PASSWORD}` }
      });
      const data = await response.json();
      if (Array.isArray(data)) setDiscounts(data);
    } catch (err) {
      console.error('Failed to fetch discounts:', err);
    }
  };

  const calculateStats = (data) => {
    const today = new Date().toDateString();
    const statsObj = data.reduce((acc, order) => {
      acc.totalOrders += 1;
      if (order.status !== 'CANCELLED') acc.totalRevenue += order.total;
      if (order.status === 'PENDING') acc.pendingOrders += 1;
      if (new Date(order.createdAt).toDateString() === today) acc.todayOrders += 1;
      return acc;
    }, { totalOrders: 0, totalRevenue: 0, pendingOrders: 0, todayOrders: 0 });
    setStats(statsObj);
  };

  const updateStatus = async (orderNumber, newStatus) => {
    if (newStatus === 'CANCELLED') {
      const confirmed = window.confirm(`Are you sure you want to cancel order #${orderNumber}?\nThe customer will be notified by email.`);
      if (!confirmed) return;
    }

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
        setOrders(prev => {
          const updated = prev.map(o => o.orderNumber === orderNumber ? { ...o, status: newStatus } : o);
          calculateStats(updated);
          return updated;
        });
      }
    } catch (err) {
      alert('Failed to update status');
    }
  };

  // Discount Handlers
  const handleCreateDiscount = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/discounts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${ADMIN_PASSWORD}`
        },
        body: JSON.stringify(newDiscount)
      });
      if (res.ok) {
        fetchDiscounts();
        setNewDiscount({ code: '', type: 'percentage', value: '', minOrder: '', maxUses: '', expiresAt: '', active: true });
        alert('Discount code created!');
      } else {
        const d = await res.json();
        alert(d.error || 'Failed to create');
      }
    } catch (err) { alert('Error creating discount'); }
  };

  const deleteDiscount = async (code) => {
    if (!window.confirm(`Delete ${code}?`)) return;
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/discounts/${code}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${ADMIN_PASSWORD}` }
      });
      if (res.ok) fetchDiscounts();
    } catch (err) { alert('Error deleting'); }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchOrders();
      fetchDiscounts();
      const interval = setInterval(fetchOrders, 30000);
      return () => clearInterval(interval);
    }
  }, [isAuthenticated]);

  const filteredOrders = orders.filter(o => 
    o.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    o.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    o.phone.includes(searchTerm)
  );

  if (!isAuthenticated) {
    return (
      <div className={styles.loginContainer}>
        <div className={styles.loginCard}>
          <h1>Admin Login</h1>
          <form onSubmit={handleLogin}>
            <input type="password" placeholder="Enter admin password" value={password} onChange={(e) => setPassword(e.target.value)} autoFocus />
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
        <div className={styles.headerRight}>
          <div className={styles.tabs}>
            <button className={`${styles.tab} ${activeTab === 'orders' ? styles.tabActive : ''}`} onClick={() => setActiveTab('orders')}>Orders</button>
            <button className={`${styles.tab} ${activeTab === 'discounts' ? styles.tabActive : ''}`} onClick={() => setActiveTab('discounts')}>Discount Codes</button>
          </div>
          <button onClick={handleLogout} className={styles.logoutBtn}>Logout</button>
        </div>
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
        {activeTab === 'orders' ? (
          <>
            <div className={styles.toolbar}>
              <div className={styles.searchBar}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                <input type="text" placeholder="Search customer, order #, or phone..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
              </div>
            </div>

            <div className={styles.tableContainer}>
              {loading && orders.length === 0 ? (
                <div className={styles.loading}>Loading orders...</div>
              ) : filteredOrders.length === 0 ? (
                <div className={styles.emptyState}>No matching orders found.</div>
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
                    {filteredOrders.map((order) => (
                      <tr key={order.id}>
                        <td data-label="Order Info">
                          <div style={{ fontWeight: 600 }}>#{order.orderNumber}</div>
                          <div style={{ fontSize: '11px', color: '#888' }}>{new Date(order.createdAt).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}</div>
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
                                <div style={{ fontSize: '10px', color: '#999' }}>{item.selectedSize} {item.selectedFragrance && `| ${item.selectedFragrance}`}</div>
                              </li>
                            ))}
                          </ul>
                          <div className={styles.amount}>
                            ₹{order.total.toLocaleString('en-IN')}
                            {order.discountAmount > 0 && <span className={styles.discountBadge}>-₹{order.discountAmount}</span>}
                          </div>
                        </td>
                        <td data-label="Payment">
                          <span className={`${styles.paymentBadge} ${styles[`payment${order.paymentMethod.toUpperCase()}`]}`}>{order.paymentMethod}</span>
                        </td>
                        <td data-label="Status">
                          <div className={styles.statusBadgeWrapper} style={{ backgroundColor: STATUS_COLORS[order.status].bg, color: STATUS_COLORS[order.status].text }}>
                            <select 
                              className={styles.statusSelectHidden}
                              value={order.status}
                              onChange={(e) => updateStatus(order.orderNumber, e.target.value)}
                            >
                              {Object.keys(STATUS_COLORS).map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                            <span>{order.status}</span>
                          </div>
                        </td>
                        <td data-label="Actions">
                          <div className={styles.actions}>
                            <a href={`https://wa.me/91${order.phone}`} target="_blank" rel="noopener noreferrer" className={`${styles.actionBtn} ${styles.whatsappBtn}`} title="Message on WhatsApp">
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793 0-.853.448-1.273.607-1.446.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.173.088.274.072.376-.043.101-.116.433-.506.548-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564c.173.087.289.129.332.202.043.073.043.419-.101.824z"/></svg>
                            </a>
                            <button className={styles.actionBtn} onClick={() => copyToClipboard(order.orderNumber)} title="Copy Order Number">
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </>
        ) : (
          <div className={styles.discountsSection}>
            <div className={styles.discountFormWrap}>
              <h3>Create New Discount</h3>
              <form onSubmit={handleCreateDiscount} className={styles.discountForm}>
                <input type="text" placeholder="Code (e.g. BLOOM10)" value={newDiscount.code} onChange={e => setNewDiscount({...newDiscount, code: e.target.value.toUpperCase()})} required />
                <select value={newDiscount.type} onChange={e => setNewDiscount({...newDiscount, type: e.target.value})}>
                  <option value="percentage">Percentage %</option>
                  <option value="fixed">Fixed ₹</option>
                </select>
                <input type="number" placeholder="Value" value={newDiscount.value} onChange={e => setNewDiscount({...newDiscount, value: e.target.value})} required />
                <input type="number" placeholder="Min Order ₹" value={newDiscount.minOrder} onChange={e => setNewDiscount({...newDiscount, minOrder: e.target.value})} />
                <input type="number" placeholder="Max Uses" value={newDiscount.maxUses} onChange={e => setNewDiscount({...newDiscount, maxUses: e.target.value})} />
                <input type="date" value={newDiscount.expiresAt} onChange={e => setNewDiscount({...newDiscount, expiresAt: e.target.value})} />
                <button type="submit" className={styles.createBtn}>Create Code</button>
              </form>
            </div>

            <div className={styles.tableContainer}>
              <table>
                <thead>
                  <tr>
                    <th>Code</th>
                    <th>Type</th>
                    <th>Value</th>
                    <th>Uses</th>
                    <th>Min Order</th>
                    <th>Expiry</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {discounts.map(d => (
                    <tr key={d.id}>
                      <td style={{ fontWeight: 600 }}>{d.code}</td>
                      <td>{d.type}</td>
                      <td>{d.type === 'percentage' ? `${d.value}%` : `₹${d.value}`}</td>
                      <td>{d.usedCount} / {d.maxUses || '∞'}</td>
                      <td>₹{d.minOrder}</td>
                      <td>{d.expiresAt ? new Date(d.expiresAt).toLocaleDateString() : 'Never'}</td>
                      <td>
                        <span className={d.active ? styles.activeBadge : styles.inactiveBadge}>
                          {d.active ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td>
                        <button className={styles.deleteBtn} onClick={() => deleteDiscount(d.code)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
