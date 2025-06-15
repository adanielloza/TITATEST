import {
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
  setDoc,
} from "firebase/firestore";
import { db } from "../../../services/firebase";

export const saveUserToFirestore = async ({ uid, name, lastName, email }) => {
  await setDoc(doc(db, "users", uid), {
    name,
    lastName,
    email: email.toLowerCase(),
    role: "user",
  });
};

export const fetchUsersFromFirestore = async () => {
  const usersRef = collection(db, "users");
  const q = query(usersRef, where("role", "==", "user"));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc, index) => ({
    id: index + 1,
    uid: doc.id,
    ...doc.data(),
  }));
};

export const updateUserById = async (uid, updatedData) => {
  const userRef = doc(db, "users", uid);
  await setDoc(userRef, updatedData, { merge: true });
};

export const deleteUserByUid = async (uid) => {
  await deleteDoc(doc(db, "users", uid));
};
