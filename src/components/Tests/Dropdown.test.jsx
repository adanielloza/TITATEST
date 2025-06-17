import { render, screen, fireEvent } from "@testing-library/react";
import Dropdown from "../Dropdown";

describe("Dropdown component", () => {
  const basicOptions = [
    { value: "opcion1", label: "Opción 1" },
    { value: "opcion2", label: "Opción 2" },
  ];

  it("renderiza el label y el select", () => {
    render(
      <Dropdown label="Categoría" name="categoria" options={basicOptions} />
    );
    expect(screen.getByLabelText("Categoría")).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  it("muestra el placeholder como primera opción", () => {
    render(
      <Dropdown
        name="categoria"
        options={basicOptions}
        placeholder="Seleccione..."
        value=""
      />
    );
    const select = screen.getByRole("combobox");
    expect(select).toHaveDisplayValue("Seleccione...");
  });

  it("muestra las opciones correctamente", () => {
    render(<Dropdown name="categoria" options={basicOptions} />);
    const options = screen.getAllByRole("option");
    expect(options).toHaveLength(3);
    expect(options[1]).toHaveTextContent("Opción 1");
    expect(options[2]).toHaveTextContent("Opción 2");
  });

  it("convierte opciones tipo string a objetos correctamente", () => {
    render(<Dropdown name="estado" options={["Activo", "Inactivo"]} />);
    const options = screen.getAllByRole("option");
    expect(options[1]).toHaveTextContent("Activo");
    expect(options[1]).toHaveValue("Activo");
  });

  it("llama a onChange al seleccionar una opción", () => {
    const handleChange = vi.fn();
    render(
      <Dropdown name="estado" options={basicOptions} onChange={handleChange} />
    );
    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "opcion2" },
    });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it("aplica el atributo required y disabled correctamente", () => {
    render(
      <Dropdown name="select1" required disabled options={basicOptions} />
    );
    const select = screen.getByRole("combobox");
    expect(select).toBeRequired();
    expect(select).toBeDisabled();
  });

  it("muestra el mensaje de error si error=true", () => {
    render(
      <Dropdown
        name="select2"
        error
        errorMessage="Campo requerido"
        options={basicOptions}
      />
    );
    expect(screen.getByText("Campo requerido")).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toHaveAttribute(
      "aria-invalid",
      "true"
    );
    expect(screen.getByRole("combobox").parentElement).toHaveClass(
      "dropdown--error"
    );
  });
});
