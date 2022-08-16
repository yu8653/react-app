import React from "react";
import Nav from "./components/Nav";
import Homepage from "./pages/Homepage";
import Photopage from "./pages/Photopage";
import Videopage from "./pages/Videopage";
import { Routes, Route } from "react-router-dom";
import "./styles/styles.css";

function App() {
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" element={<Homepage />}></Route>
        <Route path="/photo" element={<Photopage />}></Route>
        <Route path="/video" element={<Videopage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
