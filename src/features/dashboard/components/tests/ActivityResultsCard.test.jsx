import { render, screen } from "@testing-library/react";
import ActivityResultsCard from "../ActivityTracking/ActivityResultsCard";

vi.mock("../Results/ActivityOneResults.jsx", () => ({
  default: ({ data }) => (
    <div data-testid="results-1">Results1 {data.actividadId}</div>
  ),
}));
vi.mock("../Results/ActivityTwoResults.jsx", () => ({
  default: ({ data }) => (
    <div data-testid="results-2">Results2 {data.actividadId}</div>
  ),
}));
vi.mock("../Results/ActivityThreeResults.jsx", () => ({
  default: ({ data }) => (
    <div data-testid="results-3">Results3 {data.actividadId}</div>
  ),
}));

describe("ActivityResultsCard", () => {
  it("muestra mensaje vacío cuando no hay sesión seleccionada", () => {
    render(<ActivityResultsCard selectedSession={null} />);
    expect(
      screen.getByText("📈 Resultados de Actividades")
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /Aquí se mostrarán los resultados detallados cuando hayan sesiones en el historial de actividades./
      )
    ).toBeInTheDocument();
  });

  it("renderiza ActivityOneResults cuando selectedSession.actividadTipo es 'actividad_1'", () => {
    const sesion = {
      sesionId: "s1",
      actividadId: "actividad_1",
      actividadTipo: "actividad_1",
    };
    render(<ActivityResultsCard selectedSession={sesion} />);
    expect(screen.getByTestId("results-1")).toHaveTextContent(
      "Results1 actividad_1"
    );
  });

  it("renderiza ActivityTwoResults cuando selectedSession.actividadTipo es 'actividad_2'", () => {
    const sesion = {
      sesionId: "s2",
      actividadId: "actividad_2",
      actividadTipo: "actividad_2",
    };
    render(<ActivityResultsCard selectedSession={sesion} />);
    expect(screen.getByTestId("results-2")).toHaveTextContent(
      "Results2 actividad_2"
    );
  });

  it("renderiza ActivityThreeResults cuando selectedSession.actividadTipo es 'actividad_3'", () => {
    const sesion = {
      sesionId: "s3",
      actividadId: "actividad_3",
      actividadTipo: "actividad_3",
    };
    render(<ActivityResultsCard selectedSession={sesion} />);
    expect(screen.getByTestId("results-3")).toHaveTextContent(
      "Results3 actividad_3"
    );
  });

  it("utiliza actividadId si no existe actividadTipo", () => {
    const sesion = { sesionId: "s4", actividadId: "actividad_2" };
    render(<ActivityResultsCard selectedSession={sesion} />);
    expect(screen.getByTestId("results-2")).toHaveTextContent(
      "Results2 actividad_2"
    );
  });
});
