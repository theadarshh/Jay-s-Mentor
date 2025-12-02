import { useState } from 'react';
import client from '../api/axiosClient';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await client.post('/api/auth/login', {
        identifier,
        password
      });

      localStorage.setItem('token', res.data.token);
      setMessage('Login success! Redirecting...');
      navigate('/dashboard/user');
    } catch (err) {
      setMessage(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input type='text' placeholder='Email or Phone' value={identifier} onChange={(e)=>setIdentifier(e.target.value)} required />
        <br/><br/>
        <input type='password' placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)} required />
        <br/><br/>
        <button type='submit'>Login</button>
      </form>
      <p>{message}</p>
    </div>
  );
}