import { useState, useEffect } from "react";
import useActivitySessions from "../../hooks/useActivitySessions";
import ActivityCard from "./ActivityCard";
import "../../styles/ActivityHistoryCard.css";

const ActivityHistoryCard = ({ activities = [], onSessionSelect }) => {
  const sessions = useActivitySessions(activities);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    if (sessions.length > 0 && !selectedId) {
      const firstSession = sessions[0];
      setSelectedId(firstSession.sesionId);
      onSessionSelect?.(firstSession);
    }

    if (sessions.length === 0) {
      setSelectedId(null);
      onSessionSelect?.(null);
    }
  }, [sessions]);

  const handleSelect = (sesion) => {
    setSelectedId(sesion.sesionId);
    onSessionSelect?.(sesion);
  };

  if (sessions.length === 0) {
    return (
      <div className="activity-history">
        <h3>🕓 Historial de Actividades</h3>
        <p className="activity-history__empty">
          No hay actividades registradas.
        </p>
      </div>
    );
  }

  return (
    <div className="activity-history">
      <h3>🕓 Historial de Actividades</h3>
      <div className="activity-history__grid">
        {sessions.map((sesion) => (
          <ActivityCard
            key={sesion.sesionId}
            sesion={sesion}
            selected={sesion.sesionId === selectedId}
            onSelect={() => handleSelect(sesion)}
          />
        ))}
      </div>
    </div>
  );
};

export default ActivityHistoryCard;
