import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import OTPForm from "../OTPForm";

describe("OTPForm", () => {
  const mockChange = vi.fn();
  const mockSubmit = vi.fn((e) => e.preventDefault());
  const mockResend = vi.fn();

  const setup = (props = {}) => {
    render(
      <OTPForm
        otp="123456"
        errorMsg=""
        timeLeft={60}
        onChange={mockChange}
        onSubmit={mockSubmit}
        onResend={mockResend}
        {...props}
      />
    );
  };

  it("renders the OTP input and submit button", () => {
    setup();
    expect(
      screen.getByLabelText(/código de verificación/i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /verificar código/i })
    ).toBeInTheDocument();
  });

  it("calls onChange when input value changes", () => {
    setup();
    fireEvent.change(screen.getByLabelText(/código de verificación/i), {
      target: { value: "654321" },
    });
    expect(mockChange).toHaveBeenCalled();
  });

  it("calls onSubmit when form is submitted", () => {
    setup();
    fireEvent.click(screen.getByRole("button", { name: /verificar código/i }));
    expect(mockSubmit).toHaveBeenCalled();
  });

  it("displays error message when provided", () => {
    setup({ errorMsg: "Código incorrecto" });
    expect(screen.getByText(/código incorrecto/i)).toBeInTheDocument();
  });

  it("displays countdown when timeLeft > 0", () => {
    setup({ timeLeft: 90 });
    expect(screen.getByText(/reenviar código en 01:30/i)).toBeInTheDocument();
  });

  it("shows resend button when timeLeft is 0 and calls onResend", () => {
    setup({ timeLeft: 0 });
    const resendButton = screen.getByRole("button", {
      name: /reenviar código/i,
    });
    expect(resendButton).toBeInTheDocument();
    fireEvent.click(resendButton);
    expect(mockResend).toHaveBeenCalled();
  });
});
