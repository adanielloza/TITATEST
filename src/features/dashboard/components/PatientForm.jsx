import { useEffect } from "react";
import { Input, TextArea, Dropdown, DateInput } from "../../../components";
import usePatientForm from "../hooks/usePatientForm";

const PatientForm = ({ onDataChange, initialData = {} }) => {
  const {
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
  } = usePatientForm(initialData);

  const today = new Date();

  useEffect(() => {
    onDataChange({
      formData: {
        nombre,
        apellido,
        fechaNacimiento,
        sexo,
        tipoTDAH,
        nombreTutor,
        telefonoTutor,
        correoTutor,
        observaciones,
      },
      isFormValid,
    });
  }, [
    nombre,
    apellido,
    fechaNacimiento,
    sexo,
    tipoTDAH,
    nombreTutor,
    telefonoTutor,
    correoTutor,
    observaciones,
    isFormValid,
    onDataChange,
  ]);

  return (
    <>
      <Input
        name="nombre"
        label="*Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        required
        onlyLetters
      />
      <Input
        name="apellido"
        label="*Apellido"
        value={apellido}
        onChange={(e) => setApellido(e.target.value)}
        required
        onlyLetters
      />
      <DateInput
        label="*Fecha de Nacimiento"
        value={fechaNacimiento}
        onChange={setFechaNacimiento}
        required
        maxDate={today}
      />
      <Dropdown
        name="sexo"
        label="*Sexo"
        value={sexo}
        onChange={(e) => setSexo(e.target.value)}
        options={["Masculino", "Femenino"]}
        required
      />
      <Dropdown
        name="tipoTDAH"
        label="*Tipo TDAH"
        value={tipoTDAH}
        onChange={(e) => setTipoTDAH(e.target.value)}
        options={["TDA", "TDAH"]}
        required
      />
      <Input
        name="nombreTutor"
        label="Nombre del Tutor"
        value={nombreTutor}
        onChange={(e) => setNombreTutor(e.target.value)}
        required
        onlyLetters
      />
      <Input
        name="telefonoTutor"
        label="Teléfono del Tutor"
        value={telefonoTutor}
        onChange={(e) => setTelefonoTutor(e.target.value)}
        required
        onlyNumbers
        maxLength={10}
      />
      <Input
        name="correoTutor"
        label="*Correo del Tutor"
        value={correoTutor}
        onChange={(e) => setCorreoTutor(e.target.value)}
        required
        type="email"
      />
      <TextArea
        name="observaciones"
        label="Observaciones"
        value={observaciones}
        onChange={(e) => setObservaciones(e.target.value)}
        placeholder="Observaciones adicionales"
        maxLength={300}
      />
    </>
  );
};

export default PatientForm;
