import { render, screen } from "@testing-library/react";
import PageHeader from "../PageHeader";

describe("PageHeader", () => {
  it("muestra título y subtítulo si se proporcionan", () => {
    render(
      <PageHeader title="Título de prueba" subtitle="Subtítulo de prueba" />
    );
    expect(screen.getByText("Título de prueba")).toBeInTheDocument();
    expect(screen.getByText("Subtítulo de prueba")).toBeInTheDocument();
  });

  it("no renderiza el subtítulo si no se proporciona", () => {
    render(<PageHeader title="Solo título" />);
    expect(screen.getByText("Solo título")).toBeInTheDocument();
    expect(screen.queryByRole("heading", { level: 2 })).not.toBeInTheDocument();
  });

  it("no renderiza el título si no se proporciona", () => {
    render(<PageHeader subtitle="Solo subtítulo" />);
    expect(screen.getByText("Solo subtítulo")).toBeInTheDocument();
    expect(screen.queryByRole("heading", { level: 1 })).not.toBeInTheDocument();
  });
});
