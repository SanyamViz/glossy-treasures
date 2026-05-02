import React, { useState, useEffect } from 'react';
import styles from './Admin.module.css';

const ADMIN_PASSWORD = 'AngelManchanda@152116';

const STATUS_COLORS = {
  PENDING: { bg: '#FFF3CD', text: '#856404' },
  CONFIRMED: { bg: '#CCE5FF', text: '#004085' },
  PROCESSING: { bg: '#E2D9F3', text: '#512DA8' },
  SHIPPED: { bg: '#FFE5CC', text: '#856404' },
  DELIVERED: { bg: '#D4EDDA', text: '#155724' },
  CANCELLED: { bg: '#F8D7DA', text: '#721c24' },
};

const ALL_FRAGRANCES = [
  { id: 'lavender', label: 'Lavender' },
  { id: 'loctus', label: 'Loctus' },
  { id: 'jasmine', label: 'Jasmine' },
  { id: 'rose', label: 'Rose' },
  { id: 'vanilla', label: 'Vanilla' },
  { id: 'sandalwood', label: 'Sandalwood' },
  { id: 'oceanbreeze', label: 'Ocean Breeze' },
  { id: 'chocolate', label: 'Chocolate' },
  { id: 'strawberry', label: 'Strawberry' },
  { id: 'berrybliss', label: 'Berry Bliss' },
  { id: 'redwine', label: 'Red Wine' },
  { id: 'coffee', label: 'Coffee' },
  { id: 'lemongrass', label: 'Lemongrass' },
  { id: 'lemon&levender', label: 'Lemon & Lavender' },
  { id: 'cranberry', label: 'Cranberry' },
];
export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('admin_auth') === 'true');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [orders, setOrders] = useState([]);
  const [discounts, setDiscounts] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('orders'); // 'orders', 'discounts', or 'products'
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
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

  const fetchProducts = async () => {
    if (!isAuthenticated) return;
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/products?all=true`);
      const data = await response.json();
      if (Array.isArray(data)) setProducts(data);
    } catch (err) {
      console.error('Failed to fetch products:', err);
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

  const handleDeleteProduct = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/products/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${ADMIN_PASSWORD}` }
      });
      if (res.ok) fetchProducts();
    } catch (err) { alert('Error deleting product'); }
  };

  const handleToggleActive = async (product) => {
    try {
      const formData = new FormData();
      formData.append('active', !product.active);
      // We need to send some other fields too because the backend expects them or handles update partially
      // But based on the backend PUT route, it handles everything from req.body
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/products/${product.id}`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${ADMIN_PASSWORD}` },
        body: formData
      });
      if (res.ok) fetchProducts();
    } catch (err) { alert('Error toggling status'); }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchOrders();
      fetchDiscounts();
      fetchProducts();
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
            <button className={`${styles.tab} ${activeTab === 'products' ? styles.tabActive : ''}`} onClick={() => { setActiveTab('products'); setShowProductForm(false); }}>Products</button>
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
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793 0-.853.448-1.273.607-1.446.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.173.088.274.072.376-.043.101-.116.433-.506.548-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564c.173.087.289.129.332.202.043.073.043.419-.101.824z" /></svg>
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
        ) : activeTab === 'discounts' ? (
          <div className={styles.discountsSection}>
            <div className={styles.discountFormWrap}>
              <h3>Create New Discount</h3>
              <form onSubmit={handleCreateDiscount} className={styles.discountForm}>
                <input type="text" placeholder="Code (e.g. BLOOM10)" value={newDiscount.code} onChange={e => setNewDiscount({ ...newDiscount, code: e.target.value.toUpperCase() })} required />
                <select value={newDiscount.type} onChange={e => setNewDiscount({ ...newDiscount, type: e.target.value })}>
                  <option value="percentage">Percentage %</option>
                  <option value="fixed">Fixed ₹</option>
                </select>
                <input type="number" placeholder="Value" value={newDiscount.value} onChange={e => setNewDiscount({ ...newDiscount, value: e.target.value })} required />
                <input type="number" placeholder="Min Order ₹" value={newDiscount.minOrder} onChange={e => setNewDiscount({ ...newDiscount, minOrder: e.target.value })} />
                <input type="number" placeholder="Max Uses" value={newDiscount.maxUses} onChange={e => setNewDiscount({ ...newDiscount, maxUses: e.target.value })} />
                <input type="date" value={newDiscount.expiresAt} onChange={e => setNewDiscount({ ...newDiscount, expiresAt: e.target.value })} />
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
        ) : (
          <ProductsTab
            products={products}
            editingProduct={editingProduct}
            onEdit={(p) => { setEditingProduct(p); setShowProductForm(true); }}
            onDelete={handleDeleteProduct}
            onToggle={handleToggleActive}
            onAdd={() => { setEditingProduct(null); setShowProductForm(true); }}
            showForm={showProductForm}
            setShowForm={setShowProductForm}
            refresh={fetchProducts}
          />
        )}
      </main>
    </div>
  );
}

