import { render, screen } from "@testing-library/react";
import React from "react";
import { vi } from "vitest";

describe("ResponseTimePerQuestionChart", () => {
  const preguntasMock = [{ tiempo: 1.234 }, { tiempo: 2.5 }, { tiempo: 3.789 }];

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

  it("renderiza correctamente el gráfico de tiempo por pregunta", async () => {
    const { default: ResponseTimePerQuestionChart } = await import(
      "../ResponseTimePerQuestionChart"
    );
    render(<ResponseTimePerQuestionChart preguntas={preguntasMock} />);
    expect(screen.getByTestId("line-chart")).toBeInTheDocument();
  });

  it("registra y elimina correctamente el listener de resize", async () => {
    const addSpy = vi.spyOn(window, "addEventListener");
    const removeSpy = vi.spyOn(window, "removeEventListener");

    const { default: ResponseTimePerQuestionChart } = await import(
      "../ResponseTimePerQuestionChart"
    );
    const { unmount } = render(
      <ResponseTimePerQuestionChart preguntas={preguntasMock} />
    );

    expect(addSpy).toHaveBeenCalledWith("resize", expect.any(Function));
    unmount();
    expect(removeSpy).toHaveBeenCalledWith("resize", expect.any(Function));
  });

  it("llama a chartRef.current.resize al hacer resize", async () => {
    const { default: ResponseTimePerQuestionChart } = await import(
      "../ResponseTimePerQuestionChart"
    );
    render(<ResponseTimePerQuestionChart preguntas={preguntasMock} />);
    window.dispatchEvent(new Event("resize"));
    expect(resizeMock).toHaveBeenCalled();
  });
});
