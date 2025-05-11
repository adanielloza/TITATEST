import { renderHook } from "@testing-library/react";
import useInputValidation from "../useInputValidation";

describe("useInputValidation", () => {
  const makeEvent = (value) => ({
    target: { value },
  });

  it("permite todos los valores si no se aplica restricción", () => {
    const onChange = vi.fn();
    const { result } = renderHook(() => useInputValidation({ onChange }));

    result.current(makeEvent("123ABC"));
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it("permite solo números si onlyNumbers es true", () => {
    const onChange = vi.fn();
    const { result } = renderHook(() =>
      useInputValidation({ onlyNumbers: true, onChange })
    );

    result.current(makeEvent("123"));
    expect(onChange).toHaveBeenCalledTimes(1);

    result.current(makeEvent("abc"));
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it("permite solo letras si onlyLetters es true", () => {
    const onChange = vi.fn();
    const { result } = renderHook(() =>
      useInputValidation({ onlyLetters: true, onChange })
    );

    result.current(makeEvent("abc DEF"));
    expect(onChange).toHaveBeenCalledTimes(1);

    result.current(makeEvent("123"));
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it("ignora valores mixtos si hay restricciones", () => {
    const onChange = vi.fn();
    const { result } = renderHook(() =>
      useInputValidation({ onlyLetters: true, onChange })
    );

    result.current(makeEvent("abc123"));
    expect(onChange).not.toHaveBeenCalled();
  });
});
