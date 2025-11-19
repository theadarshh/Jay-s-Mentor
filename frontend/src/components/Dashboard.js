// src/components/Dashboard.js
import React, { useEffect, useState } from "react";
import axios from "../axiosInstance";
import UserDashboard from "./UserDashboard";
import MentorDashboard from "./MentorDashboard";
import AdminDashboard from "./AdminDashboard";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [lifetimeStatus, setLifetimeStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login again.");
      // clear and redirect
      localStorage.removeItem("token");
      window.location.href = "/login";
      return;
    }

    // Try fetching user. axiosInstance will attach the Authorization header.
    axios
      .get("/api/users/me")
      .then((res) => {
        setUser(res.data);
        fetchAccessStatus();
      })
      .catch((err) => {
        // More informative logs for debugging
        console.error("❌ Error fetching user:", err?.response || err);
        // If server responded with 401/403, show helpful message
        const status = err?.response?.status;
        if (status === 401 || status === 403) {
          alert("Session expired. Please login again.");
        } else {
          alert("Failed to fetch user info. Please login again.");
        }
        localStorage.removeItem("token");
        window.location.href = "/login";
      })
      .finally(() => setLoading(false));
  }, []);

  const fetchAccessStatus = async () => {
    try {
      const res = await axios.get("/api/enroll/status");
      setLifetimeStatus(res.data);
    } catch (err) {
      console.warn("Could not fetch access status:", err?.response || err);
    }
  };

  const handleBuyLifetime = async () => {
    try {
      await axios.post("/api/enroll/buy-lifetime");
      alert("✅ Lifetime Access Purchased Successfully!");
      fetchAccessStatus();
    } catch (err) {
      console.error(err);
      alert("❌ Purchase failed. Please try again.");
    }
  };

  if (loading) return <p>Loading user data...</p>;
  if (!user) return <p>No user data found. Redirecting to login...</p>;

  const renderDashboard = () => {
    if (user.role === "ADMIN") return <AdminDashboard user={user} />;
    if (user.role === "MENTOR") return <MentorDashboard user={user} />;
    return <UserDashboard user={user} />;
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f4f7fb",
        padding: "2rem 1rem",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        <h1 style={{ textAlign: "center", fontSize: "2rem", color: "#2c3e50" }}>
          Jay's Mentor Platform
        </h1>

        <div
          style={{
            background: "#fff",
            borderRadius: "12px",
            padding: "1.5rem",
            marginTop: "1.25rem",
            boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
          }}
        >
          <h2 style={{ marginBottom: ".75rem" }}>
            <span style={{ marginRight: ".5rem" }}>🧑‍🎓</span> User Dashboard
          </h2>
          <p>Welcome, {user.fullName}!</p>
          <p>Email: {user.email}</p>
          <p>Role: {user.role}</p>

          {lifetimeStatus && lifetimeStatus.active && (
            <div style={{ marginTop: "1rem", color: "green" }}>
              Lifetime access active ✔
            </div>
          )}

          {!lifetimeStatus?.active && (
            <div style={{ marginTop: "1rem" }}>
              <p>Buy lifetime access to unlock everything.</p>
              <button
                onClick={handleBuyLifetime}
                style={{
                  padding: ".6rem 1rem",
                  background: "#1565c0",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                Buy Lifetime Access
              </button>
            </div>
          )}
        </div>

        <div style={{ marginTop: "2rem" }}>{renderDashboard()}</div>
      </div>
    </div>
  );
}
