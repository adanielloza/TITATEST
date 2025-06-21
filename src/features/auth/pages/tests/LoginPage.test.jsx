import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, vi, beforeEach, expect } from "vitest";
import LoginPage from "../LoginPage";

const mockNavigate = vi.fn();
vi.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

const mockShow = vi.fn();
const mockHide = vi.fn();
vi.mock("../../../../contexts/LoaderContext.jsx", () => ({
  useLoader: () => ({
    showLoader: mockShow,
    hideLoader: mockHide,
  }),
}));

let stage = "login";
let data = { email: "", password: "" };
let otp = "";
let error = "";
let timeLeft = 0;
const mockSetData = vi.fn();
const mockSetOtp = vi.fn();
const mockHandleLogin = vi.fn(async (e) => e.preventDefault());
const mockHandleOtp = vi.fn(async (e) => e.preventDefault());
const mockHandleResend = vi.fn();

vi.mock("../../hooks/useAuthFlow.js", () => ({
  useAuthFlow: () => ({
    stage,
    data,
    otp,
    error,
    timeLeft,
    setData: mockSetData,
    setOtp: mockSetOtp,
    handleLoginSubmit: mockHandleLogin,
    handleOtpSubmit: mockHandleOtp,
    handleResend: mockHandleResend,
  }),
}));

describe("LoginPage", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    mockNavigate.mockClear();
  });

  it("renders login form, handles input and submission", async () => {
    stage = "login";
    data = { email: "", password: "" };
    render(<LoginPage />);

    const emailInput = screen.getByLabelText(/correo electrónico/i);
    const passwordInput = screen.getByLabelText(/contraseña/i);
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();

    fireEvent.change(emailInput, {
      target: { name: "email", value: "a@b.com" },
    });
    expect(mockSetData).toHaveBeenCalledWith({
      ...data,
      email: "a@b.com",
    });

    const submitBtn = screen.getByRole("button", { name: /iniciar sesión/i });
    fireEvent.click(submitBtn);
    await waitFor(() => {
      expect(mockShow).toHaveBeenCalled();
      expect(mockHandleLogin).toHaveBeenCalled();
      expect(mockHide).toHaveBeenCalled();
    });
  });

  it("renders OTP form when stage === otp and handles actions", async () => {
    stage = "otp";
    otp = "123456";
    error = "error message";
    timeLeft = 30;
    render(<LoginPage />);

    const otpInput = screen.getByLabelText(/código de verificación/i);
    expect(otpInput).toBeInTheDocument();
    expect(screen.getByText("error message")).toBeInTheDocument();
    expect(screen.getByText(/reenviar código en/i)).toBeInTheDocument();

    fireEvent.change(otpInput, {
      target: { value: "654321" },
    });
    expect(mockSetOtp).toHaveBeenCalledWith("654321");

    const confirmBtn = screen.getByRole("button", {
      name: /verificar código/i,
    });
    fireEvent.click(confirmBtn);
    await waitFor(() => {
      expect(mockShow).toHaveBeenCalled();
      expect(mockHandleOtp).toHaveBeenCalled();
      expect(mockHide).toHaveBeenCalled();
    });

    stage = "otp";
    timeLeft = 0;
    render(<LoginPage />);
    const resendBtn = screen.getByRole("button", { name: /reenviar código/i });
    fireEvent.click(resendBtn);
    expect(mockHandleResend).toHaveBeenCalled();
  });

  it("renders logo and back link", () => {
    render(<LoginPage />);
    expect(screen.getByRole("img", { name: /logo/i })).toBeInTheDocument();
    expect(screen.getByText(/volver al inicio/i)).toBeInTheDocument();
  });
});
