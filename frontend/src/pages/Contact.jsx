// src/pages/Contact.jsx
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Landing.css";

const Contact = () => {
  const [success, setSuccess] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(true);
  };

  return (
    <>
      <Navbar />
      <main className="landing-root" style={{paddingTop:28}}>
        <section style={{maxWidth:900, margin:"28px auto", padding:"0 16px"}}>
          <h2>Get in Touch / Register</h2>
          <p>Fill the form and our team will contact you.</p>

          {!success ? (
            <form onSubmit={handleSubmit} style={{display:"grid", gap:12}}>
              <input required placeholder="Full name" />
              <input required placeholder="Email" type="email" />
              <input required placeholder="Mobile number" />
              <select required>
                <option value="">Select Program</option>
                <option>Rise With Purpose</option>
                <option>Lifestyle Reset</option>
                <option>Habit Mastery</option>
                <option>Digital Detox</option>
                <option>Move Daily</option>
              </select>
              <textarea placeholder="Message (optional)"></textarea>
              <button className="cta-primary" type="submit">Register Now</button>
            </form>
          ) : (
            <div style={{background:"#ecfdf5", padding:16, borderRadius:8}}>
              ✔ Thank you! Our team will reach out within 24 hours with next steps.
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Contact;
