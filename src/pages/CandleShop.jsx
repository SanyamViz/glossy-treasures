import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import FilterBar from '../components/FilterBar';
import { CANDLES } from '../data/products';
import styles from './CandleShop.module.css';

const FILTER_CONFIGS = [
  {
    key: 'scentFamily',
    label: 'Scent',
    options: [
      { label: 'All', value: 'all' },
      { label: 'Floral', value: 'Floral' },
      { label: 'Woody', value: 'Woody' },
      { label: 'Fresh', value: 'Fresh' },
      { label: 'Warm', value: 'Warm' },
    ]
  },
  {
    key: 'size',
    label: 'Size',
    options: [
      { label: 'All Sizes', value: 'all' },
      { label: '100g', value: '100g' },
      { label: '300g', value: '300g' },
    ]
  },
  {
    key: 'occasion',
    label: 'Occasion',
    options: [
      { label: 'All', value: 'all' },
      { label: 'Self Care', value: 'Self Care' },
      { label: 'Gifting', value: 'Gifting' },
      { label: 'Home', value: 'Home' },
      { label: 'Romance', value: 'Romance' },
    ]
  }
];

const CandleShop = () => {
  const [activeFilters, setActiveFilters] = useState({
    scentFamily: [],
    size: [],
    occasion: []
  });
  const [sortBy, setSortBy] = useState('newest');
  const [visibleCount, setVisibleCount] = useState(6);
  const [isLoading, setIsLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

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
    let result = [...CANDLES];

    if (activeFilters.scentFamily.length > 0) {
      result = result.filter(p => activeFilters.scentFamily.includes(p.scentFamily));
    }
    if (activeFilters.size.length > 0) {
      result = result.filter(p => activeFilters.size.includes(p.weight));
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
  }, [activeFilters, sortBy]);

  const visibleProducts = filteredProducts.slice(0, visibleCount);

  return (
    <div className={`${styles.page} ${isMounted ? styles.mounted : ''}`}>
      <header className={styles.pageHeader}>
        <nav className={styles.breadcrumb}>
          <Link to="/">Home</Link> / <span>Candles</span>
        </nav>
        <h1 className={styles.title}>Hand-Poured Candles</h1>
        <p className={styles.tagline}>Small batches. Slow burns. Made with intention.</p>
      </header>

      <FilterBar
        category="candle"
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
                <ProductCard product={product} category="candle" />
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <span className={styles.emoji}>🕯️</span>
            <h2>No candles match your filters.</h2>
            <p>Try adjusting or clearing your filters.</p>
            <button
              className={styles.clearBtn}
              onClick={() => setActiveFilters({ scentFamily: [], size: [], occasion: [] })}
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

export default CandleShop;
