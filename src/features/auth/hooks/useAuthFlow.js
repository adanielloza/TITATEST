import { useState, useEffect } from "react";
import { login, confirmOTP, resendOTP } from "../services/authService.js";

export function useAuthFlow(onSuccess) {
  const [stage, setStage]     = useState("login");   // "login" | "otp"
  const [data, setData]       = useState({ email: "", password: "" });
  const [otp, setOtp]         = useState("");
  const [error, setError]     = useState("");
  const [timeLeft, setTimeLeft] = useState(0);

  // Countdown timer for OTP stage
  useEffect(() => {
    if (stage !== "otp") return;
    if (timeLeft === 0) setTimeLeft(300); // start 5m
    const timerId = setTimeout(() => {
      setTimeLeft((t) => Math.max(t - 1, 0));
    }, 1000);
    return () => clearTimeout(timerId);
  }, [stage, timeLeft]);

  // Handler: email/password submit
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const result = await login(data.email, data.password);
    if (result.error) {
      setError(result.errorMessage);
    } else if (result.requires2FA) {
      setStage("otp");
    } else {
      onSuccess();
    }
  };

  // Handler: OTP submit
  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const result = await confirmOTP(otp);
    if (result.error) {
      setError(result.errorMessage);
    } else {
      onSuccess();
    }
  };

  // Handler: resend OTP
  const handleResend = async () => {
    try {
      await resendOTP();
      setTimeLeft(300); // reset timer
      setError("");
    } catch (err) {
      setError(err.message);
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
