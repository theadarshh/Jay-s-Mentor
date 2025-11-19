import React from "react";
import "./../pages/Landing.css";

export default function Footer() {
  return (
    <footer className="jm-footer">
      <div className="jm-container jm-footer-inner">
        <div>
          <div className="jm-footer-brand">Jay's Mentor — RediscoverU</div>
          <div className="jm-footer-sub">Small habits. Big transformation.</div>
        </div>

        <div>
          <div>Contact: hello@rediscoveru.com</div>
          <div>WhatsApp: +91-XXXXXXXXXX</div>
        </div>
      </div>
      <div className="jm-footer-bottom">© {new Date().getFullYear()} Jay's Mentor · All rights reserved</div>
    </footer>
  );
}
