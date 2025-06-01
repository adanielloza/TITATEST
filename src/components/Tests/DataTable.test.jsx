import { render, screen, fireEvent } from "@testing-library/react";
import DataTable from "../DataTable/DataTable";

const mockColumns = [
  { key: "nombre", label: "Nombre" },
  { key: "edad", label: "Edad" },
];

const mockData = [
  { nombre: "Juan", edad: 10 },
  { nombre: "Ana", edad: 9 },
  { nombre: "Luis", edad: 11 },
  { nombre: "Sofía", edad: 8 },
  { nombre: "Pedro", edad: 12 },
  { nombre: "Lucía", edad: 7 },
];

describe("DataTable component", () => {
  it("renderiza encabezados y controles", () => {
    render(<DataTable columns={mockColumns} data={mockData} />);

    expect(screen.getByText("Nombre")).toBeInTheDocument();
    expect(screen.getByText("Edad")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Buscar...")).toBeInTheDocument();
    expect(screen.getByLabelText("Filas por página:")).toBeInTheDocument();
  });

  it("muestra solo 5 filas por defecto", () => {
    render(<DataTable columns={mockColumns} data={mockData} />);
    const rows = screen.getAllByRole("row");
    expect(rows.length).toBe(6);
  });

  it("filtra resultados por texto", () => {
    render(<DataTable columns={mockColumns} data={mockData} />);
    const input = screen.getByPlaceholderText("Buscar...");
    fireEvent.change(input, { target: { value: "Ana" } });

    expect(screen.getByText("Ana")).toBeInTheDocument();
    expect(screen.queryByText("Juan")).not.toBeInTheDocument();
  });

  it("cambia filas por página", () => {
    render(<DataTable columns={mockColumns} data={mockData} />);
    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "10" },
    });

    const rows = screen.getAllByRole("row");
    expect(rows.length).toBe(7);
  });

  it("renderiza paginación si hay más de 5 datos", () => {
    render(<DataTable columns={mockColumns} data={mockData} />);
    const buttons = screen.getAllByRole("button");
    expect(buttons.some((b) => b.textContent === "2")).toBe(true);
  });

  it("ordena datos al hacer clic en un encabezado", () => {
    render(<DataTable columns={mockColumns} data={mockData} />);
    const edadHeader = screen.getByText("Edad");
    fireEvent.click(edadHeader); // Orden asc
    const firstCell = screen.getAllByRole("cell")[0];
    expect(firstCell).toHaveTextContent("Lucía");
  });
});
