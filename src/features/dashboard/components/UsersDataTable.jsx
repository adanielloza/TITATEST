import { useState } from "react";
import DataTable from "../../../components/DataTable/DataTable";
import Modal from "../../../components/Modal";
import AddUser from "./AddUser";
import EditUser from "./EditUser";
import useUsers from "../hooks/useUsers";

const columns = [
  { key: "id", label: "ID" },
  { key: "name", label: "Nombre" },
  { key: "lastName", label: "Apellido" },
  { key: "email", label: "Correo Electrónico" },
];

const UsersDataTable = () => {
  const [userToEdit, setUserToEdit] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const {
    users,
    userToDelete,
    setUserToDelete,
    isModalOpen,
    setIsModalOpen,
    confirmDelete,
    fetchUsers,
  } = useUsers();

  function handleDeleteClick(row, setUserToDelete, setIsModalOpen) {
    setUserToDelete(row);
    setIsModalOpen(true);
  }

  function handleEditClick(row, setUserToEdit, setIsEditOpen) {
    setUserToEdit(row);
    setIsEditOpen(true);
  }

  return (
    <div>
      <AddUser onUserAdded={fetchUsers} />
      <EditUser
        user={userToEdit}
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        onUpdated={fetchUsers}
      />
      <br />
      <DataTable
        columns={columns}
        data={users}
        onEdit={(row) => handleEditClick(row, setUserToEdit, setIsEditOpen)}
        onDelete={(row) =>
          handleDeleteClick(row, setUserToDelete, setIsModalOpen)
        }
      />
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="¿Eliminar usuario?"
        subtitle="Esta acción no se puede deshacer."
        onCancel={() => setIsModalOpen(false)}
        onConfirm={confirmDelete}
        cancelLabel="Cancelar"
        confirmLabel="Eliminar"
        cancelVariant="secondary"
        confirmVariant="delete"
      >
        <p>
          ¿Estás seguro que deseas eliminar al usuario{" "}
          <strong>
            {userToDelete?.name} {userToDelete?.lastName}
          </strong>
          ?
        </p>
      </Modal>
    </div>
  );
};

export default UsersDataTable;
