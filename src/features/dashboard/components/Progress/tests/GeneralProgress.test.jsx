import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import GeneralProgress from "../GeneralProgress";

const mockUseGeneralChartData = vi.fn();

vi.mock("../hooks/useGeneralChartData", () => ({
  useGeneralChartData: () => mockUseGeneralChartData(),
}));

vi.mock("react-chartjs-2", () => ({
  Radar: () => <canvas data-testid="radar-chart" />,
}));

describe("GeneralProgress", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("muestra mensaje de carga si resumen es undefined", () => {
    mockUseGeneralChartData.mockReturnValue({
      resumen: undefined,
      chartData: null,
      options: null,
    });

    render(<GeneralProgress activityHistory={[]} />);

    expect(screen.getByText("Cargando resumen general...")).toBeInTheDocument();
  });

  it("muestra mensaje cuando no hay sesiones (promedioGeneral null)", () => {
    mockUseGeneralChartData.mockReturnValue({
      resumen: { promedioGeneral: null },
      chartData: {},
      options: {},
    });

    render(<GeneralProgress activityHistory={[]} />);

    expect(
      screen.getByText("No hay sesiones registradas para este paciente.")
    ).toBeInTheDocument();
  });

  it("renderiza el promedio y el gráfico Radar según el promedio", () => {
    mockUseGeneralChartData.mockReturnValue({
      resumen: { promedioGeneral: 90 },
      chartData: {},
      options: {},
    });

    render(<GeneralProgress activityHistory={[]} />);

    expect(screen.getByText("⭐ 90%")).toBeInTheDocument();
    expect(screen.getByTestId("radar-chart")).toBeInTheDocument();
  });

  it("utiliza color amarillo cuando promedio entre 60 y 84", () => {
    mockUseGeneralChartData.mockReturnValue({
      resumen: { promedioGeneral: 75 },
      chartData: {},
      options: {},
    });

    render(<GeneralProgress activityHistory={[]} />);
    const starEl = screen.getByText("⭐ 75%");
    expect(starEl).toBeInTheDocument();
  });

  it("utiliza color rojo cuando promedio menor a 60", () => {
    mockUseGeneralChartData.mockReturnValue({
      resumen: { promedioGeneral: 50 },
      chartData: {},
      options: {},
    });

    render(<GeneralProgress activityHistory={[]} />);
    const starEl = screen.getByText("⭐ 50%");
    expect(starEl).toBeInTheDocument();
  });
});
