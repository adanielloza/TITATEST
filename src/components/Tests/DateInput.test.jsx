import { render, screen, fireEvent } from "@testing-library/react";
import DateInput from "../DateInput";

vi.mock("../../hooks/useDatePicker", () => ({
  default: () => ({
    isCalendarVisible: true,
    selectedDate: new Date("2024-04-15T12:00:00"),
    handleCalendarToggle: vi.fn(),
    handleDateChange: vi.fn(),
  }),
}));

vi.mock("react-calendar", () => ({
  __esModule: true,
  default: ({ onChange }) => (
    <div
      data-testid="calendar"
      onClick={() => onChange(new Date("2024-04-20"))}
    >
      Calendario simulado
    </div>
  ),
}));

describe("DateInput component", () => {
  it("renderiza el label y el input", () => {
    render(<DateInput label="Fecha de nacimiento" />);
    expect(screen.getByText("Fecha de nacimiento")).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("muestra la fecha seleccionada correctamente formateada", () => {
    render(<DateInput label="Fecha" />);
    const input = screen.getByRole("textbox");
    expect(input.value).toBe("15/04/2024");
  });

  it("muestra el calendario si isCalendarVisible es true", () => {
    render(<DateInput label="Fecha" />);
    expect(screen.getByTestId("calendar")).toBeInTheDocument();
  });

  it("llama onChange con la nueva fecha cuando se selecciona una fecha", () => {
    const mockOnChange = vi.fn();
    render(<DateInput label="Fecha" onChange={mockOnChange} />);
    fireEvent.click(screen.getByTestId("calendar"));
    expect(mockOnChange).toHaveBeenCalledWith(new Date("2024-04-20"));
  });

  it("respeta la propiedad required en el input", () => {
    render(<DateInput label="Requerido" required />);
    const input = screen.getByRole("textbox");
    expect(input).toBeRequired();
  });

  it("no lanza error si onChange no está definido", () => {
    render(<DateInput label="Sin onChange" />);
    fireEvent.click(screen.getByTestId("calendar"));
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });
});
