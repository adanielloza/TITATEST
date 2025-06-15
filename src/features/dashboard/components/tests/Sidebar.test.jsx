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

const mockLinks = [
  { path: "/inicio", label: "Inicio", icon: "home.svg" },
  { path: "/pacientes", label: "Pacientes", icon: "user.svg" },
];

describe("Sidebar", () => {
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
});
