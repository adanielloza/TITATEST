import { render, screen } from "@testing-library/react";
import ActivityLayout from "../Results/ActivityLayout";
import { describe, it, expect } from "vitest";

describe("ActivityLayout", () => {
  it("renderiza correctamente el contenido izquierdo y derecho", () => {
    render(
      <ActivityLayout
        leftContent={<div data-testid="left-content">Contenido Izquierdo</div>}
        rightContent={<div data-testid="right-content">Contenido Derecho</div>}
      />
    );

    expect(screen.getByTestId("left-content")).toHaveTextContent(
      "Contenido Izquierdo"
    );
    expect(screen.getByTestId("right-content")).toHaveTextContent(
      "Contenido Derecho"
    );
  });
});
