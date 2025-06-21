import { render, screen } from "@testing-library/react";
import ManageUsers from "../admin/ManageUsers";

vi.mock("../../components", () => ({
  PageHeader: ({ title, subtitle }) => (
    <div data-testid="page-header">
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </div>
  ),
  UsersDataTable: () => <div data-testid="users-table">Tabla de usuarios</div>,
}));

describe("ManageUsers", () => {
  it("renderiza el encabezado y la tabla de usuarios", () => {
    render(<ManageUsers />);

    expect(screen.getByTestId("page-header")).toHaveTextContent(
      "Gestión de Usuarios"
    );
    expect(screen.getByTestId("page-header")).toHaveTextContent(
      "Aquí puedes administrar los usuarios de la plataforma"
    );
    expect(screen.getByTestId("users-table")).toHaveTextContent(
      "Tabla de usuarios"
    );
  });
});
