import { render, screen } from "@testing-library/react";
import React from "react";
import { vi } from "vitest";

describe("ResponseTimeLineChart", () => {
  const preguntasMock = [
    { target: "ImageTargetA", tiempoRespuesta: 1.2 },
    { target: "ImageTargetB", tiempoRespuesta: 2.5 },
  ];

  let resizeMock;

  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
    resizeMock = vi.fn();

    vi.doMock("react-chartjs-2", () => ({
      Line: React.forwardRef((_, ref) => {
        if (ref && typeof ref === "object") {
          ref.current = { resize: resizeMock };
        }
        return <canvas data-testid="line-chart" />;
      }),
    }));
  });

  it("renderiza el gráfico de líneas correctamente", async () => {
    const { default: ResponseTimeLineChart } = await import(
      "../ResponseTimeLineChart"
    );
    render(<ResponseTimeLineChart preguntas={preguntasMock} />);
    expect(screen.getByTestId("line-chart")).toBeInTheDocument();
  });

  it("registra y elimina el listener de resize", async () => {
    const addSpy = vi.spyOn(window, "addEventListener");
    const removeSpy = vi.spyOn(window, "removeEventListener");

    const { default: ResponseTimeLineChart } = await import(
      "../ResponseTimeLineChart"
    );
    const { unmount } = render(
      <ResponseTimeLineChart preguntas={preguntasMock} />
    );

    expect(addSpy).toHaveBeenCalledWith("resize", expect.any(Function));
    unmount();
    expect(removeSpy).toHaveBeenCalledWith("resize", expect.any(Function));
  });

  it("llama a chartRef.current.resize en el evento resize", async () => {
    const { default: ResponseTimeLineChart } = await import(
      "../ResponseTimeLineChart"
    );
    render(<ResponseTimeLineChart preguntas={preguntasMock} />);
    window.dispatchEvent(new Event("resize"));
    expect(resizeMock).toHaveBeenCalled();
  });
});
