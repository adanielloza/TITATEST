import { render, screen, fireEvent } from "@testing-library/react";
import ActivityProgressCard from "../ActivityTracking/ActivityProgressCard";

vi.mock("../Progress/GeneralProgress.jsx", () => ({
  default: ({ activityHistory }) => (
    <div data-testid="general-progress">General {activityHistory.length}</div>
  ),
}));
vi.mock("../Progress/Progress1.jsx", () => ({
  default: ({ activityHistory }) =>
    activityHistory ? (
      <div data-testid="progress-1">P1 {activityHistory.actividadId}</div>
    ) : null,
}));
vi.mock("../Progress/Progress2.jsx", () => ({
  default: ({ activityHistory }) =>
    activityHistory ? (
      <div data-testid="progress-2">P2 {activityHistory.actividadId}</div>
    ) : null,
}));
vi.mock("../Progress/Progress3.jsx", () => ({
  default: ({ activityHistory }) =>
    activityHistory ? (
      <div data-testid="progress-3">P3 {activityHistory.actividadId}</div>
    ) : null,
}));

vi.mock("../../../../components/Dropdown.jsx", () => ({
  default: ({ value, onChange, options }) => (
    <select data-testid="dropdown" value={value} onChange={onChange}>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  ),
}));

describe("ActivityProgressCard", () => {
  const fullHistory = [
    { actividadId: "actividad_1", sesiones: [1, 2] },
    { actividadId: "actividad_2", sesiones: [3] },
  ];

  it("muestra progreso general por defecto", () => {
    render(<ActivityProgressCard activityHistory={fullHistory} />);
    expect(screen.getByTestId("general-progress")).toBeInTheDocument();
    expect(screen.getByTestId("general-progress")).toHaveTextContent(
      "General 2"
    );
  });

  it("permite cambiar a progreso por actividad usando el dropdown", () => {
    render(<ActivityProgressCard activityHistory={fullHistory} />);
    const dropdown = screen.getByTestId("dropdown");
    fireEvent.change(dropdown, { target: { value: "actividad_2" } });

    expect(screen.queryByTestId("general-progress")).not.toBeInTheDocument();
    expect(screen.getByTestId("progress-2")).toBeInTheDocument();
    expect(screen.getByTestId("progress-2")).toHaveTextContent(
      "P2 actividad_2"
    );
  });

  it("renderiza nulo si se elige una opción sin datos", () => {
    render(<ActivityProgressCard activityHistory={[]} />);
    const dropdown = screen.getByTestId("dropdown");
    fireEvent.change(dropdown, { target: { value: "actividad_1" } });

    expect(screen.queryByTestId("general-progress")).not.toBeInTheDocument();
    expect(screen.queryByTestId("progress-1")).not.toBeInTheDocument();
  });

  it("muestra el componente de progreso 3 si actividad_3 está presente", () => {
    const history = [
      { actividadId: "actividad_1", sesiones: [1, 2] },
      { actividadId: "actividad_3", sesiones: [4] },
    ];

    render(<ActivityProgressCard activityHistory={history} />);
    const dropdown = screen.getByTestId("dropdown");
    fireEvent.change(dropdown, { target: { value: "actividad_3" } });

    expect(screen.getByTestId("progress-3")).toBeInTheDocument();
    expect(screen.getByTestId("progress-3")).toHaveTextContent(
      "P3 actividad_3"
    );
  });

  it("no renderiza ningún componente si la opción no coincide con ninguna actividad conocida", () => {
    render(<ActivityProgressCard activityHistory={[]} />);
    const dropdown = screen.getByTestId("dropdown");
    fireEvent.change(dropdown, { target: { value: "actividad_desconocida" } });

    expect(screen.queryByTestId("general-progress")).not.toBeInTheDocument();
    expect(screen.queryByTestId("progress-1")).not.toBeInTheDocument();
    expect(screen.queryByTestId("progress-2")).not.toBeInTheDocument();
    expect(screen.queryByTestId("progress-3")).not.toBeInTheDocument();
  });
});
