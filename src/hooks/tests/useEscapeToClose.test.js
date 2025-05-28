import { renderHook } from "@testing-library/react";
import { fireEvent } from "@testing-library/dom";
import useEscapeToClose from "../useEscapeToClose";

describe("useEscapeToClose", () => {
  it("llama a onClose cuando se presiona Escape y isActive es true", () => {
    const onClose = vi.fn();

    renderHook(() => useEscapeToClose(true, onClose));

    fireEvent.keyDown(document, { key: "Escape" });
    expect(onClose).toHaveBeenCalled();
  });

  it("no llama a onClose si se presiona otra tecla", () => {
    const onClose = vi.fn();

    renderHook(() => useEscapeToClose(true, onClose));

    fireEvent.keyDown(document, { key: "Enter" });
    expect(onClose).not.toHaveBeenCalled();
  });

  it("no hace nada si isActive es false", () => {
    const onClose = vi.fn();

    renderHook(() => useEscapeToClose(false, onClose));

    fireEvent.keyDown(document, { key: "Escape" });
    expect(onClose).not.toHaveBeenCalled();
  });

  it("limpia correctamente el listener al desmontarse", () => {
    const onClose = vi.fn();

    const { unmount } = renderHook(() => useEscapeToClose(true, onClose));

    unmount();

    fireEvent.keyDown(document, { key: "Escape" });
    expect(onClose).not.toHaveBeenCalled();
  });
});
