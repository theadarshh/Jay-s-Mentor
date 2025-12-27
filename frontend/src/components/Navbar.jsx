import "../styles/nav/navbar.css";

export default function Navbar(){
 return(
  <nav className="nav">
   <h2>Jay’s Mentor</h2>
   <div>
    <a href="/">Home</a>
    <a href="/subscribe">Programs</a>
    <a href="/login">Login</a>
   </div>
  </nav>
 );
}