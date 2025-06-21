import { calcularPuntajeActividad1 } from "./scoreActividad1";
import { calcularPuntaje as calcularPuntajeActividad2 } from "./scoreActividad2";
import { calcularPuntajeActividad3 } from "./scoreActividad3";

export const mapSesionActividad1 = async (sesion) =>
  calcularPuntajeActividad1({
    preguntas: sesion.game_results.preguntas,
    tiempos_por_target: sesion.game_results.tiempos_por_target,
    game_settings: sesion.game_settings,
  });

export const mapSesionActividad2 = async (sesion) =>
  calcularPuntajeActividad2({
    correct_answers: sesion.game_results.correct_answers,
    image_opens: sesion.game_results.image_opens,
    time_spent_seconds: sesion.game_results.time_spent_seconds,
    gridSize: sesion.game_settings.grid_size,
  });

export const mapSesionActividad3 = async (sesion) =>
  calcularPuntajeActividad3({
    preguntas: sesion.game_results.preguntas,
    game_settings: sesion.game_settings,
  });
