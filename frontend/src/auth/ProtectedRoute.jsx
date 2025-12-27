import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, role }) {
 const token = localStorage.getItem("token");
 const userRole = localStorage.getItem("role");
 const paid = localStorage.getItem("paid");

 if (!token) return <Navigate to="/login" />;
 if (role && userRole !== role) return <Navigate to="/" />;
 if (paid !== "true") return <Navigate to="/subscribe" />;

 return children;
}