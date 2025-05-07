import React, { useState } from "react";
import Button from "../../../components/Button";
import Modal from "../../../components/Modal";

function PatientsDataTable() {
  const [open, setOpen] = useState(false);

  const handleSave = () => {
    console.log("Guardado");
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
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
        title="Nuevo Paciente"
        subtitle="Completa los datos del formulario para registrar un paciente."
        footer={
          <>
            <Button
              label="Cancelar"
              onClick={handleCancel}
              variant="secondary"
            />
            <Button label="Guardar" onClick={handleSave} variant="primary" />
          </>
        }
      >
        <form>
          <div className="form-group">
            <label>Nombre</label>
            <input type="text" placeholder="Nombre del paciente" />
          </div>
          <div className="form-group">
            <label>Observaciones</label>
            <textarea rows="3" placeholder="Escribe aquí..."></textarea>
          </div>
          <div className="form-group">
            <label>Observaciones</label>
            <textarea rows="3" placeholder="Escribe aquí..."></textarea>
          </div>
          <div className="form-group">
            <label>Observaciones</label>
            <textarea rows="3" placeholder="Escribe aquí..."></textarea>
          </div>
          <div className="form-group">
            <label>Observaciones</label>
            <textarea rows="3" placeholder="Escribe aquí..."></textarea>
          </div>
          <div className="form-group">
            <label>Observaciones</label>
            <textarea rows="3" placeholder="Escribe aquí..."></textarea>
          </div>
          <div className="form-group">
            <label>Observaciones</label>
            <textarea rows="3" placeholder="Escribe aquí..."></textarea>
          </div>
          <div className="form-group">
            <label>Observaciones</label>
            <textarea rows="3" placeholder="Escribe aquí..."></textarea>
          </div>
          <div className="form-group">
            <label>Observaciones</label>
            <textarea rows="3" placeholder="Escribe aquí..."></textarea>
          </div>
          <div className="form-group">
            <label>Observaciones</label>
            <textarea rows="3" placeholder="Escribe aquí..."></textarea>
          </div>
          <div className="form-group">
            <label>Observaciones</label>
            <textarea rows="3" placeholder="Escribe aquí..."></textarea>
          </div>
          <div className="form-group">
            <label>Observaciones</label>
            <textarea rows="3" placeholder="Escribe aquí..."></textarea>
          </div>
          <div className="form-group">
            <label>Observaciones</label>
            <textarea rows="3" placeholder="Escribe aquí..."></textarea>
          </div>
          <div className="form-group">
            <label>Observaciones</label>
            <textarea rows="3" placeholder="Escribe aquí..."></textarea>
          </div>
          <div className="form-group">
            <label>Observaciones</label>
            <textarea rows="3" placeholder="Escribe aquí..."></textarea>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default PatientsDataTable;
