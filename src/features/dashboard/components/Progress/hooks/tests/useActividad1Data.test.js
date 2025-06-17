import { renderHook } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { useActividad1Data } from "../useActividad1Data";

vi.mock("../../utils/scoreActividad1", () => ({
  calcularPuntajeActividad1: vi.fn().mockResolvedValue(80),
  generarObservacionesActividad1: vi.fn().mockResolvedValue("Buen trabajo."),
}));

const mockSesionesRaw = {
  s1: {
    fecha: "2023-01-01T10:00:00Z",
    game_results: {
      preguntas: [
        { desaciertos: 0, tiempo: 4 },
        { desaciertos: 1, tiempo: 6 },
      ],
      tiempos_por_target: [{ tiempo: 2 }, { tiempo: 3 }],
    },
    game_settings: { cantidad_modelos: 5 },
  },
  s2: {
    fecha: "2023-01-01T14:00:00Z",
    game_results: {
      preguntas: [
        { desaciertos: 0, tiempo: 5 },
        { desaciertos: 0, tiempo: 5 },
      ],
      tiempos_por_target: [{ tiempo: 3 }, { tiempo: 3 }],
    },
    game_settings: { cantidad_modelos: 7 },
  },
  s3: {
    fecha: "2023-01-01T16:00:00Z",
    game_results: {
      preguntas: [
        { desaciertos: 0, tiempo: 5 },
        { desaciertos: 1, tiempo: 5 },
      ],
      tiempos_por_target: [{ tiempo: 2 }, { tiempo: 2 }],
    },
    game_settings: { cantidad_modelos: 10 },
  },
};

describe("useActividad1Data", () => {
  it("procesa sesiones y retorna datos para el gráfico y detalles", async () => {
    const { result } = renderHook(() => useActividad1Data(mockSesionesRaw));

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    const { chartData, labels, obtenerDetallePorFecha } = result.current;

    expect(labels).toHaveLength(1);
    expect(chartData.datasets[0].data).toEqual([80]);

    const detalles = obtenerDetallePorFecha(labels[0]);
    expect(detalles).toHaveLength(3);

    expect(detalles[0].dificultad).toBe("Fácil");
    expect(detalles[1].dificultad).toBe("Media");
    expect(detalles[2].dificultad).toBe("Difícil");

    detalles.forEach((d) => {
      expect(d.puntaje).toBe(80);
      expect(d.observaciones).toMatch(/Buen trabajo/);
    });
  });
});
