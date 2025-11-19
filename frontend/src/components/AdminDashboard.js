// src/components/AdminDashboard.js
import React from "react";
import LogoutButton from "./LogoutButton";

export default function AdminDashboard({ user }) {
  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h2>
        <span role="img" aria-label="admin">
          🧑‍💼
        </span>{" "}
        Admin Dashboard
      </h2>
      <p>Welcome, {user.fullName}!</p>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
      <LogoutButton />
    </div>
  );
}
