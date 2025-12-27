import "../styles/auth/auth.css";

export default function Login(){
 return(
  <div className="auth-bg">
   <div className="auth-card">
    <h1>Welcome Back</h1>
    <p>Login to continue your growth</p>

    <input placeholder="Email or Phone"/>
    <input type="password" placeholder="Password"/>

    <button>Login</button>

    <span>New here? <a href="/subscribe">Join Now</a></span>
   </div>
  </div>
 );
}
