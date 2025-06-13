import { describe, it, expect } from "vitest";
import { useCapitalize, useFormatDate, formatDateTime } from "../formatters";

describe("useCapitalize", () => {
  const capitalize = useCapitalize();

  it("capitaliza cada palabra", () => {
    expect(capitalize("juan perez")).toBe("Juan Perez");
  });

  it("funciona con mayúsculas mezcladas", () => {
    expect(capitalize("mArÍA loPez")).toBe("María Lopez");
  });

  it("devuelve vacío si recibe texto vacío", () => {
    expect(capitalize("")).toBe("");
  });
});

describe("useFormatDate", () => {
  const formatDate = useFormatDate();

  it("formatea correctamente una fecha válida", () => {
    const date = new Date(2023, 4, 7);
    expect(formatDate(date)).toBe("07/05/2023");
  });

  it("retorna string vacío si no es una instancia de Date", () => {
    expect(formatDate("2023-05-07")).toBe("");
    expect(formatDate(null)).toBe("");
    expect(formatDate(undefined)).toBe("");
    expect(formatDate({})).toBe("");
  });
});

describe("formatDateTime", () => {
  it("formatea correctamente una cadena ISO", () => {
    const iso = "2023-06-09T15:30:00Z";
    const { fecha, hora } = formatDateTime(iso);
    expect(typeof fecha).toBe("string");
    expect(typeof hora).toBe("string");
    expect(fecha).toMatch(/\d{2}\/\d{2}\/\d{4}/);
    expect(hora).toMatch(/\d{2}:\d{2}/);
  });

  it("retorna valores definidos incluso con fecha inválida", () => {
    const { fecha, hora } = formatDateTime("fecha-mala");
    expect(typeof fecha).toBe("string");
    expect(typeof hora).toBe("string");
  });
});
