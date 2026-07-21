import React from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <div style={{ width: '100%', maxWidth: '340px' }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        height: '40px',
        background: '#1a1a1a',
        border: '1px solid #2d2d2d',
        borderRadius: '20px',
        padding: '0 16px',
        gap: '10px'
      }}>
        <Search size={16} color="#555" style={{ flexShrink: 0 }} />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search iPhone, MacBook, AirPods..."
          style={{
            flex: 1,
            background: 'transparent',
            border: 'none',
            outline: 'none',
            color: '#fff',
            fontSize: '13px',
            minWidth: 0
          }}
        />
        {searchQuery ? (
          <button onClick={() => setSearchQuery('')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex' }}>
            <X size={15} color="#555" />
          </button>
        ) : (
          <SlidersHorizontal size={15} color="#555" style={{ flexShrink: 0 }} />
        )}
      </div>
    </div>
  );
};

export default SearchBar;
