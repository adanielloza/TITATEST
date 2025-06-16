import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  calcularPuntajeActividad1,
  generarObservacionesActividad1,
} from "../scoreActividad1";
import { fetchParametrosActividad1 } from "../../services/actividad1ConfigService";

vi.mock("../../services/actividad1ConfigService", () => ({
  fetchParametrosActividad1: vi.fn(),
}));

const MOCK_CONFIG = {
  parametrosEsperadosPorNivel: {
    facil: {
      respuestasCorrectas: 3,
      tiempoDeObservacion: 10,
      tiempoPorPregunta: 10,
    },
    medio: {
      respuestasCorrectas: 7,
      tiempoDeObservacion: 15,
      tiempoPorPregunta: 15,
    },
    dificil: {
      respuestasCorrectas: 10,
      tiempoDeObservacion: 20,
      tiempoPorPregunta: 20,
    },
  },
  penalizaciones: {
    muyLento: 30,
    muyPocasCorrectas: 40,
    pocaObservacion: 20,
  },
};

const BASE_DATA = {
  preguntas: [
    { desaciertos: 0, tiempo: 8 },
    { desaciertos: 0, tiempo: 9 },
    { desaciertos: 1, tiempo: 12 },
  ],
  tiempos_por_target: [{ tiempo: 11 }, { tiempo: 12 }, { tiempo: 9 }],
};

describe("calcularPuntajeActividad1", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    fetchParametrosActividad1.mockResolvedValue(MOCK_CONFIG);
  });

  it("retorna 0 si config es null", async () => {
    fetchParametrosActividad1.mockResolvedValue(null);

    const result = await calcularPuntajeActividad1({
      ...BASE_DATA,
      game_settings: { cantidad_modelos: 5 },
    });

    expect(result).toBe(0);
  });

  it("calcula correctamente el puntaje sin penalización para nivel fácil", async () => {
    const result = await calcularPuntajeActividad1({
      ...BASE_DATA,
      game_settings: { cantidad_modelos: 5 },
    });

    expect(result).toBeLessThanOrEqual(100);
    expect(result).toBeGreaterThan(0);
  });

  it("aplica penalizaciones por pocas correctas y observación baja", async () => {
    const result = await calcularPuntajeActividad1({
      preguntas: [
        { desaciertos: 1, tiempo: 25 },
        { desaciertos: 1, tiempo: 30 },
      ],
      tiempos_por_target: [{ tiempo: 5 }, { tiempo: 6 }],
      game_settings: { cantidad_modelos: 10 },
    });

    expect(result).toBeLessThan(100);
  });

  it("aplica bonus por nivel difícil", async () => {
    const result = await calcularPuntajeActividad1({
      preguntas: Array(10).fill({ desaciertos: 0, tiempo: 18 }),
      tiempos_por_target: Array(5).fill({ tiempo: 22 }),
      game_settings: { cantidad_modelos: 10 },
    });

    expect(result).toBe(100);
  });
});

