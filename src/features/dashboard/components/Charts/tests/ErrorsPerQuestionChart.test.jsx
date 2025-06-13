import { render, screen } from "@testing-library/react";
import ErrorsPerQuestionChart from "../ErrorsPerQuestionChart";
import { vi } from "vitest";

vi.mock("react-chartjs-2", () => ({
  Line: vi.fn(() => <canvas data-testid="line-chart" />),
}));

describe("ErrorsPerQuestionChart", () => {
  const preguntasMock = [
    { desaciertos: 2 },
    { desaciertos: 0 },
    { desaciertos: 3 },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renderiza el componente Line correctamente", () => {
    render(<ErrorsPerQuestionChart preguntas={preguntasMock} />);
    expect(screen.getByTestId("line-chart")).toBeInTheDocument();
  });

  it("registra y elimina el listener de resize", () => {
    const addSpy = vi.spyOn(window, "addEventListener");
    const removeSpy = vi.spyOn(window, "removeEventListener");

    const { unmount } = render(
      <ErrorsPerQuestionChart preguntas={preguntasMock} />
    );

    expect(addSpy).toHaveBeenCalledWith("resize", expect.any(Function));
    unmount();
    expect(removeSpy).toHaveBeenCalledWith("resize", expect.any(Function));
  });
});
