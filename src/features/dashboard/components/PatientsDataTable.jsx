import { AddPatient } from "./";
import EditPatient from "./EditPatient";
import DataTable from "../../../components/DataTable/DataTable";
import Modal from "../../../components/Modal";
import usePatients from "../hooks/usePatients";
import { useState } from "react";

const columns = [
  { key: "id", label: "ID" },
  { key: "nombre", label: "Nombre" },
  { key: "apellido", label: "Apellido" },
  { key: "edad", label: "Edad" },
  { key: "sexo", label: "Sexo" },
  { key: "tipoTDAH", label: "Tipo TDAH" },
  { key: "nombreTutor", label: "Nombre Tutor" },
  { key: "telefonoTutor", label: "Teléfono Tutor" },
  { key: "correoTutor", label: "Correo Tutor" },
  { key: "observaciones", label: "Observaciones" },
];

const PatientsDataTable = () => {
  const [patientToEdit, setPatientToEdit] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const {
    patients,
    patientToDelete,
    isModalOpen,
    setIsModalOpen,
    setPatientToDelete,
    confirmDelete,
    fetchPatients,
  } = usePatients();

  const handleDeleteClick = (row) => {
    setPatientToDelete(row);
    setIsModalOpen(true);
  };

  const handleEditClick = (row) => {
    setPatientToEdit(row);
    setIsEditOpen(true);
  };

  return (
    <div>
      <AddPatient onPatientAdded={fetchPatients} />
      <EditPatient
        patient={patientToEdit}
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        onUpdated={fetchPatients}
      />
      <br />
      <DataTable
        columns={columns}
        data={patients}
        onEdit={handleEditClick}
        onDelete={handleDeleteClick}
      />
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="¿Eliminar paciente?"
        subtitle={`Esta acción no se puede deshacer.`}
        onCancel={() => setIsModalOpen(false)}
        onConfirm={confirmDelete}
        cancelLabel="Cancelar"
        confirmLabel="Eliminar"
        cancelVariant="secondary"
        confirmVariant="delete"
      >
        <p>
          ¿Estás seguro que deseas eliminar al paciente{" "}
          <strong>
            {patientToDelete?.nombre} {patientToDelete?.apellido}
          </strong>
          ?
        </p>
      </Modal>
    </div>
  );
};

export default PatientsDataTable;
