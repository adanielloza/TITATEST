const useActivitySessions = (activities) => {
  return activities
    .flatMap((actividad) =>
      actividad.sesiones.map((sesion) => ({
        ...sesion,
        actividadId: actividad.actividadId,
      }))
    )
    .sort((a, b) => {
      const aDate = new Date(a.fecha);
      const bDate = new Date(b.fecha);
      const aTime = isNaN(aDate.getTime()) ? Infinity : aDate.getTime();
      const bTime = isNaN(bDate.getTime()) ? Infinity : bDate.getTime();
      return bTime - aTime;
    });
};

export default useActivitySessions;
