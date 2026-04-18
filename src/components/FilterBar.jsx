import React from 'react';
import styles from './FilterBar.module.css';

const FilterBar = ({ 
  category, 
  filterConfigs, 
  activeFilters, 
  onFilterChange, 
  sortBy, 
  onSortChange, 
  totalCount 
}) => {
  return (
    <div className={styles.stickyContainer}>
      <div className={styles.bar}>
        {filterConfigs.map((group) => (
          <div key={group.label} className={styles.filterGroup}>
            <span className={styles.groupLabel}>{group.label}</span>
            <div className={styles.chipRow}>
              {group.options.map((option) => {
                const isActive = activeFilters[group.key].includes(option.value);
                return (
                  <button
                    key={option.value}
                    className={`${styles.chip} ${isActive ? styles.activeChip : ''}`}
                    onClick={() => onFilterChange(group.key, option.value)}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        <div className={styles.bottomRow}>
          <span className={styles.count}>{totalCount} products</span>
          <div className={styles.sortWrapper}>
            <select 
              className={styles.sortSelect} 
              value={sortBy} 
              onChange={(e) => onSortChange(e.target.value)}
            >
              <option value="newest">Sort: Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="bestsellers">Bestsellers</option>
            </select>
            <span className={styles.sortArrow}>▾</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
