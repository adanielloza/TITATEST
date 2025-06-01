// ResponseTimeLineChart.jsx
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

const ResponseTimeLineChart = ({ preguntas }) => {
  const chartRef = useRef(null);

  const labels = preguntas.map(
    (p, i) => `${i + 1} (Target ${p.target.replace("ImageTarget", "")})`
  );

  const data = {
    labels,
    datasets: [
      {
        label: "Tiempo de respuesta (segundos)",
        data: preguntas.map((p) => p.tiempoRespuesta),
        borderColor: "#0097E6",
        backgroundColor: "#0097E6",
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
        title: { display: true, text: "Segundos" },
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

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Line ref={chartRef} data={data} options={options} />
    </div>
  );
};

export default ResponseTimeLineChart;
