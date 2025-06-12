import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useEffect } from "react";
import { updatePatientById } from "../../services/patientService.js";
import EditPatient from "../EditPatient";

const notifyMock = vi.fn();
vi.mock("../../../../hooks/useToast.js", () => ({
  default: () => ({ notify: notifyMock }),
}));

vi.mock("../../../../utils/formatters.js", () => ({
  useCapitalize: () => (str) => str.toUpperCase(),
  useFormatDate: () => (date) => date.toISOString().split("T")[0],
}));

vi.mock("../../services/patientService.js", () => {
  return {
    updatePatientById: vi.fn(),
  };
});

vi.mock("../PatientForm.jsx", () => {
  const MockForm = ({ onDataChange }) => {
    useEffect(() => {
      onDataChange({
        isFormValid: true,
        formData: {
          nombre: "juan",
          apellido: "perez",
          fechaNacimiento: new Date("2010-05-05"),
          sexo: "masculino",
          tipoTDAH: "tdah",
          nombreTutor: "ana",
          telefonoTutor: "0999999999",
          correoTutor: "ANA@GMAIL.COM",
          observaciones: "ninguna",
        },
      });
    }, [onDataChange]);
    return <div data-testid="form">Formulario</div>;
  };
  return { __esModule: true, default: MockForm };
});

describe("EditPatient", () => {
  const baseProps = {
    patient: { id: "123" },
    isOpen: true,
    onClose: vi.fn(),
    onUpdated: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renderiza el modal con el formulario", () => {
    render(<EditPatient {...baseProps} />);
    expect(screen.getByText("Editar Paciente")).toBeInTheDocument();
    expect(screen.getByTestId("form")).toBeInTheDocument();
  });

  it("actualiza paciente correctamente y llama onUpdated y onClose", async () => {
    updatePatientById.mockResolvedValue({});
    render(<EditPatient {...baseProps} />);
    const confirmBtn = screen.getByText("Guardar");

    await waitFor(() => expect(confirmBtn).toBeEnabled());
    fireEvent.click(confirmBtn);

    await waitFor(() => {
      expect(updatePatientById).toHaveBeenCalledWith(
        "123",
        expect.objectContaining({
          nombre: "JUAN",
          tipoTDAH: "TDAH",
          correoTutor: "ana@gmail.com",
        })
      );
      expect(notifyMock).toHaveBeenCalledWith(
        "success",
        "Paciente actualizado correctamente"
      );
      expect(baseProps.onUpdated).toHaveBeenCalled();
      expect(baseProps.onClose).toHaveBeenCalled();
    });
  });

  it("muestra notificación de error si la actualización falla", async () => {
    updatePatientById.mockRejectedValue(new Error("Error"));
    render(<EditPatient {...baseProps} />);
    fireEvent.click(screen.getByText("Guardar"));

    await waitFor(() => {
      expect(notifyMock).toHaveBeenCalledWith(
        "error",
        "Error al actualizar paciente"
      );
    });
  });

  it("usa string vacío si no hay observaciones", async () => {
    vi.mocked(updatePatientById).mockResolvedValue({});
    vi.mock("../PatientForm.jsx", () => {
      const MockForm = ({ onDataChange }) => {
        useEffect(() => {
          onDataChange({
            isFormValid: true,
            formData: {
              nombre: "juan",
              apellido: "perez",
              fechaNacimiento: new Date("2010-05-05"),
              sexo: "masculino",
              tipoTDAH: "tdah",
              nombreTutor: "ana",
              telefonoTutor: "0999999999",
              correoTutor: "ANA@GMAIL.COM",
              // sin observaciones
            },
          });
        }, [onDataChange]);
        return <div data-testid="form">Formulario</div>;
      };
      return { __esModule: true, default: MockForm };
    });

    render(<EditPatient {...baseProps} />);
    fireEvent.click(screen.getByText("Guardar"));

    await waitFor(() => {
      expect(updatePatientById).toHaveBeenCalledWith(
        "123",
        expect.objectContaining({
          observaciones: "",
        })
      );
    });
  });
});
