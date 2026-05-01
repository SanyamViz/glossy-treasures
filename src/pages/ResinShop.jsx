import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import FilterBar from '../components/FilterBar';
import styles from './ResinShop.module.css';

const FILTER_CONFIGS = [
  {
    key: 'type',
    label: 'Type',
    options: [
      { label: 'All', value: 'all' },
      { label: 'Plate', value: 'Plate' },
      { label: 'Coaster', value: 'Coaster' },
      { label: 'Tray', value: 'Tray' },
      { label: 'Frame', value: 'Frame' },
      { label: 'Dish', value: 'Dish' },
      { label: 'Box', value: 'Box' },
    ]
  },
  {
    key: 'color',
    label: 'Color',
    options: [
      { label: 'All', value: 'all' },
      { label: 'Blush Pink', value: 'Blush Pink' },
      { label: 'Ocean Teal', value: 'Ocean Teal' },
      { label: 'Midnight', value: 'Midnight' },
      { label: 'Ivory Gold', value: 'Ivory Gold' },
      { label: 'Forest', value: 'Forest' },
    ]
  },
  {
    key: 'occasion',
    label: 'Occasion',
    options: [
      { label: 'All', value: 'all' },
      { label: 'Home Decor', value: 'Home Decor' },
      { label: 'Gifting', value: 'Gifting' },
      { label: 'Wedding', value: 'Wedding' },
    ]
  }
];


const ResinShop = () => {
  const [activeFilters, setActiveFilters] = useState({
    type: [],
    color: [],
    occasion: []
  });
  const [sortBy, setSortBy] = useState('newest');
  const [visibleCount, setVisibleCount] = useState(6);
  const [isLoading, setIsLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/products?category=resin`)
      .then(r => r.json())
      .then(data => setProducts(data))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    setIsMounted(true);
    window.scrollTo(0, 0);
  }, []);

  const handleFilterChange = (key, value) => {
    setIsLoading(true);
    setActiveFilters(prev => {
      const current = prev[key];
      if (value === 'all') return { ...prev, [key]: [] };

      const next = current.includes(value)
        ? current.filter(v => v !== value)
        : [...current, value];

      return { ...prev, [key]: next };
    });
    setVisibleCount(6);
    setTimeout(() => setIsLoading(false), 200);
  };

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (activeFilters.type.length > 0) {
      result = result.filter(p => activeFilters.type.includes(p.type));
    }
    if (activeFilters.color.length > 0) {
      result = result.filter(p => activeFilters.color.includes(p.color));
    }
    if (activeFilters.occasion.length > 0) {
      result = result.filter(p => activeFilters.occasion.includes(p.occasion));
    }

    // Sort
    if (sortBy === 'price-low') result.sort((a, b) => a.price - b.price);
    if (sortBy === 'price-high') result.sort((a, b) => b.price - a.price);
    if (sortBy === 'bestsellers') {
      result.sort((a, b) => (a.badge === 'Bestseller' ? -1 : 1));
    }

    return result;
  }, [activeFilters, sortBy, products]);

  const visibleProducts = filteredProducts.slice(0, visibleCount);

  return (
    <div className={`${styles.page} ${isMounted ? styles.mounted : ''}`}>
      <header className={styles.pageHeader}>
        <nav className={styles.breadcrumb}>
          <Link to="/">Home</Link> / <span>Resin Art</span>
        </nav>
        <h1 className={styles.title}>Handmade Resin Art</h1>
        <p className={styles.tagline}>One-of-a-kind pieces. Cast by hand, finished with intention.</p>
      </header>

      <FilterBar
        category="resin"
        filterConfigs={FILTER_CONFIGS}
        activeFilters={activeFilters}
        onFilterChange={handleFilterChange}
        sortBy={sortBy}
        onSortChange={setSortBy}
        totalCount={filteredProducts.length}
      />

      <section className={`${styles.gridContainer} ${isLoading ? styles.loading : ''}`}>
        {visibleProducts.length > 0 ? (
          <div className={styles.grid}>
            {visibleProducts.map((product, index) => (
              <div
                key={product.id}
                className={styles.cardWrapper}
                style={{ animationDelay: `${index * 60}ms` }}
              >
                <ProductCard product={product} category="resin" />
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <span className={styles.emoji}>🪨</span>
            <h2>No pieces match your filters.</h2>
            <p>Try adjusting or clearing your filters.</p>
            <button
              className={styles.clearBtn}
              onClick={() => setActiveFilters({ type: [], color: [], occasion: [] })}
            >
              Clear Filters
            </button>
          </div>
        )}
      </section>

      {visibleCount < filteredProducts.length && (
        <div className={styles.loadMoreContainer}>
          <button
            className={styles.loadMoreBtn}
            onClick={() => setVisibleCount(prev => prev + 6)}
          >
            SHOW MORE ({filteredProducts.length - visibleCount} remaining)
          </button>
        </div>
      )}
    </div>
  );
};

export default ResinShop;
