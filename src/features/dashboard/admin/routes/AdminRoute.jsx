import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function AdminRoute() {
  const role = localStorage.getItem("role");
  return role === "admin" ? (
    <Outlet />
  ) : (
    <Navigate to="/dashboard/user" replace />
  );
}
