import { render, screen, fireEvent } from "@testing-library/react";
import Input from "../Input";

const changeInput = (value) => {
  const input = screen.getByRole("textbox");
  fireEvent.change(input, { target: { value } });
};

describe("Input component", () => {
  it("renderiza el label y el input", () => {
    render(<Input label="Nombre" name="nombre" />);
    expect(screen.getByLabelText("Nombre")).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("muestra el placeholder correctamente", () => {
    render(<Input placeholder="Ingrese texto" />);
    expect(screen.getByPlaceholderText("Ingrese texto")).toBeInTheDocument();
  });

  it("llama a onChange con valores válidos", () => {
    const handleChange = vi.fn();
    render(<Input onChange={handleChange} />);
    changeInput("Hola");
    expect(handleChange).toHaveBeenCalled();
  });

  it("no llama a onChange si onlyNumbers=true y se ingresa letra", () => {
    const handleChange = vi.fn();
    render(<Input onlyNumbers onChange={handleChange} />);
    changeInput("abc");
    expect(handleChange).not.toHaveBeenCalled();
  });

  it("llama a onChange si onlyNumbers=true y se ingresa número", () => {
    const handleChange = vi.fn();
    render(<Input onlyNumbers onChange={handleChange} />);
    changeInput("123");
    expect(handleChange).toHaveBeenCalled();
  });

  it("no llama a onChange si onlyLetters=true y se ingresa número", () => {
    const handleChange = vi.fn();
    render(<Input onlyLetters onChange={handleChange} />);
    changeInput("123");
    expect(handleChange).not.toHaveBeenCalled();
  });

  it("llama a onChange si onlyLetters=true y se ingresa texto", () => {
    const handleChange = vi.fn();
    render(<Input onlyLetters onChange={handleChange} />);
    changeInput("hola mundo");
    expect(handleChange).toHaveBeenCalled();
  });

  it("aplica los atributos required, disabled y maxLength", () => {
    render(<Input required disabled maxLength={10} />);
    const input = screen.getByRole("textbox");
    expect(input).toBeRequired();
    expect(input).toBeDisabled();
    expect(input).toHaveAttribute("maxLength", "10");
  });

  it("muestra el mensaje de error y clases de error", () => {
    render(
      <Input
        error
        errorMessage="Campo obligatorio"
        name="test"
        value=""
        onChange={() => {}}
      />
    );
    const input = screen.getByRole("textbox");
    expect(input).toHaveClass("input__field--error");
    expect(screen.getByText("Campo obligatorio")).toBeInTheDocument();
    expect(input).toHaveAttribute("aria-invalid", "true");
  });
});
