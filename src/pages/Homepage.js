import React, { useState, useEffect } from "react";
import Search from "../components/Search";
import Picture from "../components/Picture";

const Homepage = () => {
  const auth = "563492ad6f9170000100000133f03d6af3ab48d19585e439d2d2a092";
  const initURL = `https://api.pexels.com/v1/curated?page=1&per_page=15`;

  let [Pictures, setPictures] = useState([]);
  let [searchInput, setSearchInput] = useState("");
  let [url, setURL] = useState(initURL);

  useEffect(() => {
    search();
  }, []);

  const search = async (URL) => {
    const data = await fetch(URL || url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: auth,
      },
    });

    let parseData = await data.json();

    setURL(parseData.next_page);
    setPictures((prev) => [...prev, ...parseData.photos]);
  };

  const loadPicHandle = () => {
    search();
  };

  return (
    <div style={{ minHeight: "100vh" }}>
      <Search
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        setURL={setURL}
        search={search}
        setPictures={setPictures}
      />
      <div className="pictures">
        {Pictures.map((picture) => {
          return <Picture key={picture.id} picture={picture} />;
        })}
      </div>
      <div className="more-picture">
        <button onClick={loadPicHandle}>Load More</button>
      </div>
    </div>
  );
};

export default Homepage;
