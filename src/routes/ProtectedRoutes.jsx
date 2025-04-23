// src/routes/ProtectedRoutes.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { auth } from '../services/firebase';

export default function ProtectedRoutes() {
  const user = auth.currentUser;
  return user
    ? <Outlet />
    : <Navigate to="/auth" replace />;
}
