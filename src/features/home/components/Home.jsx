// src/features/home/components/Home.jsx
import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* --------- Hero header nav --------- */}
      <header className="shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* left side links */}
            <nav className="flex space-x-8">
              <a href="#features"     className="text-gray-700 hover:text-gray-900">Features</a>
              <a href="#testimonials" className="text-gray-700 hover:text-gray-900">Testimonials</a>
              <a href="#pricing"      className="text-gray-700 hover:text-gray-900">Pricing</a>
            </nav>
            {/* right side “Sign in” */}
            <div>
              <Link
                to="/auth"
                className="text-gray-700 hover:text-gray-900 font-medium"
              >
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* --------- Hero copy --------- */}
      <main className="flex flex-col items-center text-center px-4 sm:px-6 lg:px-8 py-20">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900">
          Accounting{' '}
          <span className="relative inline-block">
            <span className="text-blue-600">made simple</span>
            <span className="absolute left-0 bottom-0 w-full h-1 bg-blue-200"></span>
          </span>{' '}
          for small businesses.
        </h1>
        <p className="mt-4 max-w-md text-lg text-gray-500">
          Most bookkeeping software is accurate, but hard to use. We make the opposite trade-off, and hope you don’t get audited.
        </p>
        <div className="mt-8">
          <a
            href="#watch-video"
            className="inline-flex items-center rounded-md border border-gray-300 px-6 py-3 text-gray-700 hover:bg-gray-50"
          >
            <svg className="h-5 w-5 mr-2 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M6 4l12 6-12 6V4z" />
            </svg>
            Watch video
          </a>
        </div>
      </main>
    </div>
  )
}
