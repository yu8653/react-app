import React from "react";
import Nav from "./components/Nav";
import Home from "./Home";
import Photopage from "./features/photo/Photopage";
import Videopage from "./features/vidoe/Videopage";
import { Routes, Route } from "react-router-dom";
import "./styles/styles.css";

function App() {
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/photo" element={<Photopage />}></Route>
        <Route path="/video" element={<Videopage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
