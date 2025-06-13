import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../services/firebase";
import { deleteUserByUid } from "../services/userService";
import { useLoader } from "../../../contexts/LoaderContext";
import useToast from "../../../hooks/useToast";

const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [userToDelete, setUserToDelete] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { showLoader, hideLoader } = useLoader();
  const { notify } = useToast();

  const fetchUsers = async () => {
    showLoader();
    try {
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("role", "==", "user"));
      const snapshot = await getDocs(q);

      const usersList = snapshot.docs.map((doc, index) => ({
        id: index + 1,
        uid: doc.id,
        ...doc.data(),
      }));

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

  useEffect(() => {
    fetchUsers();
  }, []);

  return {
    users,
    userToDelete,
    setUserToDelete,
    isModalOpen,
    setIsModalOpen,
    confirmDelete,
    fetchUsers,
  };
};

export default useUsers;
