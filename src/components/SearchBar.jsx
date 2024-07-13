import React from "react";
import "../styles/components/SearchBar.css";

const SearchBar = ({ search, onChange }) => {
  return (
    <div className="searchBar-container">
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={onChange}
      />
      <div className="search"></div>
    </div>
  );
};

export default SearchBar;
