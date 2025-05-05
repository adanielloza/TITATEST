import React from "react";
import ProtectedRoutes from "./ProtectedRoutes";
import { Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "../features/dashboard/DashboardLayout";
import AdminHome from "../features/dashboard/pages/admin/AdminHome";
import ManageUsers from "../features/dashboard/pages/admin/ManageUsers";
import UserHome from "../features/dashboard/pages/user/UserHome";
import UserSettings from "../features/dashboard/pages/user/UserSettings";

export default function DashboardRoutes() {
  const userData = JSON.parse(localStorage.getItem("user") || "{}");
  const role = userData.role;

  return (
    <ProtectedRoutes>
      <Routes>
        <Route element={<DashboardLayout />}>
          {role === "admin" ? (
            <>
              <Route path="admin" element={<AdminHome />} />
              <Route path="manage-users" element={<ManageUsers />} />
            </>
          ) : role === "user" ? (
            <>
              <Route index element={<UserHome />} />
              <Route path="settings" element={<UserSettings />} />
            </>
          ) : (
            <Route path="*" element={<Navigate to="/" />} />
          )}
        </Route>
      </Routes>
    </ProtectedRoutes>
  );
}
