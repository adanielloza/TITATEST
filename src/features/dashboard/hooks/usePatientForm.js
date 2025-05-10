import { useEffect, useState } from "react";
import { isValidEmail, isValidPhone } from "../../../utils/validators";

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

  useEffect(() => {
    const correoValido = !correoTutor || isValidEmail(correoTutor);
    const telefonoValido = !telefonoTutor || isValidPhone(telefonoTutor);

    setIsFormValid(
      nombre.trim() &&
        apellido.trim() &&
        fechaNacimiento &&
        sexo &&
        tipoTDAH &&
        nombreTutor.trim() &&
        correoValido &&
        telefonoValido
    );
  }, [
    nombre,
    apellido,
    fechaNacimiento,
    sexo,
    tipoTDAH,
    nombreTutor,
    telefonoTutor,
    correoTutor,
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
