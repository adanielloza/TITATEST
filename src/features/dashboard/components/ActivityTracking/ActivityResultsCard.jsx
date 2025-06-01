import ActivityOneResults from "../Results/ActivityOneResults";
import ActivityTwoResults from "../Results/ActivityTwoResults";
import ActivityThreeResults from "../Results/ActivityThreeResults";
import "../../styles/ActivityResultsCard.css";

const ActivityResultsCard = ({ selectedSession }) => {
  if (!selectedSession) {
    return (
      <div className="activity-results">
        <h3 className="activity-results__title">
          📈 Resultados de Actividades
        </h3>
        <p className="activity-results__empty">
          Aquí se mostrarán los resultados detallados cuando hayan sesiones en
          el historial de actividades.
        </p>
      </div>
    );
  }

  const actividadTipo =
    selectedSession.actividadTipo || selectedSession.actividadId;

  switch (actividadTipo) {
    case "actividad_1":
      return <ActivityOneResults data={selectedSession} />;

    case "actividad_2":
      return <ActivityTwoResults data={selectedSession} />;

    case "actividad_3":
      return <ActivityThreeResults data={selectedSession} />;
  }
};

export default ActivityResultsCard;
