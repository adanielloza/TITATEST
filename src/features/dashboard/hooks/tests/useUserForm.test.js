import { renderHook, act } from "@testing-library/react";
import useUserForm from "../useUserForm";
import * as validators from "../../../../utils/validators";

describe("useUserForm", () => {
  it("inicializa los campos con valores por defecto vacíos", () => {
    const { result } = renderHook(() => useUserForm());

    expect(result.current.name).toBe("");
    expect(result.current.lastName).toBe("");
    expect(result.current.email).toBe("");
    expect(result.current.password).toBe("");
    expect(result.current.isFormValid).toBe(false);
  });

  it("valida correctamente cuando se llenan todos los campos (modo creación)", () => {
    vi.spyOn(validators, "isValidEmail").mockReturnValue(true);

    const { result } = renderHook(() => useUserForm());

    act(() => {
      result.current.setName("Juan");
      result.current.setLastName("Pérez");
      result.current.setEmail("juan@example.com");
      result.current.setPassword("123456");
    });

    expect(result.current.isFormValid).toBe(true);
  });

  it("es inválido si el email no es válido", () => {
    vi.spyOn(validators, "isValidEmail").mockReturnValue(false);

    const { result } = renderHook(() => useUserForm());

    act(() => {
      result.current.setName("Ana");
      result.current.setLastName("López");
      result.current.setEmail("correo@mal");
      result.current.setPassword("123456");
    });

    expect(result.current.isFormValid).toBe(false);
  });

  it("es inválido si la contraseña tiene menos de 6 caracteres", () => {
    vi.spyOn(validators, "isValidEmail").mockReturnValue(true);

    const { result } = renderHook(() => useUserForm());

    act(() => {
      result.current.setName("Lucía");
      result.current.setLastName("Gómez");
      result.current.setEmail("lucia@test.com");
      result.current.setPassword("123");
    });

    expect(result.current.isFormValid).toBe(false);
  });

  it("en modo edición ignora email y password para validar", () => {
    const { result } = renderHook(() => useUserForm({}, true));

    act(() => {
      result.current.setName("Mario");
      result.current.setLastName("Suárez");
    });

    expect(result.current.isFormValid).toBe(true);
  });

  it("en modo edición es inválido si faltan nombre o apellido", () => {
    const { result } = renderHook(() => useUserForm({}, true));

    act(() => {
      result.current.setName("");
      result.current.setLastName("Apellido");
    });

    expect(result.current.isFormValid).toBe(false);
  });

  it("inicializa correctamente con datos iniciales en modo edición", () => {
    const initialData = {
      name: "Pedro",
      lastName: "Alvarez",
      email: "pedro@mail.com",
    };

    const { result } = renderHook(() => useUserForm(initialData, true));

    expect(result.current.name).toBe("Pedro");
    expect(result.current.lastName).toBe("Alvarez");
    expect(result.current.email).toBe("pedro@mail.com");
    expect(result.current.password).toBe("");
    expect(result.current.isFormValid).toBe(true);
  });
});
