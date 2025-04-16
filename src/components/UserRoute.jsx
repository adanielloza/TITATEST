import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const UserRoute = ({ children }) => {
  const { user, role } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (role !== "user") return <Navigate to="/not-authorized" replace />;
  return children;
};

export default UserRoute;
