// src/pages/About.jsx
import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Landing.css";

const About = () => {
  return (
    <>
      <Navbar />
      <main className="landing-root" style={{paddingTop:28}}>
        <section style={{maxWidth:900, margin:"28px auto", padding:"0 16px"}}>
          <h2>About RediscoverU</h2>
          <p><strong>RediscoverU exists to help people take back control of their lifestyle through small, practical, science-based habits — not extremes.</strong></p>
          <h3>About the Coach</h3>
          <p><strong>Jayashankar Lingaiah</strong><br/>Founder, RediscoverU — Lifestyle & Identity Coach. 19+ years corporate experience. Built a practical system to help busy people win.</p>

          <h3>What makes RediscoverU different</h3>
          <ul>
            <li>No gym required</li>
            <li>No strict diet</li>
            <li>Simple daily systems</li>
            <li>Community & accountability</li>
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default About;
