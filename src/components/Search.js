import React from "react";

const Search = ({ searchInput, setSearchInput, searchHandle }) => {
  const searchInputChangeHandle = (e) => {
    setSearchInput(e.target.value);
  };

  const keyUpHandle = (e) => {
    if (e.key === "Enter") {
      searchHandle();
    }
  };

  return (
    <div className="search">
      <input
        onChange={searchInputChangeHandle}
        onKeyUp={keyUpHandle}
        name="searchInput"
        type="text"
        value={searchInput}
      />
      <button onClick={searchHandle}>Search</button>
    </div>
  );
};

export default Search;
