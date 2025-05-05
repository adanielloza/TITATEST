import React from "react";
import ProtectedRoutes from "./ProtectedRoutes";
import DashboardRouter from "../features/dashboard/routes/DashboardRouter";

export default function DashboardRoutes() {
  return (
    <ProtectedRoutes>
      <DashboardRouter />
    </ProtectedRoutes>
  );
}
