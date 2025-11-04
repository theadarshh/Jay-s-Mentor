import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <Router>
      <div style={{ textAlign: "center", marginTop: "30px" }}>
        <h1>Jay's Mentor Platform</h1>
        <nav>
          <Link to="/signup" style={{ margin: "0 10px" }}>Signup</Link>
          <Link to="/login" style={{ margin: "0 10px" }}>Login</Link>
          <Link to="/dashboard" style={{ margin: "0 10px" }}>Dashboard</Link>
        </nav>
      </div>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
