import { render, screen, fireEvent } from "@testing-library/react";
import SidebarHeader from "../SidebarHeader";

describe("SidebarHeader", () => {
  const mockToggle = vi.fn();

  const renderComponent = (collapsed = false) =>
    render(<SidebarHeader collapsed={collapsed} toggle={mockToggle} />);

  beforeEach(() => mockToggle.mockClear());

  it("muestra el título si no está colapsado", () => {
    renderComponent(false);
    expect(screen.getByText("MIND AR")).toBeInTheDocument();
  });

  it("no muestra el título si está colapsado", () => {
    renderComponent(true);
    expect(screen.queryByText("MIND AR")).not.toBeInTheDocument();
  });

  it("muestra el ícono correcto cuando está colapsado", () => {
    renderComponent(true);
    const img = screen.getByAltText("Toggle");
    expect(img).toHaveAttribute("src", "/icons/double_arrow_right.svg");
  });

  it("muestra el ícono correcto cuando no está colapsado", () => {
    renderComponent(false);
    const img = screen.getByAltText("Toggle");
    expect(img).toHaveAttribute("src", "/icons/double_arrow_left.svg");
  });

  it("ejecuta la función toggle al hacer clic", () => {
    renderComponent();
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(mockToggle).toHaveBeenCalledTimes(1);
  });
});
