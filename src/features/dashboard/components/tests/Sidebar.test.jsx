import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Sidebar from "../Sidebar";

vi.mock("../SidebarHeader", () => ({
  default: ({ collapsed, toggle }) => (
    <button onClick={toggle} data-testid="toggle-btn">
      {collapsed ? ">" : "<"}
    </button>
  ),
}));

vi.mock("../SidebarLink", () => ({
  default: ({ label, isActive, collapsed }) => (
    <div data-testid={`link-${label}`}>
      {label} {isActive ? "(active)" : ""} {collapsed ? "(collapsed)" : ""}
    </div>
  ),
}));

const navigateMock = vi.fn();
vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useNavigate: () => navigateMock,
  };
});

const mockLinks = [
  { path: "/inicio", label: "Inicio", icon: "home.svg" },
  { path: "/pacientes", label: "Pacientes", icon: "user.svg" },
  { isLogout: true, label: "Cerrar sesión", icon: "logout.svg" },
];

describe("Sidebar", () => {
  beforeEach(() => {
    localStorage.setItem("user", "mockUser");
    navigateMock.mockClear();
  });

  it("renderiza los links correctamente", () => {
    render(
      <MemoryRouter initialEntries={["/inicio"]}>
        <Sidebar links={mockLinks} />
      </MemoryRouter>
    );

    expect(screen.getByTestId("link-Inicio")).toHaveTextContent(
      "Inicio (active)"
    );
    expect(screen.getByTestId("link-Pacientes")).toHaveTextContent("Pacientes");
    expect(screen.getByText("Cerrar sesión")).toBeInTheDocument();
  });

  it("puede colapsar el sidebar al hacer clic", () => {
    render(
      <MemoryRouter initialEntries={["/inicio"]}>
        <Sidebar links={mockLinks} />
      </MemoryRouter>
    );

    const toggleButton = screen.getByTestId("toggle-btn");
    fireEvent.click(toggleButton);

    expect(screen.getByTestId("link-Inicio")).toHaveTextContent("(collapsed)");
  });

  it("muestra el modal de logout al hacer clic en el link de logout", () => {
    render(
      <MemoryRouter initialEntries={["/inicio"]}>
        <Sidebar links={mockLinks} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText("Cerrar sesión"));

    expect(screen.getByText("¿Cerrar sesión?")).toBeInTheDocument();
  });

  it("ejecuta logout y navega al login", () => {
    render(
      <MemoryRouter initialEntries={["/inicio"]}>
        <Sidebar links={mockLinks} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText("Cerrar sesión"));

    fireEvent.click(screen.getByText("Sí, cerrar sesión"));

    expect(localStorage.getItem("user")).toBeNull();
    expect(navigateMock).toHaveBeenCalledWith("/login");
  });

  it("invoca handleLinkClick directamente para logout", () => {
    render(
      <MemoryRouter initialEntries={["/inicio"]}>
        <Sidebar links={mockLinks} />
      </MemoryRouter>
    );

    const logoutLink = screen.getByText("Cerrar sesión");
    fireEvent.click(logoutLink);
    expect(screen.getByText("¿Cerrar sesión?")).toBeInTheDocument();
  });
});
