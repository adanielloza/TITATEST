import { renderHook, waitFor } from "@testing-library/react";
import usePatientActivityData from "../usePatientActivityData";
import * as firebase from "../../../../services/firebase";
import { useLoader } from "../../../../contexts/LoaderContext";

vi.mock("../../../../contexts/LoaderContext", () => ({
  useLoader: vi.fn(),
}));

vi.mock("../../../../services/firebase", () => ({
  ref: vi.fn(),
  child: vi.fn(),
  get: vi.fn(),
  rtdb: {},
}));

describe("usePatientActivityData", () => {
  const showLoader = vi.fn();
  const hideLoader = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    useLoader.mockReturnValue({ showLoader, hideLoader });
  });

  it("obtiene datos del paciente y actividades agrupadas", async () => {
    const mockInfoSnap = {
      exists: () => true,
      val: () => ({
        nombre: "Lucía",
        apellido: "Castro",
      }),
    };

    const mockActSnap = {
      exists: () => true,
      val: () => ({
        actividad_1: {
          sesion_1: { fecha: "2023-05-01", hora: "10:00" },
          sesion_2: { fecha: "2023-05-02", hora: "11:00" },
        },
      }),
    };

    let getCalls = 0;
    firebase.get.mockImplementation(() => {
      getCalls++;
      return getCalls === 1
        ? Promise.resolve(mockInfoSnap)
        : Promise.resolve(mockActSnap);
    });

    const childMock = vi.fn(() => ({}));
    firebase.child.mockImplementation(childMock);

    const { result } = renderHook(() => usePatientActivityData("paciente_9"));

    await waitFor(() => {
      expect(result.current.patientInfo).toEqual({
        nombre: "Lucía",
        apellido: "Castro",
      });

      expect(result.current.activityHistory).toEqual([
        {
          actividadId: "actividad_1",
          sesiones: [
            { sesionId: "sesion_2", fecha: "2023-05-02", hora: "11:00" },
            { sesionId: "sesion_1", fecha: "2023-05-01", hora: "10:00" },
          ],
        },
      ]);
    });

    expect(showLoader).toHaveBeenCalled();
    expect(hideLoader).toHaveBeenCalled();
  });

  it("maneja el caso cuando no hay datos", async () => {
    const emptySnap = { exists: () => false };

    firebase.get.mockResolvedValue(emptySnap);
    firebase.child.mockReturnValue({});

    const { result } = renderHook(() => usePatientActivityData("paciente_999"));

    await waitFor(() => {
      expect(result.current.patientInfo).toBeNull();
      expect(result.current.activityHistory).toEqual([]);
    });
  });
});
