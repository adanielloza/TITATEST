import { render, screen, fireEvent } from "@testing-library/react";
import PatientForm from "../PatientForm";

const mockSetNombre = vi.fn();
const mockSetApellido = vi.fn();

vi.mock("../../hooks/usePatientForm", () => ({
  default: () => ({
    nombre: "Juan",
    setNombre: mockSetNombre,
    apellido: "Pérez",
    setApellido: mockSetApellido,
    fechaNacimiento: new Date("2010-05-03"),
    setFechaNacimiento: vi.fn(),
    sexo: "Masculino",
    setSexo: vi.fn(),
    tipoTDAH: "TDAH",
    setTipoTDAH: vi.fn(),
    nombreTutor: "Ana",
    setNombreTutor: vi.fn(),
    telefonoTutor: "0999999999",
    setTelefonoTutor: vi.fn(),
    correoTutor: "ana@gmail.com",
    setCorreoTutor: vi.fn(),
    observaciones: "Ninguna",
    setObservaciones: vi.fn(),
    isFormValid: true,
  }),
}));

describe("PatientForm", () => {
  it("renderiza todos los campos correctamente", () => {
    render(<PatientForm onDataChange={vi.fn()} />);

    expect(screen.getByDisplayValue("Juan")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Pérez")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Masculino")).toBeInTheDocument();
    expect(screen.getByDisplayValue("TDAH")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Ana")).toBeInTheDocument();
    expect(screen.getByDisplayValue("0999999999")).toBeInTheDocument();
    expect(screen.getByDisplayValue("ana@gmail.com")).toBeInTheDocument();
    expect(screen.getByText("Ninguna")).toBeInTheDocument();
  });

  it("llama a onDataChange con los datos iniciales", () => {
    const onDataChange = vi.fn();
    render(<PatientForm onDataChange={onDataChange} />);
    expect(onDataChange).toHaveBeenCalledWith(
      expect.objectContaining({
        formData: expect.objectContaining({
          nombre: "Juan",
          apellido: "Pérez",
        }),
        isFormValid: true,
      })
    );
  });

  it("llama al setter correspondiente cuando cambia un campo", () => {
    render(<PatientForm onDataChange={vi.fn()} />);
    const nombreInput = screen.getByDisplayValue("Juan");
    fireEvent.change(nombreInput, { target: { value: "Pedro" } });
    expect(mockSetNombre).toHaveBeenCalledWith("Pedro");
  });
});
