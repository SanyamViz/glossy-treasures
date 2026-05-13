import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useUser, Show, SignInButton, SignUpButton, UserButton } from "@clerk/react";
import CartDrawer from './CartDrawer';
import './Navbar.css';

/* ─── Announcement bar messages ─────────────────────────── */
const MESSAGES = [
  'Tag us on Instagram @glossy_treasures to win exclusive prizes',
  '10% off your first order — use code BLOOM at checkout',
  'Free delivery on orders above ₹999',
];

/* ─── Inline SVG icons ───────────────────────────────────── */
const HamburgerIcon = () => (
  <svg className="nav-icon" width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
    <line x1="2" y1="5" x2="20" y2="5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    <line x1="2" y1="11" x2="20" y2="11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    <line x1="2" y1="17" x2="20" y2="17" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

const CloseIcon = () => (
  <svg className="nav-icon" width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
    <line x1="3" y1="3" x2="19" y2="19" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    <line x1="19" y1="3" x2="3" y2="19" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

const SearchIcon = () => (
  <svg className="nav-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
    <circle cx="8.5" cy="8.5" r="5.5" stroke="currentColor" strokeWidth="1.5" />
    <line x1="12.5" y1="12.5" x2="17" y2="17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const CartIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5.52 2.64L3.96 4.72C3.65102 5.13198 3.49652 5.33797 3.50011 5.51039C3.50323 5.66044 3.57358 5.80115 3.69175 5.89368C3.82754 6 4.08503 6 4.6 6H19.4C19.915 6 20.1725 6 20.3083 5.89368C20.4264 5.80115 20.4968 5.66044 20.4999 5.51039C20.5035 5.33797 20.349 5.13198 20.04 4.72L18.48 2.64M5.52 2.64C5.696 2.40533 5.784 2.288 5.89552 2.20338C5.9943 2.12842 6.10616 2.0725 6.22539 2.03845C6.36 2 6.50667 2 6.8 2H17.2C17.4933 2 17.64 2 17.7746 2.03845C17.8938 2.0725 18.0057 2.12842 18.1045 2.20338C18.216 2.288 18.304 2.40533 18.48 2.64M5.52 2.64L3.64 5.14666C3.40254 5.46328 3.28381 5.62159 3.1995 5.79592C3.12469 5.95062 3.07012 6.11431 3.03715 6.28296C3 6.47301 3 6.6709 3 7.06666L3 18.8C3 19.9201 3 20.4802 3.21799 20.908C3.40973 21.2843 3.71569 21.5903 4.09202 21.782C4.51984 22 5.07989 22 6.2 22L17.8 22C18.9201 22 19.4802 22 19.908 21.782C20.2843 21.5903 20.5903 21.2843 20.782 20.908C21 20.4802 21 19.9201 21 18.8V7.06667C21 6.6709 21 6.47301 20.9628 6.28296C20.9299 6.11431 20.8753 5.95062 20.8005 5.79592C20.7162 5.62159 20.5975 5.46328 20.36 5.14667L18.48 2.64M16 10C16 11.0609 15.5786 12.0783 14.8284 12.8284C14.0783 13.5786 13.0609 14 12 14C10.9391 14 9.92172 13.5786 9.17157 12.8284C8.42143 12.0783 8 11.0609 8 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
    <polyline points="5,2 10,7 5,12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ─── Nav links ──────────────────────────────────────────── */
const NAV_LINKS = [
  { label: 'Home', href: '/' },
  {
    label: 'Collections', href: '/collections',
    children: [
      { label: 'All Collections', href: '/collections' },
      { label: 'Gifting Edit', href: '/collections/gifting' },
      { label: 'Wedding Season', href: '/collections/wedding' },
      { label: 'Self Care Rituals', href: '/collections/self-care' },
      { label: 'New Arrivals', href: '/collections/new-arrivals' },
      { label: 'Home Decor', href: '/collections/home-decor' },
      { label: 'Best Sellers', href: '/collections/bestsellers' },
    ]
  },
  { label: 'Candles', href: '/shop/candles' },
  { label: 'Resin Art', href: '/shop/resin' },
  { label: 'Our Story', href: '/our-story' },
  { label: 'Contact', href: '/contact' },
];

const POPULAR_SEARCHES = [
  { label: 'Rose Candle', path: '/shop/candles/rose-bouquet' },
  { label: 'Resin Frame', path: '/shop/resin?type=Frame' },
  { label: 'Wedding', path: '/collections/wedding' },
  { label: 'Gifting', path: '/collections/gifting' },
  { label: 'Bubble Candle', path: '/shop/candles/bubble' },
];

/* ═══════════════════════════════════════════════════════════
   Navbar Component
   ═══════════════════════════════════════════════════════════ */
export default function Navbar() {
  const { totalItems, cartPulse } = useCart();
  const { wishlist } = useWishlist();
  const { isSignedIn } = useUser();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [expandedItem, setExpandedItem] = useState(null);

  /* ── Framer Motion Scroll Effects ── */
  const { scrollY, scrollYProgress } = useScroll();
  const rawHeight = useTransform(scrollY, [0, 60], [72, 60]);
  const navHeight = useSpring(rawHeight, { stiffness: 400, damping: 40 });
  const navBlur = useTransform(scrollY, [0, 60], ["blur(0px)", "blur(20px)"]);
  const navBg = useTransform(scrollY, [0, 60], ["rgba(250, 248, 245, 1)", "rgba(250, 248, 245, 0.75)"]);
  const navBorder = useTransform(scrollY, [0, 60], ["rgba(232, 224, 213, 0)", "rgba(232, 224, 213, 1)"]);

  /* ── Search logic (Backend) ── */
  useEffect(() => {
    if (searchTerm.length < 2) { setSearchResults([]); return; }
    setSearchLoading(true);
    const timeout = setTimeout(() => {
      fetch(`${import.meta.env.VITE_API_URL}/api/products/search?q=${encodeURIComponent(searchTerm)}`)
        .then(r => r.json())
        .then(data => { setSearchResults(Array.isArray(data) ? data : []); setSearchLoading(false); })
        .catch(() => setSearchLoading(false));
    }, 300);
    return () => clearTimeout(timeout);
  }, [searchTerm]);

  /* ── Lock body scroll when menu or search is open ── */
  useEffect(() => {
    document.body.style.overflow = (menuOpen || searchOpen) ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen, searchOpen]);

  return (
    <header className="gt-header" role="banner">
      {/* Scroll Progress Bar */}
      <motion.div
        style={{
          scaleX: scrollYProgress,
          transformOrigin: "left",
          height: "2px",
          backgroundColor: "var(--accent-rose, #C4948A)",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1001,
        }}
      />

      {/* Announcement Bar */}
      <div className="gt-announcement-bar" aria-label="Announcements">
        <div className="gt-ann-text-wrap">
          <div className="gt-ticker-track" aria-hidden="true">
            {[0, 1].map(copy => (
              <span key={copy} className="gt-ticker-segment">
                {MESSAGES[0]}
                <span className="gt-ticker-dot"> · </span>
                {MESSAGES[1]}
                <span className="gt-ticker-dot"> · </span>
                {MESSAGES[2]}
                <span className="gt-ticker-dot"> · </span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <motion.nav
        className="gt-navbar"
        aria-label="Main navigation"
        style={{
          height: navHeight,
          backgroundColor: navBg,
          backdropFilter: navBlur,
          WebkitBackdropFilter: navBlur,
          borderBottomColor: navBorder,
        }}
      >
        <div className="gt-nav-left">
          <button className="gt-icon-btn" onClick={() => setMenuOpen(true)} aria-label="Open navigation menu">
            <HamburgerIcon />
          </button>
        </div>

        <div className="gt-nav-center">
          <Link to="/" className="gt-brand">Glossy Treasures</Link>
        </div>

        <div className="gt-nav-right">
          <button className="gt-icon-btn" onClick={() => setSearchOpen(true)} aria-label="Search">
            <SearchIcon />
          </button>
          
          {isSignedIn && (
            <Link to="/account" className="gt-icon-btn gt-wishlist-nav" aria-label="Wishlist">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              {wishlist.length > 0 && (
                <span className="gt-wishlist-badge">{wishlist.length}</span>
              )}
            </Link>
          )}
          <motion.button 
            className="gt-icon-btn gt-cart-btn" 
            onClick={() => setIsCartOpen(true)} 
            aria-label="Cart"
            animate={cartPulse ? { 
              scale: [1, 1.3, 1],
              rotate: [0, -10, 10, -10, 0]
            } : { scale: 1 }}
            transition={{ 
              duration: 0.45,
              ease: "easeInOut"
            }}
          >
            <CartIcon />
            {totalItems > 0 && (
              <motion.span 
                className="gt-cart-badge"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                key={totalItems} // Re-animate on count change
              >
                {totalItems}
              </motion.span>
            )}
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div className="gt-menu-backdrop-motion" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setMenuOpen(false)} />
            <motion.div className="gt-menu-panel-motion" initial={{ x: '-100%' }} animate={{ x: '0%' }} exit={{ x: '-100%' }} transition={{ type: 'tween', duration: 0.38, ease: [0.76, 0, 0.24, 1] }}>
              <div className="gt-drawer-header">
                <span className="gt-drawer-brand">Glossy Treasures</span>
                <button className="gt-menu-close-motion" onClick={() => setMenuOpen(false)}><CloseIcon /></button>
              </div>
              <nav className="gt-drawer-nav">
                <ul className="gt-drawer-list">
                  {NAV_LINKS.map((item, i) => (
                    <motion.li key={item.label} className="gt-drawer-item" initial={{ opacity: 0, x: -28 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.18 + i * 0.07 }}>
                      {item.children ? (
                        <>
                          <button className="gt-drawer-link gt-drawer-link--parent" onClick={() => setExpandedItem(expandedItem === item.label ? null : item.label)}>
                            {item.label}
                            <motion.span animate={{ rotate: expandedItem === item.label ? 90 : 0 }}><ChevronRightIcon /></motion.span>
                          </button>
                          <AnimatePresence>
                            {expandedItem === item.label && (
                              <motion.ul className="gt-drawer-children" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                                {item.children.map(child => (
                                  <li key={child.label}><Link to={child.href} className="gt-drawer-child-link" onClick={() => setMenuOpen(false)}>{child.label}</Link></li>
                                ))}
                              </motion.ul>
                            )}
                          </AnimatePresence>
                        </>
                      ) : (
                        <Link to={item.href} className="gt-drawer-link" onClick={() => setMenuOpen(false)}>{item.label}</Link>
                      )}
                    </motion.li>
                  ))}
                </ul>
              </nav>
              <div className="gt-drawer-footer">
                <div className="drawerAuth">
                  <Show when="signed-out">
                    <div className="drawerAuthButtons">
                      <SignInButton mode="modal"><button className="drawerSignIn">Sign In</button></SignInButton>
                      <SignUpButton mode="modal"><button className="drawerJoinBtn">Join Now</button></SignUpButton>
                    </div>
                  </Show>
                  <Show when="signed-in">
                    <Link to="/account" onClick={() => setMenuOpen(false)} style={{ textDecoration: 'none' }}>
                      <div className="drawerUserRow">
                        <UserButton afterSignOutUrl="/" />
                        <div className="drawerUserInfo">
                          <span className="drawerUserLabel">My Account</span>
                          <span className="drawerUserSub">Orders & Profile</span>
                        </div>
                      </div>
                    </Link>
                  </Show>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Search Full-Screen Panel */}
      <div className={`gt-search-panel ${searchOpen ? 'gt-search-panel--open' : ''}`}>
        <button className="gt-search-close" onClick={() => setSearchOpen(false)}>&times;</button>
        <div className="gt-search-input-row">
          <SearchIcon />
          <input type="text" className="gt-search-input" placeholder="Search for a scent, a piece..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>

        {searchTerm.length >= 2 ? (
          <div className="gt-search-results-container">
            {searchLoading ? <p>Searching...</p> : (
              searchResults.length > 0 ? (
                <div className="gt-search-results-grid">
                  {searchResults.map(product => (
                    <div
                      key={product.id}
                      className="gt-search-result-item"
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        navigate(`/shop/${product.category === 'resin' ? 'resin' : 'candles'}/${product.slug}`);
                        setSearchOpen(false);
                        setSearchTerm('');
                      }}
                    >
                      <img src={product.image || product.images?.[0]} alt={product.name} className="gt-search-result-image" />
                      <div className="gt-search-result-info">
                        <p className="gt-search-result-name">{product.name}</p>
                        <p className="gt-search-result-price">₹{product.basePrice}</p>
                        <span className="gt-search-result-badge">{product.category}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : <p className="gt-search-no-results">No products found</p>
            )}
          </div>
        ) : (
          <div className="gt-quick-links">
            <p className="gt-quick-links-label">POPULAR SEARCHES</p>
            <ul className="gt-quick-links-list">
              {POPULAR_SEARCHES.map((link) => (
                <li key={link.label}>
                  <div
                    className="gt-quick-link-item"
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      navigate(link.path);
                      setSearchOpen(false);
                    }}
                  >
                    {link.label} <span>&rarr;</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </header>
  );
}
