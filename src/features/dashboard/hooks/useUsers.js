import { useEffect, useState } from "react";
import {
  fetchUsersFromFirestore,
  deleteUserByUid,
  saveUserToFirestore,
} from "../services/userService";
import { useLoader } from "../../../contexts/LoaderContext";
import useToast from "../../../hooks/useToast";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../services/firebase";

const useUsers = ({ skipInitialLoad = false } = {}) => {
  const [users, setUsers] = useState([]);
  const [userToDelete, setUserToDelete] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { showLoader, hideLoader } = useLoader();
  const { notify } = useToast();

  const fetchUsers = async () => {
    showLoader();
    try {
      const usersList = await fetchUsersFromFirestore();
      setUsers(usersList);
    } catch (error) {
      console.error("Error al cargar usuarios:", error);
      notify("error", "No se pudo cargar la lista de usuarios");
    } finally {
      hideLoader();
    }
  };

  const confirmDelete = async () => {
    showLoader();
    try {
      await deleteUserByUid(userToDelete.uid);
      notify("success", "Usuario eliminado correctamente");
      setIsModalOpen(false);
      setUserToDelete(null);
      await fetchUsers();
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
      notify("error", "No se pudo eliminar el usuario");
    } finally {
      hideLoader();
    }
  };

  const saveUser = async ({ name, lastName, email, password }) => {
    showLoader();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const uid = userCredential.user.uid;

      await saveUserToFirestore({ uid, name, lastName, email });

      notify("success", "Usuario creado correctamente");
      await fetchUsers();
    } catch (error) {
      console.error("Error al crear usuario:", error);
      notify("error", "No se pudo registrar el usuario");
    } finally {
      hideLoader();
    }
  };

  useEffect(() => {
    if (!skipInitialLoad) {
      fetchUsers();
    }
  }, [skipInitialLoad]);

  return {
    users,
    userToDelete,
    setUserToDelete,
    isModalOpen,
    setIsModalOpen,
    confirmDelete,
    fetchUsers,
    saveUser,
  };
};

export default useUsers;
