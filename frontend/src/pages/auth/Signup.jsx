import "../styles/auth/auth.css";

export default function Signup(){
 return(
  <div className="auth-bg">
   <div className="auth-card">
    <h1>Create Your Account</h1>
    <p>Start your mindset transformation journey</p>

    <input placeholder="Full Name"/>
    <input placeholder="Email"/>
    <input placeholder="Phone"/>
    <input type="password" placeholder="Password"/>

    <button>Create Account</button>

    <span>Already a member? <a href="/login">Login</a></span>
   </div>
  </div>
 );
}
