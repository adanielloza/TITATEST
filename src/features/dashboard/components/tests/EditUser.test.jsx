import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useEffect } from "react";
import EditUser from "../EditUser";
import { updateUserById } from "../../services/userService";

const notifyMock = vi.fn();

vi.mock("../../../../hooks/useToast.js", () => ({
  default: () => ({ notify: notifyMock }),
}));

vi.mock("../../../../utils/formatters.js", () => ({
  useCapitalize: () => (str) => str.toUpperCase(),
}));

vi.mock("../../services/userService.js", () => ({
  updateUserById: vi.fn(),
}));

let dynamicFormValid = true;

vi.mock("../UserForm.jsx", () => {
  const MockForm = ({ onDataChange }) => {
    useEffect(() => {
      onDataChange({
        isFormValid: dynamicFormValid,
        formData: {
          name: dynamicFormValid ? "juan" : "",
          lastName: dynamicFormValid ? "pérez" : "",
        },
      });
    }, [onDataChange]);
    return <div data-testid="form">Formulario Usuario</div>;
  };
  return { __esModule: true, default: MockForm };
});

describe("EditUser", () => {
  const baseProps = {
    user: { uid: "123" },
    isOpen: true,
    onClose: vi.fn(),
    onUpdated: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    dynamicFormValid = true;
  });

  it("renderiza el modal con el formulario", () => {
    render(<EditUser {...baseProps} />);
    expect(screen.getByText("Editar Usuario")).toBeInTheDocument();
    expect(screen.getByTestId("form")).toBeInTheDocument();
  });

  it("actualiza usuario correctamente y llama onUpdated y onClose", async () => {
    updateUserById.mockResolvedValue({});
    render(<EditUser {...baseProps} />);
    fireEvent.click(screen.getByText("Guardar"));

    await waitFor(() => {
      expect(updateUserById).toHaveBeenCalledWith("123", {
        name: "JUAN",
        lastName: "PÉREZ",
      });
      expect(notifyMock).toHaveBeenCalledWith(
        "success",
        "Usuario actualizado correctamente"
      );
      expect(baseProps.onUpdated).toHaveBeenCalled();
      expect(baseProps.onClose).toHaveBeenCalled();
    });
  });

  it("muestra notificación de error si la actualización falla", async () => {
    updateUserById.mockRejectedValue(new Error("Error"));
    render(<EditUser {...baseProps} />);
    fireEvent.click(screen.getByText("Guardar"));

    await waitFor(() => {
      expect(notifyMock).toHaveBeenCalledWith(
        "error",
        "Error al actualizar usuario"
      );
    });
  });

  it("deshabilita el botón si el formulario es inválido", async () => {
    dynamicFormValid = false;

    render(<EditUser {...baseProps} />);
    const confirmButton = screen.getByText("Guardar").closest("button");

    await waitFor(() => {
      expect(confirmButton).toBeDisabled();
    });
  });
});
