import { signInWithEmailAndPassword, signOut, getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../services/firebase";

export async function login(auth, email, password) {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    const uid = user.uid;
    const userRef = doc(db, "users", uid);
    const userDoc = await getDoc(userRef);
    if (!userDoc.exists()) {
      return { error: true, errorMessage: "No such document!" };
    }

    const { name, role } = userDoc.data();
    return { user, name, role };
  } catch (err) {
    return { error: true, errorCode: err.code, errorMessage: err.message };
  }
}

export async function logout() {
  const auth = getAuth();
  try {
    await signOut(auth);
    localStorage.removeItem("role");
  } catch (err) {
    console.error("Logout error:", err);
    throw err;
  }
}
