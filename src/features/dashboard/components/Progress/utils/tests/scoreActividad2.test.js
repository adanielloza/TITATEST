import { describe, it, expect, vi, beforeEach } from "vitest";
import { calcularPuntaje, generarObservaciones } from "../scoreActividad2";
import { fetchParametrosActividad2 } from "../../services/actividad2ConfigService.js";

vi.mock("../../services/actividad2ConfigService.js", () => ({
  fetchParametrosActividad2: vi.fn(),
}));

const MOCK_CONFIG = {
  parametrosEsperadosPorGrid: {
    grid3: { aperturas: 5, tiempo: 60 },
    grid4: { aperturas: 8, tiempo: 90 },
    grid5: { aperturas: 15, tiempo: 150 },
  },
  penalizaciones: {
    demasiadasAperturas: 20,
    muyLento: 30,
    muyPocasCorrectas: 40,
  },
};

describe("calcularPuntaje", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("retorna 100 para un desempeño perfecto en grid 3", async () => {
    fetchParametrosActividad2.mockResolvedValue(MOCK_CONFIG);

    const result = await calcularPuntaje({
      correct_answers: 9,
      image_opens: 2,
      time_spent_seconds: 50,
      gridSize: 3,
    });

    expect(result).toBe(100);
  });

  it("penaliza respuestas incorrectas, tiempo y aperturas excesivas", async () => {
    fetchParametrosActividad2.mockResolvedValue(MOCK_CONFIG);

    const result = await calcularPuntaje({
      correct_answers: 5,
      image_opens: 10,
      time_spent_seconds: 100,
      gridSize: 3,
    });

    expect(result).toBeLessThan(100);
    expect(result).toBeGreaterThan(0);
  });

  it("devuelve un puntaje más alto con mayor dificultad (bonus)", async () => {
    fetchParametrosActividad2.mockResolvedValue(MOCK_CONFIG);

    const easy = await calcularPuntaje({
      correct_answers: 2,
      image_opens: 6,
      time_spent_seconds: 120,
      gridSize: 3,
    });

    const hard = await calcularPuntaje({
      correct_answers: 15,
      image_opens: 6,
      time_spent_seconds: 140,
      gridSize: 5,
    });

    expect(easy).toBeLessThan(100);
    expect(hard).toBeGreaterThan(easy);
  });

  it("retorna 0 si no hay configuración para el grid", async () => {
    fetchParametrosActividad2.mockResolvedValue({
      ...MOCK_CONFIG,
      parametrosEsperadosPorGrid: {},
    });

    const result = await calcularPuntaje({
      correct_answers: 9,
      image_opens: 1,
      time_spent_seconds: 40,
      gridSize: 3,
    });

    expect(result).toBe(0);
  });

  it("retorna 0 si la configuración no está disponible (null)", async () => {
    fetchParametrosActividad2.mockResolvedValue(null);

    const result = await calcularPuntaje({
      correct_answers: 9,
      image_opens: 1,
      time_spent_seconds: 40,
      gridSize: 3,
    });

    expect(result).toBe(0);
  });
});

describe("generarObservaciones", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("detecta pocas respuestas correctas", async () => {
    fetchParametrosActividad2.mockResolvedValue(MOCK_CONFIG);

    const result = await generarObservaciones({
      correct_answers: 3,
      image_opens: 2,
      time_spent_seconds: 40,
      gridSize: 3,
    });

    expect(result).toMatch(/Muy pocas respuestas correctas/);
  });

  it("detecta muchas aperturas de imagen", async () => {
    fetchParametrosActividad2.mockResolvedValue(MOCK_CONFIG);

    const result = await generarObservaciones({
      correct_answers: 9,
      image_opens: 10,
      time_spent_seconds: 40,
      gridSize: 3,
    });

    expect(result).toMatch(/Abrió muchas veces la imagen/);
  });

  it("detecta tiempo excesivo", async () => {
    fetchParametrosActividad2.mockResolvedValue(MOCK_CONFIG);

    const result = await generarObservaciones({
      correct_answers: 9,
      image_opens: 2,
      time_spent_seconds: 100,
      gridSize: 3,
    });

    expect(result).toMatch(/Tardó más de lo esperado/);
  });

  it("detecta buen desempeño en dificultad media o alta", async () => {
    fetchParametrosActividad2.mockResolvedValue(MOCK_CONFIG);

    const result = await generarObservaciones({
      correct_answers: 24,
      image_opens: 2,
      time_spent_seconds: 130,
      gridSize: 5,
    });

    expect(result).toMatch(/Muy buen desempeño considerando la dificultad/);
  });

  it("devuelve mensaje general si todo está bien", async () => {
    fetchParametrosActividad2.mockResolvedValue(MOCK_CONFIG);

    const result = await generarObservaciones({
      correct_answers: 9,
      image_opens: 2,
      time_spent_seconds: 50,
      gridSize: 3,
    });

    expect(result).toBe("- Buen desempeño.");
  });

  it("retorna cadena vacía si no hay configuración", async () => {
    fetchParametrosActividad2.mockResolvedValue({
      ...MOCK_CONFIG,
      parametrosEsperadosPorGrid: {},
    });

    const result = await generarObservaciones({
      correct_answers: 9,
      image_opens: 2,
      time_spent_seconds: 50,
      gridSize: 3,
    });

    expect(result).toBe("");
  });

  it("retorna cadena vacía si config es null", async () => {
    fetchParametrosActividad2.mockResolvedValue(null);

    const result = await generarObservaciones({
      correct_answers: 9,
      image_opens: 2,
      time_spent_seconds: 50,
      gridSize: 3,
    });

    expect(result).toBe("");
  });

  it("devuelve un puntaje más alto con mayor dificultad (bonus)", async () => {
    fetchParametrosActividad2.mockResolvedValue(MOCK_CONFIG);

    const easy = await calcularPuntaje({
      correct_answers: 2,
      image_opens: 6,
      time_spent_seconds: 120,
      gridSize: 3,
    });

    const hard = await calcularPuntaje({
      correct_answers: 15,
      image_opens: 6,
      time_spent_seconds: 140,
      gridSize: 5,
    });

    expect(easy).toBeLessThan(100);
    expect(hard).toBeGreaterThan(easy);
  });

  it("aplica 1.0 como fallback si gridSize no está en dificultadBonus", async () => {
    fetchParametrosActividad2.mockResolvedValue({
      ...MOCK_CONFIG,
      parametrosEsperadosPorGrid: {
        grid10: { aperturas: 10, tiempo: 100 },
      },
    });

    const result = await calcularPuntaje({
      correct_answers: 100,
      image_opens: 1,
      time_spent_seconds: 80,
      gridSize: 10,
    });

    expect(result).toBeLessThanOrEqual(100);
  });
});
