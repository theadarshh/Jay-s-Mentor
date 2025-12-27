import "../../styles/home.css";

export default function Home(){
 return(
  <div className="home-bg">
   <nav className="nav">
    <h2>Jayâ€™s Mentor</h2>
    <div>
     <a href="#programs">Programs</a>
     <a href="#live">Live Sessions</a>
     <a href="/signup" className="btn">Join Now</a>
    </div>
   </nav>

   <section className="hero">
    <h1>Transform Your Mindset<br/>Transform Your Life</h1>
    <p>Guided by Mentor Jay Shankar â€¢ India</p>
    <a href="/signup" className="hero-btn">Start Your Journey</a>
   </section>

   <section id="programs" className="section">
    <h2>Programs</h2>
    <div className="cards">
     <div className="card">Discipline Mastery</div>
     <div className="card">Confidence Blueprint</div>
     <div className="card">Success Mindset</div>
    </div>
   </section>

   <section id="live" className="section alt">
    <h2>Live Sessions</h2>
    <p>Weekly Google Meet sessions with direct mentor access</p>
   </section>

   <section className="cta">
    <h2>Ready to Upgrade Your Life?</h2>
    <a href="/signup">Subscribe Now</a>
   </section>
  </div>
 );
}
