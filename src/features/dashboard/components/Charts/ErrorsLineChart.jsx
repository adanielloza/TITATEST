// ErrorsLineChart.jsx
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  LineController,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useRef, useEffect } from "react";

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  LineController
);

const ErrorsLineChart = ({ preguntas }) => {
  const chartRef = useRef(null);

  const labels = preguntas.map(
    (p, i) => `${i + 1} (Target ${p.target.replace("ImageTarget", "")})`
  );

  const errores = preguntas.map((p) => p.errores);

  const data = {
    labels,
    datasets: [
      {
        label: "Errores",
        data: errores,
        borderColor: "#f44336",
        backgroundColor: "#f44336",
        tension: 0.3,
        fill: false,
        pointRadius: 5,
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
        title: { display: true, text: "Cantidad" },
        ticks: { stepSize: 1 },
        max: Math.max(...errores) + 1,
      },
      x: {
        title: { display: true, text: "Pregunta" },
      },
    },
  };

  useEffect(() => {
    const handleResize = () => {
      if (chartRef.current) {
        chartRef.current.resize();
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return <Line ref={chartRef} data={data} options={options} />;
};

export default ErrorsLineChart;
