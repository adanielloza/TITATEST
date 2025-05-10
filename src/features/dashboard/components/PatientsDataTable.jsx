import React, { useState } from "react";
import {
  Button,
  Modal,
  Input,
  TextArea,
  Dropdown,
  DateInput,
} from "../../../components";
import usePatientForm from "../hooks/usePatientForm";
import useToast from "../../../hooks/useToast";
import { useLoader } from "../../../contexts/LoaderContext";

function PatientsDataTable() {
  const [open, setOpen] = useState(false);
  const { notify } = useToast();
  const { showLoader, hideLoader } = useLoader();

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
  } = usePatientForm();

  const today = new Date();

  const handleCancel = () => {
    setOpen(false);
  };

  const handleSave = () => {
    setOpen(false);

    // Mostrar el loader
    showLoader();

    // Simular el guardado con un setTimeout de 2 segundos
    setTimeout(() => {
      console.log("Formulario guardado con los siguientes datos:", {
        nombre,
        apellido,
        sexo,
        tipoTDAH,
        nombreTutor,
        telefonoTutor,
        correoTutor,
        observaciones,
        fechaNacimiento,
      });

      // Mostrar el toast de éxito
      notify("success", "Paciente registrado correctamente");

      // Ocultar el loader
      hideLoader();
    }, 2000); // 2 segundos
  };

  return (
    <div>
      <Button
        label="Añadir Paciente"
        icon="/icons/person.svg"
        onClick={() => setOpen(true)}
        variant="primary"
      />

      <Modal
        isOpen={open}
        onClose={handleCancel}
        onCancel={handleCancel}
        onConfirm={handleSave}
        title="Nuevo Paciente"
        subtitle="Completa los datos del formulario para registrar un paciente."
        isConfirmDisabled={!isFormValid}
      >
        <form>
          <Input
            label="*Nombre"
            name="nombre"
            value={nombre}
            required
            onlyLetters
            type="text"
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Nombre del paciente"
          />
          <Input
            label="*Apellido"
            name="apellido"
            value={apellido}
            required
            onlyLetters
            type="text"
            onChange={(e) => setApellido(e.target.value)}
            placeholder="Apellido del paciente"
          />
          <DateInput
            label="*Fecha de Nacimiento"
            value={fechaNacimiento}
            onChange={setFechaNacimiento}
            required
            maxDate={today}
          />
          <Dropdown
            label="*Sexo"
            name="sexo"
            value={sexo}
            onChange={(e) => setSexo(e.target.value)}
            options={["Masculino", "Femenino"]}
            required
          />
          <Dropdown
            label="*Tipo TDAH"
            name="tipoTDAH"
            value={tipoTDAH}
            onChange={(e) => setTipoTDAH(e.target.value)}
            options={["TDA", "TDAH"]}
            required
          />
          <Input
            label="*Nombre del Tutor"
            name="nombreTutor"
            value={nombreTutor}
            onChange={(e) => setNombreTutor(e.target.value)}
            placeholder="Nombre del tutor"
            required
            onlyLetters
            type="text"
          />
          <Input
            label="*Teléfono del Tutor"
            name="telefonoTutor"
            value={telefonoTutor}
            onChange={(e) => setTelefonoTutor(e.target.value)}
            placeholder="Teléfono del tutor"
            onlyNumbers
            maxLength={10}
            type="text"
            required
          />
          <Input
            label="*Correo del Tutor"
            name="correoTutor"
            value={correoTutor}
            onChange={(e) => setCorreoTutor(e.target.value)}
            placeholder="Correo del tutor"
            type="email"
            required
          />
          <TextArea
            label="Observaciones"
            name="observaciones"
            value={observaciones}
            onChange={(e) => setObservaciones(e.target.value)}
            placeholder="Observaciones adicionales"
            rows={4}
          />
        </form>
      </Modal>
    </div>
  );
}

export default PatientsDataTable;
