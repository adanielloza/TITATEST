import { describe, it, expect, vi } from "vitest";
import {
  mapSesionActividad1,
  mapSesionActividad2,
  mapSesionActividad3,
} from "../mapSessionToScore";
import * as score1 from "../scoreActividad1";
import * as score2 from "../scoreActividad2";
import * as score3 from "../scoreActividad3";

describe("mapSesionActividadX", () => {
  it("mapSesionActividad1 pasa los parámetros correctos", async () => {
    const mock = vi
      .spyOn(score1, "calcularPuntajeActividad1")
      .mockResolvedValue(80);

    const sesion = {
      game_results: {
        preguntas: [{ desaciertos: 0, tiempo: 3 }],
        tiempos_por_target: [{ tiempo: 1 }],
      },
      game_settings: { cantidad_modelos: 3 },
    };

    const result = await mapSesionActividad1(sesion);
    expect(mock).toHaveBeenCalledWith({
      preguntas: sesion.game_results.preguntas,
      tiempos_por_target: sesion.game_results.tiempos_por_target,
      game_settings: sesion.game_settings,
    });
    expect(result).toBe(80);
  });

  it("mapSesionActividad2 pasa los parámetros correctos", async () => {
    const mock = vi.spyOn(score2, "calcularPuntaje").mockResolvedValue(70);

    const sesion = {
      game_results: {
        correct_answers: 5,
        image_opens: 2,
        time_spent_seconds: 60,
      },
      game_settings: { grid_size: 4 },
    };

    const result = await mapSesionActividad2(sesion);
    expect(mock).toHaveBeenCalledWith({
      correct_answers: sesion.game_results.correct_answers,
      image_opens: sesion.game_results.image_opens,
      time_spent_seconds: sesion.game_results.time_spent_seconds,
      gridSize: sesion.game_settings.grid_size,
    });
    expect(result).toBe(70);
  });

  it("mapSesionActividad3 pasa los parámetros correctos", async () => {
    const mock = vi
      .spyOn(score3, "calcularPuntajeActividad3")
      .mockResolvedValue(90);

    const sesion = {
      game_results: {
        preguntas: [{ errores: 0, tiempoRespuesta: 5 }],
      },
      game_settings: { cantidad_elementos: 4 },
    };

    const result = await mapSesionActividad3(sesion);
    expect(mock).toHaveBeenCalledWith({
      preguntas: sesion.game_results.preguntas,
      game_settings: sesion.game_settings,
    });
    expect(result).toBe(90);
  });
});
