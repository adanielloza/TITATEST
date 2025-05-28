import { useEffect, useState } from "react";
import { ref, child, get, rtdb } from "../../../services/firebase";
import { useLoader } from "../../../contexts/LoaderContext";

const usePatientActivityData = (patientId) => {
  const [patientInfo, setPatientInfo] = useState(null);
  const [activityHistory, setActivityHistory] = useState([]);
  const { showLoader, hideLoader } = useLoader();

  useEffect(() => {
    if (!patientId) return;

    const fetchPatientData = async () => {
      showLoader();
      try {
        const patientRef = child(ref(rtdb), `pacientes/${patientId}`);

        const infoSnap = await get(child(patientRef, "datos_personales"));
        if (infoSnap.exists()) {
          setPatientInfo(infoSnap.val());
        } else {
          setPatientInfo(null);
        }

        const actSnap = await get(child(patientRef, "actividades"));
        if (actSnap.exists()) {
          const rawActivities = actSnap.val();
          const groupedActivities = [];

          Object.entries(rawActivities).forEach(([actividadId, sesiones]) => {
            const sessionList = Object.entries(sesiones)
              .map(([sesionId, sesionData]) => ({
                sesionId,
                ...sesionData,
              }))
              .sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

            groupedActivities.push({
              actividadId,
              sesiones: sessionList,
            });
          });

          setActivityHistory(groupedActivities);
        } else {
          setActivityHistory([]);
        }
      } catch (error) {
        console.error("Error al cargar datos del paciente:", error);
        setPatientInfo(null);
        setActivityHistory([]);
      } finally {
        hideLoader();
      }
    };

    fetchPatientData();
  }, [patientId]);

  return { patientInfo, activityHistory };
};

export default usePatientActivityData;
