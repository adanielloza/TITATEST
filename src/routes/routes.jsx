import React from 'react';
import { Routes, Route } from 'react-router-dom';

import PrincipalRoute  from './PrincipalRoute';
import ProtectedRoutes from './ProtectedRoutes';

import AuthRoute       from '../features/auth/routes/AuthRoute';
import { Login }       from '../features/auth';

import AdminRoute      from '../features/dashboard/admin/routes/AdminRoute';
import { UserDashboard as Dashboard } from '../features/dashboard/user/components';
import { AdminDashboard }             from '../features/dashboard/admin/components';

import Home            from '../features/home';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Auth flow (guard + nested login) */}
      <Route path="auth/" element={<AuthRoute />}>
        {/* GET  /auth → LoginContainer */}
        <Route index element={<Login />} />
      </Route>

      {/* Protected pages */}
      <Route element={<ProtectedRoutes />}>
        <Route path="dashboard">
          <Route index element={<Dashboard />} />
          <Route element={<AdminRoute />}>
            <Route path="admin" element={<AdminDashboard />} />
          </Route>
        </Route>
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Home />} />
    </Routes>
  )
}