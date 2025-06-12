import { render, screen } from "@testing-library/react";
import ObservationTimePerTargetChart from "../ObservationTimePerTargetChart";
import { vi } from "vitest";

vi.mock("react-chartjs-2", () => ({
  Bar: vi.fn(() => <canvas data-testid="bar-chart" />),
}));

describe("ObservationTimePerTargetChart", () => {
  const tiemposMock = [
    { target: "ImageTargetA", tiempo: 1.234 },
    { target: "ImageTargetB", tiempo: 2.5 },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renderiza el gráfico de barras correctamente", () => {
    render(<ObservationTimePerTargetChart tiempos={tiemposMock} />);
    expect(screen.getByTestId("bar-chart")).toBeInTheDocument();
  });

  it("registra y elimina el listener de resize", () => {
    const addSpy = vi.spyOn(window, "addEventListener");
    const removeSpy = vi.spyOn(window, "removeEventListener");

    const { unmount } = render(
      <ObservationTimePerTargetChart tiempos={tiemposMock} />
    );

    expect(addSpy).toHaveBeenCalledWith("resize", expect.any(Function));
    unmount();
    expect(removeSpy).toHaveBeenCalledWith("resize", expect.any(Function));
  });
});
