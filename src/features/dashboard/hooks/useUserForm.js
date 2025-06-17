import { useEffect, useState } from "react";
import { isValidEmail } from "../../../utils/validators";

const useUserForm = (initialData = {}, isEditing = false) => {
  const [name, setName] = useState(initialData.name || "");
  const [lastName, setLastName] = useState(initialData.lastName || "");
  const [email, setEmail] = useState(initialData.email || "");
  const [password, setPassword] = useState("");

  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    if (isEditing) {
      setIsFormValid(Boolean(name.trim() && lastName.trim()));
    } else {
      setIsFormValid(
        Boolean(
          name.trim() &&
            lastName.trim() &&
            isValidEmail(email) &&
            password.length >= 6
        )
      );
    }
  }, [name, lastName, email, password, isEditing]);

  return {
    name,
    setName,
    lastName,
    setLastName,
    email,
    setEmail,
    password,
    setPassword,
    isFormValid,
  };
};

export default useUserForm;
