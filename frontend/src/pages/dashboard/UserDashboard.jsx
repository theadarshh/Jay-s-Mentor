import "../styles/dashboard/userDashboard.css";
import client from "../api/axiosClient";
import { useEffect, useState } from "react";

export default function UserDashboard(){
 const [user,setUser]=useState(null);

 useEffect(()=>{
  client.get("/api/user/me").then(r=>setUser(r.data));
 },[]);

 if(!user) return <p className="loading">Loading...</p>;

 return(
  <div className="dash-bg">
   <div className="dash-card">
    <h1>Welcome, {user.fullName}</h1>
    <p className="sub">Your Growth Journey Starts Here</p>

    <section>
     <h2>ðŸ“˜ Your Program</h2>
     <p>Mindset Transformation & Personal Growth</p>
    </section>

    <section>
     <h2>ðŸŽ¥ Live Growth Circles</h2>
     <ul>
      <li>
       <b>Growth Circles</b> â€“ Tuesday & Thursday  
       <br/>
       <a href="https://meet.google.com/vzw-nxgg-mvx?hs=224" target="_blank" rel="noreferrer">
        Join Google Meet
       </a>
      </li>

      <li>
       <b>Morning Rituals â€“ â€œRise with Purposeâ€</b> (Daily)  
       <br/>
       <a href="https://meet.google.com/quu-eyjw-jxb" target="_blank" rel="noreferrer">
        Join Google Meet
       </a>
      </li>
     </ul>
    </section>

    <section className="locked">
     <h2>ðŸ’¬ WhatsApp Community</h2>
     <p>
      This will unlock shortly.  
      Stay tuned for your exclusive mentor & peer group access.
     </p>
    </section>
   </div>
  </div>
 );
}