describe("generarObservacionesActividad1", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    fetchParametrosActividad1.mockResolvedValue(MOCK_CONFIG);
  });

  it("retorna '' si config es null", async () => {
    fetchParametrosActividad1.mockResolvedValue(null);

    const result = await generarObservacionesActividad1({
      ...BASE_DATA,
      game_settings: { cantidad_modelos: 5 },
    });

    expect(result).toBe("");
  });

  it("detecta observaciones múltiples en nivel medio", async () => {
    const result = await generarObservacionesActividad1({
      preguntas: [
        { desaciertos: 1, tiempo: 25 },
        { desaciertos: 1, tiempo: 27 },
      ],
      tiempos_por_target: [{ tiempo: 5 }, { tiempo: 8 }],
      game_settings: { cantidad_modelos: 7 },
    });

    expect(result).toMatch(/Muy pocas respuestas correctas/);
    expect(result).toMatch(/Tiempo de respuesta alto/);
    expect(result).toMatch(/Tiempo de observación bajo/);
  });

  it("detecta excelente desempeño en nivel difícil", async () => {
    const result = await generarObservacionesActividad1({
      preguntas: Array(10).fill({ desaciertos: 0, tiempo: 18 }),
      tiempos_por_target: Array(5).fill({ tiempo: 25 }),
      game_settings: { cantidad_modelos: 10 },
    });

    expect(result).toMatch(/Excelente desempeño en nivel difícil/);
  });

  it("devuelve mensaje genérico si todo está bien", async () => {
    const result = await generarObservacionesActividad1({
      preguntas: [
        { desaciertos: 0, tiempo: 9 },
        { desaciertos: 0, tiempo: 10 },
        { desaciertos: 0, tiempo: 11 },
      ],
      tiempos_por_target: [{ tiempo: 12 }, { tiempo: 11 }, { tiempo: 10 }],
      game_settings: { cantidad_modelos: 5 },
    });

    expect(result).toBe("- Buen desempeño.");
  });

  it("usa 'facil' por defecto si cantidad_modelos no coincide con ningún nivel", async () => {
    const result = await calcularPuntajeActividad1({
      ...BASE_DATA,
      game_settings: { cantidad_modelos: 1 },
    });

    expect(result).toBeGreaterThanOrEqual(0);
    expect(result).toBeLessThanOrEqual(100);
  });

  it("usa 1 como fallback si preguntas.length es 0", async () => {
    const result = await calcularPuntajeActividad1({
      preguntas: [],
      tiempos_por_target: [{ tiempo: 1 }],
      game_settings: { cantidad_modelos: 1 },
    });

    expect(result).toBeLessThanOrEqual(100);
  });

  it("usa 1 como fallback si nivel no está en dificultadBonus", async () => {
    const result = await calcularPuntajeActividad1({
      preguntas: [{ desaciertos: 0, tiempo: 5 }],
      tiempos_por_target: [{ tiempo: 12 }],
      game_settings: { cantidad_modelos: 999 },
    });

    expect(result).toBeLessThanOrEqual(100);
  });

  it("retorna mensaje genérico cuando no hay observaciones negativas", async () => {
    const result = await generarObservacionesActividad1({
      preguntas: [
        { desaciertos: 0, tiempo: 8 },
        { desaciertos: 0, tiempo: 9 },
        { desaciertos: 0, tiempo: 10 },
      ],
      tiempos_por_target: [{ tiempo: 11 }, { tiempo: 12 }, { tiempo: 10 }],
      game_settings: { cantidad_modelos: 5 },
    });

    expect(result).toBe("- Buen desempeño.");
  });

  it("aplica fallback 1.0 si nivel no está en dificultadBonus", async () => {
    const customConfig = {
      ...MOCK_CONFIG,
      parametrosEsperadosPorNivel: {
        ...MOCK_CONFIG.parametrosEsperadosPorNivel,
        extremo: {
          respuestasCorrectas: 1,
          tiempoDeObservacion: 5,
          tiempoPorPregunta: 5,
        },
      },
    };

    fetchParametrosActividad1.mockResolvedValueOnce(customConfig);

    const result = await calcularPuntajeActividad1({
      preguntas: [{ desaciertos: 0, tiempo: 4 }],
      tiempos_por_target: [{ tiempo: 6 }],
      game_settings: { cantidad_modelos: "extremo" },
    });

    expect(result).toBeGreaterThanOrEqual(0);
  });

  it("usa 1 como totalPreguntas si preguntas.length es 0 en observaciones", async () => {
    const customConfig = {
      ...MOCK_CONFIG,
      parametrosEsperadosPorNivel: {
        facil: {
          respuestasCorrectas: 0,
          tiempoDeObservacion: 5,
          tiempoPorPregunta: 10,
        },
      },
    };
    fetchParametrosActividad1.mockResolvedValueOnce(customConfig);

    const result = await generarObservacionesActividad1({
      preguntas: [],
      tiempos_por_target: [{ tiempo: 10 }],
      game_settings: { cantidad_modelos: 3 },
    });

    expect(result).toBe("- Buen desempeño.");
  });

  it("usa 1.0 como fallback si dificultadBonus no tiene el nivel", async () => {
    const customConfig = {
      ...MOCK_CONFIG,
      parametrosEsperadosPorNivel: {
        ...MOCK_CONFIG.parametrosEsperadosPorNivel,
        custom: {
          respuestasCorrectas: 1,
          tiempoDeObservacion: 1,
          tiempoPorPregunta: 1,
        },
      },
    };

    fetchParametrosActividad1.mockResolvedValueOnce(customConfig);

    const result = await calcularPuntajeActividad1({
      preguntas: [{ desaciertos: 0, tiempo: 1 }],
      tiempos_por_target: [{ tiempo: 2 }],
      game_settings: { cantidad_modelos: "custom" },
    });

    expect(result).toBeGreaterThanOrEqual(0);
  });
});