// ── Products Tab Components ──────────────────────────────────────────────────

function ProductsTab({ products, onEdit, onDelete, onToggle, onAdd, showForm, setShowForm, refresh, editingProduct }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (showForm) {
    return <ProductForm
      onClose={() => setShowForm(false)}
      refresh={refresh}
      initialData={editingProduct}
    />;
  }

  return (
    <div className={styles.productsSection}>
      <div className={styles.searchContainer}>
        <div className={styles.searchBar}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <input type="text" placeholder="Search products..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
        </div>
        <button className={styles.addNewBtn} onClick={onAdd}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          Add New Product
        </button>
      </div>

      <div className={styles.productGrid}>
        {filteredProducts.length === 0 ? (
          <div className={styles.emptyState}>No products found.</div>
        ) : (
          filteredProducts.map(product => (
            <div key={product.id} className={styles.productCard}>
              <img src={product.images[0] || 'https://via.placeholder.com/400'} alt={product.name} className={styles.productCardImage} />
              <div className={styles.productCardContent}>
                <div className={styles.productCardMeta}>
                  <span>{product.category} {product.type && `• ${product.type}`}</span>
                  <span className={`${styles.stockBadge} ${product.stock <= 0 ? styles.outOfStock : product.stock < 5 ? styles.lowStock : styles.inStock}`}>
                    {product.stock} in stock
                  </span>
                </div>
                <h4>{product.name}</h4>
                <div className={styles.productCardPrice}>
                  ₹{product.basePrice}
                  {product.originalPrice && <span style={{ textDecoration: 'line-through', fontSize: '12px', color: '#888', marginLeft: '8px' }}>₹{product.originalPrice}</span>}
                </div>
                <div className={styles.productCardActions}>
                  <button className={styles.editBtn} onClick={() => onEdit(product)}>Edit</button>
                  <button className={styles.actionBtn} onClick={() => onToggle(product)} title={product.active ? "Deactivate" : "Activate"}>
                    {product.active ?
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#155724" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg> :
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#721c24" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
                    }
                  </button>
                  <button className={styles.actionBtn} onClick={() => onDelete(product.id)} title="Delete">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#dc3545" strokeWidth="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function ProductForm({ onClose, refresh, initialData }) {
  const [formData, setFormData] = useState(initialData || {
    name: '', description: '', category: 'Candle', type: '',
    basePrice: '', originalPrice: '', badge: '', occasion: 'Self Care',
    stock: 0, inStock: true, bestseller: false, active: true,
    burnTime: '', scentFamily: 'Floral', ingredients: '',
    sizes: [], colors: [], personalization: { active: false, fields: [], extraCharge: 0 }
  });
  const [images, setImages] = useState([]);
  const [existingImages, setExistingImages] = useState(initialData?.images || []);
  const [selectedFragrances, setSelectedFragrances] = useState(
    initialData?.fragrances?.map(f => f.id) || []
  );
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = new FormData();
      Object.keys(formData).forEach(key => {
        if (['sizes', 'colors', 'personalization', 'fragrances'].includes(key)) {
          data.append(key, JSON.stringify(formData[key]));
        } else {
          data.append(key, formData[key]);
        }
      });
      // Save fragrances separately
      data.append('fragrances', JSON.stringify(
        selectedFragrances.map(id => ({
          id,
          label: ALL_FRAGRANCES.find(f => f.id === id)?.label || id,
          available: true
        }))
      ));

      images.forEach(img => data.append('images', img));
      data.append('existingImages', JSON.stringify(existingImages));

      const url = initialData
        ? `${import.meta.env.VITE_API_URL}/api/products/${initialData.id}`
        : `${import.meta.env.VITE_API_URL}/api/products`;

      const res = await fetch(url, {
        method: initialData ? 'PUT' : 'POST',
        headers: { 'Authorization': `Bearer AngelManchanda@152116` },
        body: data
      });

      const result = await res.json();
      if (res.ok) {
        alert('Product saved!');
        refresh();
        onClose();
      } else {
        alert(`Failed to save product: ${result.details || result.error}`);
      }
    } catch (err) {
      console.error(err);
      alert('Error saving product');
    } finally {
      setLoading(false);
    }
  };

  const addSize = () => {
    const newSize = formData.category === 'Candle'
      ? { label: '', price: '', burnTime: '' }
      : { label: '', price: '' };
    setFormData({ ...formData, sizes: [...(formData.sizes || []), newSize] });
  };

  const removeSize = (index) => {
    const newSizes = [...formData.sizes];
    newSizes.splice(index, 1);
    setFormData({ ...formData, sizes: newSizes });
  };

  const addColor = () => {
    setFormData({ ...formData, colors: [...(formData.colors || []), { name: '', hex: '#000000' }] });
  };

  const removeColor = (index) => {
    const newColors = [...formData.colors];
    newColors.splice(index, 1);
    setFormData({ ...formData, colors: newColors });
  };

  return (
    <div className={styles.productFormContainer}>
      <div className={styles.formHeader}>
        <h2>{initialData ? 'Edit Product' : 'Add New Product'}</h2>
        <button className={styles.closeBtn} onClick={onClose}>&times;</button>
      </div>

      <form onSubmit={handleSubmit}>
        <section className={styles.formSection}>
          <h3>Section 1 — Basic Info</h3>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label>Product Name</label>
              <input type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required />
            </div>
            <div className={styles.formGroup}>
              <label>Category</label>
              <select value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })}>
                <option value="Candle">Candle</option>
                <option value="Resin">Resin</option>
              </select>
            </div>
            <div className={`${styles.formGroup} ${styles.formGroupFull}`}>
              <label>Description</label>
              <textarea rows="3" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} required />
            </div>
            <div className={styles.formGroup}>
              <label>Base Price (₹)</label>
              <input type="number" value={formData.basePrice} onChange={e => setFormData({ ...formData, basePrice: e.target.value })} required />
            </div>
            <div className={styles.formGroup}>
              <label>Original Price (Optional ₹)</label>
              <input type="number" value={formData.originalPrice} onChange={e => setFormData({ ...formData, originalPrice: e.target.value })} />
            </div>
            <div className={styles.formGroup}>
              <label>Badge (e.g. "New")</label>
              <input type="text" value={formData.badge} onChange={e => setFormData({ ...formData, badge: e.target.value })} />
            </div>
            <div className={styles.formGroup}>
              <label>Occasion</label>
              <select value={formData.occasion} onChange={e => setFormData({ ...formData, occasion: e.target.value })}>
                <option value="Self Care">Self Care</option>
                <option value="Home Decor">Home Decor</option>
                <option value="Gifting">Gifting</option>
                <option value="New Arrival">New Arrival</option>
                <option value="Bestsellers">Bestsellers</option>
                <option value="Wedding">Wedding</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label>Stock Count</label>
              <input type="number" value={formData.stock} onChange={e => setFormData({ ...formData, stock: e.target.value })} />
            </div>
            <div className={styles.toggleRow}>
              <label className={styles.toggleItem}>
                <input type="checkbox" checked={formData.inStock} onChange={e => setFormData({ ...formData, inStock: e.target.checked })} />
                In Stock
              </label>
              <label className={styles.toggleItem}>
                <input type="checkbox" checked={formData.bestseller} onChange={e => setFormData({ ...formData, bestseller: e.target.checked })} />
                Bestseller
              </label>
              <label className={styles.toggleItem}>
                <input type="checkbox" checked={formData.active} onChange={e => setFormData({ ...formData, active: e.target.checked })} />
                Active
              </label>
            </div>
          </div>
        </section>

        <section className={styles.formSection}>
          <h3>Section 2 — Images</h3>
          <div className={styles.imageUploadGrid}>
            {existingImages.map((img, idx) => (
              <div key={idx} className={styles.imagePreview}>
                <img src={img} alt="Product" />
                <button type="button" className={styles.removeImg} onClick={() => setExistingImages(existingImages.filter((_, i) => i !== idx))}>&times;</button>
              </div>
            ))}
            {(images || []).map((img, idx) => (
              <div key={`new-${idx}`} className={styles.imagePreview}>
                <img src={URL.createObjectURL(img)} alt="Product" />
                <button type="button" className={styles.removeImg} onClick={() => setImages(images.filter((_, i) => i !== idx))}>&times;</button>
              </div>
            ))}
            {((existingImages || []).length + (images || []).length) < 6 && (
              <label className={styles.uploadPlaceholder}>
                <input type="file" hidden multiple accept="image/*" onChange={e => setImages([...(images || []), ...Array.from(e.target.files)].slice(0, 6 - (existingImages || []).length))} />
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                <span>Upload</span>
              </label>
            )}
          </div>
        </section>

        {formData.category === 'Candle' && (
          <section className={styles.formSection}>
            <h3>Section 3 — Candle Options</h3>
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label>Scent Family</label>
                <select value={formData.scentFamily} onChange={e => setFormData({ ...formData, scentFamily: e.target.value })}>
                  <option value="Floral">Floral</option>
                  <option value="Woody">Woody</option>
                  <option value="Fresh">Fresh</option>
                  <option value="Warm">Warm</option>
                  <option value="Citrus">Citrus</option>
                  <option value="Gourmand">Gourmand</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label>Burn Time</label>
                <input type="text" placeholder="e.g. 45 hrs" value={formData.burnTime} onChange={e => setFormData({ ...formData, burnTime: e.target.value })} />
              </div>
              <div className={`${styles.formGroup} ${styles.formGroupFull}`}>
                <label>Ingredients</label>
                <textarea rows="2" value={formData.ingredients} onChange={e => setFormData({ ...formData, ingredients: e.target.value })} />
              </div>
              <div className={styles.formGroupFull}>
                <label style={{ marginBottom: '10px', display: 'block' }}>Sizes</label>
                {formData.sizes?.map((size, idx) => (
                  <div key={idx} className={styles.optionRow}>
                    <input type="text" placeholder="Label (e.g. 150g)" value={size.label} onChange={e => {
                      const newSizes = [...formData.sizes];
                      newSizes[idx].label = e.target.value;
                      setFormData({ ...formData, sizes: newSizes });
                    }} />
                    <input type="number" placeholder="Price" value={size.price} onChange={e => {
                      const newSizes = [...formData.sizes];
                      newSizes[idx].price = e.target.value;
                      setFormData({ ...formData, sizes: newSizes });
                    }} />
                    <input type="text" placeholder="Burn Time" value={size.burnTime} onChange={e => {
                      const newSizes = [...formData.sizes];
                      newSizes[idx].burnTime = e.target.value;
                      setFormData({ ...formData, sizes: newSizes });
                    }} />
                    <button type="button" className={styles.removeImg} onClick={() => removeSize(idx)}>&times;</button>
                  </div>
                ))}
                <button type="button" className={styles.addBtn} onClick={addSize}>+ Add Size</button>
              </div>
            </div>
          </section>
        )}
        <div className={styles.formGroupFull}>
          <label style={{ marginBottom: '10px', display: 'block' }}>
            Available Fragrances
          </label>
          <div className={styles.fragranceGrid}>
            {ALL_FRAGRANCES.map(f => (
              <label key={f.id} className={styles.fragranceOption}>
                <input
                  type="checkbox"
                  checked={selectedFragrances.includes(f.id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedFragrances(prev => [...prev, f.id]);
                    } else {
                      setSelectedFragrances(prev => prev.filter(id => id !== f.id));
                    }
                  }}
                />
                <span>{f.label}</span>
              </label>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
            <button
              type="button"
              className={styles.addBtn}
              onClick={() => setSelectedFragrances(ALL_FRAGRANCES.map(f => f.id))}
            >
              Select All 15
            </button>
            <button
              type="button"
              className={styles.cancelBtn}
              onClick={() => setSelectedFragrances([])}
            >
              Clear All
            </button>
          </div>
        </div>
        <div className={styles.formGroupFull}>
          <label style={{ marginBottom: '10px', display: 'block' }}>
            Colors (optional)
          </label>
          <p style={{ fontSize: '12px', color: '#7A7068', marginBottom: '10px' }}>
            Add colors if this candle comes in different color options
          </p>
          {formData.colors?.map((color, idx) => (
            <div key={idx} className={`${styles.optionRow} ${styles.resinOptionRow}`}>
              <input
                type="text"
                placeholder="Color Name (e.g. Pink)"
                value={color.name}
                onChange={e => {
                  const newColors = [...formData.colors];
                  newColors[idx].name = e.target.value;
                  setFormData({ ...formData, colors: newColors });
                }}
              />
              <input
                type="color"
                value={color.hex}
                onChange={e => {
                  const newColors = [...formData.colors];
                  newColors[idx].hex = e.target.value;
                  setFormData({ ...formData, colors: newColors });
                }}
              />
              <button
                type="button"
                className={styles.removeImg}
                onClick={() => removeColor(idx)}
              >
                &times;
              </button>
            </div>
          ))}
          <button type="button" className={styles.addBtn} onClick={addColor}>
            + Add Color
          </button>
        </div>

        {formData.category === 'Resin' && (
          <section className={styles.formSection}>
            <h3>Section 4 — Resin Options</h3>
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label>Type</label>
                <select value={formData.type} onChange={e => setFormData({ ...formData, type: e.target.value })}>
                  <option value="">Select Type</option>
                  {['Frame', 'Baby Keepsake', 'Wedding Invitation', 'Wedding Garlands Frame', 'Clock', 'Name Plate', 'Platter', 'Jewellery', 'Diary', 'Keychain', 'Bookmark', 'LED Stand', 'Car Hanging', 'Fridge Magnet'].map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div className={styles.formGroupFull}>
                <label style={{ marginBottom: '10px', display: 'block' }}>Colors</label>
                {formData.colors?.map((color, idx) => (
                  <div key={idx} className={`${styles.optionRow} ${styles.resinOptionRow}`}>
                    <input type="text" placeholder="Color Name" value={color.name} onChange={e => {
                      const newColors = [...formData.colors];
                      newColors[idx].name = e.target.value;
                      setFormData({ ...formData, colors: newColors });
                    }} />
                    <input type="color" value={color.hex} onChange={e => {
                      const newColors = [...formData.colors];
                      newColors[idx].hex = e.target.value;
                      setFormData({ ...formData, colors: newColors });
                    }} />
                    <button type="button" className={styles.removeImg} onClick={() => removeColor(idx)}>&times;</button>
                  </div>
                ))}
                <button type="button" className={styles.addBtn} onClick={addColor}>+ Add Color</button>
              </div>
              <div className={styles.formGroupFull}>
                <label style={{ marginBottom: '10px', display: 'block' }}>Sizes</label>
                {formData.sizes?.map((size, idx) => (
                  <div key={idx} className={`${styles.optionRow} ${styles.resinOptionRow}`}>
                    <input type="text" placeholder="Size Label" value={size.label} onChange={e => {
                      const newSizes = [...formData.sizes];
                      newSizes[idx].label = e.target.value;
                      setFormData({ ...formData, sizes: newSizes });
                    }} />
                    <input type="number" placeholder="Price" value={size.price} onChange={e => {
                      const newSizes = [...formData.sizes];
                      newSizes[idx].price = e.target.value;
                      setFormData({ ...formData, sizes: newSizes });
                    }} />
                    <button type="button" className={styles.removeImg} onClick={() => removeSize(idx)}>&times;</button>
                  </div>
                ))}
                <button type="button" className={styles.addBtn} onClick={addSize}>+ Add Size</button>
              </div>
              <div className={`${styles.formGroup} ${styles.formGroupFull}`}>
                <label className={styles.toggleItem}>
                  <input type="checkbox" checked={formData.personalization?.active} onChange={e => setFormData({ ...formData, personalization: { ...formData.personalization, active: e.target.checked } })} />
                  Enable Personalization
                </label>
                {formData.personalization?.active && (
                  <div style={{ marginTop: '15px', background: '#FAF8F5', padding: '16px', borderRadius: '8px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{ display: 'flex', gap: '20px' }}>
                      {['Name', 'Date', 'Message'].map(field => (
                        <label key={field} style={{ fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <input type="checkbox" checked={formData.personalization.fields?.includes(field)} onChange={e => {
                            const newFields = e.target.checked
                              ? [...(formData.personalization.fields || []), field]
                              : formData.personalization.fields.filter(f => f !== field);
                            setFormData({ ...formData, personalization: { ...formData.personalization, fields: newFields } });
                          }} />
                          {field}
                        </label>
                      ))}
                    </div>
                    <div className={styles.formGroup}>
                      <label>Extra Charge (₹)</label>
                      <input type="number" value={formData.personalization.extraCharge} onChange={e => setFormData({ ...formData, personalization: { ...formData.personalization, extraCharge: e.target.value } })} />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        <div className={styles.submitBar}>
          <button type="button" className={styles.cancelBtn} onClick={onClose}>Cancel</button>
          <button type="submit" className={styles.saveBtn} disabled={loading}>{loading ? 'Saving...' : 'Save Product'}</button>
        </div>
      </form>
    </div>
  );
}
