import React from "react";
import "./LandingPage.css";

export default function LandingPage() {
  return (
    <div className="jm-landing">
      <header className="jm-header">
        <div className="container header-inner">
          <div className="logo">
            <div className="logo-mark">JM</div>
            <div className="logo-text">Jay's Mentor</div>
          </div>
          <nav className="nav">
            <a href="#about">About</a>
            <a href="#programs">Programs</a>
            <a href="#testimonials">Testimonials</a>
            <a href="#contact">Contact</a>
          </nav>
          <div className="auth-buttons">
            <a className="btn btn-outline" href="/login">Login</a>
            <a className="btn btn-primary" href="/signup">Signup</a>
          </div>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="container hero-inner">
            <div className="hero-content">
              <h1>Unlock Your Potential with Jayashankar Lingaiah</h1>
              <p className="lead">
                Mindset & career mentor helping professionals transform their thinking, performance, and results.
              </p>
              <div className="hero-cta">
                <a className="btn btn-primary large" href="/signup">Start Your Journey</a>
                <a className="btn btn-outline" href="#programs">Explore Programs</a>
              </div>
            </div>
            <div className="hero-media" aria-hidden>
              <div className="avatar-placeholder">
                {/* placeholder - replace with mentor photo later */}
                <svg width="160" height="160" viewBox="0 0 100 100">
                  <defs><linearGradient id="g1" x1="0" x2="1"><stop offset="0" stopColor="#1d4ed8"/><stop offset="1" stopColor="#f59e0b"/></linearGradient></defs>
                  <circle cx="50" cy="50" r="48" fill="url(#g1)"/>
                  <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" fontSize="30" fill="#fff">J</text>
                </svg>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="about container">
          <div className="about-grid">
            <div>
              <h2>Meet Your Mentor</h2>
              <p>
                Jayashankar Lingaiah (Jay) is a mindset & career mentor who helps students and professionals gain clarity,
                build confident habits and achieve consistent progress. His coaching blends practical career guidance and mental frameworks.
              </p>
              <ul className="features">
                <li>1:1 Mentorship</li>
                <li>Mindset Transformation</li>
                <li>Career Strategy & Interview Prep</li>
              </ul>
              <a className="btn btn-primary" href="/signup">Work With Jay</a>
            </div>
            <div className="about-card" aria-hidden>
              <div className="card-inner">
                <h3>Why work with Jay?</h3>
                <p>
                  Personalized guidance, actionable plans and accountability — to move faster and with clarity.
                </p>
                <div className="card-stats">
                  <div><strong>500+</strong><span>Students</span></div>
                  <div><strong>200+</strong><span>1:1 Sessions</span></div>
                  <div><strong>5+</strong><span>Years Coaching</span></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="programs" className="programs">
          <div className="container">
            <h2>Programs</h2>
            <div className="program-grid">
              <article className="program">
                <h3>Mindset Coaching</h3>
                <p>Reframe limiting beliefs and build daily habits that lead to consistent growth.</p>
                <a className="btn btn-outline" href="/signup">Join</a>
              </article>
              <article className="program">
                <h3>Career Mentorship</h3>
                <p>Practical career steps, resume review, interview drills and role-specific preparation.</p>
                <a className="btn btn-outline" href="/signup">Join</a>
              </article>
              <article className="program">
                <h3>1:1 Coaching</h3>
                <p>Personalized sessions — structured, measurable and outcome-driven.</p>
                <a className="btn btn-outline" href="/signup">Apply</a>
              </article>
            </div>
          </div>
        </section>

        <section id="testimonials" className="testimonials container">
          <h2>What Students Say</h2>
          <div className="test-grid">
            <blockquote className="test">
              <p>“Jay helped me shift my mindset and land my dream role. Practical and compassionate coach.”</p>
              <cite>- A. Student</cite>
            </blockquote>
            <blockquote className="test">
              <p>“Focused actionable steps, and weekly accountability — results followed.”</p>
              <cite>- B. Learner</cite>
            </blockquote>
            <blockquote className="test">
              <p>“The best investment I made for my career and confidence.”</p>
              <cite>- C. Professional</cite>
            </blockquote>
          </div>
        </section>

        <section className="cta container">
          <div className="cta-inner">
            <div>
              <h2>Ready to transform?</h2>
              <p>Book a free discovery call or sign up to get started with Jay’s mentorship program.</p>
            </div>
            <div>
              <a className="btn btn-gold large" href="/signup">Get Started</a>
              <a className="btn btn-outline" href="#contact">Book Free Call</a>
            </div>
          </div>
        </section>

        <section id="contact" className="contact container">
          <div className="contact-grid">
            <div>
              <h3>Contact</h3>
              <p>Email: <a href="mailto:hello@jaysmentor.example">hello@jaysmentor.example</a></p>
            </div>
            <div>
              <h3>Follow</h3>
              <div className="socials">
                <a href="#" aria-label="twitter">Twitter</a>
                <a href="#" aria-label="linkedin">LinkedIn</a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="jm-footer">
        <div className="container footer-inner">
          <div>© {new Date().getFullYear()} Jay's Mentor</div>
          <div>Made with ❤️ · Blue • White • Gold • Black</div>
        </div>
      </footer>
    </div>
  );
}
