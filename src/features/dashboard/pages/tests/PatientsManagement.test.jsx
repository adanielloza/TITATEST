import { render, screen } from "@testing-library/react";
import PatientsManagement from "../user/PatientsManagement";

vi.mock("../../components", () => ({
  PageHeader: ({ title, subtitle }) => (
    <div data-testid="page-header">
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </div>
  ),
  PatientsDataTable: () => (
    <div data-testid="patients-table">Tabla de pacientes</div>
  ),
}));

describe("PatientsManagement", () => {
  it("renderiza el encabezado y la tabla de pacientes", () => {
    render(<PatientsManagement />);

    expect(screen.getByTestId("page-header")).toHaveTextContent(
      "Gestión de Pacientes"
    );
    expect(screen.getByTestId("page-header")).toHaveTextContent(
      "Aquí puedes administrar los pacientes"
    );
    expect(screen.getByTestId("patients-table")).toHaveTextContent(
      "Tabla de pacientes"
    );
  });
});
