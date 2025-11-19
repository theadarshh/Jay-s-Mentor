// src/pages/Home.jsx
import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProgramCard from "../components/ProgramCard";
import "./Landing.css";

const Home = () => {
  const programs = [
    { title: "Rise With Purpose", subtitle: "Morning ritual to build focus & confidence", price: "₹2,999 - ₹6,999", cta: "Join" },
    { title: "Lifestyle Reset", subtitle: "Fix sleep, food & screen habits", price: "₹3,499 - ₹4,999", cta: "Join" },
    { title: "Habit Mastery", subtitle: "Build 3–5 life-changing habits", price: "₹5,999 - ₹11,999", cta: "Apply" },
    { title: "Digital Detox", subtitle: "Reduce reels & scrolling", price: "₹499 - ₹2,499", cta: "Join" },
    { title: "Move Daily", subtitle: "Fitness without gym", price: "₹1,999 - ₹7,999", cta: "Join" },
  ];

  return (
    <>
      <Navbar />
      <main className="landing-root">
        <section className="hero">
          <div className="hero-left">
            <h1>Transform Your Lifestyle Through Mindset, Habits & Daily Discipline</h1>
            <p className="lead">Small habits. Big transformation. Build sleep, focus, energy & confidence without extremes.</p>
            <div className="hero-ctas">
              <a href="/signup" className="cta-primary">✅ Join the Next Program</a>
              <a href="/contact" className="cta-secondary">📞 Book a Free 20-Minute Consultation</a>
            </div>
            <ul className="three-pillars">
              <li>✔ Mindset — clarity, rituals, identity</li>
              <li>✔ Lifestyle — sleep, movement, food</li>
              <li>✔ Habits — daily systems & accountability</li>
            </ul>
          </div>
          <div className="hero-right">
            <div className="profile-card">
              <img src="/assets/jay_profile.png" alt="Jay" />
              <h3>Jayashankar Lingaiah</h3>
              <p>Founder, RediscoverU · Lifestyle & Identity Coach</p>
              <a className="profile-link" href="https://www.linkedin.com/in/jayashankarlingaiah/" target="_blank" rel="noreferrer">LinkedIn</a>
            </div>
          </div>
        </section>

        <section className="programs">
          <h2>Our Programs</h2>
          <div className="program-grid">
            {programs.map((p) => <ProgramCard key={p.title} {...p} />)}
          </div>
        </section>

        <section className="about-cta">
          <div>
            <h3>Ready to transform your lifestyle?</h3>
            <p>Join the next batch or book a free consultation call.</p>
          </div>
          <div>
            <a href="/contact" className="cta-primary">Join the Next Batch</a>
            <a href="/contact" className="cta-secondary">Book Free Consultation</a>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Home;
