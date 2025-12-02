import React from 'react';

export default function Landing(){
  return (
    <div style={{ padding: '30px', fontFamily: 'Arial, sans-serif' }}>
      <header style={{ display:'flex', alignItems:'center', gap:'20px' }}>
        <img src='/mnt/data/0f6489b0-b2d4-4ef3-bd30-777a57d4c809.png' alt='hero' style={{ width:160, height:100, objectFit:'cover', borderRadius:8 }} />
        <div>
          <h1>JAYS MENTOR</h1>
          <p>Learn, Practice, Succeed — Simple mentorship platform (demo)</p>
        </div>
      </header>

      <main style={{ marginTop:30 }}>
        <section style={{ maxWidth:900 }}>
          <h2>What you'll get</h2>
          <ul>
            <li>Signup + Email OTP verification</li>
            <li>JWT-based authentication for protected routes</li>
            <li>Simple user and admin dashboards</li>
          </ul>
          <p>Use the navigation links to Signup, Verify OTP and Login.</p>
        </section>
      </main>
    </div>
  );
}