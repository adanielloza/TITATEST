import React from "react";

export default function LoginForm({ data, errorMsg, onChange, onSubmit }) {
  return (
    <form
      onSubmit={onSubmit}
      className="mx-auto w-full max-w-sm lg:w-96 space-y-6"
    >
      {errorMsg && <div className="text-sm text-red-600">{errorMsg}</div>}

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-900"
        >
          Email address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          value={data.email}
          onChange={onChange}
          placeholder="you@example.com"
          className="mt-2 block w-full rounded-md border-gray-300 px-3 py-1.5 focus:outline-indigo-600 sm:text-sm"
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-900"
        >
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          value={data.password}
          onChange={onChange}
          placeholder="••••••••"
          className="mt-2 block w-full rounded-md border-gray-300 px-3 py-1.5 focus:outline-indigo-600 sm:text-sm"
        />
      </div>

      <div className="text-sm text-right">
        <button
          type="button"
          className="font-semibold text-indigo-600 hover:text-indigo-500"
          onClick={() => alert("Implementar recuperación de contraseña")}
        >
          Forgot password?
        </button>
      </div>

      <button
        type="submit"
        className="w-full rounded-md bg-indigo-600 px-3 py-1.5 text-white hover:bg-indigo-500 focus:outline-indigo-600 sm:text-sm font-semibold"
      >
        Sign in
      </button>
    </form>
  );
}
