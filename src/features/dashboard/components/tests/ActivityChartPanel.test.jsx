import { render, screen, fireEvent } from "@testing-library/react";
import ActivityChartPanel from "../Results/ActivityChartPanel";
import { describe, it, expect, vi } from "vitest";

describe("ActivityChartPanel", () => {
  const chartOptions = [
    { label: "Gráfico 1", value: "chart1" },
    { label: "Gráfico 2", value: "chart2" },
  ];

  it("renderiza título, dropdown y contenido", () => {
    render(
      <ActivityChartPanel
        chartOptions={chartOptions}
        selectedChart="chart1"
        onChartChange={() => {}}
      >
        <div>Contenido de prueba</div>
      </ActivityChartPanel>
    );

    expect(
      screen.getByText("📊 Visualización de Resultados")
    ).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toBeInTheDocument();
    expect(screen.getByText("Contenido de prueba")).toBeInTheDocument();
  });

  it("llama a onChartChange cuando se selecciona una opción", () => {
    const onChartChange = vi.fn();

    render(
      <ActivityChartPanel
        chartOptions={chartOptions}
        selectedChart="chart1"
        onChartChange={onChartChange}
      >
        <div />
      </ActivityChartPanel>
    );

    const dropdown = screen.getByRole("combobox");
    fireEvent.change(dropdown, { target: { value: "chart2" } });

    expect(onChartChange).toHaveBeenCalledWith("chart2");
  });
});
