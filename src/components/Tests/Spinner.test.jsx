import { render, screen, fireEvent } from "@testing-library/react";
import Spinner from "../Spinner";

describe("Spinner component", () => {
  const mockOnChange = vi.fn();

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renderiza el label, input y botones", () => {
    render(
      <Spinner
        label="Cantidad"
        name="cantidad"
        value={0}
        onChange={mockOnChange}
      />
    );
    expect(screen.getByLabelText("Cantidad")).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.getByLabelText("Increment value")).toBeInTheDocument();
    expect(screen.getByLabelText("Decrement value")).toBeInTheDocument();
  });

  it("incrementa y llama a onChange", () => {
    render(<Spinner value={1} onChange={mockOnChange} />);
    fireEvent.click(screen.getByLabelText("Increment value"));
    expect(mockOnChange).toHaveBeenCalledWith(2);
  });

  it("decrementa y llama a onChange", () => {
    render(<Spinner value={2} onChange={mockOnChange} />);
    fireEvent.click(screen.getByLabelText("Decrement value"));
    expect(mockOnChange).toHaveBeenCalledWith(1);
  });

  it("no incrementa si se alcanza el valor máximo", () => {
    render(<Spinner value={10} max={10} onChange={mockOnChange} />);
    fireEvent.click(screen.getByLabelText("Increment value"));
    expect(mockOnChange).not.toHaveBeenCalled();
  });

  it("no decrementa si se alcanza el valor mínimo", () => {
    render(<Spinner value={0} min={0} onChange={mockOnChange} />);
    fireEvent.click(screen.getByLabelText("Decrement value"));
    expect(mockOnChange).not.toHaveBeenCalled();
  });

  it("llama a onChange con valor ingresado manualmente", () => {
    render(<Spinner value={5} onChange={mockOnChange} />);
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "9" } });
    expect(mockOnChange).toHaveBeenCalledWith(9);
  });

  it("no llama a onChange si se ingresa un valor no numérico", () => {
    render(<Spinner value={5} onChange={mockOnChange} />);
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "abc" } });
    expect(mockOnChange).not.toHaveBeenCalled();
  });

  it("aplica atributos disabled, required y pattern correctamente", () => {
    render(
      <Spinner
        value={0}
        onChange={mockOnChange}
        disabled
        required
        pattern="\d+"
      />
    );
    const input = screen.getByRole("textbox");
    expect(input).toBeDisabled();
    expect(input).toBeRequired();
    expect(input).toHaveAttribute("pattern", "\\d+");
  });

  it("muestra mensaje de error y aplica aria-describedby", () => {
    render(
      <Spinner
        name="cantidad"
        value={1}
        onChange={mockOnChange}
        error
        errorMessage="Campo requerido"
      />
    );
    expect(screen.getByText("Campo requerido")).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toHaveAttribute(
      "aria-describedby",
      "cantidad-error"
    );
    expect(screen.getByRole("textbox")).toHaveAttribute("aria-invalid", "true");
  });
});
