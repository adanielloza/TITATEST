import { render, screen, fireEvent } from "@testing-library/react";
import TableHeader from "../DataTable/TableHeader";

describe("TableHeader component", () => {
  const mockColumns = [
    { key: "nombre", label: "Nombre" },
    { key: "edad", label: "Edad" },
    { key: "correo", label: "Correo" },
  ];

  const setup = (props = {}) => {
    const defaultProps = {
      columns: mockColumns,
      sortKey: "nombre",
      sortAsc: true,
      onSort: vi.fn(),
      toggleAsc: vi.fn(),
    };

    render(
      <table>
        <thead>
          <TableHeader {...defaultProps} {...props} />
        </thead>
      </table>
    );
    return defaultProps;
  };

  it("renderiza las columnas y la columna 'Acciones'", () => {
    setup();
    mockColumns.forEach((col) => {
      expect(screen.getByText(col.label)).toBeInTheDocument();
    });
    expect(screen.getByText("Acciones")).toBeInTheDocument();
  });

  it("llama a onSort y toggleAsc al hacer clic en un encabezado", () => {
    const { onSort, toggleAsc } = setup();

    fireEvent.click(screen.getByText("Edad"));

    expect(toggleAsc).toHaveBeenCalledWith(true);
    expect(onSort).toHaveBeenCalledWith("edad");
  });

  it("invierte el orden si se hace clic en el mismo encabezado", () => {
    const { onSort, toggleAsc } = setup({ sortKey: "edad", sortAsc: true });

    fireEvent.click(screen.getByText("Edad"));

    expect(toggleAsc).toHaveBeenCalledWith(false);
    expect(onSort).toHaveBeenCalledWith("edad");
  });
});
