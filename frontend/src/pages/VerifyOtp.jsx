import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import client from '../api/axiosClient';

export default function VerifyOtp() {
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email;
  if (!email) return <h3>No email passed. Go to Signup first.</h3>;

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      await client.post('/api/verify/confirm', { email, otp });
      setMessage('Verification successful! Redirecting to login...');
      setTimeout(()=>navigate('/login'), 1200);
    } catch (err) {
      setMessage(err.response?.data?.error || 'Invalid or expired OTP');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Verify OTP</h2>
      <p>OTP sent to: {email}</p>
      <form onSubmit={handleVerify}>
        <input type='text' placeholder='Enter OTP' value={otp} onChange={(e)=>setOtp(e.target.value)} required />
        <br/><br/>
        <button type='submit'>Verify</button>
      </form>
      <p>{message}</p>
    </div>
  );
}