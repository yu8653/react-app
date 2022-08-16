import React, { useState, useEffect, useRef } from "react";

const Video = ({ video, innerRef }) => {
  const [imgSrc, setImgSrc] = useState("");
  const imgRef = useRef();
  const videoRef = useRef();
  const [videoReady, setVideoReady] = useState(false);
  let observer = new IntersectionObserver((entries, observer) => {
    if (entries[0].isIntersecting) {
      setImgSrc(video.image);
      observer.disconnect();
    }
  }, {});

  useEffect(() => {
    observer.observe(imgRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  const imgMouseOver = (e) => {
    videoRef.current.load();
  };

  const videoCanPlay = (e) => {
    setVideoReady(true);
  };
  const videoMouseOver = (e) => {
    e.target.play();
  };
  const videoMouseOut = (e) => {
    e.target.pause();
  };

  return (
    <div className="video">
      <div className="container" ref={innerRef}>
        <img
          className={videoReady && "hide"}
          ref={imgRef}
          loading="lazy"
          src={imgSrc}
          alt="cover"
          onMouseOver={imgMouseOver}
        />
        <div className="layer">
          <video
            ref={videoRef}
            preload="none"
            loop
            className={!videoReady && "hide"}
            onCanPlay={videoCanPlay}
            onMouseOver={videoMouseOver}
            onMouseOut={videoMouseOut}
          >
            {video.video_files.map((file) => (
              <source key={file.id} src={file.link} type={file.file_type} />
            ))}
          </video>
        </div>
        <div className="intro">
          <p className="author">
            <a href={video.user.url} target="_blank" rel="noreferrer">
              {video.user.name}
            </a>
          </p>
          <p className="duration">
            {`${Math.floor(video.duration / 60)}:${video.duration % 60}`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Video;
