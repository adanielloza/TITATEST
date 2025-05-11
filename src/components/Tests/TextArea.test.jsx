import { render, screen, fireEvent } from "@testing-library/react";
import TextArea from "../TextArea";

describe("TextArea component", () => {
  const mockOnChange = vi.fn();

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renderiza label y textarea", () => {
    render(
      <TextArea
        label="Descripción"
        name="descripcion"
        value=""
        onChange={mockOnChange}
      />
    );
    expect(screen.getByLabelText("Descripción")).toBeInTheDocument();
  });

  it("llama a onChange cuando el usuario escribe", () => {
    render(<TextArea name="notas" value="" onChange={mockOnChange} />);
    const textarea = screen.getByRole("textbox");
    fireEvent.change(textarea, { target: { value: "Nuevo texto" } });
    expect(mockOnChange).toHaveBeenCalled();
  });

  it("aplica atributos: required, disabled, maxLength y rows", () => {
    render(
      <TextArea
        name="observaciones"
        value=""
        onChange={mockOnChange}
        required
        disabled
        maxLength={100}
        rows={6}
      />
    );
    const textarea = screen.getByRole("textbox");
    expect(textarea).toBeRequired();
    expect(textarea).toBeDisabled();
    expect(textarea).toHaveAttribute("maxLength", "100");
    expect(textarea).toHaveAttribute("rows", "6");
  });

  it("muestra el placeholder correctamente", () => {
    render(
      <TextArea
        name="mensaje"
        value=""
        onChange={mockOnChange}
        placeholder="Escribe tu mensaje"
      />
    );
    expect(
      screen.getByPlaceholderText("Escribe tu mensaje")
    ).toBeInTheDocument();
  });

  it("muestra mensaje de error y clase cuando error es true", () => {
    render(
      <TextArea
        name="comentarios"
        value=""
        onChange={mockOnChange}
        error
        errorMessage="Campo obligatorio"
      />
    );
    expect(screen.getByText("Campo obligatorio")).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByRole("textbox").parentElement).toHaveClass(
      "textarea--error"
    );
  });
});
