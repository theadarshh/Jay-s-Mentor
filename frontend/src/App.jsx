import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Subscribe from "./pages/payment/Subscribe";
import UserDashboard from "./pages/user/UserDashboard";

export default function App(){
 return(
  <Routes>
   <Route path="/" element={<Home/>}/>
   <Route path="/subscribe" element={<Subscribe/>}/>
   <Route path="/dashboard" element={<UserDashboard/>}/>
  </Routes>
 );
}