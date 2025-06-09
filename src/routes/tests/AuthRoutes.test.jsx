import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AuthRoutes from "../AuthRoutes";

vi.mock("../../features/auth/LoginPage", () => ({
  default: () => <div>Página de Login</div>,
}));

vi.mock("../DashboardRoutes", () => ({
  default: () => <div>Dashboard</div>,
}));

describe("AuthRoutes", () => {
  afterEach(() => {
    localStorage.clear();
  });

  it("muestra LoginPage si no hay usuario con rol", () => {
    localStorage.setItem("user", JSON.stringify({}));
    render(
      <MemoryRouter>
        <AuthRoutes />
      </MemoryRouter>
    );
    expect(screen.getByText("Página de Login")).toBeInTheDocument();
  });

  it("redirige a /dashboard si el usuario tiene rol", () => {
    localStorage.setItem("user", JSON.stringify({ role: "admin" }));

    render(
      <MemoryRouter initialEntries={["/auth"]}>
        <AuthRoutes />
      </MemoryRouter>
    );

    expect(screen.queryByText("Página de Login")).not.toBeInTheDocument();
  });

  it("muestra LoginPage si no hay entrada de usuario en localStorage", () => {
    render(
      <MemoryRouter>
        <AuthRoutes />
      </MemoryRouter>
    );
    expect(screen.getByText("Página de Login")).toBeInTheDocument();
  });
});
