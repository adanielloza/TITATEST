import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "./services/authService";
import LoginForm from "./components/LoginForm";

export default function LoginPage() {
  const [data, setData] = useState({ email: "", password: "" });
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    const result = await login(data.email, data.password);
    if (result.error) {
      setErrorMsg(result.errorMessage || "Login failed");
      return;
    }

    const { user } = result;
    const dashboardPath =
      user.role === "admin" ? "/dashboard/admin" : "/dashboard";
    navigate(dashboardPath);
  };

  return (
    <div className="flex min-h-screen">
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24 relative">
        <div className="absolute top-4 left-4">
          <Link to="/" className="text-gray-700 hover:underline">
            ← Back to Home
          </Link>
        </div>
        <LoginForm
          data={data}
          errorMsg={errorMsg}
          onChange={(e) =>
            setData({ ...data, [e.target.name]: e.target.value })
          }
          onSubmit={handleSubmit}
        />
      </div>
      <div className="relative hidden w-0 flex-1 lg:block">
        <img
          alt="Background"
          src="https://images.unsplash.com/photo-1496917756835-20cb06e75b4e"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    </div>
  );
}
