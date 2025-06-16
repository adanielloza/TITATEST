import { render, screen } from "@testing-library/react";
import React from "react";
import { vi } from "vitest";

describe("ObservationVsErrorsChart", () => {
  const tiemposMock = [
    { target: "ImageTargetA", tiempo: 1.5 },
    { target: "ImageTargetB", tiempo: 2.8 },
  ];

  const preguntasMock = [{ desaciertos: 1 }, {}, { desaciertos: 2 }];

  let resizeMock;

  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
    resizeMock = vi.fn();

    vi.doMock("react-chartjs-2", () => ({
      Chart: React.forwardRef((props, ref) => {
        if (ref && typeof ref === "object") {
          ref.current = { resize: resizeMock };
        }
        return <canvas data-testid="combo-chart" />;
      }),
    }));
  });

  it("renderiza el gráfico combinado correctamente", async () => {
    const { default: ObservationVsErrorsChart } = await import(
      "../ObservationVsErrorsChart"
    );
    render(
      <ObservationVsErrorsChart
        tiempos={tiemposMock}
        preguntas={preguntasMock}
      />
    );
    expect(screen.getByTestId("combo-chart")).toBeInTheDocument();

    expect(tiemposMock[0].target.replace("ImageTarget", "Target ")).toBe(
      "Target A"
    );
    expect(tiemposMock[1].target.replace("ImageTarget", "Target ")).toBe(
      "Target B"
    );
  });

  it("registra y elimina el listener de resize", async () => {
    const addSpy = vi.spyOn(window, "addEventListener");
    const removeSpy = vi.spyOn(window, "removeEventListener");

    const { default: ObservationVsErrorsChart } = await import(
      "../ObservationVsErrorsChart"
    );
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

  it("llama a chartRef.current.resize en el evento resize", async () => {
    const { default: ObservationVsErrorsChart } = await import(
      "../ObservationVsErrorsChart"
    );
    render(
      <ObservationVsErrorsChart
        tiempos={tiemposMock}
        preguntas={preguntasMock}
      />
    );
    window.dispatchEvent(new Event("resize"));
    expect(resizeMock).toHaveBeenCalled();
  });
});
