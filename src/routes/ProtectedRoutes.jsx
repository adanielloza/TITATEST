import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoutes({ children }) {
  const userData = localStorage.getItem("user");
  return userData ? children : <Navigate to="/auth" replace />;
}
