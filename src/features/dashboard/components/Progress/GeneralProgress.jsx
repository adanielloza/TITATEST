import { Radar } from "react-chartjs-2";
import { useGeneralChartData } from "./hooks/useGeneralChartData";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const GeneralProgress = ({ activityHistory }) => {
  const { resumen, chartData, options } = useGeneralChartData(activityHistory);

  if (!resumen) return <div>Cargando resumen general...</div>;

  if (resumen.promedioGeneral === null) {
    return (
      <div
        style={{
          color: "#999",
          fontStyle: "italic",
          textAlign: "center",
          marginTop: "2rem",
        }}
      >
        No hay sesiones registradas para este paciente.
      </div>
    );
  }

  return (
    <div>
      <h3 style={{ textAlign: "center" }}>Resumen General del Paciente</h3>

      <div
        style={{
          margin: "2rem auto 1rem",
          maxWidth: "320px",
          textAlign: "center",
          padding: "1.5rem",
          background: "#f9f9f9",
          border: "1px solid #ddd",
          borderRadius: "12px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        }}
      >
        <h4
          style={{ marginBottom: "0.5rem", fontSize: "1.2rem", color: "#555" }}
        >
          Promedio General
        </h4>
        <div
          style={{
            fontSize: "2.5rem",
            fontWeight: "bold",
            color:
              resumen.promedioGeneral >= 85
                ? "#2ecc71"
                : resumen.promedioGeneral >= 60
                ? "#f39c12"
                : "#e74c3c",
          }}
        >
          ⭐ {resumen.promedioGeneral}%
        </div>
      </div>

      <div style={{ maxWidth: "500px", margin: "2rem auto" }}>
        <Radar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default GeneralProgress;
