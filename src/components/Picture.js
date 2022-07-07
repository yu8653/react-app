import React, { useState, useEffect, useRef } from "react";

const Picture = ({ picture, innerRef }) => {
  let [imgSrc, setImgSrc] = useState("");
  const img = useRef();
  let observer = new IntersectionObserver((entries, observer) => {
    if (entries[0].isIntersecting) {
      setImgSrc(picture.src.large);
      observer.unobserve(img.current);
    }
  }, {});

  useEffect(() => {
    observer.observe(img.current);
  }, []);

  const download = (e) => {
    e.preventDefault();
    fetch(e.target.href, {
      method: "GET",
    })
      .then((response) => {
        response.arrayBuffer().then(function (buffer) {
          const url = window.URL.createObjectURL(new Blob([buffer]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", `pexels-photo-${picture.id}.png`);
          document.body.appendChild(link);
          link.click();
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="picture">
      <div ref={innerRef} className="img-container">
        <img
          ref={img}
          loading="lazy"
          data-src={picture.src.large}
          src={imgSrc}
          alt={picture.alt}
        />
        <div className="overlay">
          <a className="download" href={picture.src.large} onClick={download}>
            &darr;
          </a>
          <p className="photographer">
            <a
              title="photographer"
              href={picture.photographer_url}
              target="_blank"
              rel="noreferrer"
            >
              {picture.photographer}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Picture;
