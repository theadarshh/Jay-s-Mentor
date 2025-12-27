import { Routes, Route } from "react-router-dom";
import Home from "../pages/home/Home";
import Subscribe from "../pages/payment/Subscribe";

export default function AppRoutes(){
 return(
  <Routes>
   <Route path="/" element={<Home/>}/>
   <Route path="/subscribe" element={<Subscribe/>}/>
  </Routes>
 );
}