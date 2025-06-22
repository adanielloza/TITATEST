import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts?.default?.vfs || pdfFonts.vfs;

const estiloCabecera = {
  font: { bold: true, color: { argb: "FFFFFFFF" } },
  fill: {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "FF2F5597" },
  },
  alignment: { vertical: "middle", horizontal: "center" },
  border: {
    top: { style: "thin" },
    left: { style: "thin" },
    bottom: { style: "thin" },
    right: { style: "thin" },
  },
};

const aplicarEstiloCabecera = (worksheet) => {
  worksheet.columns.forEach((col) => {
    col.width = Math.max(15, col.header?.length || 10);
  });
  worksheet.getRow(1).eachCell((cell) => {
    cell.style = estiloCabecera;
  });
};

export async function exportAllActivitiesToExcel(patientInfo, actividades) {
  const workbook = new ExcelJS.Workbook();

  const hojaPaciente = workbook.addWorksheet("Paciente");
  hojaPaciente.columns = [
    { header: "ID", key: "id" },
    { header: "Nombre", key: "nombre" },
    { header: "Apellido", key: "apellido" },
    { header: "Sexo", key: "sexo" },
    { header: "Fecha Nacimiento", key: "fechaNacimiento" },
    { header: "Nombre Tutor", key: "nombreTutor" },
    { header: "Correo Tutor", key: "correoTutor" },
    { header: "Teléfono Tutor", key: "telefonoTutor" },
    { header: "Tipo TDAH", key: "tipoTDAH" },
    { header: "Observaciones", key: "observaciones" },
  ];
  hojaPaciente.addRow({ id: patientInfo.id, ...patientInfo.datos_personales });
  aplicarEstiloCabecera(hojaPaciente);

  const hoja1 = workbook.addWorksheet("Actividad_1");
  hoja1.columns = [
    { header: "Sesión", key: "sesion" },
    { header: "Fecha", key: "fecha" },
    { header: "Pregunta", key: "pregunta" },
    { header: "Desaciertos", key: "desaciertos" },
    { header: "TiempoPregunta", key: "tiempoPregunta" },
    { header: "Target", key: "target" },
    { header: "TiempoPorTarget", key: "tiempoPorTarget" },
    { header: "TiempoTotalAR", key: "tiempoTotalAR" },
    { header: "CantidadPreguntas", key: "cantidadPreguntas" },
    { header: "CantidadModelos", key: "cantidadModelos" },
    { header: "Animaciones", key: "animaciones" },
    { header: "Sonido", key: "sonido" },
  ];
  const actividad1 = actividades["actividad_1"] || {};
  Object.entries(actividad1).forEach(([sesionId, sesion]) => {
    const preguntas = sesion.game_results?.preguntas || [];
    const targets = sesion.game_results?.tiempos_por_target || [];
    const max = Math.max(preguntas.length, targets.length);
    for (let i = 0; i < max; i++) {
      hoja1.addRow({
        sesion: sesionId,
        fecha: sesion.fecha,
        pregunta: i + 1,
        desaciertos: preguntas[i]?.desaciertos ?? "",
        tiempoPregunta: preguntas[i]?.tiempo ?? "",
        target: targets[i]?.target ?? "",
        tiempoPorTarget: targets[i]?.tiempo ?? "",
        tiempoTotalAR: sesion.game_results?.tiempo_en_ar,
        cantidadPreguntas: sesion.game_settings?.cantidad_preguntas,
        cantidadModelos: sesion.game_settings?.cantidad_modelos,
        animaciones: sesion.game_settings?.animaciones ? "Sí" : "No",
        sonido: sesion.game_settings?.sonido ? "Sí" : "No",
      });
    }
  });
  aplicarEstiloCabecera(hoja1);

  const hoja2 = workbook.addWorksheet("Actividad_2");
  hoja2.columns = [
    { header: "Sesión", key: "sesion" },
    { header: "Fecha", key: "fecha" },
    { header: "Respuestas Correctas", key: "correctas" },
    { header: "Aperturas Imagen", key: "aperturas" },
    { header: "Tiempo Total", key: "tiempo" },
    { header: "Tamaño Grilla", key: "grilla" },
  ];
  const actividad2 = actividades["actividad_2"] || {};
  Object.entries(actividad2).forEach(([sesionId, sesion]) => {
    hoja2.addRow({
      sesion: sesionId,
      fecha: sesion.fecha,
      correctas: sesion.game_results?.correct_answers,
      aperturas: sesion.game_results?.image_opens,
      tiempo: sesion.game_results?.time_spent_seconds,
      grilla: sesion.game_settings?.grid_size,
    });
  });
  aplicarEstiloCabecera(hoja2);

  const hoja3 = workbook.addWorksheet("Actividad_3");
  hoja3.columns = [
    { header: "Sesión", key: "sesion" },
    { header: "Fecha", key: "fecha" },
    { header: "Pregunta", key: "pregunta" },
    { header: "Target", key: "target" },
    { header: "Errores", key: "errores" },
    { header: "Tiempo Respuesta", key: "tiempoRespuesta" },
    { header: "Tiempo Total Sesión", key: "tiempoTotalSesion" },
    { header: "Cant. Elementos", key: "cantElementos" },
    { header: "Cant. Preguntas", key: "cantPreguntas" },
    { header: "Tiempo Límite", key: "tiempoLimite" },
  ];
  const actividad3 = actividades["actividad_3"] || {};
  Object.entries(actividad3).forEach(([sesionId, sesion]) => {
    sesion.game_results?.preguntas?.forEach((p, i) => {
      hoja3.addRow({
        sesion: sesionId,
        fecha: sesion.fecha,
        pregunta: i + 1,
        target: p?.target,
        errores: p?.errores,
        tiempoRespuesta: p?.tiempoRespuesta,
        tiempoTotalSesion: sesion.game_results?.session_time,
        cantElementos: sesion.game_settings?.cantidad_elementos,
        cantPreguntas: sesion.game_settings?.cantidad_preguntas,
        tiempoLimite: sesion.game_settings?.tiempo,
      });
    });
  });
  aplicarEstiloCabecera(hoja3);

  const buffer = await workbook.xlsx.writeBuffer();
  const fileName = `Reporte_${patientInfo.datos_personales?.nombre}_${patientInfo.datos_personales?.apellido}.xlsx`;
  saveAs(new Blob([buffer]), fileName);
}

