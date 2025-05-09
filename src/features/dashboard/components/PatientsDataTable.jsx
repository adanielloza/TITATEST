import React, { useState } from "react";
import Button from "../../../components/Button";
import Modal from "../../../components/Modal";
import Input from "../../../components/Input";
import Spinner from "../../../components/Spinner";

function PatientsDataTable() {
  const [open, setOpen] = useState(false);
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [edad, setEdad] = useState("");
  const [nombreFuera, setNombreFuera] = useState("");

  const handleCancel = () => {
    console.log("Cancelar presionado");
    setOpen(false);
  };

  const handleSave = () => {
    console.log("Guardar presionado");
    setOpen(false);
  };

  return (
    <div>
      <Input
        label="Nombre fuera del modal"
        name="nombreFuera"
        placeholder="Escribe aquí..."
        value={nombreFuera}
        onChange={(e) => setNombreFuera(e.target.value)}
      />

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
      >
        <form>
          <Input
            label="Nombre"
            name="nombre"
            type="password"
            placeholder="Solo letras"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            onlyNumbers
            maxLength={10}
          />
          <Input
            label="Correo electrónico"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ejemplo@dominio.com"
            error={!email.includes("@")}
            errorMessage="Correo inválido"
          />
          <Spinner
            label="Edad"
            name="edad"
            value={edad}
            onChange={(v) => {
              console.log("Edad cambiada:", v); // Aquí agregamos el console.log
              setEdad(v);
            }}
            min={-120} // Permite que la edad pueda ser negativa
            max={120}
            step={1}
          />
        </form>
      </Modal>
    </div>
  );
}

export default PatientsDataTable;
