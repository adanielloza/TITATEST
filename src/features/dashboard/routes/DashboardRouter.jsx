import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "../DashboardLayout";
import AdminHome from "../pages/admin/AdminHome";
import ManageUsers from "../pages/admin/ManageUsers";
import UserHome from "../pages/user/UserHome";
import UserSettings from "../pages/user/UserSettings";

export default function DashboardRouter() {
  const role = localStorage.getItem("role");

  return (
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
  );
}
