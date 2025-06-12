import { render, screen } from "@testing-library/react";
import ObservationVsErrorsChart from "../ObservationVsErrorsChart";
import { vi } from "vitest";

vi.mock("react-chartjs-2", () => ({
  Chart: vi.fn(() => <canvas data-testid="combo-chart" />),
}));

describe("ObservationVsErrorsChart", () => {
  const tiemposMock = [
    { target: "ImageTargetA", tiempo: 1.5 },
    { target: "ImageTargetB", tiempo: 2.8 },
  ];

  const preguntasMock = [
    { desaciertos: 1 },
    { desaciertos: 2 },
    { desaciertos: 1 },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renderiza el gráfico combinado correctamente", () => {
    render(
      <ObservationVsErrorsChart
        tiempos={tiemposMock}
        preguntas={preguntasMock}
      />
    );
    expect(screen.getByTestId("combo-chart")).toBeInTheDocument();
  });

  it("registra y elimina el listener de resize", () => {
    const addSpy = vi.spyOn(window, "addEventListener");
    const removeSpy = vi.spyOn(window, "removeEventListener");

    const { unmount } = render(
      <ObservationVsErrorsChart
        tiempos={tiemposMock}
        preguntas={preguntasMock}
      />
    );

    expect(addSpy).toHaveBeenCalledWith("resize", expect.any(Function));
    unmount();
    expect(removeSpy).toHaveBeenCalledWith("resize", expect.any(Function));
  });
});
