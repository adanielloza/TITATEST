import { useCallback, useState } from "react";
import { Modal } from "../../../components";
import PatientForm from "./PatientForm";
import useToast from "../../../hooks/useToast";
import { useCapitalize, useFormatDate } from "../../../utils/formatters";
import { updatePatientById } from "../services/patientService";

const EditPatient = ({ patient, isOpen, onClose, onUpdated }) => {
  const [isFormValid, setIsFormValid] = useState(false);
  const [formData, setFormData] = useState({});
  const { notify } = useToast();
  const capitalize = useCapitalize();
  const formatDate = useFormatDate();

  const handleFormChange = useCallback(({ formData, isFormValid }) => {
    setFormData(formData);
    setIsFormValid(isFormValid);
  }, []);

  const handleUpdate = async () => {
    try {
      const formatted = {
        nombre: capitalize(formData.nombre),
        apellido: capitalize(formData.apellido),
        fechaNacimiento: formatDate(formData.fechaNacimiento),
        sexo: capitalize(formData.sexo),
        tipoTDAH: formData.tipoTDAH.toUpperCase(),
        nombreTutor: capitalize(formData.nombreTutor),
        telefonoTutor: formData.telefonoTutor,
        correoTutor: formData.correoTutor.toLowerCase(),
        observaciones: formData.observaciones || "",
      };
      await updatePatientById(patient.id, formatted);
      notify("success", "Paciente actualizado correctamente");
      onUpdated?.();
      onClose();
    } catch (err) {
      console.error(err);
      notify("error", "Error al actualizar paciente");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onCancel={onClose}
      onConfirm={handleUpdate}
      title="Editar Paciente"
      subtitle="Modifica los datos del paciente."
      isConfirmDisabled={!isFormValid}
    >
      <form>
        <PatientForm initialData={patient} onDataChange={handleFormChange} />
      </form>
    </Modal>
  );
};

export default EditPatient;
