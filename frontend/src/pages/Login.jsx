import "../styles/auth.css";

export default function Login(){
 return(
  <div className="auth-bg">
   <div className="auth-card">
    <h2>Welcome Back</h2>
    <p>Login to continue your growth</p>

    <input placeholder="Email or Phone"/>
    <input type="password" placeholder="Password"/>

    <button>Login</button>

    <span>New here? <a href="/signup">Create account</a></span>
   </div>
  </div>
 );
}
