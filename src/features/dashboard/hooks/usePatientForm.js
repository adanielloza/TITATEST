import { useEffect, useState } from "react";
import { isValidEmail, isValidPhone } from "../../../utils/validators";

const parseDate = (str) => {
  if (!str) return null;
  if (str instanceof Date) return str;
  const [day, month, year] = str.split("/");
  return new Date(`${year}-${month}-${day}`);
};

const usePatientForm = (initialValues = {}) => {
  const [nombre, setNombre] = useState(initialValues.nombre || "");
  const [apellido, setApellido] = useState(initialValues.apellido || "");
  const [fechaNacimiento, setFechaNacimiento] = useState(
    parseDate(initialValues.fechaNacimiento)
  );
  const [sexo, setSexo] = useState(initialValues.sexo || "");
  const [tipoTDAH, setTipoTDAH] = useState(initialValues.tipoTDAH || "");
  const [nombreTutor, setNombreTutor] = useState(
    initialValues.nombreTutor || ""
  );
  const [telefonoTutor, setTelefonoTutor] = useState(
    initialValues.telefonoTutor || ""
  );
  const [correoTutor, setCorreoTutor] = useState(
    initialValues.correoTutor || ""
  );
  const [observaciones, setObservaciones] = useState(
    initialValues.observaciones || ""
  );
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const correoValido = !correoTutor || isValidEmail(correoTutor);
    const telefonoValido = !telefonoTutor || isValidPhone(telefonoTutor);

    setIsFormValid(
      Boolean(
        nombre.trim() &&
          apellido.trim() &&
          fechaNacimiento &&
          sexo &&
          tipoTDAH &&
          nombreTutor.trim() &&
          correoValido &&
          telefonoValido
      )
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
