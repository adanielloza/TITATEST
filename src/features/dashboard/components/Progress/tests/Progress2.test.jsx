import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, vi, beforeEach, expect, beforeAll } from "vitest";
import Progress2 from "../Progress2";

vi.mock("../hooks/useActividad2Data.js", () => ({
  useActividad2Data: vi.fn(),
}));

vi.mock("../../../../../components/DataTable/DataTable.jsx", () => ({
  default: ({ data }) => (
    <div data-testid="data-table">
      {data.map((row, i) => (
        <div key={i} data-testid="fila">
          {row.actividad} - {row.puntaje}
        </div>
      ))}
    </div>
  ),
}));

import { useActividad2Data } from "../hooks/useActividad2Data";

beforeAll(() => {
  HTMLCanvasElement.prototype.getContext = vi.fn(() => ({
    fillRect: vi.fn(),
    clearRect: vi.fn(),
    getImageData: vi.fn(() => ({ data: [] })),
    putImageData: vi.fn(),
    createImageData: vi.fn(() => []),
    setTransform: vi.fn(),
    drawImage: vi.fn(),
    save: vi.fn(),
    fillText: vi.fn(),
    restore: vi.fn(),
    beginPath: vi.fn(),
    moveTo: vi.fn(),
    lineTo: vi.fn(),
    closePath: vi.fn(),
    stroke: vi.fn(),
    strokeRect: vi.fn(),
    setLineDash: vi.fn(),
    clear: vi.fn(),
    measureText: vi.fn(() => ({ width: 0 })),
    scale: vi.fn(),
    translate: vi.fn(),
    rotate: vi.fn(),
    arc: vi.fn(),
    arcTo: vi.fn(),
    fill: vi.fn(),
    clip: vi.fn(),
    rect: vi.fn(),
    quadraticCurveTo: vi.fn(),
    bezierCurveTo: vi.fn(),
  }));
});

describe("Progress2", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("muestra mensaje si no hay sesiones", () => {
    const mockHistory = { sesiones: {} };

    useActividad2Data.mockReturnValue({
      chartData: { labels: [], datasets: [] },
      labels: [],
      obtenerDetallePorFecha: () => [],
    });

    render(<Progress2 activityHistory={mockHistory} />);

    expect(
      screen.getByText(/No hay sesiones registradas/i)
    ).toBeInTheDocument();
  });

  it("muestra gráfico y mensaje de selección si hay sesiones pero no se ha hecho clic", () => {
    const mockData = {
      chartData: {
        labels: ["01 de junio"],
        datasets: [{ label: "Desempeño", data: [90] }],
      },
      labels: ["01 de junio"],
      obtenerDetallePorFecha: vi.fn().mockReturnValue([]),
    };

    const mockHistory = {
      sesiones: {
        a1: {
          fecha: "2024-06-01T10:00:00Z",
          game_results: {
            correct_answers: 7,
            image_opens: 3,
            time_spent_seconds: 50,
          },
          game_settings: { grid_size: 3 },
        },
      },
    };

    useActividad2Data.mockReturnValue(mockData);

    render(<Progress2 activityHistory={mockHistory} />);

    expect(screen.getByText("Progreso Actividad 2")).toBeInTheDocument();
    expect(
      screen.getByText(/Selecciona un punto del gráfico/i)
    ).toBeInTheDocument();
  });
});
