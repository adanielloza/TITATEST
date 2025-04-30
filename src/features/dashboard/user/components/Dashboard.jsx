// src/features/dashboard/user/components/Dashboard.jsx
import React from 'react'
import DashboardLayout from '../../shared/components/DashboardLayout';

export default function UserDashboard() {
  return (
    <DashboardLayout>
      <h2 className="text-xl font-semibold">Welcome, user!</h2>
      {/* …user widgets… */}
    </DashboardLayout>
  )
}

