// src/features/dashboard/shared/components/DashboardLayout.jsx
import React from 'react'
import { Outlet } from 'react-router-dom'
import { HomeIcon, UsersIcon } from '@heroicons/react/24/outline'
import SignOut from '../../../auth/components/SignOut'

export default function DashboardLayout() {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-72 border-r bg-white p-6 flex flex-col">
        <nav className="space-y-4">
          <a
            href="#"
            className="flex items-center gap-3 text-gray-700 hover:text-indigo-600"
          >
            <HomeIcon className="h-5 w-5" />
            Dashboard
          </a>
          <a
            href="#"
            className="flex items-center gap-3 text-gray-700 hover:text-indigo-600"
          >
            <UsersIcon className="h-5 w-5" />
            Users
          </a>
        </nav>

        {/* Sign out button at bottom */}
        <div className="mt-auto pt-6 border-t">
          <SignOut />
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto p-6">
        <Outlet />
      </main>
    </div>
  )
}
