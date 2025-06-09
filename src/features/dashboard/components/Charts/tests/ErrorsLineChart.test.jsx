import { render, screen } from "@testing-library/react";
import ErrorsLineChart from "../ErrorsLineChart";
import { vi } from "vitest";

vi.mock("react-chartjs-2", () => ({
  Line: vi.fn(() => <canvas data-testid="line-chart" />),
}));

describe("ErrorsLineChart", () => {
  const preguntasMock = [
    { target: "ImageTargetA", errores: 1 },
    { target: "ImageTargetB", errores: 2 },
    { target: "ImageTargetC", errores: 0 },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renderiza el componente Line correctamente", () => {
    render(<ErrorsLineChart preguntas={preguntasMock} />);
    expect(screen.getByTestId("line-chart")).toBeInTheDocument();
  });

  it("registra y elimina el listener de resize", () => {
    const addSpy = vi.spyOn(window, "addEventListener");
    const removeSpy = vi.spyOn(window, "removeEventListener");

    const { unmount } = render(<ErrorsLineChart preguntas={preguntasMock} />);

    expect(addSpy).toHaveBeenCalledWith("resize", expect.any(Function));
    unmount();
    expect(removeSpy).toHaveBeenCalledWith("resize", expect.any(Function));
  });
});
