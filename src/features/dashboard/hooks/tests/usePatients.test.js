import { renderHook, act, waitFor } from "@testing-library/react";
import usePatients from "../usePatients";
import * as patientService from "../../services/patientService";
import * as calcAge from "../../../../utils/calculateAge";
import { useLoader } from "../../../../contexts/LoaderContext";
import useToast from "../../../../hooks/useToast";

vi.mock("../../../../contexts/LoaderContext", () => ({
  useLoader: vi.fn(),
}));

vi.mock("../../../../hooks/useToast", () => ({
  default: vi.fn(),
}));

vi.mock("../../services/patientService");
vi.mock("../../../../utils/calculateAge");

describe("usePatients hook", () => {
  const showLoader = vi.fn();
  const hideLoader = vi.fn();
  const notify = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    useLoader.mockReturnValue({ showLoader, hideLoader });
    useToast.mockReturnValue({ notify });
  });

  it("fetchPatients carga y parsea pacientes correctamente", async () => {
    patientService.fetchAllPatients.mockResolvedValue({
      1: {
        id: "1",
        datos_personales: {
          nombre: "Ana",
          apellido: "Lopez",
          fechaNacimiento: "01/01/2010",
        },
      },
      2: {
        id: "2",
        datos_personales: {
          nombre: "Luis",
          apellido: "Gomez",
          fechaNacimiento: "02/02/2012",
        },
      },
    });
    calcAge.calculateAge.mockReturnValueOnce(15).mockReturnValueOnce(13);

    const { result } = renderHook(() => usePatients());

    await waitFor(() => expect(result.current.patients.length).toBe(2));

    expect(showLoader).toHaveBeenCalledTimes(1);
    expect(hideLoader).toHaveBeenCalledTimes(1);
    expect(result.current.patients).toEqual([
      {
        id: 1,
        nombre: "Ana",
        apellido: "Lopez",
        fechaNacimiento: "01/01/2010",
        edad: 15,
      },
      {
        id: 2,
        nombre: "Luis",
        apellido: "Gomez",
        fechaNacimiento: "02/02/2012",
        edad: 13,
      },
    ]);
  });

  it("fetchPatients maneja errores sin romper el hook", async () => {
    patientService.fetchAllPatients.mockRejectedValue(new Error("fail fetch"));

    const { result } = renderHook(() => usePatients());

    await waitFor(() => expect(hideLoader).toHaveBeenCalled());

    expect(showLoader).toHaveBeenCalledTimes(1);
    expect(result.current.patients).toEqual([]);
  });

  it("confirmDelete elimina paciente con éxito, notifica y recarga", async () => {
    patientService.fetchAllPatients
      .mockResolvedValueOnce({})
      .mockResolvedValueOnce({});
    patientService.deletePatientById.mockResolvedValue();

    const { result } = renderHook(() => usePatients());

    await waitFor(() => expect(hideLoader).toHaveBeenCalled());

    act(() => {
      result.current.setPatientToDelete({ id: 5 });
      result.current.setIsModalOpen(true);
    });

    await act(async () => {
      await result.current.confirmDelete();
    });

    expect(showLoader).toHaveBeenCalledTimes(3);
    expect(notify).toHaveBeenCalledWith(
      "success",
      "Paciente eliminado correctamente"
    );
    expect(result.current.patientToDelete).toBeNull();
    expect(result.current.isModalOpen).toBe(false);
  });

  it("confirmDelete maneja error en delete sin romper", async () => {
    patientService.fetchAllPatients.mockResolvedValue({});
    patientService.deletePatientById.mockRejectedValue(
      new Error("delete fail")
    );

    const { result } = renderHook(() => usePatients());

    await waitFor(() => expect(hideLoader).toHaveBeenCalled());

    act(() => {
      result.current.setPatientToDelete({ id: 10 });
      result.current.setIsModalOpen(true);
    });

    await act(async () => {
      await result.current.confirmDelete();
    });

    expect(showLoader).toHaveBeenCalledTimes(2);
    expect(notify).toHaveBeenCalledWith("error", "Error al eliminar paciente");
    expect(result.current.isModalOpen).toBe(true);
  });
});
