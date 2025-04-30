// src/features/dashboard/admin/components/AdminDashboard.jsx

import React from 'react';
import DashboardLayout from '../../shared/components/DashboardLayout';
import SignOut from '../../../auth/components/SignOut';

export default function AdminDashboard() {
  return (
    <DashboardLayout>
      <div className="p-8">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <div className="mt-4">
          {/* Your custom SignOut button: */}
          <SignOut />
        </div>
        {/* …the rest of your admin UI… */}
      </div>
    </DashboardLayout>
  );
}
