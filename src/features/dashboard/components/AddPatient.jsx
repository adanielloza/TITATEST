import { useCallback, useState } from "react";
import { Button, Modal } from "../../../components";
import PatientForm from "./PatientForm";
import useSavePatient from "../hooks/useSavePatient";

const AddPatient = ({ onPatientAdded }) => {
  const [open, setOpen] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [formData, setFormData] = useState({});
  const { savePatient } = useSavePatient();

  const handleCancel = () => setOpen(false);

  const handleSave = async () => {
    setOpen(false);
    await savePatient(formData);
    onPatientAdded?.();
  };

  const handleFormChange = useCallback(({ formData, isFormValid }) => {
    setFormData(formData);
    setIsFormValid(isFormValid);
  }, []);

  return (
    <div>
      <Button
        label="Añadir Paciente"
        icon="/icons/person.svg"
        onClick={() => setOpen(true)}
        variant="primary"
      />
      <Modal
        isOpen={open}
        onClose={handleCancel}
        onCancel={handleCancel}
        onConfirm={handleSave}
        title="Nuevo Paciente"
        subtitle="Completa los datos del formulario para registrar un paciente."
        isConfirmDisabled={!isFormValid}
      >
        <form>
          <PatientForm onDataChange={handleFormChange} />
        </form>
      </Modal>
    </div>
  );
};

export default AddPatient;
