// src/components/NavBar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function NavBar() {
  return (
    <nav className="p-4 bg-gray-100 space-x-4">
      <Link to="/"      className="text-blue-600 hover:underline">Home</Link>
      <Link to="/about" className="text-blue-600 hover:underline">About</Link>
      <Link to="/auth"  className="text-blue-600 hover:underline">Login</Link>
    </nav>
  );
}
