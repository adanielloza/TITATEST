import { fetchParametrosActividad1 } from "../services/actividad1ConfigService";

const getNivelDesdeSettings = ({ cantidad_modelos }) => {
  if (cantidad_modelos === 3 || cantidad_modelos === 5) return "facil";
  if (cantidad_modelos === 7) return "medio";
  if (cantidad_modelos === 10) return "dificil";
  return "facil";
};

export const calcularPuntajeActividad1 = async ({
  preguntas,
  tiempos_por_target,
  game_settings,
}) => {
  const config = await fetchParametrosActividad1();
  if (!config) return 0;

  const nivel = getNivelDesdeSettings(game_settings);
  const esperado = config.parametrosEsperadosPorNivel[nivel];
  const penalizaciones = config.penalizaciones;

  const totalPreguntas = preguntas.length || 1;
  const respuestasCorrectas = preguntas.filter(
    (p) => p.desaciertos === 0
  ).length;
  const tiempoPromedioPorPregunta =
    preguntas.reduce((acc, p) => acc + p.tiempo, 0) / totalPreguntas;
  const tiempoPromedioPorTarget =
    tiempos_por_target.reduce((acc, t) => acc + t.tiempo, 0) /
    tiempos_por_target.length;

  let puntaje = 100;

  if (respuestasCorrectas < esperado.respuestasCorrectas) {
    puntaje -= penalizaciones.muyPocasCorrectas;
  }

  if (tiempoPromedioPorPregunta > esperado.tiempoPorPregunta) {
    const exceso = tiempoPromedioPorPregunta - esperado.tiempoPorPregunta;
    puntaje -= (exceso / esperado.tiempoPorPregunta) * penalizaciones.muyLento;
  }

  if (tiempoPromedioPorTarget < esperado.tiempoDeObservacion) {
    puntaje -= penalizaciones.pocaObservacion;
  }

  const dificultadBonus = {
    facil: 1.0,
    medio: 1.1,
    dificil: 1.25,
  };

  puntaje *= dificultadBonus[nivel] || 1.0;
  return Math.max(0, Math.min(100, Math.round(puntaje)));
};

export const generarObservacionesActividad1 = async ({
  preguntas,
  tiempos_por_target,
  game_settings,
}) => {
  const config = await fetchParametrosActividad1();
  if (!config) return "";

  const nivel = getNivelDesdeSettings(game_settings);
  const esperado = config.parametrosEsperadosPorNivel[nivel];

  const totalPreguntas = preguntas.length || 1;
  const respuestasCorrectas = preguntas.filter(
    (p) => p.desaciertos === 0
  ).length;
  const tiempoPromedioPorPregunta =
    preguntas.reduce((acc, p) => acc + p.tiempo, 0) / totalPreguntas;
  const tiempoPromedioPorTarget =
    tiempos_por_target.reduce((acc, t) => acc + t.tiempo, 0) /
    tiempos_por_target.length;

  let obs = "";

  if (respuestasCorrectas < esperado.respuestasCorrectas) {
    obs += "- Muy pocas respuestas correctas. ";
  }

  if (tiempoPromedioPorPregunta > esperado.tiempoPorPregunta) {
    obs += "- Tiempo de respuesta alto. ";
  }

  if (tiempoPromedioPorTarget < esperado.tiempoDeObservacion) {
    obs += "- Tiempo de observación bajo. ";
  }

  if (
    respuestasCorrectas >= esperado.respuestasCorrectas &&
    tiempoPromedioPorPregunta <= esperado.tiempoPorPregunta &&
    tiempoPromedioPorTarget >= esperado.tiempoDeObservacion &&
    nivel === "dificil"
  ) {
    obs += "- Excelente desempeño en nivel difícil. ";
  }

  if (!obs) obs = "- Buen desempeño.";

  return obs.trim();
};
