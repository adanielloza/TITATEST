import { render, screen } from "@testing-library/react";
import PatientInfoCard from "../ActivityTracking/PatientInfoCard";

describe("PatientInfoCard", () => {
  const patientMock = {
    nombre: "Juan",
    apellido: "Pérez",
    fechaNacimiento: "2005-06-01",
    sexo: "Masculino",
    nombreTutor: "María Pérez",
    correoTutor: "maria@example.com",
    telefonoTutor: "123456789",
    tipoTDAH: "Combinado",
    observaciones: "Paciente con buena evolución.",
  };

  it("no renderiza nada si no hay paciente", () => {
    const { container } = render(<PatientInfoCard patient={null} />);
    expect(container.firstChild).toBeNull();
  });

  it("muestra toda la información del paciente correctamente", () => {
    render(<PatientInfoCard patient={patientMock} />);

    expect(screen.getByText("Juan Pérez")).toBeInTheDocument();
    expect(screen.getByText("🎂 Fecha de nacimiento")).toBeInTheDocument();
    expect(screen.getByText("2005-06-01")).toBeInTheDocument();
    expect(screen.getByText("👤 Nombre")).toBeInTheDocument();
    expect(screen.getByText("María Pérez")).toBeInTheDocument();
    expect(screen.getByText("⚧ Sexo")).toBeInTheDocument();
    expect(screen.getByText("Masculino")).toBeInTheDocument();
    expect(screen.getByText("📧 Correo")).toBeInTheDocument();
    expect(screen.getByText("maria@example.com")).toBeInTheDocument();
    expect(screen.getByText("📞 Teléfono")).toBeInTheDocument();
    expect(screen.getByText("123456789")).toBeInTheDocument();
    expect(screen.getByText("🧠 Tipo de TDAH")).toBeInTheDocument();
    expect(screen.getByText("Combinado")).toBeInTheDocument();
    expect(screen.getByText("📝 Observaciones")).toBeInTheDocument();
    expect(
      screen.getByText("Paciente con buena evolución.")
    ).toBeInTheDocument();
  });

  it("muestra avatar masculino si el sexo es Masculino", () => {
    render(<PatientInfoCard patient={patientMock} />);
    const avatar = screen.getByAltText("Avatar");
    expect(avatar).toHaveAttribute("src", "/images/male.png");
  });

  it("muestra avatar femenino si el sexo es Femenino", () => {
    const femalePatient = { ...patientMock, sexo: "Femenino" };
    render(<PatientInfoCard patient={femalePatient} />);
    const avatar = screen.getByAltText("Avatar");
    expect(avatar).toHaveAttribute("src", "/images/female.png");
  });
});
