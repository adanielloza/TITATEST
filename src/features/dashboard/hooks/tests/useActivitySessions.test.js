import { describe, it, expect } from "vitest";
import useActivitySessions from "../useActivitySessions";

describe("useActivitySessions", () => {
  it("devuelve sesiones con actividadId agregado y ordenadas por fecha descendente", () => {
    const actividades = [
      {
        actividadId: "a1",
        sesiones: [
          { id: 1, fecha: "2024-06-10" },
          { id: 2, fecha: "2024-06-08" },
        ],
      },
      {
        actividadId: "a2",
        sesiones: [{ id: 3, fecha: "2024-06-09" }],
      },
    ];
    const result = useActivitySessions(actividades);
    expect(result).toEqual([
      { id: 1, fecha: "2024-06-10", actividadId: "a1" },
      { id: 3, fecha: "2024-06-09", actividadId: "a2" },
      { id: 2, fecha: "2024-06-08", actividadId: "a1" },
    ]);
  });

  it("devuelve arreglo vacío si no hay actividades", () => {
    expect(useActivitySessions([])).toEqual([]);
  });

  it("maneja sesiones vacías en actividades", () => {
    const actividades = [
      { actividadId: "a1", sesiones: [] },
      { actividadId: "a2", sesiones: [{ id: 1, fecha: "2024-06-07" }] },
    ];
    const result = useActivitySessions(actividades);
    expect(result).toEqual([{ id: 1, fecha: "2024-06-07", actividadId: "a2" }]);
  });

  it("ordena correctamente cuando hay fechas inválidas", () => {
    const actividades = [
      {
        actividadId: "a1",
        sesiones: [
          { id: 1, fecha: "fecha-invalida" },
          { id: 2, fecha: "2024-06-08" },
        ],
      },
    ];
    const result = useActivitySessions(actividades);
    expect(result).toEqual([
      { id: 1, fecha: "fecha-invalida", actividadId: "a1" },
      { id: 2, fecha: "2024-06-08", actividadId: "a1" },
    ]);
  });

  it("cubre la rama cuando aDate.getTime() es NaN", () => {
    const actividades = [
      {
        actividadId: "a1",
        sesiones: [{ id: 1, fecha: "2024-06-10" }],
      },
      {
        actividadId: "a2",
        sesiones: [{ id: 2, fecha: "invalid-date" }],
      },
    ];

    const result = useActivitySessions(actividades);

    expect(result).toEqual([
      { id: 2, fecha: "invalid-date", actividadId: "a2" },
      { id: 1, fecha: "2024-06-10", actividadId: "a1" },
    ]);
  });
});
