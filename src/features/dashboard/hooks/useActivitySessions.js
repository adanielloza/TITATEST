const useActivitySessions = (activities) => {
  return activities
    .flatMap((actividad) =>
      actividad.sesiones.map((sesion) => ({
        ...sesion,
        actividadId: actividad.actividadId,
      }))
    )
    .sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
};

export default useActivitySessions;
