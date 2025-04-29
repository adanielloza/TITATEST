// src/features/auth/components/SignOut.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logout }      from '../services/authService';

export default function SignOut() {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await logout();
      navigate('/');    // back to home page
    } catch (err) {
      console.error('Sign-out error:', err);
    }
  };

  return (
    <button
      onClick={handleSignOut}
      style={{
        padding: '0.5rem 1rem',
        background: '#e53e3e',
        color: 'white',
        border: 'none',
        borderRadius: 4,
        cursor: 'pointer'
      }}
    >
      Sign Out
    </button>
  );
}
