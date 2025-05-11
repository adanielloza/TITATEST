import { describe, it, expect } from "vitest";
import { filterData, sortData } from "../filters";

const mockData = [
  { id: 1, name: "Juan", age: 25 },
  { id: 2, name: "María", age: 30 },
  { id: 3, name: "Carlos", age: 22 },
];

describe("filterData", () => {
  it("filtra por coincidencia parcial en cualquier campo", () => {
    const result = filterData(mockData, "ju");
    expect(result).toEqual([{ id: 1, name: "Juan", age: 25 }]);
  });

  it("no distingue mayúsculas/minúsculas", () => {
    const result = filterData(mockData, "MARÍA");
    expect(result).toEqual([{ id: 2, name: "María", age: 30 }]);
  });

  it("retorna todos si search está vacío", () => {
    const result = filterData(mockData, "");
    expect(result).toEqual(mockData);
  });

  it("retorna vacío si no hay coincidencias", () => {
    const result = filterData(mockData, "zzz");
    expect(result).toEqual([]);
  });
});

describe("sortData", () => {
  it("ordena por nombre ascendente", () => {
    const result = sortData(mockData, "name", true);
    expect(result.map((r) => r.name)).toEqual(["Carlos", "Juan", "María"]);
  });

  it("ordena por nombre descendente", () => {
    const result = sortData(mockData, "name", false);
    expect(result.map((r) => r.name)).toEqual(["María", "Juan", "Carlos"]);
  });

  it("ordena por número ascendente", () => {
    const result = sortData(mockData, "age", true);
    expect(result.map((r) => r.age)).toEqual([22, 25, 30]);
  });

  it("ordena por número descendente", () => {
    const result = sortData(mockData, "age", false);
    expect(result.map((r) => r.age)).toEqual([30, 25, 22]);
  });

  it("devuelve sin cambios si key es null", () => {
    const result = sortData(mockData, null, true);
    expect(result).toEqual(mockData);
  });
});
