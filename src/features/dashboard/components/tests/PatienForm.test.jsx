import { render, screen, fireEvent } from "@testing-library/react";
import PatientForm from "../PatientForm";

describe("PatientForm", () => {
  const initialData = {
    nombre: "Juan",
    apellido: "Pérez",
    fechaNacimiento: new Date("2010-05-03"),
    sexo: "Masculino",
    tipoTDAH: "TDAH",
    nombreTutor: "Ana",
    telefonoTutor: "0999999999",
    correoTutor: "ana@gmail.com",
    observaciones: "Ninguna",
  };

  it("renderiza todos los campos correctamente", () => {
    render(<PatientForm onDataChange={vi.fn()} initialData={initialData} />);
    expect(screen.getByDisplayValue("Juan")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Pérez")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Masculino")).toBeInTheDocument();
    expect(screen.getByDisplayValue("TDAH")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Ana")).toBeInTheDocument();
    expect(screen.getByDisplayValue("0999999999")).toBeInTheDocument();
    expect(screen.getByDisplayValue("ana@gmail.com")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Ninguna")).toBeInTheDocument();
  });

  it("llama al setter correspondiente cuando cambia un campo", () => {
    const onDataChange = vi.fn();
    render(
      <PatientForm onDataChange={onDataChange} initialData={initialData} />
    );
    fireEvent.change(screen.getByDisplayValue("Juan"), {
      target: { value: "Pedro" },
    });
    expect(onDataChange).toHaveBeenCalledWith(
      expect.objectContaining({
        formData: expect.objectContaining({
          nombre: "Pedro",
        }),
      })
    );
  });
  it("llama a onDataChange con los datos del formulario y validez", () => {
    const onDataChange = vi.fn();
    render(
      <PatientForm onDataChange={onDataChange} initialData={initialData} />
    );
    expect(onDataChange).toHaveBeenCalledWith(
      expect.objectContaining({
        formData: expect.objectContaining(initialData),
        isFormValid: true,
      })
    );
  });
  it("llama a onDataChange con los datos del formulario y validez", () => {
    const onDataChange = vi.fn();
    render(
      <PatientForm onDataChange={onDataChange} initialData={initialData} />
    );
    expect(onDataChange).toHaveBeenCalledWith(
      expect.objectContaining({
        formData: expect.objectContaining(initialData),
        isFormValid: true,
      })
    );
  });

});
