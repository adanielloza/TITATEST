import { render, screen, fireEvent } from "@testing-library/react";
import Controls from "../DataTable/Controls";

describe("Controls component", () => {
  const setup = () => {
    const props = {
      search: "niño",
      setSearch: vi.fn(),
      rowsPerPage: 10,
      setRowsPerPage: vi.fn(),
      setPage: vi.fn(),
      placeholder: "Buscar...",
    };

    render(<Controls {...props} />);
    return props;
  };

  it("renderiza el input de búsqueda y el selector", () => {
    setup();

    expect(screen.getByPlaceholderText("Buscar...")).toBeInTheDocument();
    expect(screen.getByLabelText("Filas por página:")).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toHaveValue("10");
  });

  it("actualiza el valor de búsqueda al escribir", () => {
    const { setSearch } = setup();
    const input = screen.getByRole("textbox");

    fireEvent.change(input, { target: { value: "TDAH" } });

    expect(setSearch).toHaveBeenCalledWith("TDAH");
  });

  it("cambia las filas por página y resetea la página", () => {
    const { setRowsPerPage, setPage } = setup();
    const select = screen.getByRole("combobox");

    fireEvent.change(select, { target: { value: "15" } });

    expect(setRowsPerPage).toHaveBeenCalledWith(15);
    expect(setPage).toHaveBeenCalledWith(1);
  });
});
