import { Link } from 'react-router-dom';
import { isLoggedIn, logout } from '../api/auth';

export default function Navbar(){
  const logged = isLoggedIn();
  return (
    <nav style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
      <Link to="/">Home</Link> |
      <Link to="/signup"> Signup</Link> |
      <Link to="/login"> Login</Link>
      {logged && (
        <>
          {' '}| <Link to="/dashboard/user">Dashboard</Link>
          {' '}| <button style={{background:'none',border:'none',color:'#00f',textDecoration:'underline',cursor:'pointer'}} onClick={() => { logout(); window.location = '/login'; }}>Logout</button>
        </>
      )}
    </nav>
  );
}