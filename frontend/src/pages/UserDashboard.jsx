import React, { useEffect, useState } from 'react';
import client from '../api/axiosClient';

export default function UserDashboard(){
  const [status, setStatus] = useState('loading');

  useEffect(()=>{
    client.get('/api/auth/health')
      .then(r=>setStatus(JSON.stringify(r.data)))
      .catch(e=>setStatus('error: ' + (e.message || 'unknown')));
  },[]);

  return (
    <div style={{ padding: 20 }}>
      <h2>User Dashboard</h2>
      <p>Backend health: {status}</p>
      <p>Show user-specific UI here.</p>
    </div>
  );
}