import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import SidebarLink from "../SidebarLink";

describe("SidebarLink", () => {
  const defaultProps = {
    to: "/dashboard",
    icon: "dashboard.svg",
    label: "Dashboard",
  };

  const renderComponent = (props = {}) =>
    render(
      <MemoryRouter>
        <SidebarLink {...defaultProps} {...props} />
      </MemoryRouter>
    );

  it("renderiza el ícono y la etiqueta", () => {
    renderComponent();
    expect(screen.getByRole("link")).toHaveAttribute("href", "/dashboard");
    expect(screen.getByAltText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
  });

  it("aplica la clase activa si isActive es true", () => {
    renderComponent({ isActive: true });
    expect(screen.getByRole("link")).toHaveClass("sidebar__link--active");
  });

  it("no aplica la clase activa si isActive es false", () => {
    renderComponent({ isActive: false });
    expect(screen.getByRole("link")).not.toHaveClass("sidebar__link--active");
  });

  it("no muestra el label si collapsed es true", () => {
    renderComponent({ collapsed: true });
    expect(screen.queryByText("Dashboard")).not.toBeInTheDocument();
  });

  it("muestra el label si collapsed es false", () => {
    renderComponent({ collapsed: false });
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
  });
});
