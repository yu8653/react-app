import React from "react";

const Search = ({
  searchInput,
  setSearchInput,
  search,
  setURL,
  setPictures,
}) => {
  const searchInputChangeHandle = (e) => {
    setSearchInput(e.target.value);
  };

  const searchHandle = () => {
    const searchURL = searchInput
      ? `https://api.pexels.com/v1/search?query=${searchInput}&page=1&per_page=15`
      : `https://api.pexels.com/v1/curated?page=1&per_page=15`;
    setURL(searchURL);
    setPictures([]);
    search(searchURL);
  };

  return (
    <div className="search">
      <input
        onChange={searchInputChangeHandle}
        name="searchInput"
        type="text"
        value={searchInput}
      />
      <button onClick={searchHandle}>Search</button>
    </div>
  );
};

export default Search;
