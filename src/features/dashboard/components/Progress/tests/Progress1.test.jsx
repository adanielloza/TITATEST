import { render, screen } from "@testing-library/react";
import React from "react";
import { vi } from "vitest";
import Progress1 from "../Progress1";

const mockUseActividad1Data = vi.fn();

vi.mock("../hooks/useActividad1Data.js", () => ({
  useActividad1Data: () => mockUseActividad1Data(),
}));

vi.mock("react-chartjs-2", () => ({
  Line: React.forwardRef((props, ref) => {
    if (ref && typeof ref === "object") {
      ref.current = {
        getElementsAtEventForMode: () => props.mockedPoints || [],
      };
    }
    return <canvas data-testid="line-chart" onClick={props.onClick} />;
  }),
}));

vi.mock("../../../../../components/DataTable/DataTable", () => ({
  __esModule: true,
  default: ({ data }) => (
    <div data-testid="datatable">
      {data.map((r, i) => (
        <div key={i}>{r.actividad}</div>
      ))}
    </div>
  ),
}));

describe("Progress1", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("muestra mensaje cuando no hay sesiones", () => {
    const activityHistory = { sesiones: {} };
    mockUseActividad1Data.mockReturnValue({
      chartData: {},
      labels: [],
      obtenerDetallePorFecha: () => [],
    });

    render(<Progress1 activityHistory={activityHistory} />);

    expect(screen.getByText(/No hay sesiones registradas/)).toBeInTheDocument();
  });

  it("muestra gráfico y mensaje por defecto si hay sesiones", () => {
    const activityHistory = { sesiones: { a: {} } };
    mockUseActividad1Data.mockReturnValue({
      chartData: {},
      labels: ["01 de enero"],
      obtenerDetallePorFecha: () => [],
    });

    render(<Progress1 activityHistory={activityHistory} />);

    expect(screen.getByTestId("line-chart")).toBeInTheDocument();
    expect(
      screen.getByText(/Selecciona un punto del gráfico/)
    ).toBeInTheDocument();
  });
});
