import React from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes";
import AuthRoute from "../features/auth/routes/AuthRoute";
import { Login } from "../features/auth";
import { UserDashboard } from "../features/dashboard/user/components";
import { AdminDashboard } from "../features/dashboard/admin/components";
import Home from "../features/home";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="*" element={<Home />} />
      <Route path="auth/" element={<AuthRoute />}>
        <Route index element={<Login />} />
      </Route>
      <Route element={<ProtectedRoutes />}>
        <Route path="dashboard">
          <Route index element={<UserDashboard />} />
          <Route path="admin" element={<AdminDashboard />} />
        </Route>
      </Route>
    </Routes>
  );
}
