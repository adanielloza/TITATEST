import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ActivityHistoryCard from "../ActivityTracking/ActivityHistoryCard";

vi.mock("../../hooks/useActivitySessions.js", () => ({
  default: (activities) =>
    activities.map((a, i) => ({
      ...a,
      sesionId: `s${i}`,
      fecha: new Date().toISOString(),
      game_settings: {},
    })),
}));

vi.mock("../ActivityTracking/ActivityCard.jsx", () => ({
  default: ({ sesion, selected, onSelect }) => (
    <div
      data-testid={`card-${sesion.sesionId}`}
      className={selected ? "selected" : ""}
      onClick={onSelect}
    >
      MockCard {sesion.sesionId}
    </div>
  ),
}));

describe("ActivityHistoryCard", () => {
  it("renderiza mensaje vacío si no hay actividades", async () => {
    const onSessionSelect = vi.fn();
    render(
      <ActivityHistoryCard activities={[]} onSessionSelect={onSessionSelect} />
    );

    expect(
      screen.getByText("No hay actividades registradas.")
    ).toBeInTheDocument();

    await waitFor(() => {
      expect(onSessionSelect).toHaveBeenCalledWith(null);
    });
  });

  it("selecciona automáticamente la primera sesión", () => {
    const onSessionSelect = vi.fn();
    const activities = [
      { actividadId: "actividad_1" },
      { actividadId: "actividad_2" },
    ];
    render(
      <ActivityHistoryCard
        activities={activities}
        onSessionSelect={onSessionSelect}
      />
    );
    expect(screen.getByTestId("card-s0")).toHaveClass("selected");
    expect(onSessionSelect).toHaveBeenCalledWith(
      expect.objectContaining({ sesionId: "s0" })
    );
  });

  it("cambia la sesión seleccionada al hacer clic", () => {
    const onSessionSelect = vi.fn();
    const activities = [
      { actividadId: "actividad_1" },
      { actividadId: "actividad_2" },
    ];
    render(
      <ActivityHistoryCard
        activities={activities}
        onSessionSelect={onSessionSelect}
      />
    );

    const secondCard = screen.getByTestId("card-s1");
    fireEvent.click(secondCard);
    expect(secondCard).toHaveClass("selected");
    expect(onSessionSelect).toHaveBeenCalledWith(
      expect.objectContaining({ sesionId: "s1" })
    );
  });
});
