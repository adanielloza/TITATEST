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

const ErrorsPerQuestionChart = ({ preguntas }) => {
  const chartRef = useRef(null);

  const labels = preguntas.map((_, i) => `Pregunta ${i + 1}`);
  const data = {
    labels,
    datasets: [
      {
        label: "Desaciertos",
        data: preguntas.map((p) => p.desaciertos),
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
        ticks: { stepSize: 1 },
        title: { display: true, text: "Cantidad" },
      },
      x: {
        title: { display: true, text: "Pregunta" },
      },
    },
  };

  useEffect(() => {
    const handleResize = () => chartRef.current?.resize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return <Line ref={chartRef} data={data} options={options} />;
};

export default ErrorsPerQuestionChart;
