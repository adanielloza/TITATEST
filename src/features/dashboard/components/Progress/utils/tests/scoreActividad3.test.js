import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  calcularPuntajeActividad3,
  generarObservacionesActividad3,
} from "../scoreActividad3";
import { fetchParametrosActividad3 } from "../../services/actividad3ConfigService.js";

vi.mock("../../services/actividad3ConfigService.js", () => ({
  fetchParametrosActividad3: vi.fn(),
}));

const MOCK_CONFIG = {
  parametrosEsperadosPorNivel: {
    facil: { respuestasCorrectas: 3, tiempoPorPregunta: 5 },
    medio: { respuestasCorrectas: 5, tiempoPorPregunta: 7 },
    dificil: { respuestasCorrectas: 7, tiempoPorPregunta: 10 },
  },
  penalizaciones: {
    muyLento: 30,
    muyPocasCorrectas: 40,
  },
};

describe("calcularPuntajeActividad3", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("devuelve 100 con desempeño perfecto en nivel fácil", async () => {
    fetchParametrosActividad3.mockResolvedValue(MOCK_CONFIG);

    const result = await calcularPuntajeActividad3({
      preguntas: [
        { errores: 0, tiempoRespuesta: 3 },
        { errores: 0, tiempoRespuesta: 4 },
        { errores: 0, tiempoRespuesta: 5 },
      ],
      game_settings: { cantidad_elementos: 3 },
    });

    expect(result).toBe(100);
  });

  it("penaliza respuestas incorrectas y tiempo excesivo", async () => {
    fetchParametrosActividad3.mockResolvedValue(MOCK_CONFIG);

    const result = await calcularPuntajeActividad3({
      preguntas: [
        { errores: 1, tiempoRespuesta: 12 },
        { errores: 0, tiempoRespuesta: 11 },
        { errores: 2, tiempoRespuesta: 13 },
      ],
      game_settings: { cantidad_elementos: 5 },
    });

    expect(result).toBeLessThan(100);
    expect(result).toBeGreaterThan(0);
  });

  it("aplica bonus por nivel difícil", async () => {
    fetchParametrosActividad3.mockResolvedValue(MOCK_CONFIG);

    const result = await calcularPuntajeActividad3({
      preguntas: [
        { errores: 0, tiempoRespuesta: 8 },
        { errores: 0, tiempoRespuesta: 9 },
        { errores: 0, tiempoRespuesta: 10 },
        { errores: 0, tiempoRespuesta: 9 },
        { errores: 0, tiempoRespuesta: 10 },
        { errores: 0, tiempoRespuesta: 11 },
        { errores: 0, tiempoRespuesta: 10 },
      ],
      game_settings: { cantidad_elementos: 5 },
    });

    expect(result).toBeGreaterThan(90);
  });

  it("retorna 0 si no hay configuración disponible", async () => {
    fetchParametrosActividad3.mockResolvedValue(null);

    const result = await calcularPuntajeActividad3({
      preguntas: [],
      game_settings: { cantidad_elementos: 3 },
    });

    expect(result).toBe(0);
  });
});

describe("generarObservacionesActividad3", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("detecta pocas respuestas correctas", async () => {
    fetchParametrosActividad3.mockResolvedValue(MOCK_CONFIG);

    const result = await generarObservacionesActividad3({
      preguntas: [
        { errores: 1, tiempoRespuesta: 4 },
        { errores: 2, tiempoRespuesta: 5 },
        { errores: 3, tiempoRespuesta: 4 },
      ],
      game_settings: { cantidad_elementos: 3 },
    });

    expect(result).toMatch(/Muy pocas respuestas correctas/);
  });

  it("detecta tiempo de respuesta alto", async () => {
    fetchParametrosActividad3.mockResolvedValue(MOCK_CONFIG);

    const result = await generarObservacionesActividad3({
      preguntas: [
        { errores: 0, tiempoRespuesta: 12 },
        { errores: 0, tiempoRespuesta: 13 },
        { errores: 0, tiempoRespuesta: 14 },
      ],
      game_settings: { cantidad_elementos: 5 },
    });

    expect(result).toMatch(/Tiempo de respuesta alto/);
  });

  it("muestra excelente desempeño si aplica", async () => {
    fetchParametrosActividad3.mockResolvedValue(MOCK_CONFIG);

    const result = await generarObservacionesActividad3({
      preguntas: Array(7).fill({ errores: 0, tiempoRespuesta: 8 }),
      game_settings: { cantidad_elementos: 5 },
    });

    expect(result).toMatch(/Excelente desempeño en nivel difícil/);
  });

  it("devuelve observación genérica si todo está bien", async () => {
    fetchParametrosActividad3.mockResolvedValue(MOCK_CONFIG);

    const result = await generarObservacionesActividad3({
      preguntas: [
        { errores: 0, tiempoRespuesta: 4 },
        { errores: 0, tiempoRespuesta: 5 },
        { errores: 0, tiempoRespuesta: 5 },
      ],
      game_settings: { cantidad_elementos: 3 },
    });

    expect(result).toBe("- Buen desempeño.");
  });

  it("retorna cadena vacía si no hay configuración", async () => {
    fetchParametrosActividad3.mockResolvedValue(null);

    const result = await generarObservacionesActividad3({
      preguntas: [],
      game_settings: { cantidad_elementos: 3 },
    });

    expect(result).toBe("");
  });
});
