import React, { useEffect, useState } from "react";
import { AddPatient } from "./";
import DataTable from "../../../components/DataTable/DataTable";
import Modal from "../../../components/Modal";
import { rtdb, ref, get, child, remove } from "../../../services/firebase";
import { useLoader } from "../../../contexts/LoaderContext";
import useToast from "../../../hooks/useToast";

const calculateAge = (fechaNacimiento) => {
  try {
    const [day, month, year] = fechaNacimiento.split("/");
    const birthDate = new Date(`${year}-${month}-${day}`);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  } catch {
    return "N/A";
  }
};

const PatientsDataTable = () => {
  const [patients, setPatients] = useState([]);
  const [patientToDelete, setPatientToDelete] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { showLoader, hideLoader } = useLoader();
  const { notify } = useToast();

  const fetchPatients = async () => {
    showLoader();
    setTimeout(async () => {
      try {
        const snapshot = await get(child(ref(rtdb), "pacientes"));
        if (snapshot.exists()) {
          const raw = snapshot.val();
          const parsed = Object.values(raw)
            .map((entry) => ({
              id: Number(entry.id),
              ...entry.datos_personales,
              edad: calculateAge(entry.datos_personales.fechaNacimiento),
            }))
            .sort((a, b) => a.id - b.id);
          setPatients(parsed);
        }
      } catch (error) {
        console.error("Error fetching patients:", error);
      } finally {
        hideLoader();
      }
    }, 500);
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const handleDeleteClick = (row) => {
    setPatientToDelete(row);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    showLoader();
    if (!patientToDelete?.id) return;
    try {
      const pacienteKey = `paciente_${patientToDelete.id}`;
      await remove(ref(rtdb, `pacientes/${pacienteKey}`));
      notify("success", "Paciente eliminado correctamente");
      setIsModalOpen(false);
      setPatientToDelete(null);
      await fetchPatients(); // loader se mantiene hasta que esto termina
    } catch (error) {
      console.error("Error al eliminar paciente:", error);
      notify("error", "Error al eliminar paciente");
      hideLoader(); // ⛔ se oculta solo si falla
    }
  };

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

  return (
    <div>
      <AddPatient onPatientAdded={fetchPatients} />
      <br />
      <DataTable
        columns={columns}
        data={patients}
        onEdit={(row) => console.log("Editar:", row)}
        onDelete={handleDeleteClick}
      />
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="¿Eliminar paciente?"
        subtitle={`Esta acción no se puede deshacer.`}
        onCancel={() => setIsModalOpen(false)}
        onConfirm={handleConfirmDelete}
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
