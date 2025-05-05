import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { auth } from "../services/firebase";

export default function ProtectedRoutes({ children }) {
  const user = auth.currentUser;
  return user ? children : <Navigate to="/auth" replace />;
}
