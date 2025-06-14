import { render, screen, fireEvent } from "@testing-library/react";
import DateInput, { formatDate } from "../DateInput";

let mockedUseDatePicker;

vi.mock("../../hooks/useDatePicker", () => ({
  __esModule: true,
  default: () => mockedUseDatePicker(),
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
  beforeEach(() => {
    mockedUseDatePicker = () => ({
      isCalendarVisible: true,
      selectedDate: new Date("2024-04-15T12:00:00"),
      handleCalendarToggle: vi.fn(),
      handleDateChange: vi.fn(),
    });
  });

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

  it("renderiza input vacío si no hay fecha seleccionada", () => {
    mockedUseDatePicker = () => ({
      isCalendarVisible: true,
      selectedDate: null,
      handleCalendarToggle: vi.fn(),
      handleDateChange: vi.fn(),
    });

    render(<DateInput />);
    expect(screen.getByRole("textbox").value).toBe("");
  });

  it("no muestra el calendario si isCalendarVisible es false", () => {
    mockedUseDatePicker = () => ({
      isCalendarVisible: false,
      selectedDate: new Date("2024-04-15"),
      handleCalendarToggle: vi.fn(),
      handleDateChange: vi.fn(),
    });

    render(<DateInput />);
    expect(screen.queryByTestId("calendar")).not.toBeInTheDocument();
  });

  it("no renderiza el label si no se pasa como prop", () => {
    render(<DateInput />);
    expect(screen.queryByText("Fecha de nacimiento")).not.toBeInTheDocument();
  });

  it("usa formatDate y retorna string vacío si selectedDate es undefined", () => {
    mockedUseDatePicker = () => ({
      isCalendarVisible: true,
      selectedDate: undefined,
      handleCalendarToggle: vi.fn(),
      handleDateChange: vi.fn(),
    });

    render(<DateInput />);
    expect(screen.getByRole("textbox").value).toBe("");
  });

  it("formatDate retorna cadena vacía si date es undefined", () => {
    expect(formatDate(undefined)).toBe("");
  });

  it("al hacer click en el input llama a handleCalendarToggle", () => {
    const toggleSpy = vi.fn();
    mockedUseDatePicker = () => ({
      isCalendarVisible: true,
      selectedDate: new Date("2024‑04‑15"),
      handleCalendarToggle: toggleSpy,
      handleDateChange: vi.fn(),
    });

    render(<DateInput label="Click Test" />);
    fireEvent.click(screen.getByRole("textbox"));
    expect(toggleSpy).toHaveBeenCalledOnce();
  });

  it("formatea como cadena vacía si selectedDate es undefined", () => {
    const toggle = vi.fn();
    mockedUseDatePicker = () => ({
      isCalendarVisible: false,
      selectedDate: undefined,
      handleCalendarToggle: toggle,
      handleDateChange: vi.fn(),
    });

    render(<DateInput label="Formato vacío" />);
    const input = screen.getByRole("textbox");
    expect(input.value).toBe("");
  });
});
