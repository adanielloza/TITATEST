import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Spline from "@splinetool/react-spline";
import LoginForm from "./components/LoginForm";
import { login } from "./services/authService";
import { useLoader } from "../../contexts/LoaderContext";
import logo from "../../assets/favicon.ico";

export default function LoginPage() {
  const [data, setData] = useState({ email: "", password: "" });
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  const { showLoader, hideLoader } = useLoader();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    showLoader();
    const { error, errorMessage } = await login(data.email, data.password);
    hideLoader();
    if (error) {
      setErrorMsg(errorMessage || "Login failed");
      return;
    }
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex bg-white relative">
      <Link
        to="/"
        className="absolute top-4 left-4 text-gray-600 hover:underline z-10"
      >
        ← Back to Home
      </Link>

      <div className="flex flex-col justify-center flex-1 max-w-md p-10">
        <div className="bg-white p-10 rounded-2xl shadow-xl max-w-lg w-full">
          <div className="flex justify-center mb-6">
            <img src={logo} alt="Company Logo" className="h-20 w-auto" />
          </div>

          <h2 className="text-4xl font-bold text-[#3498db] text-center mb-8">
            Welcome Back
          </h2>

          <LoginForm
            data={data}
            errorMsg={errorMsg}
            onChange={(e) =>
              setData({ ...data, [e.target.name]: e.target.value })
            }
            onSubmit={handleSubmit}
          />
        </div>
      </div>

      <div className="hidden lg:flex flex-1">
        <Spline
          scene="https://prod.spline.design/KDH40ABrCymN1FUD/scene.splinecode"
          className="w-full h-full"
        />
      </div>
    </div>
  );
}
