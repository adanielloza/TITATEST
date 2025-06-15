import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useEffect } from "react";
import * as emailService from "../../services/emailService.js";
import AddUser from "../AddUser.jsx";

vi.mock("react-toastify/dist/ReactToastify.css", () => ({}));

const notifyMock = vi.fn();
vi.mock("../../../../hooks/useToast.js", () => ({
  default: () => ({
    notify: notifyMock,
  }),
}));

const saveUserMock = vi.fn().mockResolvedValue({});
vi.mock("../../hooks/useUsers.js", () => ({
  default: () => ({
    saveUser: saveUserMock,
  }),
}));

vi.mock("../../services/emailService.js", () => ({
  sendOTPEmail: vi.fn().mockResolvedValue(),
}));

vi.mock("../UserForm.jsx", () => {
  const ValidForm = ({ onDataChange }) => {
    useEffect(() => {
      onDataChange({
        formData: {
          name: "Juan",
          lastName: "Pérez",
          email: "juan@example.com",
          password: "123456",
        },
        isFormValid: true,
      });
    }, [onDataChange]);
    return <div data-testid="user-form">Formulario Usuario</div>;
  };
  return {
    __esModule: true,
    default: ValidForm,
  };
});

describe("AddUser component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("abre el modal y muestra el formulario", () => {
    render(<AddUser />);
    fireEvent.click(screen.getByText("Añadir Usuario"));
    expect(screen.getByText("Nuevo Usuario")).toBeInTheDocument();
    expect(screen.getByTestId("user-form")).toBeInTheDocument();
  });

  it("envía OTP y muestra el segundo modal", async () => {
    render(<AddUser />);
    fireEvent.click(screen.getByText("Añadir Usuario"));
    await waitFor(() => expect(screen.getByText("Guardar")).toBeEnabled());
    fireEvent.click(screen.getByText("Guardar"));

    await waitFor(() =>
      expect(emailService.sendOTPEmail).toHaveBeenCalledWith(
        "juan@example.com",
        expect.any(String)
      )
    );

    expect(screen.getByText("Verificación por correo")).toBeInTheDocument();
  });

  it("guarda el usuario si OTP es correcto", async () => {
    const onUserAdded = vi.fn();
    render(<AddUser onUserAdded={onUserAdded} />);
    fireEvent.click(screen.getByText("Añadir Usuario"));
    await waitFor(() => expect(screen.getByText("Guardar")).toBeEnabled());
    fireEvent.click(screen.getByText("Guardar"));

    await waitFor(() => screen.getByText("Verificación por correo"));
    const input = screen.getByRole("textbox");
    const otp = emailService.sendOTPEmail.mock.calls[0][1];
    fireEvent.change(input, { target: { value: otp } });
    fireEvent.click(screen.getByText("Guardar"));

    await waitFor(() => {
      expect(saveUserMock).toHaveBeenCalledWith({
        name: "Juan",
        lastName: "Pérez",
        email: "juan@example.com",
        password: "123456",
      });
      expect(onUserAdded).toHaveBeenCalled();
    });
  });

  it("muestra error si OTP es incorrecto", async () => {
    render(<AddUser />);
    fireEvent.click(screen.getByText("Añadir Usuario"));
    await waitFor(() => expect(screen.getByText("Guardar")).toBeEnabled());
    fireEvent.click(screen.getByText("Guardar"));

    await waitFor(() => screen.getByText("Verificación por correo"));
    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "000000" },
    });
    fireEvent.click(screen.getByText("Guardar"));

    await waitFor(() =>
      expect(notifyMock).toHaveBeenCalledWith(
        "error",
        "Código incorrecto. Inténtalo nuevamente."
      )
    );
  });

  it("cierra modales y limpia OTP al cancelar", async () => {
    render(<AddUser />);
    fireEvent.click(screen.getByText("Añadir Usuario"));
    await waitFor(() => expect(screen.getByText("Guardar")).toBeEnabled());
    fireEvent.click(screen.getByText("Guardar"));

    await waitFor(() => screen.getByText("Verificación por correo"));
    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "123456" },
    });

    fireEvent.click(screen.getByText("Cancelar"));
    expect(
      screen.queryByText("Verificación por correo")
    ).not.toBeInTheDocument();

    fireEvent.click(screen.getByText("Añadir Usuario"));
    fireEvent.click(screen.getByText("Guardar"));
    await waitFor(() => screen.getByText("Verificación por correo"));
    expect(screen.getByRole("textbox")).toHaveValue("");
  });
});
