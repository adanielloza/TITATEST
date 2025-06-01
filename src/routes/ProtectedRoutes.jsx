import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoutes() {
  const userData = localStorage.getItem("user");
  return userData ? <Outlet /> : <Navigate to="/auth" replace />;
}
