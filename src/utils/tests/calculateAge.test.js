import { describe, it, expect } from "vitest";
import { calculateAge } from "../calculateAge";

describe("calculateAge", () => {
  it("devuelve la edad correctamente si la fecha es válida", () => {
    const today = new Date();
    const birthYear = today.getFullYear() - 10;
    const fecha = `01/01/${birthYear}`;
    expect(calculateAge(fecha)).toBe(10);
  });

  it("devuelve la edad correctamente si el cumpleaños no ha pasado este año", () => {
    const today = new Date();
    const birthYear = today.getFullYear() - 10;
    const nextMonth = (today.getMonth() + 2).toString().padStart(2, "0");
    const fecha = `01/${nextMonth}/${birthYear}`;
    const edadEsperada = 9;
    expect(calculateAge(fecha)).toBe(edadEsperada);
  });

  it("devuelve 'N/A' si el formato es inválido", () => {
    expect(calculateAge("fecha-mala")).toBe("N/A");
  });

  it("devuelve 'N/A' si la entrada es null o undefined", () => {
    expect(calculateAge(null)).toBe("N/A");
    expect(calculateAge(undefined)).toBe("N/A");
  });
});
