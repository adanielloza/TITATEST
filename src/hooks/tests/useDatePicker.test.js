import { renderHook, act } from "@testing-library/react";
import useDatePicker from "../useDatePicker";

describe("useDatePicker hook", () => {
  const initialDate = new Date("2024-04-20");
  const minDate = new Date("2024-01-01");
  const maxDate = new Date("2024-12-31");

  it("retorna valores iniciales correctamente", () => {
    const { result } = renderHook(() =>
      useDatePicker(initialDate, minDate, maxDate)
    );

    expect(result.current.selectedDate).toEqual(initialDate);
    expect(result.current.isCalendarVisible).toBe(false);
    expect(result.current.minDate).toEqual(minDate);
    expect(result.current.maxDate).toEqual(maxDate);
  });

  it("cambia el estado de visibilidad del calendario", () => {
    const { result } = renderHook(() =>
      useDatePicker(initialDate, minDate, maxDate)
    );

    act(() => {
      result.current.handleCalendarToggle();
    });

    expect(result.current.isCalendarVisible).toBe(true);

    act(() => {
      result.current.handleCalendarToggle();
    });

    expect(result.current.isCalendarVisible).toBe(false);
  });

  it("actualiza la fecha seleccionada correctamente", () => {
    const { result } = renderHook(() =>
      useDatePicker(initialDate, minDate, maxDate)
    );

    const newDate = new Date("2024-05-01");

    act(() => {
      result.current.handleDateChange(newDate);
    });

    expect(result.current.selectedDate).toEqual(newDate);
  });
});
