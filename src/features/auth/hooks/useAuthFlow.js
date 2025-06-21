import { useState, useEffect } from "react";
import { login, confirmOTP, resendOTP } from "../services/authService.js";

function getFriendlyErrorMessage(error) {
  const map = {
    "auth/invalid-credential": "Correo o contraseña incorrectos.",
    "auth/user-not-found": "No se encontró una cuenta con ese correo.",
    "auth/wrong-password": "Contraseña incorrecta.",
    "auth/too-many-requests":
      "Demasiados intentos. Intenta de nuevo más tarde.",
  };

  const errorCode = error?.code || error?.message?.match(/auth\/[\w-]+/)?.[0];
  return map[errorCode] || "Ocurrió un error inesperado. Intenta de nuevo.";
}

export function useAuthFlow(onSuccess) {
  const [stage, setStage] = useState("login");
  const [data, setData] = useState({ email: "", password: "" });
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    if (stage !== "otp") return;
    if (timeLeft === 0) setTimeLeft(300);
    const timerId = setTimeout(() => {
      setTimeLeft((t) => Math.max(t - 1, 0));
    }, 1000);
    return () => clearTimeout(timerId);
  }, [stage, timeLeft]);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const result = await login(data.email, data.password);
    if (result.error) {
      setError(getFriendlyErrorMessage(result.error));
    } else if (result.requires2FA) {
      setStage("otp");
    } else {
      onSuccess();
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const result = await confirmOTP(otp);
    if (result.error) {
      setError(getFriendlyErrorMessage(result.error));
    } else {
      onSuccess();
    }
  };

  const handleResend = async () => {
    try {
      await resendOTP();
      setTimeLeft(300);
      setError("");
    } catch (err) {
      setError(getFriendlyErrorMessage(err));
    }
  };

  return {
    stage,
    data,
    setData,
    otp,
    setOtp,
    error,
    timeLeft,
    handleLoginSubmit,
    handleOtpSubmit,
    handleResend,
  };
}
