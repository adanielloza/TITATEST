import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import Home from "../Home";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => ({
  ...(await vi.importActual("react-router-dom")),
  useNavigate: () => mockNavigate,
}));

vi.mock("../components/Header.jsx", () => ({
  default: () => <header data-testid="header" />,
}));

vi.mock("../components/ThreeScene.jsx", () => ({
  default: () => <div data-testid="three-scene" />,
}));

vi.mock("../../../components/Button.jsx", () => ({
  default: ({ label, onClick }) => (
    <button data-testid="button" onClick={onClick}>
      {label}
    </button>
  ),
}));

describe("Home Component", () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it("renders correctly with heading, description, and button", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    expect(screen.getByText(/Bienvenido a/i)).toBeInTheDocument();
    expect(screen.getByText(/MindAR/i)).toBeInTheDocument();
    expect(screen.getByText(/Plataforma interna/i)).toBeInTheDocument();
    expect(screen.getByTestId("button")).toHaveTextContent(
      "Ingresar al sistema"
    );
    expect(screen.getByTestId("header")).toBeInTheDocument();
    expect(screen.getByTestId("three-scene")).toBeInTheDocument();
  });

  it("navigates correctly when button is clicked", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByTestId("button"));
    expect(mockNavigate).toHaveBeenCalledWith("/auth");
  });
});
