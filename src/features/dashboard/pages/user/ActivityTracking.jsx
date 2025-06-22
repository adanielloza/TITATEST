import { useState } from "react";
import {
  PageHeader,
  PatientInfoCard,
  ActivityHistoryCard,
  ActivityProgressCard,
  ActivityResultsCard,
} from "../../components";
import { Dropdown } from "../../../../components/";
import usePatientDropdown from "../../hooks/usePatientDropdown";
import usePatientActivityData from "../../hooks/usePatientActivityData";
import "../../styles/ActivityTracking.css";
import Button from "../../../../components/Button";
import {
  exportAllActivitiesToExcel,
  exportAllActivitiesToPDF,
} from "../../utils/exportUtils";

const ActivityTracking = () => {
  const { options } = usePatientDropdown();
  const [selectedPatientId, setSelectedPatientId] = useState("");
  const [selectedSession, setSelectedSession] = useState(null);

  const { patientInfo, activityHistory } =
    usePatientActivityData(selectedPatientId);

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
          onChange={(e) => {
            setSelectedPatientId(e.target.value);
            setSelectedSession(null);
          }}
          options={options}
          placeholder="Selecciona un paciente"
        />
      </div>

      {selectedPatientId && (
        <>
          <div
            className="export-buttons"
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "10px",
              margin: "20px 0",
              paddingRight: "1rem",
            }}
          >
            <Button
              label="Exportar a PDF"
              variant="primary"
              onClick={() => {
                const actividades = {};
                activityHistory.forEach((a) => {
                  actividades[a.actividadId] = a.sesiones;
                });

                exportAllActivitiesToPDF(
                  {
                    id: patientInfo.id ?? selectedPatientId,
                    datos_personales: patientInfo,
                  },
                  actividades
                );
              }}
            />
            <Button
              label="Exportar a Excel"
              variant="secondary"
              onClick={() => {
                const actividades = {};
                activityHistory.forEach((a) => {
                  actividades[a.actividadId] = a.sesiones;
                });

                exportAllActivitiesToExcel(
                  {
                    id: patientInfo.id ?? selectedPatientId,
                    datos_personales: patientInfo,
                  },
                  actividades
                );
              }}
            />
          </div>
        </>
      )}

      {selectedPatientId && (
        <div className="activity-tracking__grid">
          <div className="activity-tracking__card">
            <PatientInfoCard patient={patientInfo} />
          </div>
          <div className="activity-tracking__card">
            <ActivityProgressCard activityHistory={activityHistory} />
          </div>
          <div className="activity-tracking__card">
            <ActivityHistoryCard
              activities={activityHistory}
              onSessionSelect={setSelectedSession}
            />
          </div>
          <div className="activity-tracking__card">
            <ActivityResultsCard selectedSession={selectedSession} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ActivityTracking;
