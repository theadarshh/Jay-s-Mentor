import React, { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("No token found. Please login again.");
          window.location.href = "/login";
          return;
        }

        const response = await axios.get("http://localhost:8080/api/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(response.data);
      } catch (err) {
        console.error("Error fetching user:", err);
        setError("Please login again.");
        localStorage.removeItem("token");
        alert("Please login again.");
        window.location.href = "/login";
      }
    };

    fetchUser();
  }, []);

  if (error) {
    return <p style={{ textAlign: "center", color: "red" }}>{error}</p>;
  }

  if (!user) {
    return <p style={{ textAlign: "center" }}>Loading user data...</p>;
  }

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Dashboard</h1>
      <h2>Welcome, {user.fullName}</h2>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
      <button
        onClick={() => {
          localStorage.removeItem("token");
          alert("Logged out successfully!");
          window.location.href = "/login";
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default Dashboard;
