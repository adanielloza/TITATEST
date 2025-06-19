import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import UserForm from "../UserForm";

const setup = (props = {}) => {
  const defaultProps = {
    onDataChange: vi.fn(),
    initialData: {},
    isEditing: false,
  };
  return render(<UserForm {...defaultProps} {...props} />);
};

describe("UserForm", () => {
  it("renderiza todos los campos cuando no está en modo edición", () => {
    setup();
    expect(screen.getByLabelText("*Nombre")).toBeInTheDocument();
    expect(screen.getByLabelText("*Apellido")).toBeInTheDocument();
    expect(screen.getByLabelText("*Correo Electrónico")).toBeInTheDocument();
    expect(screen.getByLabelText("*Contraseña")).toBeInTheDocument();
  });

  it("no muestra email ni contraseña en modo edición", () => {
    setup({ isEditing: true });
    expect(screen.getByLabelText("*Nombre")).toBeInTheDocument();
    expect(screen.getByLabelText("*Apellido")).toBeInTheDocument();
    expect(screen.queryByLabelText("*Correo Electrónico")).toBeNull();
    expect(screen.queryByLabelText("*Contraseña")).toBeNull();
  });

  it("llama a onDataChange al cambiar los campos", async () => {
    const onDataChange = vi.fn();
    setup({ onDataChange });

    fireEvent.change(screen.getByLabelText("*Nombre"), {
      target: { value: "Ana" },
    });
    await waitFor(() => {
      expect(screen.getByLabelText("*Nombre")).toHaveValue("Ana");
    });

    fireEvent.change(screen.getByLabelText("*Apellido"), {
      target: { value: "Díaz" },
    });
    await waitFor(() => {
      expect(screen.getByLabelText("*Apellido")).toHaveValue("Díaz");
    });

    fireEvent.change(screen.getByLabelText("*Correo Electrónico"), {
      target: { value: "ana@example.com" },
    });
    await waitFor(() => {
      expect(screen.getByLabelText("*Correo Electrónico")).toHaveValue(
        "ana@example.com"
      );
    });

    fireEvent.change(screen.getByLabelText("*Contraseña"), {
      target: { value: "123456" },
    });
    await waitFor(() => {
      expect(screen.getByLabelText("*Contraseña")).toHaveValue("123456");
    });

    await waitFor(() => {
      const found = onDataChange.mock.calls.some(([arg]) => {
        return (
          arg.formData?.name === "Ana" &&
          arg.formData?.lastName === "Díaz" &&
          arg.formData?.email === "ana@example.com" &&
          arg.formData?.password === "123456" &&
          arg.isFormValid === true
        );
      });

      expect(found).toBe(true);
    });
  });

  it("llama a onDataChange al cambiar los campos en modo edición", async () => {
    const onDataChange = vi.fn();
    setup({ isEditing: true, onDataChange });

    fireEvent.change(screen.getByLabelText("*Nombre"), {
      target: { value: "Carlos" },
    });
    fireEvent.change(screen.getByLabelText("*Apellido"), {
      target: { value: "Pérez" },
    });

    await waitFor(() => {
      const found = onDataChange.mock.calls.some(([arg]) => {
        return (
          arg.formData?.name === "Carlos" && arg.formData?.lastName === "Pérez"
        );
      });

      expect(found).toBe(true);
    });
  });
});
