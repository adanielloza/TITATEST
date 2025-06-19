// src/features/auth/components/OTPForm.jsx

import React from "react";
import Button from "../../../components/Button";

export default function OTPForm({
  otp,
  errorMsg,
  timeLeft,
  onChange,
  onSubmit,
  onResend,
}) {
  // Format mm:ss
  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const seconds = String(timeLeft % 60).padStart(2, "0");

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {errorMsg && <div className="text-red-600 text-sm">{errorMsg}</div>}

      <div>
        <label
          htmlFor="otp"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Código de Verificación
        </label>
        <input
          id="otp"
          type="text"
          value={otp}
          onChange={onChange}
          placeholder="Ingresa el código de 6 dígitos"
          className="w-full rounded-lg border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
      </div>

      <Button
        type="submit"
        variant="primary"
        label="Verificar Código"
        className="w-[320px] mx-auto block py-3 text-lg"
      />

      <div className="text-center mt-4">
        {timeLeft > 0 ? (
          <span className="text-gray-600 text-sm">
            Reenviar código en {minutes}:{seconds}
          </span>
        ) : (
          <button
            type="button"
            onClick={onResend}
            className="text-blue-600 hover:underline text-sm"
          >
            Reenviar código
          </button>
        )}
      </div>
    </form>
  );
}
