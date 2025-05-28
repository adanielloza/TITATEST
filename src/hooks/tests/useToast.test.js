import { renderHook } from "@testing-library/react";
import useToast from "../useToast";
import { toast } from "react-toastify";

vi.mock("react-toastify", () => {
  const toast = vi.fn();
  toast.success = vi.fn();
  toast.error = vi.fn();
  toast.warning = vi.fn();
  toast.info = vi.fn();
  return { toast };
});

describe("useToast", () => {
  const message = "Mensaje de prueba";

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("muestra toast.success si type es 'success'", () => {
    const { result } = renderHook(() => useToast());
    result.current.notify("success", message);
    expect(toast.success).toHaveBeenCalledWith(message);
  });

  it("muestra toast.error si type es 'error'", () => {
    const { result } = renderHook(() => useToast());
    result.current.notify("error", message);
    expect(toast.error).toHaveBeenCalledWith(message);
  });

  it("muestra toast.warning si type es 'warning'", () => {
    const { result } = renderHook(() => useToast());
    result.current.notify("warning", message);
    expect(toast.warning).toHaveBeenCalledWith(message);
  });

  it("muestra toast.info si type es 'info'", () => {
    const { result } = renderHook(() => useToast());
    result.current.notify("info", message);
    expect(toast.info).toHaveBeenCalledWith(message);
  });

  it("muestra toast por defecto si el type no coincide", () => {
    const { result } = renderHook(() => useToast());
    result.current.notify("otro", message);
    expect(toast).toHaveBeenCalledWith(message);
  });
});
