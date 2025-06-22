import { describe, it, expect, vi } from "vitest";
import {
  exportAllActivitiesToExcel,
  exportAllActivitiesToPDF,
} from "../exportUtils";
import pdfMake from "pdfmake/build/pdfmake";
import { saveAs } from "file-saver";
import ExcelJS from "exceljs";

vi.mock("file-saver", () => ({ saveAs: vi.fn() }));

const mockEachCell = vi.fn();
const mockWorksheet = {
  columns: [],
  addRow: vi.fn(),
  getRow: vi.fn(() => ({ eachCell: mockEachCell })),
};

const mockWorkbook = {
  addWorksheet: vi.fn(() => mockWorksheet),
  xlsx: { writeBuffer: vi.fn().mockResolvedValue(new ArrayBuffer(10)) },
};

vi.mock("exceljs", () => ({
  default: {
    Workbook: vi.fn(() => mockWorkbook),
  },
}));

const mockPdf = { download: vi.fn() };

vi.mock("pdfmake/build/pdfmake", () => ({
  default: {
    createPdf: vi.fn(() => mockPdf),
    vfs: {},
  },
}));

const patientInfo = {
  id: "1",
  datos_personales: {
    nombre: "Ana",
    apellido: "Pérez",
    sexo: "F",
    fechaNacimiento: "2000-01-01",
    nombreTutor: "Luis",
    correoTutor: "luis@test.com",
    telefonoTutor: "123456789",
    tipoTDAH: "Inatento",
    observaciones: "Ninguna",
  },
};

const actividades = {
  actividad_1: {
    s1: {
      fecha: "2025-06-20",
      game_results: {
        preguntas: [{ desaciertos: 1, tiempo: 3 }],
        tiempos_por_target: [{ target: "T1", tiempo: 5 }],
        tiempo_en_ar: 20,
      },
      game_settings: {
        cantidad_preguntas: 10,
        cantidad_modelos: 2,
        animaciones: true,
        sonido: false,
      },
    },
  },
  actividad_2: {
    s2: {
      fecha: "2025-06-21",
      game_results: {
        correct_answers: 5,
        image_opens: 2,
        time_spent_seconds: 30,
      },
      game_settings: { grid_size: 4 },
    },
  },
  actividad_3: {
    s3: {
      fecha: "2025-06-22",
      game_results: {
        preguntas: [{ target: "A", errores: 0, tiempoRespuesta: 2 }],
        session_time: 15,
      },
      game_settings: {
        cantidad_elementos: 6,
        cantidad_preguntas: 3,
        tiempo: 60,
      },
    },
  },
};

describe("exportAllActivitiesToExcel", () => {
  it("genera un archivo excel y lo guarda", async () => {
    await exportAllActivitiesToExcel(patientInfo, actividades);
    expect(mockWorkbook.addWorksheet).toHaveBeenCalled();
    expect(saveAs).toHaveBeenCalled();
    expect(mockEachCell).toHaveBeenCalled();
  });
});

describe("exportAllActivitiesToPDF", () => {
  it("genera un pdf y lo descarga", () => {
    exportAllActivitiesToPDF(patientInfo, actividades);
    expect(pdfMake.createPdf).toHaveBeenCalled();
    expect(mockPdf.download).toHaveBeenCalled();
  });
});
