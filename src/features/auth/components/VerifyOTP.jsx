import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { confirmOTP } from "../services/authService";

export default function VerifyOTP() {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleVerify = async () => {
    const result = await confirmOTP(code);
    if (result.error) {
      setError(result.errorMessage);
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="p-10 rounded-2xl shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-center mb-4 text-blue-600">
          Verificación 2FA
        </h2>
        <p className="text-center mb-6 text-gray-600">
          Ingresa el código enviado a tu correo electrónico.
        </p>
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Código de 6 dígitos"
          className="w-full border border-gray-300 rounded-md px-4 py-3 mb-4"
        />
        <button
          onClick={handleVerify}
          className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600"
        >
          Verificar Código
        </button>
        {error && <p className="text-red-500 text-sm mt-2 text-center">{error}</p>}
      </div>
    </div>
  );
}
