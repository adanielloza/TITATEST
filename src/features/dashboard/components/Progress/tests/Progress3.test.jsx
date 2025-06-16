import { render, screen } from "@testing-library/react";
import React from "react";
import { vi } from "vitest";

const mockUseActividad3Data = vi.fn();

vi.mock("../hooks/useActividad3Data.js", () => ({
  useActividad3Data: () => mockUseActividad3Data(),
}));

vi.mock("react-chartjs-2", () => ({
  Line: React.forwardRef((props, ref) => {
    if (ref && typeof ref === "object") {
      ref.current = {
        getElementsAtEventForMode: () => [{ index: 0 }],
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

import Progress3 from "../Progress3";

describe("Progress3", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("muestra mensaje cuando no hay sesiones", () => {
    const activityHistory = { sesiones: [] };
    mockUseActividad3Data.mockReturnValue({
      chartData: {},
      labels: [],
      obtenerDetallePorFecha: () => [],
    });

    render(<Progress3 activityHistory={activityHistory} />);

    expect(screen.getByText(/No hay sesiones registradas/)).toBeInTheDocument();
  });

  it("muestra gráfico y mensaje por defecto si hay sesiones", () => {
    const activityHistory = { sesiones: [{}] };
    mockUseActividad3Data.mockReturnValue({
      chartData: {},
      labels: ["10 de abril"],
      obtenerDetallePorFecha: () => [],
    });

    render(<Progress3 activityHistory={activityHistory} />);

    expect(screen.getByTestId("line-chart")).toBeInTheDocument();
    expect(
      screen.getByText(/Selecciona un punto del gráfico/)
    ).toBeInTheDocument();
  });
});
