import { describe, it, expect, vi, beforeEach } from "vitest";

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

import { ref, get } from "firebase/database";
import {
  fetchParametrosActividad1,
  __setCachedParametrosActividad1,
} from "../../services/actividad1ConfigService";

const MOCK_CONFIG = {
  parametrosEsperadosPorNivel: {
    medio: {
      respuestasCorrectas: 5,
      tiempoDeObservacion: 12,
      tiempoPorPregunta: 13,
    },
  },
  penalizaciones: {
    muyLento: 25,
    muyPocasCorrectas: 35,
    pocaObservacion: 15,
  },
};

describe("fetchParametrosActividad1", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    __setCachedParametrosActividad1(null);
  });

  it("retorna los parámetros desde Firebase si existen", async () => {
    get.mockResolvedValue({
      exists: () => true,
      val: () => MOCK_CONFIG,
    });

    const result = await fetchParametrosActividad1();

    expect(ref).toHaveBeenCalledWith(
      "mocked-rtdb",
      "parametros_actividades/actividad_1"
    );
    expect(get).toHaveBeenCalled();
    expect(result).toEqual(MOCK_CONFIG);
  });

  it("retorna parámetros por defecto si no hay datos en Firebase", async () => {
    get.mockResolvedValue({
      exists: () => false,
    });

    const result = await fetchParametrosActividad1();

    expect(result).toHaveProperty("parametrosEsperadosPorNivel.facil");
    expect(result.parametrosEsperadosPorNivel.facil.respuestasCorrectas).toBe(
      3
    );
  });

  it("retorna parámetros por defecto si ocurre un error", async () => {
    get.mockRejectedValue(new Error("RTDB error"));

    const result = await fetchParametrosActividad1();

    expect(result).toHaveProperty("penalizaciones.muyLento");
    expect(result.penalizaciones.muyLento).toBe(30);
  });

  it("usa caché si ya fue llamado antes", async () => {
    get.mockResolvedValue({
      exists: () => true,
      val: () => MOCK_CONFIG,
    });

    const first = await fetchParametrosActividad1();
    expect(first).toEqual(MOCK_CONFIG);

    get.mockClear();
    const second = await fetchParametrosActividad1();
    expect(get).not.toHaveBeenCalled();
    expect(second).toEqual(MOCK_CONFIG);
  });
});
