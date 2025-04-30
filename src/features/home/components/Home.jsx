// src/features/home/components/Home.jsx
import React from 'react';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-6">
        {/* Navigation Links */}
        <div className="hidden md:flex space-x-8">
          <a href="#features" className="text-gray-700 hover:text-gray-900">Features</a>
          <a href="#testimonials" className="text-gray-700 hover:text-gray-900">Testimonials</a>
          <a href="#pricing" className="text-gray-700 hover:text-gray-900">Pricing</a>
        </div>
        <div className="flex items-center">
          <a href="/signin" className="text-gray-700 hover:text-gray-900">Sign in</a>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900">
            Accounting{' '}
            <span className="relative inline-block">
              <span className="text-blue-600">made simple</span>
              <span className="absolute left-0 bottom-0 w-full h-1 bg-blue-200"></span>
            </span>
            <br />
            for small businesses.
          </h1>
          <p className="mt-6 text-lg text-gray-500">
            Most bookkeeping software is accurate, but hard to use.
            We make the opposite trade-off, and hope you don’t get audited.
          </p>
          <div className="mt-8">
            <a
              href="#watch-video"
              className="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
            >
              <svg
                className="h-5 w-5 mr-2 text-gray-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M6 4l12 6-12 6V4z" />
              </svg>
              Watch video
            </a>
          </div>
        </div>
      </main>

      {/* Optional: Additional sections can go here */}
    </div>
  );
}
