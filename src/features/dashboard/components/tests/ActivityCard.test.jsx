import { render, screen, fireEvent } from "@testing-library/react";
import ActivityCard from "../ActivityTracking/ActivityCard";
import { ACTIVITY_INFO } from "../../constants/activityInfo";

vi.mock("../../../../utils/getDificultad.js", () => ({
  getDificultad: () => "Alta",
}));

vi.mock("../../../../utils/formatters.js", () => ({
  formatDateTime: () => ({ fecha: "10/06/2025", hora: "14:00" }),
}));

describe("ActivityCard", () => {
  const sesion = {
    actividadId: "actividad_1",
    fecha: new Date().toISOString(),
    game_settings: {},
  };

  const defaultProps = {
    sesion,
    selected: false,
    onSelect: vi.fn(),
  };

  it("renderiza correctamente con los datos de sesión", () => {
    render(<ActivityCard {...defaultProps} />);
    const config = ACTIVITY_INFO[sesion.actividadId];

    expect(config).toBeDefined();
    expect(screen.getByText(config.name)).toBeInTheDocument();
    expect(screen.getByText("10/06/2025")).toBeInTheDocument();
    expect(screen.getByText("14:00")).toBeInTheDocument();
    expect(screen.getByText(/Dificultad: Alta/)).toBeInTheDocument();
  });

  it("aplica estilos de selección cuando selected es true", () => {
    render(<ActivityCard {...defaultProps} selected={true} />);
    const card = screen.getByRole("img").closest("div");
    expect(card).toHaveStyle(
      `background-color: ${ACTIVITY_INFO[sesion.actividadId].color}`
    );
  });

  it("llama a onSelect al hacer click", () => {
    const onSelect = vi.fn();
    render(<ActivityCard {...defaultProps} onSelect={onSelect} />);
    fireEvent.click(screen.getByText(/Dificultad: Alta/));
    expect(onSelect).toHaveBeenCalled();
  });

  it("usa el id de actividad como título si no hay configuración", () => {
    const sesionWithoutConfig = {
      actividadId: "actividad_desconocida",
      fecha: new Date().toISOString(),
      game_settings: {},
    };

    render(
      <ActivityCard
        sesion={sesionWithoutConfig}
        selected={false}
        onSelect={vi.fn()}
      />
    );
    expect(screen.getByText("actividad_desconocida")).toBeInTheDocument();
  });
});
