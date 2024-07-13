import React, { useState } from 'react';
import "../styles/components/SearchBar.css"

const SearchBar = () => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="container">
      <input 
        type="text" 
        placeholder="Search..."
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={isFocused ? 'focused' : ''}
      />
      <div className={`search ${isFocused ? 'focused' : ''}`}></div>
    </div>
  );
};

export default SearchBar;
