import { render, screen, fireEvent } from "@testing-library/react";
import Pagination from "../DataTable/Pagination";

describe("Pagination component", () => {
  it("renderiza el número correcto de botones", () => {
    render(<Pagination totalPages={5} currentPage={1} setPage={() => {}} />);
    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(5);
    expect(buttons[0]).toHaveTextContent("1");
    expect(buttons[4]).toHaveTextContent("5");
  });

  it("aplica la clase 'active' al botón de la página actual", () => {
    render(<Pagination totalPages={3} currentPage={2} setPage={() => {}} />);
    const activeButton = screen.getByText("2");
    expect(activeButton).toHaveClass("active");
  });

  it("llama a setPage con el número correcto al hacer clic", () => {
    const setPageMock = vi.fn();
    render(<Pagination totalPages={4} currentPage={1} setPage={setPageMock} />);

    const button3 = screen.getByText("3");
    fireEvent.click(button3);

    expect(setPageMock).toHaveBeenCalledWith(3);
    expect(setPageMock).toHaveBeenCalledTimes(1);
  });
});
