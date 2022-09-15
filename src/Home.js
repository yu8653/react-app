import React from "react";
import github from "./image/github.png";
import react from "./image/react.png";
import pexel from "./image/pexels.png";
import vercel from "./image/Vercel.png";

const Home = () => {
  return (
    <>
      <div className="container">
        <div className="card">
          <a href="https://reactjs.org/" target="_blank" rel="noreferrer">
            <img src={react} alt="react logo" />
          </a>
        </div>
        <div className="card">
          <a href="https://www.pexels.com/" target="_blank" rel="noreferrer">
            <img src={pexel} alt="pexel logo" />
          </a>
        </div>
        <div className="card">
          <a href="https://vercel.com/" target="_blank" rel="noreferrer">
            <img src={vercel} alt="vercel logo" />
          </a>
        </div>
        <div className="card">
          <a href="https://github.com/" target="_blank" rel="noreferrer">
            <img src={github} alt="github logo" />
          </a>
          <p>
            <a
              type="button"
              href="https://github.com/yu8653/react-app"
              target="_blank"
              rel="noreferrer"
            >
              View Source Code
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Home;
