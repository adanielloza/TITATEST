import { render, screen, fireEvent } from "@testing-library/react";
import TableBody from "../DataTable/TableBody";

describe("TableBody component", () => {
  const mockColumns = [
    { key: "nombre", label: "Nombre" },
    { key: "edad", label: "Edad" },
    { key: "observaciones", label: "Observaciones" },
  ];

  const mockData = [
    {
      nombre: "Juan",
      edad: 10,
      observaciones: "Sin observaciones",
    },
  ];

  it("muestra mensaje cuando no hay datos", () => {
    render(
      <table>
        <tbody>
          <TableBody data={[]} columns={mockColumns} />
        </tbody>
      </table>
    );
    expect(screen.getByText("No hay datos para mostrar")).toBeInTheDocument();
  });

  it("renderiza los datos correctamente", () => {
    render(
      <table>
        <tbody>
          <TableBody data={mockData} columns={mockColumns} />
        </tbody>
      </table>
    );

    expect(screen.getByText("Juan")).toBeInTheDocument();
    expect(screen.getByText("10")).toBeInTheDocument();
    expect(screen.getByText("Sin observaciones")).toBeInTheDocument();
  });

  it("aplica clase especial a la columna 'observaciones'", () => {
    render(
      <table>
        <tbody>
          <TableBody data={mockData} columns={mockColumns} />
        </tbody>
      </table>
    );

    const obsCell = screen.getByText("Sin observaciones").closest("td");
    expect(obsCell).toHaveClass("datatable__td--scrollable");
  });

  it("llama a onEdit cuando se hace clic en el ícono de editar", () => {
    const handleEdit = vi.fn();
    render(
      <table>
        <tbody>
          <TableBody
            data={mockData}
            columns={mockColumns}
            onEdit={handleEdit}
            showActions={true}
          />
        </tbody>
      </table>
    );

    const editIcon = screen.getByAltText("Editar");
    fireEvent.click(editIcon);
    expect(handleEdit).toHaveBeenCalledWith(mockData[0]);
  });

  it("llama a onDelete cuando se hace clic en el ícono de eliminar", () => {
    const handleDelete = vi.fn();
    render(
      <table>
        <tbody>
          <TableBody
            data={mockData}
            columns={mockColumns}
            onDelete={handleDelete}
            showActions={true}
          />
        </tbody>
      </table>
    );

    const deleteIcon = screen.getByAltText("Eliminar");
    fireEvent.click(deleteIcon);
    expect(handleDelete).toHaveBeenCalledWith(mockData[0]);
  });

  it("muestra correctamente el colSpan sin acciones cuando no hay datos", () => {
    render(
      <table>
        <tbody>
          <TableBody data={[]} columns={mockColumns} showActions={false} />
        </tbody>
      </table>
    );

    const cell = screen.getByText("No hay datos para mostrar");
    expect(cell).toHaveAttribute("colspan", mockColumns.length.toString());
  });

  it("muestra correctamente el colSpan con acciones cuando no hay datos", () => {
    render(
      <table>
        <tbody>
          <TableBody data={[]} columns={mockColumns} showActions={true} />
        </tbody>
      </table>
    );

    const cell = screen.getByText("No hay datos para mostrar");
    expect(cell).toHaveAttribute(
      "colspan",
      (mockColumns.length + 1).toString()
    );
  });
});
