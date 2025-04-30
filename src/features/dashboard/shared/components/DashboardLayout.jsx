// src/features/dashboard/shared/components/DashboardLayout.jsx
'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  TransitionChild,
} from '@headlessui/react'
import {
  Bars3Icon,
  BellIcon,
  CalendarIcon,
  ChartPieIcon,
  Cog6ToothIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'Users',     href: '/dashboard/admin/users', icon: UsersIcon },
  // …add or adjust links per role…
]
const teams = [
  { id: 1, name: 'Team A', href: '#', initial: 'A' },
  { id: 2, name: 'Team B', href: '#', initial: 'B' },
]
const userNavigation = [
  { name: 'Your profile', href: '#' },
  { name: 'Sign out',      href: '#' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <>
      {/* Mobile sidebar */}
      <Dialog open={sidebarOpen} onClose={setSidebarOpen} className="relative z-50 lg:hidden">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-900/80 transition-opacity"
        />
        <div className="fixed inset-0 flex">
          <DialogPanel className="relative mr-16 flex w-full max-w-xs transform bg-white pb-4">
            <TransitionChild>
              <button
                type="button"
                onClick={() => setSidebarOpen(false)}
                className="absolute top-4 left-full p-2"
              >
                <XMarkIcon className="h-6 w-6 text-gray-700" aria-hidden="true" />
              </button>
            </TransitionChild>

            <div className="flex h-16 items-center px-6">
              <img
                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                alt="Logo"
                className="h-8 w-auto"
              />
            </div>
            <nav className="mt-5 px-2">
              <ul className="space-y-1">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className={classNames(
                        item.current ? 'bg-gray-50 text-indigo-600' : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600',
                        'flex items-center gap-x-3 rounded-md p-2 text-sm font-semibold'
                      )}
                    >
                      <item.icon
                        className="h-6 w-6 flex-shrink-0 text-gray-400"
                        aria-hidden="true"
                      />
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </DialogPanel>
        </div>
      </Dialog>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col border-r">
        <div className="flex h-16 items-center px-6">
          <img
            src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
            alt="Logo"
            className="h-8 w-auto"
          />
        </div>
        <nav className="flex-1 overflow-y-auto px-2 py-4">
          <ul className="space-y-1">
            {navigation.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  className={classNames(
                    item.current ? 'bg-gray-50 text-indigo-600' : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600',
                    'flex items-center gap-x-3 rounded-md p-2 text-sm font-semibold'
                  )}
                >
                  <item.icon
                    className="h-6 w-6 flex-shrink-0 text-gray-400"
                    aria-hidden="true"
                  />
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        <div className="sticky top-0 flex h-16 items-center justify-between border-b bg-white px-4 lg:px-8">
          <button
            className="lg:hidden p-2 text-gray-700"
            onClick={() => setSidebarOpen(true)}
          >
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            <span className="sr-only">Open sidebar</span>
          </button>

          <form className="flex-1">
            <label htmlFor="search" className="sr-only">Search</label>
            <div className="relative w-full">
              <MagnifyingGlassIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                id="search"
                name="search"
                className="block w-full rounded-md bg-gray-100 py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:bg-white focus:outline-none"
                placeholder="Search"
                type="search"
              />
            </div>
          </form>

          <div className="flex items-center gap-x-4">
            <button type="button" className="p-2 text-gray-400 hover:text-gray-500">
              <BellIcon className="h-6 w-6" aria-hidden="true" />
            </button>

            <Menu as="div" className="relative">
              <MenuButton className="flex items-center gap-x-2 p-1">
                <img
                  className="h-8 w-8 rounded-full"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
                  alt="User avatar"
                />
                <ChevronDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </MenuButton>
              <MenuItems className="absolute right-0 mt-2 w-48 origin-top-right rounded bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                {userNavigation.map((item) => (
                  <MenuItem key={item.name}>
                    {({ active }) => (
                      <a
                        href={item.href}
                        className={classNames(
                          active ? 'bg-gray-100' : '',
                          'block px-4 py-2 text-sm text-gray-700'
                        )}
                      >
                        {item.name}
                      </a>
                    )}
                  </MenuItem>
                ))}
              </MenuItems>
            </Menu>
          </div>
        </div>

        <main className="py-6 px-4 lg:px-8">
          {children}
        </main>
      </div>
    </>
  )
}
