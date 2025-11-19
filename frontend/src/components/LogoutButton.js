// src/components/LogoutButton.js
import React from "react";
import { useNavigate } from "react-router-dom";

/**
 * Simple reusable logout button
 * Clears token and redirects to /login
 */
export default function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/signup");
  };

  return (
    <button
      onClick={handleLogout}
      style={{
        padding: "6px 12px",
        backgroundColor: "#e74c3c",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        marginTop: "20px",
      }}
    >
      Logout
    </button>
  );
}