const logoBase64 =
  "data:image/png;base64,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";

export function exportAllActivitiesToPDF(patientInfo, actividades) {
  const docDefinition = {
    content: [],
    styles: {
      header: { fontSize: 18, bold: true, margin: [0, 0, 0, 10] },
      subheader: { fontSize: 14, bold: true, margin: [0, 10, 0, 5] },
      tableHeader: { bold: true, fillColor: "#eeeeee" },
    },
    pageMargins: [40, 60, 40, 60],
  };

  docDefinition.content.push({
    image: logoBase64,
    width: 100,
    alignment: "right",
    margin: [0, 0, 0, 10],
  });

  docDefinition.content.push(
    { text: "Reporte de Paciente", style: "header" },
    { text: "Datos Personales", style: "subheader" },
    {
      table: {
        body: [
          ["Nombre", patientInfo.datos_personales?.nombre],
          ["Apellido", patientInfo.datos_personales?.apellido],
          ["Sexo", patientInfo.datos_personales?.sexo],
          ["Fecha Nacimiento", patientInfo.datos_personales?.fechaNacimiento],
          ["Nombre Tutor", patientInfo.datos_personales?.nombreTutor],
          ["Correo Tutor", patientInfo.datos_personales?.correoTutor],
          ["Teléfono Tutor", patientInfo.datos_personales?.telefonoTutor],
          ["Tipo TDAH", patientInfo.datos_personales?.tipoTDAH],
          ["Observaciones", patientInfo.datos_personales?.observaciones],
        ],
      },
      layout: "lightHorizontalLines",
    }
  );

  const agregarActividad = (titulo, columnas, datos) => {
    docDefinition.content.push({ text: titulo, style: "subheader" });
    const body = [columnas];
    datos.forEach((fila) => {
      body.push(columnas.map((col) => fila[col]));
    });
    docDefinition.content.push({
      table: {
        headerRows: 1,
        widths: [40, 85, 55, 65, 70, 50, 70],
        body,
      },
      layout: "lightHorizontalLines",
    });
  };

  const actividad1 = actividades["actividad_1"] || {};
  const rows1 = [];
  Object.entries(actividad1).forEach(([sesionId, sesion]) => {
    const preguntas = sesion.game_results?.preguntas || [];
    const targets = sesion.game_results?.tiempos_por_target || [];
    const max = Math.max(preguntas.length, targets.length);
    for (let i = 0; i < max; i++) {
      rows1.push({
        Sesión: sesionId,
        Fecha: sesion.fecha,
        Pregunta: i + 1,
        Desaciertos: preguntas[i]?.desaciertos ?? "",
        TiempoPregunta: preguntas[i]?.tiempo ?? "",
        Target: targets[i]?.target ?? "",
        TiempoPorTarget: targets[i]?.tiempo ?? "",
      });
    }
  });
  agregarActividad(
    "Actividad 1",
    [
      "Sesión",
      "Fecha",
      "Pregunta",
      "Desaciertos",
      "TiempoPregunta",
      "Target",
      "TiempoPorTarget",
    ],
    rows1
  );

  const actividad2 = actividades["actividad_2"] || {};
  const rows2 = Object.entries(actividad2).map(([sesionId, sesion]) => ({
    Sesión: sesionId,
    Fecha: sesion.fecha,
    Correctas: sesion.game_results?.correct_answers,
    Imagenes: sesion.game_results?.image_opens,
    Tiempo: sesion.game_results?.time_spent_seconds,
    Grilla: sesion.game_settings?.grid_size,
  }));
  agregarActividad(
    "Actividad 2",
    ["Sesión", "Fecha", "Correctas", "Imagenes", "Tiempo", "Grilla"],
    rows2
  );

  const actividad3 = actividades["actividad_3"] || {};
  const rows3 = [];
  Object.entries(actividad3).forEach(([sesionId, sesion]) => {
    sesion.game_results?.preguntas?.forEach((p, i) => {
      rows3.push({
        Sesión: sesionId,
        Fecha: sesion.fecha,
        Pregunta: i + 1,
        Target: p?.target,
        Errores: p?.errores,
        Tiempo: p?.tiempoRespuesta,
      });
    });
  });
  agregarActividad(
    "Actividad 3",
    ["Sesión", "Fecha", "Pregunta", "Target", "Errores", "Tiempo"],
    rows3
  );

  const fileName = `Reporte_${patientInfo.datos_personales?.nombre}_${patientInfo.datos_personales?.apellido}.pdf`;
  pdfMake.createPdf(docDefinition).download(fileName);
}
