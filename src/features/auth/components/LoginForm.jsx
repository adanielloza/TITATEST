import React from "react";
import { Link } from "react-router-dom";
import Button from "../../../components/Button"; // Adjust path if needed

export default function LoginForm({ data, errorMsg, onChange, onSubmit }) {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {errorMsg && (
        <div className="text-red-600 text-sm">{errorMsg}</div>
      )}

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
          Email address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={data.email}
          onChange={onChange}
          placeholder="you@example.com"
          className="w-full rounded-lg border border-gray-200 px-4 py-3 
                     focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
      </div>

      {/* Password */}
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          value={data.password}
          onChange={onChange}
          placeholder="••••••••"
          className="w-full rounded-lg border border-gray-200 px-4 py-3 
                     focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
      </div>

      {/* Forgot link */}
      <div className="text-right">
        <Link to="/forgot-password" className="text-sm text-blue-600 hover:underline">
          Forgot password?
        </Link>
      </div>

      {/* Universal Button */}
      <Button
        type="submit"
        variant="primary"
        label="Sign in"
        className="w-[320px] mx-auto block py-3 text-lg"
      />
    </form>
  );
}
