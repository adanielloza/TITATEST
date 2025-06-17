import { render, screen } from "@testing-library/react";
import React from "react";
import { vi } from "vitest";

describe("ErrorsLineChart", () => {
  const preguntasMock = [
    { target: "ImageTargetA", errores: 1 },
    { target: "ImageTargetB", errores: 2 },
    { target: "ImageTargetC", errores: 0 },
  ];

  let resizeMock;

  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
    resizeMock = vi.fn();

    vi.doMock("react-chartjs-2", () => ({
      Line: React.forwardRef((props, ref) => {
        if (ref && typeof ref === "object") {
          ref.current = { resize: resizeMock };
        }
        return <canvas data-testid="line-chart" />;
      }),
    }));
  });

  it("renderiza el componente Line correctamente", async () => {
    const { default: ErrorsLineChart } = await import("../ErrorsLineChart");
    render(<ErrorsLineChart preguntas={preguntasMock} />);
    expect(screen.getByTestId("line-chart")).toBeInTheDocument();
  });

  it("registra y elimina el listener de resize", async () => {
    const addSpy = vi.spyOn(window, "addEventListener");
    const removeSpy = vi.spyOn(window, "removeEventListener");

    const { default: ErrorsLineChart } = await import("../ErrorsLineChart");
    const { unmount } = render(<ErrorsLineChart preguntas={preguntasMock} />);

    expect(addSpy).toHaveBeenCalledWith("resize", expect.any(Function));
    unmount();
    expect(removeSpy).toHaveBeenCalledWith("resize", expect.any(Function));
  });

  it("llama a chartRef.current.resize en el resize event", async () => {
    const { default: ErrorsLineChart } = await import("../ErrorsLineChart");
    render(<ErrorsLineChart preguntas={preguntasMock} />);
    window.dispatchEvent(new Event("resize"));
    expect(resizeMock).toHaveBeenCalled();
  });
});
