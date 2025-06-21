import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { useAuthFlow } from "../../hooks/useAuthFlow";

const mockLogin = vi.fn();
const mockConfirmOTP = vi.fn();
const mockResendOTP = vi.fn();

vi.mock("../../services/authService", () => ({
  login: (...args) => mockLogin(...args),
  confirmOTP: (...args) => mockConfirmOTP(...args),
  resendOTP: (...args) => mockResendOTP(...args),
}));

describe("useAuthFlow", () => {
  let onSuccess;

  beforeEach(() => {
    vi.useFakeTimers();
    vi.resetAllMocks();
    onSuccess = vi.fn();
  });

  it("starts in login stage with initial state", () => {
    const { result } = renderHook(() => useAuthFlow(onSuccess));
    expect(result.current.stage).toBe("login");
    expect(result.current.data).toEqual({ email: "", password: "" });
    expect(result.current.otp).toBe("");
    expect(result.current.error).toBe("");
    expect(result.current.timeLeft).toBe(0);
  });

  it("transitions to otp stage on successful login requiring 2FA", async () => {
    mockLogin.mockResolvedValue({ requires2FA: true });
    const { result } = renderHook(() => useAuthFlow(onSuccess));
    act(() => result.current.setData({ email: "a@b.com", password: "123456" }));
    await act(async () => {
      await result.current.handleLoginSubmit({ preventDefault() {} });
    });
    expect(result.current.stage).toBe("otp");
    expect(onSuccess).not.toHaveBeenCalled();
  });

  it("calls onSuccess on successful login without 2FA", async () => {
    mockLogin.mockResolvedValue({});
    const { result } = renderHook(() => useAuthFlow(onSuccess));
    await act(async () => {
      await result.current.handleLoginSubmit({ preventDefault() {} });
    });
    expect(onSuccess).toHaveBeenCalled();
  });

  it("sets error on failed login", async () => {
    mockLogin.mockResolvedValue({ error: { code: "auth/user-not-found" } });
    const { result } = renderHook(() => useAuthFlow(onSuccess));
    await act(async () => {
      await result.current.handleLoginSubmit({ preventDefault() {} });
    });
    expect(result.current.error).toBe(
      "No se encontró una cuenta con ese correo."
    );
  });

  it("calls onSuccess on valid OTP", async () => {
    mockConfirmOTP.mockResolvedValue({});
    const { result } = renderHook(() => useAuthFlow(onSuccess));
    act(() => result.current.setOtp("123456"));
    await act(async () => {
      await result.current.handleOtpSubmit({ preventDefault() {} });
    });
    expect(onSuccess).toHaveBeenCalled();
  });

  it("sets error on invalid OTP", async () => {
    mockConfirmOTP.mockResolvedValue({
      error: { code: "auth/invalid-credential" },
    });
    const { result } = renderHook(() => useAuthFlow(onSuccess));
    await act(async () => {
      await result.current.handleOtpSubmit({ preventDefault() {} });
    });
    expect(result.current.error).toBe("Correo o contraseña incorrectos.");
  });

  it("resets timer and clears error on resendOTP", async () => {
    mockResendOTP.mockResolvedValue();
    const { result } = renderHook(() => useAuthFlow(onSuccess));
    await act(async () => {
      await result.current.handleResend();
    });
    expect(result.current.timeLeft).toBe(300);
    expect(result.current.error).toBe("");
  });

  it("sets error on resendOTP failure", async () => {
    mockResendOTP.mockRejectedValue({ code: "auth/too-many-requests" });
    const { result } = renderHook(() => useAuthFlow(onSuccess));
    await act(async () => {
      await result.current.handleResend();
    });
    expect(result.current.error).toBe(
      "Demasiados intentos. Intenta de nuevo más tarde."
    );
  });

  it("starts countdown on otp stage", () => {
    const { result } = renderHook(() => useAuthFlow(onSuccess));
    act(() => result.current.setOtp("123456"));
    act(() => result.current.setData({ email: "a@b.com", password: "123456" }));
    act(() => {
      result.current["stage"] = "otp";
    });
    vi.advanceTimersByTime(1000);
    expect(result.current.timeLeft).toBeLessThan(300);
  });

  it("decrements timeLeft every second in otp stage", () => {
    const { result, rerender } = renderHook(() => useAuthFlow(onSuccess));

    act(() => {
      result.current.setOtp("123456");
      result.current.setData({ email: "a@b.com", password: "123456" });
    });

    act(() => {
      result.current.handleResend();
    });

    result.current["stage"] = "otp";
    rerender();

    act(() => {
      vi.advanceTimersByTime(5000);
    });

    expect(result.current.timeLeft).toBeLessThan(300);
  });
});
