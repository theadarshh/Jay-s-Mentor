// src/pages/Programs.jsx
import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProgramCard from "../components/ProgramCard";
import "./Landing.css";

const Programs = () => {
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
      <main className="landing-root" style={{paddingTop:28}}>
        <section className="programs">
          <h2>Programs — Choose Your Path</h2>
          <div className="program-grid">
            {programs.map(p => <ProgramCard key={p.title} {...p} />)}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Programs;
