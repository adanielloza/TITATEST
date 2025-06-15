import { render, screen } from "@testing-library/react";
import { vi } from "vitest";

describe("AccuracyDonutChart", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renderiza el gráfico Doughnut con datos correctos", async () => {
    vi.mock("react-chartjs-2", () => ({
      Doughnut: vi.fn(() => <canvas data-testid="doughnut-chart" />),
    }));

    const { default: AccuracyDonutChart } = await import(
      "../AccuracyDonutChart"
    );
    render(<AccuracyDonutChart correct={7} total={10} />);
    expect(screen.getByTestId("doughnut-chart")).toBeInTheDocument();
  });

  it("registra y limpia el event listener de resize", async () => {
    const addEventListenerSpy = vi.spyOn(window, "addEventListener");
    const removeEventListenerSpy = vi.spyOn(window, "removeEventListener");

    vi.mock("react-chartjs-2", () => ({
      Doughnut: vi.fn(() => <canvas data-testid="doughnut-chart" />),
    }));

    const { default: AccuracyDonutChart } = await import(
      "../AccuracyDonutChart"
    );
    const { unmount } = render(<AccuracyDonutChart correct={5} total={10} />);

    expect(addEventListenerSpy).toHaveBeenCalledWith(
      "resize",
      expect.any(Function)
    );
    unmount();
    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "resize",
      expect.any(Function)
    );
  });
});
