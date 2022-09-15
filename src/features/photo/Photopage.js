import React, { useState, useEffect, useRef, useCallback } from "react";
import Search from "../../components/Search";
import Picture from "./Picture";
import Spinner from "../../components/Spinner";
import Scrolltop from "../../components/Scrolltop";
import Pexels from "../../services/pexel";

const Photopage = () => {
  const initURL = `https://api.pexels.com/v1/curated?page=1&per_page=15`;

  let [Pictures, setPictures] = useState([]);
  let [searchInput, setSearchInput] = useState("");
  let [url, setURL] = useState(initURL);
  let [isFetch, setIsFetch] = useState(true);

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
    if (!isFetch || !url) setIsFetch(false);
    else search();
  }, [isFetch]);

  const search = async () => {
    const data = await Pexels.getData(url);

    let { next_page = "", photos } = await data.json();

    setURL(next_page);
    setPictures((prev) => [...prev, ...photos]);
    setIsFetch(false);
  };

  const searchHandle = () => {
    const searchURL = searchInput
      ? `https://api.pexels.com/v1/search?query=${searchInput}&page=1&per_page=15`
      : `https://api.pexels.com/v1/curated?page=1&per_page=15`;
    setURL(searchURL);
    setPictures([]);
    setIsFetch(true);
  };

  return (
    <>
      <Scrolltop />
      <Search
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        searchHandle={searchHandle}
      />
      <div className="pictures">
        {Pictures.length === 0 && !isFetch && <p>Search other keyword</p>}
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

      <div className="more">{isFetch && <Spinner />}</div>
    </>
  );
};

export default Photopage;
