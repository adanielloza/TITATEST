import { render, screen, fireEvent } from "@testing-library/react";
import ActivityTracking from "../user/ActivityTracking";

vi.mock("../../components", () => ({
  PageHeader: ({ title, subtitle }) => (
    <div data-testid="page-header">
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </div>
  ),
  PatientInfoCard: ({ patient }) => (
    <div data-testid="patient-info">{patient?.nombre || "Sin datos"}</div>
  ),
  ActivityProgressCard: ({ activityHistory }) => (
    <div data-testid="activity-progress">{activityHistory?.length || 0}</div>
  ),
  ActivityHistoryCard: ({ activities, onSessionSelect }) => (
    <div data-testid="activity-history">
      Historial: {activities?.length || 0}
      <button onClick={() => onSessionSelect("sesion_1")}>
        Seleccionar sesión
      </button>
    </div>
  ),
  ActivityResultsCard: ({ selectedSession }) => (
    <div data-testid="activity-results">
      {selectedSession ? `Sesión: ${selectedSession}` : "Sin sesión"}
    </div>
  ),
}));

vi.mock("../../hooks/usePatientDropdown", () => ({
  __esModule: true,
  default: () => ({
    options: [
      { label: "Paciente 1", value: "id_1" },
      { label: "Paciente 2", value: "id_2" },
    ],
  }),
}));

vi.mock("../../hooks/usePatientActivityData", () => ({
  __esModule: true,
  default: (id) => ({
    patientInfo: id ? { nombre: `Paciente con id ${id}` } : null,
    activityHistory: id ? [{ actividad: "A1" }, { actividad: "A2" }] : [],
  }),
}));

describe("ActivityTracking", () => {
  it("renderiza el encabezado y el dropdown", () => {
    render(<ActivityTracking />);

    expect(screen.getByTestId("page-header")).toHaveTextContent(
      "Seguimiento de Actividades"
    );
    expect(screen.getByRole("combobox")).toBeInTheDocument();
    expect(screen.getByText("Selecciona un paciente")).toBeInTheDocument();
  });

  it("muestra los componentes de seguimiento al seleccionar un paciente", () => {
    render(<ActivityTracking />);

    const dropdown = screen.getByRole("combobox");
    fireEvent.change(dropdown, { target: { value: "id_1" } });

    expect(screen.getByTestId("patient-info")).toHaveTextContent(
      "Paciente con id id_1"
    );
    expect(screen.getByTestId("activity-progress")).toHaveTextContent("2");
    expect(screen.getByTestId("activity-history")).toHaveTextContent(
      "Historial: 2"
    );
    expect(screen.getByTestId("activity-results")).toHaveTextContent(
      "Sin sesión"
    );

    fireEvent.click(screen.getByText("Seleccionar sesión"));
    expect(screen.getByTestId("activity-results")).toHaveTextContent(
      "Sesión: sesion_1"
    );
  });
});
