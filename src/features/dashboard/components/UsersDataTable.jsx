import DataTable from "../../../components/DataTable/DataTable";
import useUsers from "../hooks/useUsers";
import Modal from "../../../components/Modal";
import { useState } from "react";
import AddUser from "./AddUser";

const columns = [
  { key: "id", label: "ID" },
  { key: "name", label: "Nombre" },
  { key: "lastName", label: "Apellido" },
  { key: "email", label: "Correo Electrónico" },
];

const UsersDataTable = () => {
  const {
    users,
    userToDelete,
    setUserToDelete,
    isModalOpen,
    setIsModalOpen,
    confirmDelete,
    fetchUsers,
  } = useUsers();

  const handleDeleteClick = (row) => {
    setUserToDelete(row);
    setIsModalOpen(true);
  };

  const handleEditClick = (row) => {
    // implementar edición si se requiere
  };

  return (
    <div>
      <AddUser onUserAdded={fetchUsers} />
      <DataTable
        columns={columns}
        data={users}
        onEdit={handleEditClick}
        onDelete={handleDeleteClick}
      />
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="¿Eliminar usuario?"
        subtitle={`Esta acción no se puede deshacer.`}
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
