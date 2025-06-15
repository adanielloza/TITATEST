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

  it("llama a todos los setters al cambiar los campos", () => {
    const onDataChange = vi.fn();
    render(<PatientForm onDataChange={onDataChange} initialData={{}} />);

    const nombreInput = screen.getByLabelText("*Nombre");
    const apellidoInput = screen.getByLabelText("*Apellido");
    const nombreTutorInput = screen.getByLabelText("Nombre del Tutor");
    const telefonoInput = screen.getByLabelText("Teléfono del Tutor");
    const correoInput = screen.getByLabelText("*Correo del Tutor");
    const observacionesInput = screen.getByLabelText("Observaciones");

    const sexoSelect = screen.getByLabelText("*Sexo");
    const tipoTDAHSelect = screen.getByLabelText("*Tipo TDAH");

    fireEvent.change(nombreInput, { target: { value: "Pedro" } });
    fireEvent.change(apellidoInput, { target: { value: "Gomez" } });
    fireEvent.change(nombreTutorInput, { target: { value: "Laura" } });
    fireEvent.change(telefonoInput, { target: { value: "0987654321" } });
    fireEvent.change(correoInput, { target: { value: "laura@example.com" } });
    fireEvent.change(observacionesInput, {
      target: { value: "Observación nueva" },
    });

    fireEvent.change(sexoSelect, { target: { value: "Femenino" } });
    fireEvent.change(tipoTDAHSelect, { target: { value: "TDA" } });

    const lastCall = onDataChange.mock.calls.at(-1)[0].formData;

    expect(lastCall).toMatchObject({
      nombre: "Pedro",
      apellido: "Gomez",
      nombreTutor: "Laura",
      telefonoTutor: "0987654321",
      correoTutor: "laura@example.com",
      observaciones: "Observación nueva",
      sexo: "Femenino",
      tipoTDAH: "TDA",
    });
  });

  it("llama al setter de fecha de nacimiento", () => {
    const onDataChange = vi.fn();
    render(<PatientForm onDataChange={onDataChange} initialData={{}} />);

    const dateInput = screen.getAllByRole("textbox")[2];
    fireEvent.click(dateInput);

    const dateBtn = screen.getByRole("button", {
      name: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    });

    fireEvent.click(dateBtn);

    const calledWithDate = onDataChange.mock.calls.some(
      (call) => call[0].formData.fechaNacimiento instanceof Date
    );

    expect(calledWithDate).toBe(true);
  });
});
