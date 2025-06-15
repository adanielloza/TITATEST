import { Input } from "../../../components";
import { useEffect } from "react";
import useUserForm from "../hooks/useUserForm";

const UserForm = ({ onDataChange, initialData = {}, isEditing = false }) => {
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
  } = useUserForm(initialData, isEditing);

  useEffect(() => {
    const shouldReport = isEditing
      ? name.trim() && lastName.trim()
      : name.trim() && lastName.trim() && email.trim() && password.length >= 6;

    if (shouldReport) {
      onDataChange({
        formData: { name, lastName, email, password },
        isFormValid,
      });
    }
  }, [name, lastName, email, password, isFormValid, onDataChange, isEditing]);

  return (
    <>
      <Input
        label="*Nombre"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        onlyLetters
      />
      <Input
        label="*Apellido"
        name="lastName"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        required
        onlyLetters
      />
      {!isEditing && (
        <>
          <Input
            label="*Correo Electrónico"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            type="email"
          />
          <Input
            label="*Contraseña"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            type="password"
            minLength={6}
          />
        </>
      )}
    </>
  );
};

export default UserForm;
