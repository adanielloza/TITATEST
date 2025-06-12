import { Input } from "../../../components";
import { useEffect } from "react";
import useUserForm from "../hooks/useUserForm";

const UserForm = ({ onDataChange }) => {
  const {
    name,
    setName,
    lastName,
    setLastName,
    email,
    setEmail,
    password,
    setPassword,
    isFormValid,
  } = useUserForm();

  useEffect(() => {
    onDataChange({
      formData: { name, lastName, email, password },
      isFormValid,
    });
  }, [name, lastName, email, password, isFormValid, onDataChange]);

  return (
    <>
      <Input
        label="*Nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        onlyLetters
      />
      <Input
        label="*Apellido"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        required
        onlyLetters
      />
      <Input
        label="*Correo Electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        type="email"
      />
      <Input
        label="*Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        type="password"
        minLength={6}
      />
    </>
  );
};

export default UserForm;
