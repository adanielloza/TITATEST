import { getDificultad } from "../../../../utils/getDificultad";
import { formatDateTime } from "../../../../utils/formatters";

const formatSessionTime = (seconds) => {
  if (!seconds || typeof seconds !== "number") return "0s";
  const mins = Math.floor(seconds / 60);
  const secs = Math.round(seconds % 60);
  return mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;
};

const InfoItem = ({ icon, label, value }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
    <div style={{ fontWeight: "600", fontSize: "0.9rem", color: "#333" }}>
      {icon} {label}
    </div>
    <div style={{ fontSize: "0.95rem", color: "#555" }}>{value}</div>
  </div>
);

const ActivityLeftContent = ({
  actividadId,
  fecha,
  gameSettings = {},
  gameResults = {},
}) => {
  const { fecha: fechaFormatted, hora } = formatDateTime(fecha);
  const dificultad = getDificultad(actividadId, gameSettings);
  const tiempoSesion = formatSessionTime(gameResults.session_time);

  return (
    <div
      style={{
        background: "#f9f9fb",
        borderRadius: "12px",
        padding: "1rem",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
      }}
    >
      <h4 style={{ margin: 0, fontSize: "1.1rem", fontWeight: "600" }}>
        📄 Información de la Actividad
      </h4>

      <InfoItem
        icon="📅"
        label="Fecha"
        value={`${fechaFormatted} ${hora ? `- ${hora}` : ""}`}
      />
      <InfoItem icon="🎯" label="Dificultad" value={dificultad} />
      <InfoItem icon="⏱️" label="Tiempo de sesión" value={tiempoSesion} />

      {"cantidad_elementos" in gameSettings && (
        <InfoItem
          icon="🧠"
          label="Elementos por secuencia"
          value={gameSettings.cantidad_elementos}
        />
      )}
      {"cantidad_preguntas" in gameSettings && (
        <InfoItem
          icon="❓"
          label="Preguntas"
          value={gameSettings.cantidad_preguntas}
        />
      )}
      {"tiempo" in gameSettings && (
        <InfoItem
          icon="🕒"
          label="Tiempo de memorización"
          value={`${gameSettings.tiempo} segundos`}
        />
      )}
      {"grid_size" in gameSettings && (
        <InfoItem
          icon="🔲"
          label="Tamaño de cuadrícula"
          value={`${gameSettings.grid_size} x ${gameSettings.grid_size}`}
        />
      )}
    </div>
  );
};

export default ActivityLeftContent;
