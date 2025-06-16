import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  fetchParametrosActividad2,
  __setCachedParametros,
} from "../actividad2ConfigService";

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

const MOCK_CONFIG = {
  parametrosEsperadosPorGrid: {
    grid3: { aperturas: 4, tiempo: 55 },
  },
  penalizaciones: {
    demasiadasAperturas: 10,
    muyLento: 20,
    muyPocasCorrectas: 30,
  },
};

describe("fetchParametrosActividad2", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    __setCachedParametros(null);
  });

  it("retorna los parámetros desde Firebase si existen", async () => {
    get.mockResolvedValue({
      exists: () => true,
      val: () => MOCK_CONFIG,
    });

    const result = await fetchParametrosActividad2();

    expect(ref).toHaveBeenCalled();
    expect(get).toHaveBeenCalled();
    expect(result).toEqual(MOCK_CONFIG);
  });

  it("retorna parámetros por defecto si no hay datos en Firebase", async () => {
    get.mockResolvedValue({
      exists: () => false,
    });

    const result = await fetchParametrosActividad2();

    expect(result).toHaveProperty("parametrosEsperadosPorGrid.grid3");
    expect(result.parametrosEsperadosPorGrid.grid3.aperturas).toBe(5);
  });

  it("retorna parámetros por defecto si ocurre un error", async () => {
    get.mockRejectedValue(new Error("RTDB error"));

    const result = await fetchParametrosActividad2();

    expect(result).toHaveProperty("parametrosEsperadosPorGrid.grid4");
    expect(result.parametrosEsperadosPorGrid.grid4.tiempo).toBe(90);
  });

  it("usa caché si ya fue llamado antes", async () => {
    get.mockResolvedValue({
      exists: () => true,
      val: () => MOCK_CONFIG,
    });

    const first = await fetchParametrosActividad2();
    expect(first).toEqual(MOCK_CONFIG);

    get.mockClear();
    const second = await fetchParametrosActividad2();
    expect(get).not.toHaveBeenCalled();
    expect(second).toEqual(MOCK_CONFIG);
  });
});
