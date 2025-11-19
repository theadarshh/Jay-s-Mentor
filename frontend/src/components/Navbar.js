import React from "react";
import "./../pages/Landing.css";

export default function Navbar() {
  return (
    <header className="jm-navbar">
      <div className="jm-container jm-navbar-inner">
        <div className="jm-brand">
          <img src="/assets/jay_profile.png" alt="Jay" className="jm-logo" />
          <div className="jm-brand-text">
            <div className="jm-brand-title">Jay's Mentor</div>
            <div className="jm-brand-sub">RediscoverU</div>
          </div>
        </div>

        <nav className="jm-navlinks">
          <a href="#programs">Programs</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
          <a className="jm-btn jm-btn-outline" href="/signup">Join</a>
          <a className="jm-btn jm-btn-primary" href="/login">Login</a>
        </nav>
      </div>
    </header>
  );
}
