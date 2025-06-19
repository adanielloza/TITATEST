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
