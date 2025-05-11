import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../features/home/Home";
import AuthRoutes from "./AuthRoutes";
import DashboardRoutes from "./DashboardRoutes";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth/*" element={<AuthRoutes />} />
      <Route path="/dashboard/*" element={<DashboardRoutes />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
