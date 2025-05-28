import { render } from "@testing-library/react";
import Loader from "../Loader";

describe("Loader component", () => {
  it("renderiza correctamente el wrapper y el spinner", () => {
    const { container } = render(<Loader />);
    const wrapper = container.querySelector(".loader__wrapper");
    const spinner = container.querySelector(".loader__spinner");

    expect(wrapper).toBeInTheDocument();
    expect(spinner).toBeInTheDocument();
  });

  it("contiene un SVG con circle y path", () => {
    const { container } = render(<Loader />);
    const circle = container.querySelector("circle");
    const path = container.querySelector("path");

    expect(circle).toBeInTheDocument();
    expect(path).toBeInTheDocument();
  });

  it("aplica correctamente las clases al SVG y sus hijos", () => {
    const { container } = render(<Loader />);
    const circle = container.querySelector(".loader__spinner-circle");
    const path = container.querySelector(".loader__spinner-path");

    expect(circle).toBeInTheDocument();
    expect(path).toBeInTheDocument();
  });
});
