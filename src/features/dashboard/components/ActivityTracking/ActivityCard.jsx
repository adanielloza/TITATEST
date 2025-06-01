import { ACTIVITY_INFO } from "../../constants/activityInfo";
import { getDificultad } from "../../../../utils/getDificultad";
import { formatDateTime } from "../../../../utils/formatters";

const ActivityCard = ({ sesion, selected, onSelect }) => {
  const config = ACTIVITY_INFO[sesion.actividadId] || {};
  const { fecha, hora } = formatDateTime(sesion.fecha);
  const dificultad = getDificultad(sesion.actividadId, sesion.game_settings);

  const cardStyle = selected
    ? {
        backgroundColor: config.color,
        color: "#fff",
        border: `4px solid ${config.color}`,
      }
    : {
        backgroundColor: "transparent",
        color: config.color,
        border: `4px solid ${config.color}`,
      };

  return (
    <div
      className={`activity-card ${selected ? "selected" : ""}`}
      onClick={onSelect}
      style={cardStyle}
    >
      <img
        src={config.icon}
        alt="icon"
        className="activity-card__icon"
        style={{
          filter: selected ? "brightness(0) invert(1)" : "none",
        }}
      />
      <div>
        <p className="activity-card__title">
          {config.name || sesion.actividadId}
        </p>
        <p className="activity-card__date">{fecha}</p>
        <p className="activity-card__time">{hora}</p>
        <p
          className={`activity-card__difficulty ${selected ? "" : "outlined"}`}
        >
          Dificultad: {dificultad}
        </p>
      </div>
    </div>
  );
};

export default ActivityCard;
