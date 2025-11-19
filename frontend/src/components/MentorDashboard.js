// src/components/MentorDashboard.js
import React from "react";
import LogoutButton from "./LogoutButton";

export default function MentorDashboard({ user }) {
  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h2>
        <span role="img" aria-label="mentor">
          👨‍🏫
        </span>{" "}
        Mentor Dashboard
      </h2>
      <p>Welcome, {user.fullName}!</p>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
      <LogoutButton />
    </div>
  );
}
