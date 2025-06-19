// src/features/auth/services/authService.js

import { signInWithEmailAndPassword, signOut, getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../services/firebase";
import { sendOTPEmail } from "../../dashboard/services/emailService.js";

const auth = getAuth();

/**
 * Step 1: Sign in with email/password, then send OTP.
 */
export async function login(email, password) {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    const uid = user.uid;
    const userRef = doc(db, "users", uid);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      return { error: true, errorMessage: "Usuario no encontrado." };
    }

    const { role, name, lastName } = userDoc.data();
    if (!["admin", "user"].includes(role)) {
      return { error: true, errorMessage: "Rol inválido." };
    }

    // Generate and send OTP
    const otp = Math.floor(100000 + Math.random() * 900000);
    await sendOTPEmail(user.email, otp);

    // Store for later confirmation
    localStorage.setItem("otp", otp.toString());
    localStorage.setItem(
      "pendingUser",
      JSON.stringify({ uid, email: user.email, name, lastName, role })
    );

    return { requires2FA: true };
  } catch (err) {
    return { error: true, errorMessage: err.message };
  }
}

/**
 * Step 2: Confirm the OTP entered by the user.
 */
export async function confirmOTP(inputCode) {
  const storedCode = localStorage.getItem("otp");
  const pending = localStorage.getItem("pendingUser");
  if (!storedCode || !pending) {
    return { error: true, errorMessage: "No hay código o usuario pendiente." };
  }

  if (inputCode !== storedCode) {
    return { error: true, errorMessage: "Código inválido." };
  }

  // OTP correct → finalize login
  localStorage.removeItem("otp");
  localStorage.setItem("user", pending);
  localStorage.removeItem("pendingUser");

  return { user: JSON.parse(pending) };
}

/**
 * Step 3: Re-send a fresh OTP to the pending user.
 */
export async function resendOTP() {
  const pending = localStorage.getItem("pendingUser");
  if (!pending) {
    throw new Error("No hay usuario pendiente para reenviar código.");
  }
  const { email } = JSON.parse(pending);

  // Generate new code, send, and overwrite stored OTP
  const otp = Math.floor(100000 + Math.random() * 900000);
  await sendOTPEmail(email, otp);
  localStorage.setItem("otp", otp.toString());
}

/**
 * Optional: log out (clears session).
 */
export async function logout() {
  await signOut(auth);
  localStorage.removeItem("user");
  localStorage.removeItem("otp");
  localStorage.removeItem("pendingUser");
}
