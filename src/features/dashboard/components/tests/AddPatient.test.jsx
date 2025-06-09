import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useEffect } from "react";
import AddPatient from "../AddPatient";

vi.mock("../../../../hooks/useToast.js", () => ({
  default: () => ({
    notify: vi.fn(),
  }),
}));

const savePatientMock = vi.fn().mockResolvedValue({});
vi.mock("../../hooks/useSavePatient.js", () => ({
  default: () => ({
    savePatient: savePatientMock,
  }),
}));

vi.mock("../PatientForm", () => {
  const ValidForm = ({ onDataChange }) => {
    useEffect(() => {
      onDataChange({
        formData: { nombre: "Juan" },
        isFormValid: true,
      });
    }, [onDataChange]);
    return <div data-testid="form">Formulario Paciente</div>;
  };

  return {
    __esModule: true,
    default: ValidForm,
  };
});

describe("AddPatient component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("abre el modal al hacer clic en el botón", () => {
    render(<AddPatient />);
    fireEvent.click(screen.getByText("Añadir Paciente"));
    expect(screen.getByText("Nuevo Paciente")).toBeInTheDocument();
    expect(screen.getByTestId("form")).toBeInTheDocument();
  });

  it("guarda paciente y llama onPatientAdded si el formulario es válido", async () => {
    const onPatientAdded = vi.fn();

    render(<AddPatient onPatientAdded={onPatientAdded} />);
    fireEvent.click(screen.getByText("Añadir Paciente"));

    await waitFor(() => expect(screen.getByText("Guardar")).toBeEnabled());
    fireEvent.click(screen.getByText("Guardar"));

    await waitFor(() => {
      expect(savePatientMock).toHaveBeenCalledWith({ nombre: "Juan" });
      expect(onPatientAdded).toHaveBeenCalled();
    });
  });

  it("cierra el modal al cancelar", async () => {
    render(<AddPatient />);
    fireEvent.click(screen.getByText("Añadir Paciente"));

    await waitFor(() =>
      expect(screen.getByText("Nuevo Paciente")).toBeInTheDocument()
    );
    fireEvent.click(screen.getByText("Cancelar"));

    await waitFor(() => {
      expect(screen.queryByText("Nuevo Paciente")).not.toBeInTheDocument();
    });
  });
});
