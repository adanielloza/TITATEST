import { useState, useRef } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import DataTable from "../../../../components/DataTable/DataTable";

const sessionColumns = [
  { key: "actividad", label: "Actividad N°" },
  { key: "hora", label: "Hora" },
  { key: "errores", label: "Errores" },
  { key: "tiempoPreg", label: "Tiempo Pregunta (s)" },
  { key: "tiempoObs", label: "Tiempo Observación (s)" },
  { key: "puntaje", label: "Puntaje (%)" },
  { key: "observaciones", label: "Observaciones" },
];

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

// Nueva función para obtener el factor de dificultad
const getDificultadFactor = (settings) => {
  if (!settings || !settings.cantidad_preguntas) return 1;
  if (settings.cantidad_preguntas <= 5) return 1; // Fácil
  if (settings.cantidad_preguntas <= 10) return 1.15; // Medio
  return 1.35; // Difícil
};

const Progress1 = ({ activityHistory }) => {
  const sesiones = Object.values(activityHistory.sesiones || {});
  const chartRef = useRef(null);
  const [selectedFecha, setSelectedFecha] = useState(null);
  const [tableData, setTableData] = useState([]);

  const sesionesPorFecha = sesiones.reduce((acc, sesion) => {
    const fecha = new Date(sesion.fecha).toLocaleDateString("es-EC", {
      day: "2-digit",
      month: "short",
    });
    if (!acc[fecha]) acc[fecha] = [];
    acc[fecha].push(sesion);
    return acc;
  }, {});

  const labels = Object.keys(sesionesPorFecha);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Desempeño (%)",
        data: labels.map((fecha) => {
          const sesionesDia = sesionesPorFecha[fecha];
          let total = 0;

          sesionesDia.forEach((sesion) => {
            const { preguntas, tiempos_por_target } = sesion.game_results;
            const errores = preguntas.reduce(
              (acc, p) => acc + p.desaciertos,
              0
            );
            const tiempoProm =
              preguntas.reduce((acc, p) => acc + p.tiempo, 0) /
              preguntas.length;
            const tiempoObsTotal = tiempos_por_target.reduce(
              (acc, t) => acc + t.tiempo,
              0
            );
            const tiempoObsProm = tiempoObsTotal / tiempos_por_target.length;

            const cantPreguntas = preguntas.length;
            const dificultadFactor = getDificultadFactor(sesion.game_settings);

            let puntaje = 100;
            puntaje -= errores * (100 / cantPreguntas / 3);
            if (tiempoProm < 3.5 || tiempoProm > 8) puntaje -= 10;
            if (tiempoObsProm < 10 || tiempoObsProm > 45) puntaje -= 10;

            puntaje = Math.max(
              0,
              Math.min(100, Math.round(puntaje * dificultadFactor))
            );
            total += puntaje;
          });

          return Math.round(total / sesionesDia.length);
        }),
        fill: false,
        borderColor: "#0097e6",
        tension: 0.3,
        pointBackgroundColor: "#0097e6",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    onClick: (evt) => {
      const points = chartRef.current.getElementsAtEventForMode(
        evt,
        "nearest",
        { intersect: true },
        false
      );

      if (points.length > 0) {
        const index = points[0].index;
        const fechaSeleccionada = labels[index];
        setSelectedFecha(fechaSeleccionada);

        const sesionesDia = sesionesPorFecha[fechaSeleccionada];

        const sesionesDetalle = sesionesDia.map((sesion, i) => {
          const { preguntas, tiempos_por_target } = sesion.game_results;
          const errores = preguntas.reduce((acc, p) => acc + p.desaciertos, 0);
          const tiempoPromPreg =
            preguntas.reduce((acc, p) => acc + p.tiempo, 0) / preguntas.length;
          const tiempoObs = tiempos_por_target.reduce(
            (acc, t) => acc + t.tiempo,
            0
          );
          const tiempoObsProm = tiempoObs / tiempos_por_target.length;

          const cantPreguntas = preguntas.length;
          const dificultadFactor = getDificultadFactor(sesion.game_settings);

          let puntaje = 100;
          puntaje -= errores * (100 / cantPreguntas / 3);
          if (tiempoPromPreg < 3.5 || tiempoPromPreg > 8) puntaje -= 10;
          if (tiempoObsProm < 10 || tiempoObsProm > 45) puntaje -= 10;

          puntaje = Math.max(
            0,
            Math.min(100, Math.round(puntaje * dificultadFactor))
          );

          const hora = new Date(sesion.fecha).toLocaleTimeString("es-EC", {
            hour: "2-digit",
            minute: "2-digit",
          });

          let obs = "";
          if (errores >= 10)
            obs += "🔴 Muchos errores. Posible distracción o confusión. ";
          if (tiempoPromPreg < 3.5 && tiempoObs < 60) {
            obs += "🟠 Respondió muy rápido y observó poco. ";
          } else if (tiempoPromPreg > 8) {
            obs += "🟡 Tardó en responder. Tal vez procesó lento. ";
          }
          if (tiempoObsProm > 45)
            obs += "🟡 Observación prolongada. Posible sobreesfuerzo. ";
          if (!obs) obs = "🟢 Progreso normal.";

          return {
            actividad: i + 1,
            hora,
            errores,
            tiempoPreg: tiempoPromPreg.toFixed(2),
            tiempoObs: tiempoObs.toFixed(2),
            puntaje,
            observaciones: obs.trim(),
          };
        });

        setTableData(sesionesDetalle);
      }
    },
  };

  return (
    <div>
      <h4>Progreso Actividad 1 - Observación y Concentración</h4>
      <div style={{ height: "380px" }}>
        <Line ref={chartRef} data={chartData} options={chartOptions} />
      </div>

      <div style={{ marginTop: "2rem" }}>
        {selectedFecha ? (
          <>
            <h5 style={{ marginBottom: "1rem" }}>
              Sesiones del <strong>{selectedFecha}</strong>
            </h5>
            <DataTable
              columns={sessionColumns}
              data={tableData}
              searchPlaceholder="Buscar en sesiones del día..."
            />
          </>
        ) : (
          <div
            style={{
              textAlign: "center",
              padding: "1rem",
              background: "#f0f0f0",
              borderRadius: "8px",
            }}
          >
            <strong>
              Selecciona un punto del gráfico para visualizar el detalle de
              sesiones realizadas ese día.
            </strong>
          </div>
        )}
      </div>
    </div>
  );
};

export default Progress1;
