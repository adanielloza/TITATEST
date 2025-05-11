import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes";
import DashboardLayout from "../features/dashboard/DashboardLayout";
import AdminHome from "../features/dashboard/pages/admin/AdminHome";
import ManageUsers from "../features/dashboard/pages/admin/ManageUsers";
import UserHome from "../features/dashboard/pages/user/UserHome";
import PatientsManagement from "../features/dashboard/pages/user/PatientsManagement";
import ActivityTracking from "../features/dashboard/pages/user/ActivityTracking";

export default function DashboardRoutes() {
  const userData = JSON.parse(localStorage.getItem("user") || "{}");
  const role = userData.role;

  return (
    <Routes>
      <Route element={<ProtectedRoutes />}>
        <Route element={<DashboardLayout />}>
          {role === "admin" ? (
            <>
              <Route index element={<AdminHome />} />
              <Route path="manage-users" element={<ManageUsers />} />
            </>
          ) : role === "user" ? (
            <>
              <Route index element={<UserHome />} />
              <Route
                path="patients-management"
                element={<PatientsManagement />}
              />
              <Route
                path="activity-management"
                element={<ActivityTracking />}
              />
            </>
          ) : (
            <Route path="*" element={<Navigate to="/" />} />
          )}
        </Route>
      </Route>
    </Routes>
  );
}
