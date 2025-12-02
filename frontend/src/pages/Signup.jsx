import { useState } from 'react';
import client from '../api/axiosClient';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await client.post('/api/auth/signup', {
        fullName,
        email,
        password,
        phone
      });
      setMessage('Signup successful! OTP sent (dev only).');
      navigate('/verify', { state: { email } });
    } catch (err) {
      setMessage(err.response?.data?.error || 'Signup failed');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input type='text' placeholder='Full Name' value={fullName} onChange={(e)=>setFullName(e.target.value)} required />
        <br/><br/>
        <input type='email' placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)} required />
        <br/><br/>
        <input type='text' placeholder='Phone (optional)' value={phone} onChange={(e)=>setPhone(e.target.value)} />
        <br/><br/>
        <input type='password' placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)} required />
        <br/><br/>
        <button type='submit'>Register</button>
      </form>
      <p>{message}</p>
    </div>
  );
}