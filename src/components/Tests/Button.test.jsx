import { render, screen, fireEvent } from "@testing-library/react";
import Button from "../Button";

const getButton = () => screen.getByRole("button");

describe("Button component", () => {
  it("renderiza el label correctamente", () => {
    render(<Button label="Enviar" />);
    expect(screen.getByText("Enviar")).toBeInTheDocument();
    expect(getButton()).toBeEnabled();
  });

  it("renderiza el icono si se proporciona", () => {
    render(<Button label="Con Icono" icon="/icon.svg" />);
    const icon = screen.getByRole("img");
    expect(icon).toHaveAttribute("src", "/icon.svg");
    expect(icon).toHaveAttribute("alt", "icon");
  });

  it("no renderiza un icono si no se proporciona", () => {
    render(<Button label="Sin icono" />);
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });

  it("ejecuta onClick si no está deshabilitado", () => {
    const handleClick = vi.fn();
    render(<Button label="Haz clic" onClick={handleClick} />);
    fireEvent.click(getButton());
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("no ejecuta onClick si está deshabilitado", () => {
    const handleClick = vi.fn();
    render(<Button label="No clic" onClick={handleClick} disabled />);
    fireEvent.click(getButton());
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("no tiene onClick asignado cuando está deshabilitado", () => {
    const handleClick = vi.fn();
    render(<Button label="Disabled" onClick={handleClick} disabled />);
    const button = getButton();
    expect(button).toBeDisabled();
    expect(button).not.toHaveAttribute("onClick");
  });

  it("aplica clase por defecto si no se pasa variant", () => {
    render(<Button label="Default" />);
    expect(getButton()).toHaveClass("button--primary");
  });

  it("aplica la clase del variant correctamente", () => {
    render(<Button label="Secundario" variant="secondary" />);
    expect(getButton()).toHaveClass("button--secondary");
  });

  it("aplica clase de deshabilitado correctamente", () => {
    render(<Button label="Disabled" disabled />);
    expect(getButton()).toHaveClass("button--disabled");
  });

  it("no ejecuta onClick si no se proporciona", () => {
    render(<Button label="Sin handler" />);
    expect(() => {
      fireEvent.click(getButton());
    }).not.toThrow();
  });

  it("no ejecuta onClick si no se proporciona", () => {
    render(<Button label="Sin handler" />);
    expect(() => {
      fireEvent.click(getButton());
    }).not.toThrow();
  });
});
