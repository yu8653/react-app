import React, { useState, useEffect } from "react";
import Search from "../components/Search";
import Picture from "../components/Picture";

const Homepage = () => {
  const auth = "563492ad6f9170000100000133f03d6af3ab48d19585e439d2d2a092";
  const initURL = `https://api.pexels.com/v1/curated?page=1&per_page=15`;

  let [Pictures, setPictures] = useState([]);
  let [searchInput, setSearchInput] = useState("");
  let [url, setURL] = useState(initURL);
  let [isFetch, setIsFetch] = useState(false);

  useEffect(() => {
    search();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = () => {
    if (
      window.innerHeight + Math.ceil(window.pageYOffset) >=
      document.body.offsetHeight
    ) {
      setIsFetch(true);
    }
  };

  useEffect(() => {
    if (isFetch && url) search();
    setIsFetch(false);
  }, [isFetch]);

  const search = async () => {
    const data = await fetch(url, {
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

  const toTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div style={{ minHeight: "100vh" }}>
      <button
        type="button"
        className="scroll-top"
        title="Go to top"
        onClick={toTop}
      >
        &uarr;
      </button>
      <Search
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        setURL={setURL}
        setIsFetch={setIsFetch}
        setPictures={setPictures}
      />
      <div className="pictures">
        {Pictures.map((picture) => {
          return <Picture key={picture.id} picture={picture} />;
        })}
      </div>

      <div className="more-picture">
        {isFetch && (
          <div>
            <button type="button">Loading...</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Homepage;
