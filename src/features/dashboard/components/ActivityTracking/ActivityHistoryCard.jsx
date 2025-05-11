import React, { useEffect, useState } from "react";
import "../../styles/ActivityHistoryCard.css";

const ACTIVITY_INFO = {
  actividad_1: {
    name: "Desafío de Observación en RA",
    colorClass: "card--blue",
    color: "#228be6",
    icon: "/icons/observation.svg",
  },
  actividad_2: {
    name: "Desafío de Patrones en RA",
    colorClass: "card--purple",
    color: "#7048e8",
    icon: "/icons/pattern.svg",
  },
  actividad_3: {
    name: "Desafío de Memoria en RA",
    colorClass: "card--green",
    color: "#40c057",
    icon: "/icons/memory.svg",
  },
};

const formatDateTime = (isoString) => {
  const date = new Date(isoString);
  const fecha = date.toLocaleDateString("es-EC", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  const hora = date.toLocaleTimeString("es-EC", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return { fecha, hora };
};

const ActivityHistoryCard = ({ activities = [] }) => {
  const [selectedId, setSelectedId] = useState(null);

  const allSessions = activities
    .flatMap((actividad) =>
      actividad.sesiones.map((sesion) => ({
        ...sesion,
        actividadId: actividad.actividadId,
      }))
    )
    .sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

  useEffect(() => {
    if (allSessions.length > 0) {
      setSelectedId(allSessions[0].sesionId); // Selecciona la más reciente
    }
  }, [activities]);

  if (allSessions.length === 0) {
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
        {allSessions.map((sesion) => {
          const { fecha, hora } = formatDateTime(sesion.fecha);
          const config = ACTIVITY_INFO[sesion.actividadId] || {};
          const isSelected = selectedId === sesion.sesionId;

          return (
            <div
              key={sesion.sesionId}
              className={`activity-card ${config.colorClass} ${
                isSelected ? "selected" : ""
              }`}
              onClick={() => setSelectedId(sesion.sesionId)}
              style={
                isSelected
                  ? {
                      backgroundColor: "transparent",
                      border: `2px solid ${config.color}`,
                      color: "#222",
                    }
                  : {}
              }
            >
              <img
                src={config.icon}
                alt="icon"
                className="activity-card__icon"
                style={isSelected ? { filter: "none" } : {}}
              />
              <div>
                <p className="activity-card__title">
                  {config.name || sesion.actividadId}
                </p>
                <p className="activity-card__date">{fecha}</p>
                <p className="activity-card__time">{hora}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ActivityHistoryCard;
