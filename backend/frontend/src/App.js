import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <Router>
      <div style={{ textAlign: "center" }}>
        <h1>Jay's Mentor Platform</h1>
        <nav style={{ marginBottom: "20px" }}>
          <Link to="/signup">Signup</Link> |{" "}
          <Link to="/login">Login</Link> |{" "}
          <Link to="/dashboard">Dashboard</Link>
        </nav>

        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<h2>Welcome to Jay’s Mentor</h2>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
