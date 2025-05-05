import React from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { LoginPage } from "../features/auth";

export default function AuthRoutes() {
  const role = localStorage.getItem("role");
  if (role) return <Navigate to="/dashboard" replace />;

  return (
    <Routes>
      <Route path="/" element={<Outlet />}>
        <Route index element={<LoginPage />} />
      </Route>
    </Routes>
  );
}
