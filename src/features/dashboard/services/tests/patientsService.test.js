import {
  savePatientToDB,
  fetchAllPatients,
  updatePatientById,
  deletePatientById,
} from "../patientService";

import * as firebase from "../../../../services/firebase";

vi.mock("../../../../services/firebase", () => {
  const refMock = vi.fn(() => ({ path: "mocked/path" }));
  const childMock = vi.fn(() => ({ path: "mocked/child" }));
  return {
    rtdb: {},
    ref: refMock,
    child: childMock,
    get: vi.fn(),
    set: vi.fn(),
    update: vi.fn(),
    remove: vi.fn(),
  };
});

describe("patientsService", () => {
  beforeEach(() => vi.clearAllMocks());

  it("savePatientToDB guarda un nuevo paciente con todos los datos personales", async () => {
    firebase.get.mockResolvedValueOnce({
      exists: () => true,
      val: () => ({
        paciente_1: {},
        paciente_9: {},
      }),
    });

    const fullPatientData = {
      nombre: "Lucía",
      apellido: "Castro",
      fechaNacimiento: "22/07/2011",
      sexo: "Femenino",
      tipoTDAH: "TDAH",
      nombreTutor: "Verónica Castro",
      correoTutor: "lucia.castro@gmail.com",
      telefonoTutor: "0988776655",
      observaciones: "Uso de medicación bajo supervisión.",
    };

    await savePatientToDB(fullPatientData);

    expect(firebase.set).toHaveBeenCalledWith(
      { path: "mocked/path" },
      {
        id: 10,
        datos_personales: fullPatientData,
      }
    );
  });

  it("fetchAllPatients devuelve pacientes si existen", async () => {
    firebase.get.mockResolvedValueOnce({
      exists: () => true,
      val: () => ({ paciente_1: { nombre: "A" } }),
    });

    const result = await fetchAllPatients();
    expect(result).toEqual({ paciente_1: { nombre: "A" } });
  });

  it("fetchAllPatients devuelve objeto vacío si no existen pacientes", async () => {
    firebase.get.mockResolvedValueOnce({
      exists: () => false,
    });

    const result = await fetchAllPatients();
    expect(result).toEqual({});
  });

  it("updatePatientById llama a update con los datos correctos", async () => {
    await updatePatientById(5, { nombre: "Ana" });

    expect(firebase.update).toHaveBeenCalledWith(
      { path: "mocked/path" },
      {
        datos_personales: { nombre: "Ana" },
      }
    );
  });

  it("deletePatientById elimina el paciente correcto", async () => {
    await deletePatientById(7);

    expect(firebase.remove).toHaveBeenCalledWith({ path: "mocked/path" });
  });
});

describe("Performance tests", () => {
  it("savePatientToDB ejecuta en menos de 100ms", async () => {
    firebase.get.mockResolvedValueOnce({
      exists: () => false,
      val: () => ({}),
    });

    const start = performance.now();

    await savePatientToDB({ nombre: "Prueba" });

    const duration = performance.now() - start;
    expect(duration).toBeLessThan(100);
  });
});
