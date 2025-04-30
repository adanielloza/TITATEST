// src/features/dashboard/admin/components/AdminDashboard.jsx
import React from 'react'
import SignOut from '../../../auth/components/SignOut'

export default function AdminDashboard() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <div className="mt-4">
        <SignOut />
      </div>
      {/* …the rest of your admin UI… */}
    </div>
  )
}

