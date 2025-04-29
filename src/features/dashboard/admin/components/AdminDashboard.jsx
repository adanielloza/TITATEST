// src/features/dashboard/components/AdminDashboard.jsx

import React from 'react';
import SignOut from '../../../auth/components/SignOut';

export default function AdminDashboard() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Admin Dashboard</h1>
      <div style={{ marginTop: '1rem' }}>
        {/* Your custom SignOut button: */}
        <SignOut />
      </div>
      {/* …the rest of your admin UI… */}
    </div>
  );
}