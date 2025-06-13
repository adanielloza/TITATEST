import { describe, it, expect } from "vitest";
import { getDificultad } from "../getDificultad";

describe("getDificultad", () => {
  it("devuelve 'Desconocida' si settings es null o undefined", () => {
    expect(getDificultad("actividad_1", null)).toBe("Desconocida");
    expect(getDificultad("actividad_2", undefined)).toBe("Desconocida");
  });

  describe("actividad_1", () => {
    it("devuelve 'Fácil' si cantidad_preguntas <= 5", () => {
      expect(getDificultad("actividad_1", { cantidad_preguntas: 5 })).toBe(
        "Fácil"
      );
    });

    it("devuelve 'Medio' si cantidad_preguntas entre 6 y 10", () => {
      expect(getDificultad("actividad_1", { cantidad_preguntas: 7 })).toBe(
        "Medio"
      );
    });

    it("devuelve 'Difícil' si cantidad_preguntas > 10", () => {
      expect(getDificultad("actividad_1", { cantidad_preguntas: 11 })).toBe(
        "Difícil"
      );
    });
  });

  describe("actividad_2", () => {
    it("devuelve 'Fácil' si grid_size === 3", () => {
      expect(getDificultad("actividad_2", { grid_size: 3 })).toBe("Fácil");
    });

    it("devuelve 'Medio' si grid_size === 4", () => {
      expect(getDificultad("actividad_2", { grid_size: 4 })).toBe("Medio");
    });

    it("devuelve 'Difícil' si grid_size > 4", () => {
      expect(getDificultad("actividad_2", { grid_size: 5 })).toBe("Difícil");
    });
  });

  describe("actividad_3", () => {
    it("devuelve 'Fácil' si cantidad_preguntas === 5", () => {
      expect(getDificultad("actividad_3", { cantidad_preguntas: 5 })).toBe(
        "Fácil"
      );
    });

    it("devuelve 'Medio' si cantidad_preguntas === 7", () => {
      expect(getDificultad("actividad_3", { cantidad_preguntas: 7 })).toBe(
        "Medio"
      );
    });

    it("devuelve 'Difícil' para otros valores", () => {
      expect(getDificultad("actividad_3", { cantidad_preguntas: 10 })).toBe(
        "Difícil"
      );
    });
  });

  it("devuelve 'Desconocida' si actividadId no coincide", () => {
    expect(getDificultad("actividad_x", { cantidad_preguntas: 5 })).toBe(
      "Desconocida"
    );
  });
});
