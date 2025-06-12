import { useEffect, useState } from "react";
import { isValidEmail } from "../../../utils/validators";

const useUserForm = () => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setIsFormValid(
      Boolean(
        name.trim() &&
          lastName.trim() &&
          isValidEmail(email) &&
          password.length >= 6
      )
    );
  }, [name, lastName, email, password]);

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
