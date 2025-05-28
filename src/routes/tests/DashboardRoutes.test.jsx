import { render, screen } from "@testing-library/react";
import { MemoryRouter, Outlet } from "react-router-dom";
import DashboardRoutes from "../DashboardRoutes";

// ✅ Mocks de layout y rutas protegidas con <Outlet />
vi.mock("../ProtectedRoutes", () => ({
  default: () => (
    <div data-testid="protected">
      <Outlet />
    </div>
  ),
}));

vi.mock("../features/dashboard/DashboardLayout", () => ({
  default: () => (
    <div className="dashboard-layout">
      <Outlet />
    </div>
  ),
}));

// ✅ Mocks de componentes de página con contenido real
vi.mock("../features/dashboard/pages/admin/AdminHome", () => ({
  default: () => (
    <div>
      <h1>Inicio de Admin</h1>
      <h2>Bienvenido al panel de administración</h2>
      <span>HOLA</span>
    </div>
  ),
}));

vi.mock("../features/dashboard/pages/admin/ManageUsers", () => ({
  default: () => <div>Manage Users Page</div>,
}));

vi.mock("../features/dashboard/pages/user/UserHome", () => ({
  default: () => (
    <div>
      <h1>Bienvenido al Dashboard</h1>
      <h2>Accede a la información y gestiona tus datos</h2>
    </div>
  ),
}));

vi.mock("../features/dashboard/pages/user/PatientsManagement", () => ({
  default: () => <div>Patients Management Page</div>,
}));

vi.mock("../features/dashboard/pages/user/ActivityTracking", () => ({
  default: () => <div>Activity Tracking Page</div>,
}));

describe("DashboardRoutes", () => {
  afterEach(() => {
    localStorage.clear();
  });

  it("renderiza rutas de admin si role es 'admin'", () => {
    localStorage.setItem("user", JSON.stringify({ role: "admin" }));

    render(
      <MemoryRouter initialEntries={["/"]}>
        <DashboardRoutes />
      </MemoryRouter>
    );

    expect(
      screen.getByRole("heading", { name: /inicio de admin/i })
    ).toBeInTheDocument();

    expect(
      screen.getByText(/bienvenido al panel de administración/i)
    ).toBeInTheDocument();
  });

  it("renderiza rutas de user si role es 'user'", () => {
    localStorage.setItem("user", JSON.stringify({ role: "user" }));

    render(
      <MemoryRouter initialEntries={["/"]}>
        <DashboardRoutes />
      </MemoryRouter>
    );

    expect(
      screen.getByRole("heading", { name: /bienvenido al dashboard/i })
    ).toBeInTheDocument();

    expect(
      screen.getByText(/accede a la información y gestiona tus datos/i)
    ).toBeInTheDocument();
  });

  it("redirige si el role no es válido", () => {
    localStorage.setItem("user", JSON.stringify({ role: "invitado" }));

    render(
      <MemoryRouter initialEntries={["/dashboard"]}>
        <DashboardRoutes />
      </MemoryRouter>
    );

    // Asegurarse de que ninguna página conocida se haya cargado
    expect(screen.queryByText(/inicio de admin/i)).not.toBeInTheDocument();
    expect(
      screen.queryByText(/bienvenido al dashboard/i)
    ).not.toBeInTheDocument();
  });

  it("redirige si localStorage no tiene 'user'", () => {
    render(
      <MemoryRouter initialEntries={["/dashboard"]}>
        <DashboardRoutes />
      </MemoryRouter>
    );

    expect(screen.queryByText(/inicio de admin/i)).not.toBeInTheDocument();
    expect(
      screen.queryByText(/bienvenido al dashboard/i)
    ).not.toBeInTheDocument();
  });
});
