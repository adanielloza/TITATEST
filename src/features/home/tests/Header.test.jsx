import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, useNavigate } from "react-router-dom";
import { vi } from "vitest";
import Header from "../components/Header";

vi.mock("react-router-dom", async () => ({
  ...(await vi.importActual("react-router-dom")),
  useNavigate: vi.fn(),
}));

vi.mock("../../../components/Button.jsx", () => ({
  default: ({ label, onClick }) => (
    <button data-testid="button" onClick={onClick}>
      {label}
    </button>
  ),
}));

describe("Header Component", () => {
  const mockNavigate = vi.fn();

  beforeEach(() => {
    useNavigate.mockReturnValue(mockNavigate);
    mockNavigate.mockClear();
  });

  it("renders correctly with title and button", () => {
    render(<Header />, { wrapper: MemoryRouter });

    expect(screen.getByText(/MindAR/i)).toBeInTheDocument();
    expect(screen.getByTestId("button")).toHaveTextContent("Iniciar sesión");
  });

  it("navigates to auth when button is clicked", () => {
    render(<Header />, { wrapper: MemoryRouter });

    fireEvent.click(screen.getByTestId("button"));
    expect(mockNavigate).toHaveBeenCalledWith("/auth");
  });
});
