import React from "react";
import ProgramCard from "./ProgramCard";
import "./../pages/Landing.css";

const programs = [
  { title: "Rise With Purpose", price: "2,999 - 6,999", description: "Morning ritual to build focus & confidence", cta: "Join" },
  { title: "Lifestyle Reset", price: "3,499 - 4,999", description: "Fix sleep, food & screen habits", cta: "Join" },
  { title: "Habit Mastery", price: "5,999 - 11,999", description: "Build 3–5 life-changing habits", cta: "Apply" },
  { title: "Digital Detox", price: "499 - 2,499", description: "Reduce reels & scrolling", cta: "Join" },
  { title: "Move Daily", price: "1,999 - 7,999", description: "Fitness without gym", cta: "Join" },
];

export default function ProgramsSection() {
  return (
    <section id="programs" className="jm-programs jm-container">
      <h2 className="jm-section-title">Our Programs</h2>
      <div className="jm-cards-grid">
        {programs.map((p) => (
          <ProgramCard 
            key={p.title} 
            title={p.title} 
            price={p.price} 
            description={p.description} 
            ctaText={p.cta} 
          />
        ))}
      </div>
    </section>
  );
}
