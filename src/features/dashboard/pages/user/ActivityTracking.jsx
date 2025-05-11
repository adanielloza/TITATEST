import React, { useState, useEffect } from "react";
import { PageHeader } from "../../components";
import { Dropdown } from "../../../../components/";
import usePatientDropdown from "../../hooks/usePatientDropdown";
import usePatientActivityData from "../../hooks/usePatientActivityData";
import "../../styles/ActivityTracking.css";

const ActivityTracking = () => {
  const { options } = usePatientDropdown();
  const [selectedPatientId, setSelectedPatientId] = useState("");

  const { patientInfo, activityHistory } =
    usePatientActivityData(selectedPatientId);

  useEffect(() => {
    if (selectedPatientId) {
      console.log("🧍 Datos personales:", patientInfo);
      console.log("📋 Actividades:", activityHistory);
    }
  }, [selectedPatientId, patientInfo, activityHistory]);

  return (
    <div className="activity-tracking">
      <PageHeader
        title="Seguimiento de Actividades"
        subtitle="Visualiza el progreso y desempeño de los pacientes en sus actividades asignadas"
      />

      <div className="dropdown-container">
        <Dropdown
          name="paciente"
          value={selectedPatientId}
          onChange={(e) => setSelectedPatientId(e.target.value)}
          options={options}
          placeholder="Selecciona un paciente"
        />
      </div>

      {selectedPatientId && (
        <div className="activity-tracking__grid">
          <div className="activity-tracking__card">
            🧍 Información del Paciente
          </div>
          <div className="activity-tracking__card">
            📊 Seguimiento de Actividades
          </div>
          <div className="activity-tracking__card">
            🕓 Historial de Actividades
          </div>
          <div className="activity-tracking__card">
            📈 Resultados de Actividades
          </div>
        </div>
      )}
    </div>
  );
};

export default ActivityTracking;
