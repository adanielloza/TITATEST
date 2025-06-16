import { render, screen } from "@testing-library/react";
import React from "react";
import { vi } from "vitest";

describe("AccuracyDonutChart", () => {
  let resizeMock;

  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
    resizeMock = vi.fn();

    vi.doMock("react-chartjs-2", () => ({
      Doughnut: React.forwardRef((props, ref) => {
        if (ref && typeof ref === "object") {
          ref.current = { resize: resizeMock };
        }
        return <canvas data-testid="doughnut-chart" />;
      }),
    }));
  });

  it("renderiza el gráfico Doughnut con datos correctos", async () => {
    const { default: AccuracyDonutChart } = await import(
      "../AccuracyDonutChart"
    );
    render(<AccuracyDonutChart correct={7} total={10} />);
    expect(screen.getByTestId("doughnut-chart")).toBeInTheDocument();
  });

  it("registra y limpia el event listener de resize", async () => {
    const addEventListenerSpy = vi.spyOn(window, "addEventListener");
    const removeEventListenerSpy = vi.spyOn(window, "removeEventListener");

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

  it("llama a chartRef.current.resize en el resize event", async () => {
    const { default: AccuracyDonutChart } = await import(
      "../AccuracyDonutChart"
    );
    render(<AccuracyDonutChart correct={8} total={10} />);
    window.dispatchEvent(new Event("resize"));
    expect(resizeMock).toHaveBeenCalled();
  });
});
