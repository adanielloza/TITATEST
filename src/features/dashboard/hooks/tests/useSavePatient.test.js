import { renderHook, act } from "@testing-library/react";
import useSavePatient from "../useSavePatient";
import { savePatientToDB } from "../../services/patientService";
import useToast from "../../../../hooks/useToast";
import { useCapitalize, useFormatDate } from "../../../../utils/formatters";

vi.mock("../../../../hooks/useToast", () => ({
  default: vi.fn(),
}));
vi.mock("../../../../utils/formatters", () => ({
  useCapitalize: vi.fn(),
  useFormatDate: vi.fn(),
}));
vi.mock("../../services/patientService", () => ({
  savePatientToDB: vi.fn(),
}));

describe("useSavePatient", () => {
  const notify = vi.fn();
  const capitalize = vi.fn();
  const formatDate = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    useToast.mockReturnValue({ notify });
    useCapitalize.mockReturnValue(capitalize);
    useFormatDate.mockReturnValue(formatDate);
  });

  it("guarda paciente correctamente y muestra notificación de éxito", async () => {
    const formData = {
      nombre: "juan",
      apellido: "perez",
      fechaNacimiento: "2024-06-01",
      sexo: "masculino",
      tipoTDAH: "tdah",
      nombreTutor: "ana perez",
      telefonoTutor: "0999999999",
      correoTutor: "EMAIL@EXAMPLE.COM",
      observaciones: "ninguna",
    };

    capitalize.mockImplementation((str) => str.toUpperCase());
    formatDate.mockReturnValue("01/06/2024");

    const { result } = renderHook(() => useSavePatient());

    await act(async () => {
      await result.current.savePatient(formData);
    });

    expect(savePatientToDB).toHaveBeenCalledWith({
      nombre: "JUAN",
      apellido: "PEREZ",
      fechaNacimiento: "01/06/2024",
      sexo: "MASCULINO",
      tipoTDAH: "TDAH",
      nombreTutor: "ANA PEREZ",
      telefonoTutor: "0999999999",
      correoTutor: "email@example.com",
      observaciones: "ninguna",
    });

    expect(notify).toHaveBeenCalledWith(
      "success",
      "Paciente registrado correctamente"
    );
  });

  it("maneja errores y muestra notificación de error", async () => {
    savePatientToDB.mockRejectedValue(new Error("fail save"));

    const { result } = renderHook(() => useSavePatient());

    await act(async () => {
      await result.current.savePatient({});
    });

    expect(notify).toHaveBeenCalledWith("error", "Error al registrar paciente");
  });

  it("usa observaciones vacías si no se proporciona", async () => {
    const formData = {
      nombre: "juan",
      apellido: "perez",
      fechaNacimiento: "2024-06-01",
      sexo: "masculino",
      tipoTDAH: "tdah",
      nombreTutor: "ana perez",
      telefonoTutor: "0999999999",
      correoTutor: "EMAIL@EXAMPLE.COM",
      // sin observaciones
    };

    capitalize.mockImplementation((str) => str.toUpperCase());
    formatDate.mockReturnValue("01/06/2024");

    const { result } = renderHook(() => useSavePatient());

    await act(async () => {
      await result.current.savePatient(formData);
    });

    expect(savePatientToDB).toHaveBeenCalledWith(
      expect.objectContaining({
        observaciones: "",
      })
    );
  });
});
