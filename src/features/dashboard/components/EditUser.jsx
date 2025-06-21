import { useState, useCallback } from "react";
import { Modal } from "../../../components";
import useToast from "../../../hooks/useToast";
import { updateUserById } from "../services/userService";
import { useCapitalize } from "../../../utils/formatters";
import UserForm from "./UserForm";

const EditUser = ({ user, isOpen, onClose, onUpdated }) => {
  const [formData, setFormData] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const { notify } = useToast();
  const capitalize = useCapitalize();

  const handleFormChange = useCallback(({ formData, isFormValid }) => {
    setFormData(formData);
    setIsFormValid(isFormValid);
  }, []);

  const handleUpdate = async () => {
    try {
      const formatted = {
        name: capitalize(formData.name),
        lastName: capitalize(formData.lastName),
      };
      await updateUserById(user.uid, formatted);
      notify("success", "Usuario actualizado correctamente");
      onUpdated?.();
      onClose();
    } catch (error) {
      console.error(error);
      notify("error", "Error al actualizar usuario");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onCancel={onClose}
      onConfirm={handleUpdate}
      title="Editar Usuario"
      subtitle="Modifica el nombre y apellido del usuario"
      isConfirmDisabled={!isFormValid}
    >
      <form>
        <UserForm
          onDataChange={handleFormChange}
          initialData={user}
          isEditing
        />
      </form>
    </Modal>
  );
};

export default EditUser;
