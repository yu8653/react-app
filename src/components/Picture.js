import React from "react";

const Picture = ({ picture, innerRef }) => {
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
      <div className="img-container">
        <img
          ref={innerRef}
          loading="lazy"
          src={picture.src.large}
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
