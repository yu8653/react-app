import React, { useState, useEffect, useRef, useCallback } from "react";
import Search from "../components/Search";
import Video from "../components/Video";
import Scrolltop from "../components/Scrolltop";
import Spinner from "../components/Spinner";
import Pexels from "../services/pexel";

const Videopage = () => {
  const initURL = `https://api.pexels.com/videos/popular?page=1&per_page=15`;

  let [videos, setVideos] = useState([]);
  let [searchInput, setSearchInput] = useState("");
  let [url, setURL] = useState(initURL);
  let [isFetch, setIsFetch] = useState(true);

  const observer = useRef();
  const lastVideoRef = useCallback(
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

  const searchHandle = () => {
    const searchURL = searchInput
      ? `https://api.pexels.com/videos/search?query=${searchInput}&page=1&per_page=15`
      : initURL;
    setURL(searchURL);
    setVideos([]);
    setIsFetch(true);
  };

  const search = async () => {
    const data = await Pexels.getData(url);
    const { next_page = "", videos } = await data.json();
    setURL(next_page);
    setVideos((prev) => [...prev, ...videos]);
    setIsFetch(false);
  };

  useEffect(() => {
    if (!isFetch || !url) setIsFetch(false);
    else search();
  }, [isFetch]);

  return (
    <>
      <Scrolltop />
      <Search
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        searchHandle={searchHandle}
      />
      <div className="videos">
        {videos.length === 0 && !isFetch && <p>Search other keyword</p>}
        {videos.map((video, idx) => {
          if (idx === videos.length - 1)
            return (
              <Video innerRef={lastVideoRef} key={video.id} video={video} />
            );
          return <Video key={video.id} video={video} />;
        })}
      </div>
      <div className="more">{isFetch && <Spinner />}</div>
    </>
  );
};

export default Videopage;
