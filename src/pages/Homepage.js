import React, { useState, useEffect, useRef, useCallback } from "react";
import Search from "../components/Search";
import Picture from "../components/Picture";

const Homepage = () => {
  const auth = "563492ad6f9170000100000133f03d6af3ab48d19585e439d2d2a092";
  const initURL = `https://api.pexels.com/v1/curated?page=1&per_page=15`;

  let [Pictures, setPictures] = useState([]);
  let [searchInput, setSearchInput] = useState("");
  let [url, setURL] = useState(initURL);
  let [isFetch, setIsFetch] = useState(false);

  const observer = useRef();
  const lastImageRef = useCallback(
    (node) => {
      if (isFetch) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setIsFetch(true);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isFetch]
  );

  useEffect(() => {
    search();
  }, []);

  useEffect(() => {
    if (!isFetch || !url) setIsFetch(false);
    else search();
  }, [isFetch]);

  const search = async () => {
    const data = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: auth,
      },
    });

    let { next_page = "", photos } = await data.json();

    setURL(next_page);
    setPictures((prev) => [...prev, ...photos]);
    setIsFetch(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div style={{ minHeight: "100vh" }}>
      <button
        type="button"
        className="scroll-top"
        title="Go to top"
        onClick={scrollToTop}
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
        {Pictures.map((picture, idx) => {
          if (idx === Pictures.length - 1)
            return (
              <Picture
                innerRef={lastImageRef}
                key={picture.id}
                picture={picture}
              />
            );
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
