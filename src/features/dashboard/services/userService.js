import { deleteDoc, doc } from "firebase/firestore";
import { db, auth } from "../../../services/firebase";

/**
 * Elimina usuario en Firestore.
 * Para eliminar de Authentication correctamente, se requiere usar Admin SDK desde backend.
 */
export const deleteUserByUid = async (uid) => {
  // 1. Eliminar de Firestore
  await deleteDoc(doc(db, "users", uid));

  // 2. (Opcional) Eliminar desde Firebase Auth solo si es el usuario autenticado
  try {
    const user = auth.currentUser;
    if (user && user.uid === uid) {
      await user.delete();
    } else {
      console.warn(
        "No se puede eliminar el usuario desde cliente si no es el autenticado."
      );
    }
  } catch (error) {
    console.warn(
      "Error eliminando de Firebase Auth (requiere Admin SDK):",
      error.message
    );
  }
};
