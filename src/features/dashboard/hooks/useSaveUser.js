import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../../services/firebase";
import useToast from "../../../hooks/useToast";

const useSaveUser = () => {
  const { notify } = useToast();

  const saveUser = async ({ name, lastName, email, password }) => {
    try {
      // 1. Crear usuario en Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const uid = userCredential.user.uid;

      // 2. Crear documento en Firestore con el mismo UID
      await setDoc(doc(db, "users", uid), {
        name,
        lastName,
        email: email.toLowerCase(),
        role: "user",
      });

      notify("success", "Usuario creado correctamente");
    } catch (error) {
      console.error("Error al crear usuario:", error);
      notify("error", "No se pudo registrar el usuario");
    }
  };

  return { saveUser };
};

export default useSaveUser;
