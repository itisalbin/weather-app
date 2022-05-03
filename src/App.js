import "./App.css";
import React from "react";
import { Router } from "@reach/router";
import HomePage from "./pages/Home";

function App() {
  return (
    <Router>
      <HomePage path="/" />
    </Router>
  );
}

export default App;
