import { renderHook, act } from "@testing-library/react";
import usePatientForm from "../usePatientForm";
import * as validators from "../../../../utils/validators";

vi.mock("../../../../utils/validators", () => ({
  isValidEmail: vi.fn(),
  isValidPhone: vi.fn(),
}));

describe("usePatientForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("inicializa correctamente los valores por defecto", () => {
    validators.isValidEmail.mockReturnValue(true);
    validators.isValidPhone.mockReturnValue(true);

    const { result } = renderHook(() => usePatientForm());

    expect(result.current.nombre).toBe("");
    expect(result.current.apellido).toBe("");
    expect(result.current.fechaNacimiento).toBe(null);
    expect(result.current.sexo).toBe("");
    expect(result.current.tipoTDAH).toBe("");
    expect(result.current.nombreTutor).toBe("");
    expect(result.current.telefonoTutor).toBe("");
    expect(result.current.correoTutor).toBe("");
    expect(result.current.observaciones).toBe("");
    expect(result.current.isFormValid).toBe(false);
  });

  it("valida el formulario correctamente con datos válidos", async () => {
    validators.isValidEmail.mockReturnValue(true);
    validators.isValidPhone.mockReturnValue(true);

    const { result } = renderHook(() =>
      usePatientForm({
        nombre: "Lucía",
        apellido: "Castro",
        fechaNacimiento: "22/07/2011",
        sexo: "Femenino",
        tipoTDAH: "TDAH",
        nombreTutor: "Verónica Castro",
        telefonoTutor: "0988776655",
        correoTutor: "lucia.castro@gmail.com",
        observaciones: "Test",
      })
    );

    // Esperamos el efecto de validación
    expect(result.current.isFormValid).toBe(true);
  });

  it("marca como inválido si el correo es incorrecto", async () => {
    validators.isValidEmail.mockReturnValue(false);
    validators.isValidPhone.mockReturnValue(true);

    const { result } = renderHook(() =>
      usePatientForm({
        nombre: "Lucía",
        apellido: "Castro",
        fechaNacimiento: "22/07/2011",
        sexo: "Femenino",
        tipoTDAH: "TDAH",
        nombreTutor: "Verónica Castro",
        telefonoTutor: "0988776655",
        correoTutor: "correo_invalido",
      })
    );

    expect(result.current.isFormValid).toBe(false);
  });

  it("marca como inválido si el teléfono es incorrecto", async () => {
    validators.isValidEmail.mockReturnValue(true);
    validators.isValidPhone.mockReturnValue(false);

    const { result } = renderHook(() =>
      usePatientForm({
        nombre: "Lucía",
        apellido: "Castro",
        fechaNacimiento: "22/07/2011",
        sexo: "Femenino",
        tipoTDAH: "TDAH",
        nombreTutor: "Verónica Castro",
        telefonoTutor: "1234",
        correoTutor: "lucia@example.com",
      })
    );

    expect(result.current.isFormValid).toBe(false);
  });

  it("actualiza el estado correctamente", async () => {
    validators.isValidEmail.mockReturnValue(true);
    validators.isValidPhone.mockReturnValue(true);

    const { result } = renderHook(() => usePatientForm());

    act(() => {
      result.current.setNombre("Juan");
      result.current.setApellido("Pérez");
      result.current.setFechaNacimiento(new Date("2010-05-10"));
      result.current.setSexo("Masculino");
      result.current.setTipoTDAH("TDAH");
      result.current.setNombreTutor("Ana Pérez");
      result.current.setTelefonoTutor("0999988877");
      result.current.setCorreoTutor("juan@example.com");
      result.current.setObservaciones("Ninguna");
    });

    expect(result.current.nombre).toBe("Juan");
    expect(result.current.apellido).toBe("Pérez");
    expect(result.current.sexo).toBe("Masculino");
    expect(result.current.observaciones).toBe("Ninguna");
  });
});
