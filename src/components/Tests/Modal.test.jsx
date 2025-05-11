import { render, screen, fireEvent } from "@testing-library/react";
import Modal from "../Modal";

vi.mock("../../hooks/useEscapeToClose", () => ({
  default: () => {},
}));

describe("Modal component", () => {
  const defaultProps = {
    isOpen: true,
    onClose: vi.fn(),
    title: "Título del modal",
    subtitle: "Subtítulo de prueba",
    onCancel: vi.fn(),
    onConfirm: vi.fn(),
  };

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("no se renderiza si isOpen es false", () => {
    const { container } = render(<Modal {...defaultProps} isOpen={false} />);
    expect(container.firstChild).toBeNull();
  });

  it("renderiza el título, subtítulo y contenido", () => {
    render(
      <Modal {...defaultProps}>
        <p>Contenido del modal</p>
      </Modal>
    );
    expect(screen.getByText("Título del modal")).toBeInTheDocument();
    expect(screen.getByText("Subtítulo de prueba")).toBeInTheDocument();
    expect(screen.getByText("Contenido del modal")).toBeInTheDocument();
  });

  it("llama a onClose al hacer clic en backdrop", () => {
    render(<Modal {...defaultProps} />);
    fireEvent.click(document.querySelector(".modal__backdrop"));
    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  it("llama a onClose al hacer clic en botón cerrar", () => {
    render(<Modal {...defaultProps} />);
    fireEvent.click(screen.getByText("×"));
    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  it("llama a onCancel al hacer clic en el botón de cancelar", () => {
    render(<Modal {...defaultProps} />);
    fireEvent.click(screen.getByText("Cancelar"));
    expect(defaultProps.onCancel).toHaveBeenCalled();
  });

  it("llama a onConfirm al hacer clic en el botón de confirmar", () => {
    render(<Modal {...defaultProps} />);
    fireEvent.click(screen.getByText("Guardar"));
    expect(defaultProps.onConfirm).toHaveBeenCalled();
  });

  it("deshabilita el botón de confirmar si isConfirmDisabled es true", () => {
    render(<Modal {...defaultProps} isConfirmDisabled={true} />);
    const confirmButton = screen
      .getAllByRole("button")
      .find((btn) => btn.textContent === "Guardar");
    expect(confirmButton).toBeDisabled();
  });

  it("usa etiquetas personalizadas para los botones", () => {
    render(
      <Modal {...defaultProps} cancelLabel="Cerrar" confirmLabel="Aceptar" />
    );
    expect(screen.getByText("Cerrar")).toBeInTheDocument();
    expect(screen.getByText("Aceptar")).toBeInTheDocument();
  });
});
