// features/auth/services/authService.js
import { signInWithEmailAndPassword, signOut, getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../services/firebase";

const auth = getAuth();

export async function login(email, password) {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    const uid = user.uid;
    const userRef = doc(db, "users", uid);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      return { error: true, errorMessage: "Usuario no encontrado." };
    }

    const { name, role } = userDoc.data();
    if (!["admin", "user"].includes(role)) {
      return { error: true, errorMessage: "Rol inválido." };
    }

    return { user, name, role };
  } catch (err) {
    return { error: true, errorMessage: err.message };
  }
}

export async function logout() {
  try {
    await signOut(auth);
    localStorage.removeItem("role");
  } catch (err) {
    console.error("Logout error:", err);
    throw err;
  }
}

export { auth };
