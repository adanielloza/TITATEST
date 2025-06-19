import { fetchParametrosActividad3 } from "../services/actividad3ConfigService";

const getNivelDesdeSettings = ({ cantidad_elementos }) => {
  if (cantidad_elementos === 3) return "facil";
  if (cantidad_elementos === 4) return "medio";
  if (cantidad_elementos === 5) return "dificil";
  return cantidad_elementos;
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

  if (respuestasCorrectas < esperado.respuestasCorrectas) {
    puntaje -= penalizaciones.muyPocasCorrectas;
  }

  if (tiempoProm > esperado.tiempoPorPregunta) {
    const exceso = tiempoProm - esperado.tiempoPorPregunta;
    puntaje -= (exceso / esperado.tiempoPorPregunta) * penalizaciones.muyLento;
  }

  const dificultadBonus = {
    facil: 1.0,
    medio: 1.1,
    dificil: 1.25,
  };

  puntaje *= dificultadBonus[nivel] || 1.0;
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

  if (
    respuestasCorrectas >= esperado.respuestasCorrectas &&
    tiempoProm <= esperado.tiempoPorPregunta &&
    nivel === "dificil"
  ) {
    obs += "- Excelente desempeño en nivel difícil. ";
  }

  if (!obs) obs = "- Buen desempeño.";

  return obs.trim();
};
