import { render, screen } from "@testing-library/react";
import ResponseTimeLineChart from "../ResponseTimeLineChart";
import { vi } from "vitest";

vi.mock("react-chartjs-2", () => ({
  Line: vi.fn(() => <canvas data-testid="line-chart" />),
}));

describe("ResponseTimeLineChart", () => {
  const preguntasMock = [
    { target: "ImageTargetA", tiempoRespuesta: 1.2 },
    { target: "ImageTargetB", tiempoRespuesta: 2.5 },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renderiza el gráfico de líneas correctamente", () => {
    render(<ResponseTimeLineChart preguntas={preguntasMock} />);
    expect(screen.getByTestId("line-chart")).toBeInTheDocument();
  });

  it("registra y elimina el listener de resize", () => {
    const addSpy = vi.spyOn(window, "addEventListener");
    const removeSpy = vi.spyOn(window, "removeEventListener");

    const { unmount } = render(
      <ResponseTimeLineChart preguntas={preguntasMock} />
    );

    expect(addSpy).toHaveBeenCalledWith("resize", expect.any(Function));
    unmount();
    expect(removeSpy).toHaveBeenCalledWith("resize", expect.any(Function));
  });
});
