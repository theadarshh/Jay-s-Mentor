// src/components/Login.js
import React, { useState } from "react";
import axios from "../axiosInstance";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const extractTokenFromResponse = (data) => {
    // Accept many shapes: { token }, { accessToken }, { jwt }, plain string, nested object.
    if (!data) return null;
    if (typeof data === "string") return data;
    // Response might be { token: "..." } or { data: { token: "..." } }
    const candidates = [
      data.token,
      data.accessToken,
      data.jwt,
      data.access_token,
      data.data && data.data.token,
      data.data && data.data.accessToken,
    ];
    for (const c of candidates) {
      if (c) return c;
    }
    // If server wrapped the response (e.g. { message: "...", token: "..." })
    if (data?.token) return data.token;
    return null;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/auth/login", { email, password });
      const token = extractTokenFromResponse(res.data);

      if (!token) {
        // If the server responded with a wrapper object like { message: "", data: { token: "" } }
        // try the nested data
        if (res.data && typeof res.data === "object") {
          const nested = res.data.data || res.data;
          const nestedToken =
            nested.token || nested.accessToken || nested.jwt || nested.access_token;
          if (nestedToken) {
            localStorage.setItem("token", nestedToken);
            alert("✅ Login successful!");
            navigate("/dashboard");
            return;
          }
        }
        console.error("Login: no token in response", res.data);
        alert("⚠️ Login succeeded but no token returned by server.");
        return;
      }

      // Save token AS A PLAIN STRING. Do NOT JSON.stringify an object here.
      localStorage.setItem("token", token);
      // Navigate to dashboard
      alert("✅ Login successful!");
      navigate("/dashboard");
    } catch (err) {
      console.error("Login error:", err, err?.response?.data || err?.message);
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        "Invalid credentials or server error";
      alert("❌ " + msg);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #e3f2fd, #bbdefb)",
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
        <h2 style={{ textAlign: "center", marginBottom: "1.25rem" }}>
          <span style={{ display: "inline-block", marginRight: "0.5rem" }}>
            🧑‍🎓
          </span>{" "}
          Login
        </h2>

        <form onSubmit={handleLogin}>
          <label style={{ display: "block", marginBottom: ".5rem" }}>Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
            placeholder="you@example.com"
            style={{
              width: "100%",
              padding: ".6rem",
              marginBottom: ".8rem",
              borderRadius: "8px",
              border: "1px solid #ddd",
            }}
          />

          <label style={{ display: "block", marginBottom: ".5rem" }}>Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            required
            placeholder="your password"
            style={{
              width: "100%",
              padding: ".6rem",
              marginBottom: ".8rem",
              borderRadius: "8px",
              border: "1px solid #ddd",
            }}
          />

          <button
            type="submit"
            style={{
              width: "100%",
              padding: ".75rem",
              background: "#1565c0",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              marginTop: "8px",
            }}
          >
            Login
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: "1rem" }}>
          Don't have an account?{" "}
          <Link to="/signup" style={{ color: "#1565c0", textDecoration: "none" }}>
            Signup here
          </Link>
        </p>
      </div>
    </div>
  );
}
