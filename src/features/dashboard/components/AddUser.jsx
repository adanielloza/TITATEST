import { useCallback, useState } from "react";
import { Button, Modal, Input } from "../../../components";
import UserForm from "./UserForm";
import useSaveUser from "../hooks/useUsers";
import { sendOTPEmail } from "../services/emailService";
import useToast from "../../../hooks/useToast";

const generateOTP = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

const AddUser = ({ onUserAdded }) => {
  const [open, setOpen] = useState(false);
  const [otpModalOpen, setOtpModalOpen] = useState(false);
  const [otpGenerated, setOtpGenerated] = useState("");
  const [otpInput, setOtpInput] = useState("");
  const { notify } = useToast();

  const [formData, setFormData] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const { saveUser } = useSaveUser();

  const handleCancel = () => {
    setOpen(false);
    setOtpModalOpen(false);
    setOtpInput("");
  };

  const handleConfirmUserForm = async () => {
    const otp = generateOTP();
    setOtpGenerated(otp);
    await sendOTPEmail(formData.email, otp);
    setOpen(false);
    setOtpModalOpen(true);
  };

  const handleConfirmOTP = async () => {
    const cleaned = otpInput
      .trim()
      .replace(/\s/g, "")
      .replace(/\u200B/g, "");
    if (cleaned === otpGenerated) {
      await saveUser(formData);
      onUserAdded?.();
      handleCancel();
    } else {
      notify("error", "Código incorrecto. Inténtalo nuevamente.");
    }
  };

  const handleFormChange = useCallback(({ formData, isFormValid }) => {
    setFormData(formData);
    setIsFormValid(isFormValid);
  }, []);

  return (
    <>
      <Button
        label="Añadir Usuario"
        icon="/icons/person.svg"
        onClick={() => setOpen(true)}
        variant="primary"
        style={{ marginBottom: "1.5rem" }}
      />

      <Modal
        isOpen={open}
        onClose={handleCancel}
        onCancel={handleCancel}
        onConfirm={handleConfirmUserForm}
        title="Nuevo Usuario"
        subtitle="Completa los datos del nuevo usuario"
        isConfirmDisabled={!isFormValid}
      >
        <form>
          <UserForm onDataChange={handleFormChange} />
        </form>
      </Modal>

      <Modal
        isOpen={otpModalOpen}
        onClose={handleCancel}
        onCancel={handleCancel}
        onConfirm={handleConfirmOTP}
        title="Verificación por correo"
        subtitle="Ingresa el código de 6 dígitos enviado al correo"
        isConfirmDisabled={otpInput.length !== 6}
      >
        <Input
          label="Código OTP"
          value={otpInput}
          onChange={(e) => setOtpInput(e.target.value)}
          required
          maxLength={6}
          onlyNumbers
        />
      </Modal>
    </>
  );
};

export default AddUser;
