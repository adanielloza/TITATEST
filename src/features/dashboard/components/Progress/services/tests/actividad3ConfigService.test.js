import { describe, it, expect, vi, beforeEach } from "vitest";
import { ref, get } from "firebase/database";
import {
  fetchParametrosActividad3,
  __setCachedParametrosActividad3,
} from "../../services/actividad3ConfigService";

vi.mock("../../../../../../services/firebase.js", () => ({
  rtdb: "mocked-rtdb",
}));

vi.mock("firebase/database", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    ref: vi.fn(),
    get: vi.fn(),
    getDatabase: vi.fn(),
  };
});

const MOCK_CONFIG = {
  parametrosEsperadosPorNivel: {
    medio: {
      respuestasCorrectas: 6,
      tiempoPorPregunta: 8,
    },
  },
  penalizaciones: {
    muyLento: 20,
    muyPocasCorrectas: 35,
  },
};

describe("fetchParametrosActividad3", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    __setCachedParametrosActividad3(null);
  });

  it("retorna los parámetros desde Firebase si existen", async () => {
    get.mockResolvedValue({
      exists: () => true,
      val: () => MOCK_CONFIG,
    });

    const result = await fetchParametrosActividad3();

    expect(ref).toHaveBeenCalledWith(
      "mocked-rtdb",
      "parametros_actividades/actividad_3"
    );
    expect(get).toHaveBeenCalled();
    expect(result).toEqual(MOCK_CONFIG);
  });

  it("retorna parámetros por defecto si no hay datos en Firebase", async () => {
    get.mockResolvedValue({
      exists: () => false,
    });

    const result = await fetchParametrosActividad3();

    expect(result).toHaveProperty("parametrosEsperadosPorNivel.facil");
    expect(result.parametrosEsperadosPorNivel.facil.respuestasCorrectas).toBe(
      3
    );
  });

  it("retorna parámetros por defecto si ocurre un error", async () => {
    get.mockRejectedValue(new Error("RTDB error"));

    const result = await fetchParametrosActividad3();

    expect(result).toHaveProperty("penalizaciones.muyLento");
    expect(result.penalizaciones.muyLento).toBe(30);
  });

  it("usa caché si ya fue llamado antes", async () => {
    get.mockResolvedValue({
      exists: () => true,
      val: () => MOCK_CONFIG,
    });

    const first = await fetchParametrosActividad3();
    expect(first).toEqual(MOCK_CONFIG);

    get.mockClear();
    const second = await fetchParametrosActividad3();
    expect(get).not.toHaveBeenCalled();
    expect(second).toEqual(MOCK_CONFIG);
  });
});
