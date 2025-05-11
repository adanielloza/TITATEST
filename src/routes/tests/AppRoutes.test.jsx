import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AppRoutes from "../AppRoutes";
import { LoaderProvider } from "../../contexts/LoaderContext";

vi.mock("../../features/home/Home", () => ({
  default: () => <div>Home Page</div>,
}));
vi.mock("../AuthRoutes", () => ({
  default: () => <div>Auth Routes</div>,
}));
vi.mock("../DashboardRoutes", () => ({
  default: () => <div>Dashboard Routes</div>,
}));

describe("AppRoutes", () => {
  it("renderiza la ruta '/' con Home", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <LoaderProvider>
          <AppRoutes />
        </LoaderProvider>
      </MemoryRouter>
    );
    expect(screen.getByText("Home Page")).toBeInTheDocument();
  });

  it("renderiza rutas de autenticación '/auth/*'", () => {
    render(
      <MemoryRouter initialEntries={["/auth/login"]}>
        <LoaderProvider>
          <AppRoutes />
        </LoaderProvider>
      </MemoryRouter>
    );
    expect(screen.getByText("Auth Routes")).toBeInTheDocument();
  });

  it("renderiza rutas del dashboard '/dashboard/*'", () => {
    render(
      <MemoryRouter initialEntries={["/dashboard/user"]}>
        <LoaderProvider>
          <AppRoutes />
        </LoaderProvider>
      </MemoryRouter>
    );
    expect(screen.getByText("Dashboard Routes")).toBeInTheDocument();
  });

  it("redirecciona rutas no válidas a '/'", () => {
    render(
      <MemoryRouter initialEntries={["/ruta-inexistente"]}>
        <LoaderProvider>
          <AppRoutes />
        </LoaderProvider>
      </MemoryRouter>
    );
    expect(screen.getByText("Home Page")).toBeInTheDocument();
  });
});
