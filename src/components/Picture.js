import React from "react";

const Picture = ({ picture }) => {
  const download = (e) => {
    e.preventDefault();
    fetch(e.target.href, {
      method: "GET",
      headers: {},
    })
      .then((response) => {
        response.arrayBuffer().then(function (buffer) {
          const url = window.URL.createObjectURL(new Blob([buffer]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", `${picture.alt}.png`); //or any other extension
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
      <div className="img-container">
        <img src={picture.src.large} alt={picture.alt} />
      </div>
      <a href={picture.src.large} onClick={download}>
        Download Image
      </a>
    </div>
  );
};

export default Picture;
