// src/routes/routes.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';

import PrincipalRoute   from './PrincipalRoute';
import ProtectedRoutes  from './ProtectedRoutes';
import AdminRoute       from './AdminRoute';
import AuthRoute        from '../features/auth/components/AuthRoute';
import Home             from '../features/home';
import About            from '../features/about';
import { Dashboard, AdminDashboard } from '../features/dashboard';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public pages */}
      <Route element={<PrincipalRoute />}>
        <Route index     element={<Home />}  />
        <Route path="about" element={<About />} />
      </Route>

      {/* Auth flow now uses a wildcard */}
      <Route path="auth/*" element={<AuthRoute />} />

      {/* Protected pages */}
      <Route element={<ProtectedRoutes />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
        </Route>
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Home />} />
    </Routes>
  );
}
