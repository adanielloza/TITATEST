import { render, screen } from "@testing-library/react";
import App from "../App";
import { vi } from "vitest";

vi.mock("react-toastify", () => ({
  ToastContainer: () => <div>ToastContainer</div>,
  toast: vi.fn(),
}));

vi.mock("../routes/AppRoutes.jsx", () => ({
  default: () => <div>AppRoutes</div>,
}));

describe("App", () => {
  it("renderiza el contenedor principal", () => {
    render(<App />);
    expect(screen.getByText("ToastContainer")).toBeInTheDocument();
    expect(screen.getByText("AppRoutes")).toBeInTheDocument();
  });
});
