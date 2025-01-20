import React from "react";
import "./App.css";
import ItemCard from "./components/itemCard";
import TopBar from "./components/topBar";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from "./layout/layout";

function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Layout />}>
      </Route>
    </Routes>
  </Router>
  );
}

export default App;
