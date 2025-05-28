import { render, screen } from "@testing-library/react";
import { LoaderProvider, useLoader } from "../LoaderContext";
import userEvent from "@testing-library/user-event";

vi.mock("../../components/Loader", () => ({
  default: () => <div data-testid="loader">Cargando...</div>,
}));

function TestComponent() {
  const { showLoader, hideLoader } = useLoader();

  return (
    <div>
      <button onClick={showLoader}>Mostrar</button>
      <button onClick={hideLoader}>Ocultar</button>
    </div>
  );
}

describe("LoaderContext", () => {
  it("renderiza children correctamente", () => {
    render(
      <LoaderProvider>
        <p>Contenido principal</p>
      </LoaderProvider>
    );
    expect(screen.getByText("Contenido principal")).toBeInTheDocument();
  });

  it("muestra el Loader cuando se llama showLoader", async () => {
    const user = userEvent.setup();
    render(
      <LoaderProvider>
        <TestComponent />
      </LoaderProvider>
    );

    expect(screen.queryByTestId("loader")).not.toBeInTheDocument();

    await user.click(screen.getByText("Mostrar"));
    expect(screen.getByTestId("loader")).toBeInTheDocument();

    await user.click(screen.getByText("Ocultar"));
    expect(screen.queryByTestId("loader")).not.toBeInTheDocument();
  });

  it("proporciona showLoader y hideLoader desde useLoader", () => {
    let context;
    const Consumer = () => {
      context = useLoader();
      return null;
    };

    render(
      <LoaderProvider>
        <Consumer />
      </LoaderProvider>
    );

    expect(typeof context.showLoader).toBe("function");
    expect(typeof context.hideLoader).toBe("function");
  });
});
