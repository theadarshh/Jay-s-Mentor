import React from "react";
import "./../pages/Landing.css";

export default function Hero() {
  return (
    <section className="jm-hero">
      <div className="jm-hero-inner jm-container">
        <div className="jm-hero-left">
          <h1 className="jm-hero-title">
            Transform Your Lifestyle Through <span className="jm-gradient-text">Mindset, Habits & Daily Discipline</span>
          </h1>
          <p className="jm-hero-sub">
            Small habits. Big transformation — better sleep, energy, focus & confidence without extremes.
          </p>

          <div className="jm-hero-ctas">
            <a className="jm-cta jm-cta-primary" href="#programs">Join the Next Program</a>
            <a className="jm-cta jm-cta-secondary" href="#contact">Book a Free 20-min Call</a>
          </div>

          <ul className="jm-hero-pillars">
            <li>✔ <strong>Mindset</strong> — clarity, ritual, identity</li>
            <li>✔ <strong>Lifestyle</strong> — sleep, movement, food</li>
            <li>✔ <strong>Habits</strong> — daily systems & accountability</li>
          </ul>
        </div>

        <div className="jm-hero-right">
          <div className="jm-portrait-card jm-float">
            <img src="/assets/jay_profile.png" alt="Jayashankar Lingaiah" />
            <div className="jm-portrait-meta">
              <div className="jm-portrait-name">Jayashankar Lingaiah</div>
              <div className="jm-portrait-role">Founder, RediscoverU · Lifestyle & Identity Coach</div>
              <a href="https://www.linkedin.com/in/jayashankarlingaiah/" target="_blank" rel="noreferrer" className="jm-link">LinkedIn</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
