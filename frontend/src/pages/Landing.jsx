import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import ProgramsSection from "../components/ProgramsSection";
import Footer from "../components/Footer";
import "../pages/Landing.css";

export default function Landing() {
  return (
    <div className="jm-page">
      <Navbar />
      <main>
        <Hero />
        <ProgramsSection />
        <section id="about" className="jm-about jm-container">
          <h2 className="jm-section-title">Why RediscoverU Works</h2>
          <p className="jm-lead">
            We focus on mindset, lifestyle and daily habits — small practical steps you can keep for life.
          </p>
          <div className="jm-about-grid">
            <div className="jm-about-card"><strong>Mindset</strong><p>Confidence, clarity & daily rituals</p></div>
            <div className="jm-about-card"><strong>Lifestyle</strong><p>Sleep, movement & nutritious simplicity</p></div>
            <div className="jm-about-card"><strong>Habits</strong><p>Daily systems that become identity</p></div>
          </div>
        </section>

        <section id="contact" className="jm-contact jm-container">
          <h2 className="jm-section-title">Get in touch / Register</h2>
          <p>Fill a simple registration form or message us on WhatsApp for a free clarity call.</p>
          <div className="jm-contact-ctas">
            <a className="jm-cta jm-cta-primary" href="/signup">Register Now</a>
            <a className="jm-cta jm-cta-secondary" href="https://wa.me/919999999999">WhatsApp Now</a>
          </div>
        </section>
      </main>

      <Footer />
      <a className="jm-whatsapp-fab" href="https://wa.me/919999999999" target="_blank" rel="noreferrer">💬</a>
    </div>
  );
}
