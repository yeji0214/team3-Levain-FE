import React, { useState } from "react";
import NameItem from "../components/NameItem";
import SearchBar from "../components/SearchBar";
import "../styles/components/List.css";

function List({ names }) {
  const [search, setSearch] = useState("");

  const onChange = (e) => {
    setSearch(e.target.value);
  };

  const getFilteredData = () => {
    if (search === "") {
      return []; // 검색어가 없을 때는 빈 배열 반환
    }
    return names.filter((name) => {
      const userNameMatch = name.userName?.toLowerCase().includes(search.toLowerCase());
      const nicknameMatch = name.nickname?.toLowerCase().includes(search.toLowerCase());
      return userNameMatch || nicknameMatch;
    });
  };

  const filteredNames = getFilteredData();

  return (
    <div className="list-container">
      <SearchBar search={search} onChange={onChange} />
      <div className="name-items-container">
        {filteredNames.length > 0 && (
          <div className="name-items">
            {filteredNames.map((name) => (
              <NameItem key={name.userName} userName={name.userName} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default List;
