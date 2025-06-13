import { fetchParametrosActividad3 } from "../services/actividad3ConfigService";

const getNivelDesdeSettings = ({ cantidad_elementos }) => {
  if (cantidad_elementos === 3) return "facil";
  if (cantidad_elementos === 4) return "medio";
  if (cantidad_elementos === 5) return "dificil";
  return "facil";
};

export const calcularPuntajeActividad3 = async ({
  preguntas,
  game_settings,
}) => {
  const config = await fetchParametrosActividad3();
  if (!config) return 0;

  const nivel = getNivelDesdeSettings(game_settings);
  const esperado = config.parametrosEsperadosPorNivel[nivel] || {};
  const penalizaciones = config.penalizaciones;

  const totalPreguntas = preguntas.length || 1;
  const respuestasCorrectas = preguntas.filter((p) => p.errores === 0).length;

  const tiempoProm =
    preguntas.reduce((acc, p) => acc + p.tiempoRespuesta, 0) / totalPreguntas;

  let puntaje = 100;

  // Penalización fuerte si no llega al mínimo esperado
  if (respuestasCorrectas < esperado.respuestasCorrectas) {
    puntaje -= penalizaciones.muyPocasCorrectas;
  }

  // Penalización proporcional si excede el tiempo por pregunta
  if (tiempoProm > esperado.tiempoPorPregunta) {
    const exceso = tiempoProm - esperado.tiempoPorPregunta;
    puntaje -= (exceso / esperado.tiempoPorPregunta) * penalizaciones.muyLento;
  }

  return Math.max(0, Math.min(100, Math.round(puntaje)));
};

export const generarObservacionesActividad3 = async ({
  preguntas,
  game_settings,
}) => {
  const config = await fetchParametrosActividad3();
  if (!config) return "";

  const nivel = getNivelDesdeSettings(game_settings);
  const esperado = config.parametrosEsperadosPorNivel[nivel] || {};

  const totalPreguntas = preguntas.length || 1;
  const respuestasCorrectas = preguntas.filter((p) => p.errores === 0).length;
  const tiempoProm =
    preguntas.reduce((acc, p) => acc + p.tiempoRespuesta, 0) / totalPreguntas;

  let obs = "";

  if (respuestasCorrectas < esperado.respuestasCorrectas) {
    obs += "- Muy pocas respuestas correctas. ";
  }

  if (tiempoProm > esperado.tiempoPorPregunta) {
    obs += "- Tiempo de respuesta alto. ";
  }

  if (!obs) obs = "- Buen desempeño.";

  return obs.trim();
};
