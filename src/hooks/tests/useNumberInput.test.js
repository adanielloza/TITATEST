import { renderHook, act } from "@testing-library/react";
import { useNumberInput } from "../useNumberInput";

describe("useNumberInput", () => {
  const setup = (props) =>
    renderHook(() => useNumberInput({ onChange: vi.fn(), ...props }));

  it("inicializa el valor correctamente", () => {
    const { result } = setup({ initialValue: 5 });
    expect(result.current.value).toBe(5);
  });

  it("incrementa correctamente sin exceder max", () => {
    const onChange = vi.fn();
    const { result } = setup({ initialValue: 2, max: 3, step: 1, onChange });

    act(() => result.current.increment());
    expect(result.current.value).toBe(3);
    expect(onChange).toHaveBeenCalledWith(3);

    act(() => result.current.increment());
    expect(result.current.value).toBe(3);
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it("decrementa correctamente sin bajar de min", () => {
    const onChange = vi.fn();
    const { result } = setup({ initialValue: 2, min: 1, step: 1, onChange });

    act(() => result.current.decrement());
    expect(result.current.value).toBe(1);
    expect(onChange).toHaveBeenCalledWith(1);

    act(() => result.current.decrement());
    expect(result.current.value).toBe(1);
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it("handleChange acepta solo números válidos", () => {
    const onChange = vi.fn();
    const { result } = setup({ initialValue: 0, onChange });

    act(() => {
      result.current.handleChange({ target: { value: "123" } });
    });

    expect(result.current.value).toBe(123);
    expect(onChange).toHaveBeenCalledWith(123);
  });

  it("handleChange ignora valores no numéricos", () => {
    const onChange = vi.fn();
    const { result } = setup({ initialValue: 0, onChange });

    act(() => {
      result.current.handleChange({ target: { value: "abc" } });
    });

    expect(result.current.value).toBe(0);
    expect(onChange).not.toHaveBeenCalled();
  });

  it("handleChange permite valores negativos", () => {
    const onChange = vi.fn();
    const { result } = setup({ initialValue: 0, onChange });

    act(() => {
      result.current.handleChange({ target: { value: "-5" } });
    });

    expect(result.current.value).toBe(-5);
    expect(onChange).toHaveBeenCalledWith(-5);
  });
});
