import "../styles/auth.css";

export default function Signup(){
 return(
  <div className="auth-bg">
   <div className="auth-card">
    <h2>Create Your Account</h2>
    <p>Begin your mindset transformation journey</p>

    <input placeholder="Full Name"/>
    <input placeholder="Email"/>
    <input placeholder="Phone"/>
    <input type="password" placeholder="Password"/>

    <button>Proceed to Payment</button>

    <span>Already a member? <a href="/login">Login</a></span>
   </div>
  </div>
 );
}
