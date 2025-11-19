import React, { useState } from "react";
import axios from "../axiosInstance";
import { Link } from "react-router-dom";

export default function Signup() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      await axios.post("/api/auth/signup", {
        fullName,
        email,
        password,
      });

      alert("🎉 Signup successful! Please login now.");
      window.location.href = "/login";
    } catch (error) {
      console.error(error);
      alert("❌ Signup failed. Try again.");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f3e5f5, #e1bee7)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "2.5rem",
          borderRadius: "12px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
          width: "360px",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "1rem", color: "#6a1b9a" }}>
          ✨ Create Account
        </h2>
        <form onSubmit={handleSignup}>
          <div style={{ marginBottom: "1rem" }}>
            <label>Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "0.6rem",
                marginTop: "0.3rem",
                borderRadius: "6px",
                border: "1px solid #ccc",
              }}
            />
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "0.6rem",
                marginTop: "0.3rem",
                borderRadius: "6px",
                border: "1px solid #ccc",
              }}
            />
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "0.6rem",
                marginTop: "0.3rem",
                borderRadius: "6px",
                border: "1px solid #ccc",
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "0.7rem",
              border: "none",
              borderRadius: "8px",
              background: "#6a1b9a",
              color: "white",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Signup
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: "1rem" }}>
          Already have an account?{" "}
          <Link to="/login" style={{ color: "#6a1b9a", textDecoration: "none" }}>
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}
