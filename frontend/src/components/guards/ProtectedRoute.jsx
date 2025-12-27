import {Navigate} from "react-router-dom";
import {isLoggedIn,hasSubscription} from "../../utils/auth";

export default function ProtectedRoute({children}){
 if(!isLoggedIn()) return <Navigate to="/login"/>;
 if(!hasSubscription()) return <Navigate to="/subscribe"/>;
 return children;
}