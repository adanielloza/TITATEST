import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function AuthRoute() {
  const role = localStorage.getItem("role");
  if (role) {
    return <Navigate to="/dashboard" replace />;
  }
  return <Outlet />;
}
