import { render, screen } from "@testing-library/react";
import Container from "../Container";

describe("Container", () => {
  it("renderiza los children dentro del contenedor con clase 'container'", () => {
    render(
      <Container>
        <p>Contenido de prueba</p>
      </Container>
    );

    const container = screen.getByText("Contenido de prueba");
    expect(container).toBeInTheDocument();
    expect(container.parentElement).toHaveClass("container");
  });
});
