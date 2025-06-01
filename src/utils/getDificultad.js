export const getDificultad = (actividadId, settings) => {
  if (!settings) return "Desconocida";

  switch (actividadId) {
    case "actividad_1":
      if (settings.cantidad_preguntas <= 5) return "Fácil";
      if (settings.cantidad_preguntas <= 10) return "Medio";
      return "Difícil";

    case "actividad_2":
      if (settings.grid_size === 3) return "Fácil";
      if (settings.grid_size === 4) return "Medio";
      return "Difícil";

    case "actividad_3":
      if (settings.cantidad_preguntas === 5) return "Fácil";
      if (settings.cantidad_preguntas === 7) return "Medio";
      return "Difícil";

    default:
      return "Desconocida";
  }
};
