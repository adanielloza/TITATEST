import { useEffect, useState } from "react";
import {
  fetchAllPatients,
  deletePatientById,
} from "../services/patientService";
import { calculateAge } from "../../../utils/calculateAge";
import { useLoader } from "../../../contexts/LoaderContext";
import useToast from "../../../hooks/useToast";

const usePatients = () => {
  const [patients, setPatients] = useState([]);
  const [patientToDelete, setPatientToDelete] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { showLoader, hideLoader } = useLoader();
  const { notify } = useToast();

  const fetchPatients = async () => {
    showLoader();
    try {
      const raw = await fetchAllPatients();
      const parsed = Object.values(raw)
        .map((entry) => ({
          id: Number(entry.id),
          ...entry.datos_personales,
          edad: calculateAge(entry.datos_personales.fechaNacimiento),
        }))
        .sort((a, b) => a.id - b.id);
      setPatients(parsed);
    } catch (error) {
      console.error("Error al cargar pacientes:", error);
    } finally {
      hideLoader();
    }
  };

  const confirmDelete = async () => {
    showLoader();
    try {
      await deletePatientById(patientToDelete.id);
      notify("success", "Paciente eliminado correctamente");
      setIsModalOpen(false);
      setPatientToDelete(null);
      await fetchPatients();
    } catch (error) {
      console.error("Error al eliminar paciente:", error);
      notify("error", "Error al eliminar paciente");
      hideLoader();
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  return {
    patients,
    patientToDelete,
    isModalOpen,
    setIsModalOpen,
    setPatientToDelete,
    confirmDelete,
    fetchPatients,
  };
};

export default usePatients;
