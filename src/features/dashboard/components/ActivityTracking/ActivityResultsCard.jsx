import ActivityOneResults from "../Results/ActivityOneResults";
import ActivityTwoResults from "../Results/ActivityTwoResults";
import ActivityThreeResults from "../Results/ActivityThreeResults";

const ActivityResultsCard = ({ selectedSession }) => {
  if (!selectedSession) {
    return (
      <div>
        <h3>📈 Resultados de Actividades</h3>
        <p>Selecciona una actividad para ver sus resultados.</p>
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

    default:
      return (
        <div>
          <h3>📈 Resultados de Actividades</h3>
          <p>No hay componente específico para esta actividad.</p>
          <pre style={{ whiteSpace: "pre-wrap" }}>
            {JSON.stringify(selectedSession, null, 2)}
          </pre>
        </div>
      );
  }
};

export default ActivityResultsCard;
