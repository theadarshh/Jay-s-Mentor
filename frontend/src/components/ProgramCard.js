import React from "react";
import "./../pages/Landing.css";

export default function ProgramCard({ title, price, description, ctaText }) {
  return (
    <article className="jm-card">
      <div className="jm-card-head">
        <h3>{title}</h3>
        <div className="jm-price">₹{price}</div>
      </div>
      <p className="jm-card-desc">{description}</p>
      <div className="jm-card-actions">
        <button className="jm-small jm-small-outline">View Details</button>
        <button className="jm-small jm-small-primary">{ctaText || "Join"}</button>
      </div>
    </article>
  );
}
