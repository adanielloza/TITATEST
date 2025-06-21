import { vi, describe, it, expect, beforeEach } from "vitest";
import * as authModule from "../authService.js";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getDoc } from "firebase/firestore";
import { sendOTPEmail } from "../../../dashboard/services/emailService.js";

vi.mock("firebase/auth", () => ({
  signInWithEmailAndPassword: vi.fn(),
  signOut: vi.fn(),
  getAuth: vi.fn(),
}));
vi.mock("firebase/firestore", async () => {
  const actual = await vi.importActual("firebase/firestore");
  return {
    ...actual,
    doc: vi.fn(),
    getDoc: vi.fn(),
    getFirestore: vi.fn(),
  };
});

vi.mock("../../../dashboard/services/emailService.js", () => ({
  sendOTPEmail: vi.fn(),
}));

describe("Auth module", () => {
  const FAKE_UID = "abc123";
  const FAKE_EMAIL = "test@example.com";
  const FAKE_USER = { uid: FAKE_UID, email: FAKE_EMAIL };
  const VALID_DOC_DATA = { role: "user", name: "John", lastName: "Doe" };
  const INVALID_ROLE_DOC = { role: "guest", name: "Jane", lastName: "Doe" };

  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  describe("login", () => {
    it("returns error when signIn fails", async () => {
      const error = new Error("Bad creds");
      signInWithEmailAndPassword.mockRejectedValue(error);

      const res = await authModule.login("a", "b");
      expect(res).toEqual({ error: true, errorMessage: "Bad creds" });
    });

    it("returns error when user doc does not exist", async () => {
      signInWithEmailAndPassword.mockResolvedValue({ user: FAKE_USER });
      getDoc.mockResolvedValue({ exists: () => false });

      const res = await authModule.login(FAKE_EMAIL, "pwd");
      expect(res).toEqual({
        error: true,
        errorMessage: "Usuario no encontrado.",
      });
    });

    it("returns error on invalid role", async () => {
      signInWithEmailAndPassword.mockResolvedValue({ user: FAKE_USER });
      getDoc.mockResolvedValue({
        exists: () => true,
        data: () => INVALID_ROLE_DOC,
      });

      const res = await authModule.login(FAKE_EMAIL, "pwd");
      expect(res).toEqual({ error: true, errorMessage: "Rol inválido." });
    });

    it("sends OTP and sets localStorage for valid login", async () => {
      signInWithEmailAndPassword.mockResolvedValue({ user: FAKE_USER });
      getDoc.mockResolvedValue({
        exists: () => true,
        data: () => VALID_DOC_DATA,
      });

      const res = await authModule.login(FAKE_EMAIL, "pwd");
      expect(res).toEqual({ requires2FA: true });

      expect(sendOTPEmail).toHaveBeenCalledOnce();
      const storedOtp = localStorage.getItem("otp");
      const pending = JSON.parse(localStorage.getItem("pendingUser"));
      expect(storedOtp).toHaveLength(6);
      expect(pending).toEqual({
        uid: FAKE_UID,
        email: FAKE_EMAIL,
        ...VALID_DOC_DATA,
      });
    });
  });

  describe("confirmOTP", () => {
    const OTP = "123456";
    const PENDING = {
      uid: "u",
      email: FAKE_EMAIL,
      name: "A",
      lastName: "B",
      role: "user",
    };

    it("errors if no pending data", async () => {
      const res = await authModule.confirmOTP("anything");
      expect(res).toEqual({
        error: true,
        errorMessage: "No hay código o usuario pendiente.",
      });
    });

    it("errors on wrong code", async () => {
      localStorage.setItem("otp", OTP);
      localStorage.setItem("pendingUser", JSON.stringify(PENDING));

      const res = await authModule.confirmOTP("999999");
      expect(res).toEqual({ error: true, errorMessage: "Código inválido." });
    });

    it("confirms valid code and moves user to storage", async () => {
      localStorage.setItem("otp", OTP);
      localStorage.setItem("pendingUser", JSON.stringify(PENDING));

      const res = await authModule.confirmOTP(OTP);
      expect(res).toEqual({ user: PENDING });
      expect(localStorage.getItem("user")).toEqual(JSON.stringify(PENDING));
      expect(localStorage.getItem("otp")).toBeNull();
      expect(localStorage.getItem("pendingUser")).toBeNull();
    });
  });

  describe("resendOTP", () => {
    const PENDING = {
      uid: "u",
      email: FAKE_EMAIL,
      name: "A",
      lastName: "B",
      role: "user",
    };
    it("throws if no pendingUser", async () => {
      await expect(authModule.resendOTP()).rejects.toThrow(
        "No hay usuario pendiente para reenviar código."
      );
    });
    it("sends new OTP if pendingUser exists", async () => {
      localStorage.setItem("pendingUser", JSON.stringify(PENDING));
      await authModule.resendOTP();

      expect(sendOTPEmail).toHaveBeenCalledOnce();
      expect(localStorage.getItem("otp")).toHaveLength(6);
    });
  });

  describe("logout", () => {
    it("clears storage and signs out", async () => {
      localStorage.setItem("user", "x");
      localStorage.setItem("otp", "y");
      localStorage.setItem("pendingUser", "z");

      await authModule.logout();
      expect(signOut).toHaveBeenCalledOnce();
      expect(localStorage.getItem("user")).toBeNull();
      expect(localStorage.getItem("otp")).toBeNull();
      expect(localStorage.getItem("pendingUser")).toBeNull();
    });
  });
});
