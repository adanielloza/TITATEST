import { useState, useEffect } from "react";

const usePatientForm = () => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState(null);
  const [sexo, setSexo] = useState("");
  const [tipoTDAH, setTipoTDAH] = useState("");
  const [nombreTutor, setNombreTutor] = useState("");
  const [telefonoTutor, setTelefonoTutor] = useState("");
  const [correoTutor, setCorreoTutor] = useState("");
  const [observaciones, setObservaciones] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  const isValidEmail = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
  };

  const validateForm = () => {
    setIsFormValid(
      nombre &&
        apellido &&
        sexo &&
        tipoTDAH &&
        nombreTutor &&
        telefonoTutor &&
        isValidEmail(correoTutor) &&
        fechaNacimiento
    );
  };

  useEffect(() => {
    validateForm();
  }, [
    nombre,
    apellido,
    sexo,
    tipoTDAH,
    nombreTutor,
    telefonoTutor,
    correoTutor,
    observaciones,
    fechaNacimiento,
  ]);

  return {
    nombre,
    setNombre,
    apellido,
    setApellido,
    fechaNacimiento,
    setFechaNacimiento,
    sexo,
    setSexo,
    tipoTDAH,
    setTipoTDAH,
    nombreTutor,
    setNombreTutor,
    telefonoTutor,
    setTelefonoTutor,
    correoTutor,
    setCorreoTutor,
    observaciones,
    setObservaciones,
    isFormValid,
  };
};

export default usePatientForm;
