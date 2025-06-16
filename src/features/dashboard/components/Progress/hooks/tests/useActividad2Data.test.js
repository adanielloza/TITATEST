import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { useActividad2Data } from "../../hooks/useActividad2Data";
import {
  calcularPuntaje,
  generarObservaciones,
} from "../../utils/scoreActividad2";

vi.mock("../../utils/scoreActividad2.js", () => ({
  calcularPuntaje: vi.fn(),
  generarObservaciones: vi.fn(),
}));

const SESIONES_RAW = {
  a1: {
    fecha: "2024-06-01T10:00:00Z",
    game_results: {
      correct_answers: 7,
      image_opens: 4,
      time_spent_seconds: 55,
    },
    game_settings: {
      grid_size: 3,
    },
  },
  a2: {
    fecha: "2024-06-01T15:00:00Z",
    game_results: {
      correct_answers: 9,
      image_opens: 2,
      time_spent_seconds: 40,
    },
    game_settings: {
      grid_size: 3,
    },
  },
};

describe("useActividad2Data", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("procesa sesiones y genera datos de chart y detalle", async () => {
    calcularPuntaje
      .mockResolvedValueOnce(80)
      .mockResolvedValueOnce(100)
      .mockResolvedValueOnce(80)
      .mockResolvedValueOnce(100);

    generarObservaciones
      .mockResolvedValueOnce("Observación 1.")
      .mockResolvedValueOnce("Observación 2.");

    const { result } = renderHook(() => useActividad2Data(SESIONES_RAW));

    await act(async () => {
      await Promise.resolve();
    });

    const { chartData, labels, obtenerDetallePorFecha } = result.current;

    expect(labels).toEqual(["01 de junio"]);

    expect(chartData.datasets[0].data).toEqual([90]);

    const detalles = obtenerDetallePorFecha("01 de junio");
    expect(detalles).toHaveLength(2);

    expect(detalles[0].puntaje).toBe(80);
    expect(detalles[1].puntaje).toBe(100);
    expect(detalles[0].observaciones).toContain("Observación 1.");
    expect(detalles[1].observaciones).toContain("Observación 2.");
  });

  it("no lanza errores si no hay sesiones", () => {
    const { result } = renderHook(() => useActividad2Data(null));
    expect(result.current.labels).toEqual([]);
  });
});
