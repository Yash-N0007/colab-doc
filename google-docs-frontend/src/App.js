// App.js
import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import TextEditor from "./components/TextEditor";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TextEditor />} />
      </Routes>
    </Router>
  );
}

export default App;