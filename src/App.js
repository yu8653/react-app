import React from "react";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Homepage from "./pages/Homepage";
import { Routes, Route } from "react-router-dom";
import "./styles/styles.css";

function App() {
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" element={<Homepage />}></Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
