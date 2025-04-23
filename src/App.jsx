// src/App.jsx
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import NavBar     from './components/NavBar';
import AppRoutes  from './routes/routes';

export default function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <AppRoutes />
    </BrowserRouter>
  );
}
