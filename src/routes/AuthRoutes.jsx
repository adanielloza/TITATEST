import { Navigate } from "react-router-dom";
import LoginPage from "../features/auth/LoginPage";

export default function AuthRoutes() {
  const userData = JSON.parse(localStorage.getItem("user") || "{}");
  const role = userData.role;

  if (role) return <Navigate to="/dashboard" replace />;
  return <LoginPage />;
}
