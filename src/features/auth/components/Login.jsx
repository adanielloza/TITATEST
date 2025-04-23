// src/features/auth/components/Login.jsx

import React, { useState } from 'react';
import { auth }            from '../../../services/firebase';
import { login }           from '../services/authService';
import { useNavigate }     from 'react-router-dom';

export function Login() {
  const [data, setData] = useState({ email: '', password: '' });
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

const handleSubmit = async (e) => {
    e.preventDefault();

    // Attempt to sign in
    const result = await login(auth, data.email, data.password);

    // If there was an error, show it and abort
    if (result.error) {
        console.error(result);
        setErrorMsg(result.errorMessage || 'Login failed');
        return;
    }

    // Log the role for debugging
    console.log('User role:', result.role);

    // Success: persist the role for later guards
    localStorage.setItem('role', result.role);

    // Redirect based on role
    if (result.role === 'admin') {
        navigate('/admin');
    } else {
        navigate('/dashboard');
    }
};

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 320, margin: '2rem auto' }}>
      <h2 style={{ marginBottom: '1rem' }}>Login</h2>

      {errorMsg && (
        <div style={{ color: 'red', marginBottom: '1rem' }}>
          {errorMsg}
        </div>
      )}

      <div style={{ marginBottom: '0.75rem' }}>
        <label style={{ display: 'block', marginBottom: '0.25rem' }}>
          Email
        </label>
        <input
          type="email"
          placeholder="you@example.com"
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
          required
          style={{ width: '100%', padding: '0.5rem', boxSizing: 'border-box' }}
        />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block', marginBottom: '0.25rem' }}>
          Password
        </label>
        <input
          type="password"
          placeholder="••••••••"
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
          required
          style={{ width: '100%', padding: '0.5rem', boxSizing: 'border-box' }}
        />
      </div>

      <button
        type="submit"
        style={{
          width: '100%',
          padding: '0.75rem',
          backgroundColor: '#2563eb',
          color: 'white',
          border: 'none',
          cursor: 'pointer'
        }}
      >
        Login
      </button>
    </form>
  );
}
