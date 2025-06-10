import { fetchParametrosActividad2 } from "../services/actividad2ConfigService";

const getMaxItems = (gridSize) => gridSize * gridSize;

export const calcularPuntaje = async ({
  correct_answers,
  image_opens,
  time_spent_seconds,
  gridSize,
}) => {
  const config = await fetchParametrosActividad2();
  if (!config) return 0;

  const totalItems = getMaxItems(gridSize);
  const expected = config.parametrosEsperadosPorGrid[`grid${gridSize}`];
  const penalties = config.penalizaciones;

  if (!expected) {
    console.warn(`No hay configuración para grid${gridSize}`);
    return 0;
  }

  const correctRatio = correct_answers / totalItems;
  let puntaje = 100;

  if (correctRatio < 0.9) {
    puntaje -= (1 - correctRatio) * penalties.muyPocasCorrectas;
  }

  if (time_spent_seconds > expected.tiempo) {
    const exceso = time_spent_seconds - expected.tiempo;
    puntaje -= (exceso / expected.tiempo) * penalties.muyLento;
  }

  if (image_opens > expected.aperturas) {
    const exceso = image_opens - expected.aperturas;
    puntaje -= (exceso / expected.aperturas) * penalties.demasiadasAperturas;
  }

  return Math.max(0, Math.min(100, Math.round(puntaje)));
};

export const generarObservaciones = async ({
  correct_answers,
  image_opens,
  time_spent_seconds,
  gridSize,
}) => {
  const config = await fetchParametrosActividad2();
  if (!config) return "";

  const totalItems = getMaxItems(gridSize);
  const expected = config.parametrosEsperadosPorGrid[`grid${gridSize}`];

  if (!expected) {
    console.warn(`No hay configuración para grid${gridSize}`);
    return "";
  }

  const correctRatio = correct_answers / totalItems;
  let obs = "";

  if (correctRatio < 0.7) {
    obs += "- Muy pocas respuestas correctas. Revisar comprensión. ";
  }

  if (image_opens > expected.aperturas) {
    obs += "- Abrió muchas veces la imagen. Poca retención. ";
  }

  if (time_spent_seconds > expected.tiempo) {
    obs += "- Tardó más de lo esperado. Posible distracción o dificultad. ";
  }

  return obs.trim() || "- Buen desempeño.";
};
