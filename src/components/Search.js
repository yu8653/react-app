import React from "react";

const Search = ({
  searchInput,
  setSearchInput,
  setIsFetch,
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
    setIsFetch(true);
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
