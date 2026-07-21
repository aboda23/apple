import React from 'react';

const categories = ["All", "iPhone", "MacBook", "iPad", "Apple Watch", "AirPods", "Accessories"];

const CategoryFilters = ({ activeCategory, setActiveCategory }) => {
  return (
    <div style={{
      width: '100%',
      overflowX: 'auto',
      borderBottom: '1px solid #1d1d1f',
      marginBottom: '32px',
      scrollbarWidth: 'none',
      msOverflowStyle: 'none',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 'max-content', paddingBottom: '12px' }}>
        {categories.map((cat) => {
          const active = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                height: '36px',
                padding: '0 18px',
                borderRadius: '18px',
                fontSize: '13px',
                fontWeight: 500,
                cursor: 'pointer',
                border: active ? '1px solid rgba(41,151,255,0.4)' : '1px solid transparent',
                background: active ? '#1c2b42' : 'transparent',
                color: active ? '#2997ff' : '#86868b',
                transition: 'all 0.2s',
                whiteSpace: 'nowrap',
              }}
            >
              {cat}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryFilters;
