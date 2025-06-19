import { render, screen } from "@testing-library/react";
import React from "react";
import { vi } from "vitest";

describe("ObservationTimePerTargetChart", () => {
  const tiemposMock = [
    { target: "ImageTargetA", tiempo: 1.234 },
    { target: "ImageTargetB", tiempo: 2.5 },
  ];

  let resizeMock;

  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
    resizeMock = vi.fn();

    vi.doMock("react-chartjs-2", () => ({
      Bar: React.forwardRef((props, ref) => {
        if (ref && typeof ref === "object") {
          ref.current = { resize: resizeMock };
        }
        return <canvas data-testid="bar-chart" />;
      }),
    }));
  });

  it("renderiza el gráfico de barras correctamente", async () => {
    const { default: ObservationTimePerTargetChart } = await import(
      "../ObservationTimePerTargetChart"
    );
    render(<ObservationTimePerTargetChart tiempos={tiemposMock} />);
    expect(screen.getByTestId("bar-chart")).toBeInTheDocument();
  });

  it("registra y elimina el listener de resize", async () => {
    const addSpy = vi.spyOn(window, "addEventListener");
    const removeSpy = vi.spyOn(window, "removeEventListener");

    const { default: ObservationTimePerTargetChart } = await import(
      "../ObservationTimePerTargetChart"
    );
    const { unmount } = render(
      <ObservationTimePerTargetChart tiempos={tiemposMock} />
    );

    expect(addSpy).toHaveBeenCalledWith("resize", expect.any(Function));
    unmount();
    expect(removeSpy).toHaveBeenCalledWith("resize", expect.any(Function));
  });

  it("llama a chartRef.current.resize en el resize event", async () => {
    const { default: ObservationTimePerTargetChart } = await import(
      "../ObservationTimePerTargetChart"
    );
    render(<ObservationTimePerTargetChart tiempos={tiemposMock} />);
    window.dispatchEvent(new Event("resize"));
    expect(resizeMock).toHaveBeenCalled();
  });
});
