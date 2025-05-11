import { render, screen } from "@testing-library/react";
import DashboardLayout from "../DashboardLayout";

vi.mock("../components", () => ({
  Sidebar: ({ links }) => (
    <div data-testid="sidebar">
      Sidebar - links: {links.map((l) => l.label).join(", ")}
    </div>
  ),
  DashboardMain: () => <div data-testid="main">Main Content</div>,
}));

vi.mock("../hooks/useSidebarLinks", () => ({
  useSidebarLinks: vi.fn(),
}));

import { useSidebarLinks } from "../hooks/useSidebarLinks";

describe("DashboardLayout", () => {
  it("renderiza Sidebar y DashboardMain con links de admin", () => {
    useSidebarLinks.mockReturnValue([
      { path: "/dashboard", label: "Inicio", icon: "home.svg" },
      {
        path: "/dashboard/manage-users",
        label: "Usuarios",
        icon: "person.svg",
      },
    ]);

    render(<DashboardLayout />);

    expect(screen.getByTestId("sidebar")).toHaveTextContent("Inicio, Usuarios");
    expect(screen.getByTestId("main")).toBeInTheDocument();
  });

  it("renderiza Sidebar con links de usuario estándar", () => {
    useSidebarLinks.mockReturnValue([
      { path: "/dashboard", label: "Inicio", icon: "home.svg" },
      {
        path: "/dashboard/patients-management",
        label: "Gestión de Pacientes",
        icon: "person.svg",
      },
    ]);

    render(<DashboardLayout />);

    expect(screen.getByTestId("sidebar")).toHaveTextContent(
      "Inicio, Gestión de Pacientes"
    );
  });
});
