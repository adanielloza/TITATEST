import { renderHook, waitFor } from "@testing-library/react";
import usePatientDropdown from "../usePatientDropdown";

vi.mock("../../../../services/firebase.js", () => ({
  get: vi.fn(),
  ref: vi.fn(),
  child: vi.fn(),
  rtdb: {},
}));

vi.mock("../../../../contexts/LoaderContext.jsx", () => ({
  useLoader: () => ({
    showLoader: vi.fn(),
    hideLoader: vi.fn(),
  }),
}));

import { get } from "../../../../services/firebase.js";

describe("usePatientDropdown", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("carga correctamente las opciones desde Firebase", async () => {
    get.mockResolvedValueOnce({
      exists: () => true,
      val: () => ({
        paciente_1: {
          datos_personales: {
            nombre: "Lucía",
            apellido: "Castro",
          },
        },
        paciente_2: {
          datos_personales: {
            nombre: "Juan",
            apellido: "Pérez",
          },
        },
      }),
    });

    const { result } = renderHook(() => usePatientDropdown());

    await waitFor(() => {
      expect(result.current.options).toEqual([
        { value: "paciente_1", label: "Lucía Castro" },
        { value: "paciente_2", label: "Juan Pérez" },
      ]);
    });
  });

  it("devuelve arreglo vacío si no existen pacientes", async () => {
    get.mockResolvedValueOnce({
      exists: () => false,
    });

    const { result } = renderHook(() => usePatientDropdown());

    await waitFor(() => {
      expect(result.current.options).toEqual([]);
    });
  });

  it("maneja errores de forma segura", async () => {
    get.mockRejectedValueOnce(new Error("Firebase error"));

    const { result } = renderHook(() => usePatientDropdown());

    await waitFor(() => {
      expect(result.current.options).toEqual([]);
    });
  });

  it("maneja pacientes sin datos_personales", async () => {
    get.mockResolvedValueOnce({
      exists: () => true,
      val: () => ({
        paciente_3: {},
      }),
    });

    const { result } = renderHook(() => usePatientDropdown());

    await waitFor(() => {
      expect(result.current.options).toEqual([
        { value: "paciente_3", label: "undefined undefined" },
      ]);
    });
  });
});
