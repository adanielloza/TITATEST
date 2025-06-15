import { render, screen } from "@testing-library/react";
import ActivityInfoPanel from "../Results/ActivityInfoPanel";
import { describe, it, expect } from "vitest";

describe("ActivityInfoPanel", () => {
  it("muestra el título por defecto", () => {
    render(<ActivityInfoPanel items={[]} />);
    expect(
      screen.getByText("📄 Información de la Actividad")
    ).toBeInTheDocument();
  });

  it("muestra un título personalizado", () => {
    render(<ActivityInfoPanel title="Detalles del Juego" items={[]} />);
    expect(screen.getByText("📄 Detalles del Juego")).toBeInTheDocument();
  });

  it("renderiza los items con íconos emoji correctamente", () => {
    const items = [
      { icon: "📅", label: "Fecha", value: "2024-06-14 15:00" },
      { icon: "⏱️", label: "Tiempo", value: "3m 45s" },
    ];

    render(<ActivityInfoPanel items={items} />);

    expect(screen.getByText("📅 Fecha")).toBeInTheDocument();
    expect(screen.getByText("2024-06-14 15:00")).toBeInTheDocument();

    expect(screen.getByText("⏱️ Tiempo")).toBeInTheDocument();
    expect(screen.getByText("3m 45s")).toBeInTheDocument();
  });
});
