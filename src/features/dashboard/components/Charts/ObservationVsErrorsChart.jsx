import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
} from "chart.js";
import { Chart } from "react-chartjs-2";
import { useRef, useEffect } from "react";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  LineElement,
  PointElement
);

const ObservationVsErrorsChart = ({ tiempos, preguntas }) => {
  const chartRef = useRef(null);

  const labels = tiempos.map((t) => t.target.replace("ImageTarget", "Target "));
  const erroresPorTarget = preguntas.reduce((acc, p, idx) => {
    acc[idx] = (acc[idx] || 0) + (p.desaciertos || 0);
    return acc;
  }, []);

  const data = {
    labels,
    datasets: [
      {
        type: "bar",
        label: "Tiempo observación (s)",
        data: tiempos.map((t) => t.tiempo.toFixed(2)),
        backgroundColor: "#00A8FF",
        order: 1, // detrás
      },
      {
        type: "line",
        label: "Errores",
        data: erroresPorTarget,
        borderColor: "#f44336",
        backgroundColor: "#f44336",
        tension: 0.3,
        fill: false,
        pointRadius: 5,
        yAxisID: "y2",
        order: 0, // delante
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: true } },
    scales: {
      y: {
        beginAtZero: true,
        title: { display: true, text: "Segundos" },
      },
      y2: {
        beginAtZero: true,
        position: "right",
        title: { display: true, text: "Errores" },
        grid: { drawOnChartArea: false },
      },
    },
  };

  useEffect(() => {
    const handleResize = () => chartRef.current?.resize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return <Chart ref={chartRef} type="bar" data={data} options={options} />;
};

export default ObservationVsErrorsChart;
