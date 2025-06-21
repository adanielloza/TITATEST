import React from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import OTPForm from "../components/OTPForm";
import { useLoader } from "../../../contexts/LoaderContext";
import { useAuthFlow } from "../hooks/useAuthFlow";
import logo from "../../../assets/favicon.ico";

export default function LoginPage() {
  const navigate = useNavigate();
  const { showLoader, hideLoader } = useLoader();

  const {
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
  } = useAuthFlow(() => {
    hideLoader();
    navigate("/dashboard");
  });

  const onSubmit = stage === "login" ? handleLoginSubmit : handleOtpSubmit;

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="absolute top-4 left-4">
        ← <a href="/">Volver al inicio</a>
      </div>

      <div className="bg-white p-10 rounded-2xl shadow-xl max-w-lg w-full">
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Logo" className="h-20 w-auto" />
        </div>

        <h2 className="text-4xl font-bold text-[#3498db] text-center mb-8">
          Bienvenido de nuevo
        </h2>

        {stage === "login" ? (
          <LoginForm
            data={data}
            errorMsg={error}
            onChange={(e) =>
              setData({ ...data, [e.target.name]: e.target.value })
            }
            onSubmit={async (e) => {
              showLoader();
              await onSubmit(e);
              hideLoader();
            }}
          />
        ) : (
          <OTPForm
            otp={otp}
            errorMsg={error}
            timeLeft={timeLeft}
            onChange={(e) => setOtp(e.target.value)}
            onSubmit={async (e) => {
              showLoader();
              await onSubmit(e);
              hideLoader();
            }}
            onResend={handleResend}
          />
        )}
      </div>
    </div>
  );
}
