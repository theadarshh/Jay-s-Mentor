import client from "../../api/axiosClient";

export default function Subscribe(){
 async function pay(){
  const order=await client.post("/api/payment/order",{amount:49900});
  const o=JSON.parse(order.data);

  const rzp=new window.Razorpay({
   key:"REPLACE_WITH_LIVE_KEY",
   amount:o.amount,
   currency:"INR",
   name:"ReDiscoverU Life",
   description:"Mindset Transformation",
   order_id:o.id,
   handler:function(){
    localStorage.setItem("paid","true");
    window.location="/login";
   }
  });
  rzp.open();
 }

 return(
  <div style={{padding:60,textAlign:"center"}}>
   <h1>Mindset Transformation Program</h1>
   <h2>â‚¹499</h2>
   <button onClick={pay}>Pay & Join</button>
  </div>
 );
}
