const ActivityResultsCard = ({ selectedSession }) => {
  if (!selectedSession) {
    return (
      <div>
        <h3>📈 Resultados de Actividades</h3>
        <p>Selecciona una actividad para ver sus resultados.</p>
      </div>
    );
  }

  return (
    <div>
      <h3>📈 Resultados de Actividades</h3>
      <pre style={{ whiteSpace: "pre-wrap" }}>
        {JSON.stringify(selectedSession, null, 2)}
      </pre>
    </div>
  );
};

export default ActivityResultsCard;
