import { render, screen } from "@testing-library/react";
import DashboardMain from "../DashboardMain";
import { MemoryRouter } from "react-router-dom";

vi.mock("../", () => ({
  Container: ({ children }) => (
    <div data-testid="mock-container">{children}</div>
  ),
}));

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    Outlet: () => <div data-testid="mock-outlet" />,
  };
});

describe("DashboardMain", () => {
  it("renderiza correctamente el main con Container y Outlet", () => {
    render(
      <MemoryRouter>
        <DashboardMain />
      </MemoryRouter>
    );

    expect(screen.getByTestId("mock-container")).toBeInTheDocument();
    expect(screen.getByTestId("mock-outlet")).toBeInTheDocument();
  });
});
