// src/features/auth/components/AuthRoute.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Login } from './Login';  // ← named import

export default function AuthRoute() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
    </Routes>
  );
}
