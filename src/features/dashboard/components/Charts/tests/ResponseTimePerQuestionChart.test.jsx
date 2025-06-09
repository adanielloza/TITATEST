import { render, screen } from "@testing-library/react";
import ResponseTimePerQuestionChart from "../ResponseTimePerQuestionChart";
import { vi } from "vitest";

vi.mock("react-chartjs-2", () => ({
  Line: vi.fn(() => <canvas data-testid="line-chart" />),
}));

describe("ResponseTimePerQuestionChart", () => {
  const preguntasMock = [{ tiempo: 1.234 }, { tiempo: 2.5 }, { tiempo: 3.789 }];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renderiza correctamente el gráfico de tiempo por pregunta", () => {
    render(<ResponseTimePerQuestionChart preguntas={preguntasMock} />);
    expect(screen.getByTestId("line-chart")).toBeInTheDocument();
  });

  it("registra y elimina correctamente el listener de resize", () => {
    const addSpy = vi.spyOn(window, "addEventListener");
    const removeSpy = vi.spyOn(window, "removeEventListener");

    const { unmount } = render(
      <ResponseTimePerQuestionChart preguntas={preguntasMock} />
    );

    expect(addSpy).toHaveBeenCalledWith("resize", expect.any(Function));
    unmount();
    expect(removeSpy).toHaveBeenCalledWith("resize", expect.any(Function));
  });
});
