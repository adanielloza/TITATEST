import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <nav className="flex space-x-8">
            <button className="text-gray-700 hover:text-gray-900">
              Features
            </button>
            <button className="text-gray-700 hover:text-gray-900">
              Testimonials
            </button>
            <button className="text-gray-700 hover:text-gray-900">
              Pricing
            </button>
          </nav>
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
  );
}
