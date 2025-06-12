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
import { useActividad3Data } from "./hooks/useActividad3Data";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const sessionColumns = [
  { key: "actividad", label: "Actividad N°" },
  { key: "dificultad", label: "Dificultad" },
  { key: "correctas", label: "Respuestas Correctas" },
  { key: "tiempo_promedio", label: "Tiempo Promedio (s)" },
  { key: "puntaje", label: "Puntaje (%)" },
  {
    key: "observaciones",
    label: "Observaciones",
    render: (value) => <div style={{ whiteSpace: "pre-line" }}>{value}</div>,
  },
];

const Progress3 = ({ activityHistory }) => {
  const chartRef = useRef(null);
  const [selectedFecha, setSelectedFecha] = useState(null);
  const [tableData, setTableData] = useState([]);

  const sesiones = Array.isArray(activityHistory?.sesiones)
    ? activityHistory.sesiones
    : [];

  const hasSesiones = sesiones.length > 0;

  const { chartData, labels, obtenerDetallePorFecha } =
    useActividad3Data(sesiones);

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
        setTableData(obtenerDetallePorFecha(fechaSeleccionada));
      }
    },
  };

  return (
    <div>
      <h4>Progreso Actividad 3</h4>

      {!hasSesiones ? (
        <div
          style={{
            color: "#999",
            fontStyle: "italic",
            textAlign: "center",
            marginTop: "1rem",
            maxWidth: "80%",
            marginInline: "auto",
          }}
        >
          No hay sesiones registradas para este paciente.
        </div>
      ) : (
        <>
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
                  searchPlaceholder="Buscar..."
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
        </>
      )}
    </div>
  );
};

export default Progress3;
