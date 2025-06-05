import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  BarController,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useRef, useEffect } from "react";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  BarController
);

const ObservationTimePerTargetChart = ({ tiempos }) => {
  const chartRef = useRef(null);

  const labels = tiempos.map((t) => t.target.replace("ImageTarget", "Target "));
  const data = {
    labels,
    datasets: [
      {
        label: "Tiempo de observación (segundos)",
        data: tiempos.map((t) => t.tiempo.toFixed(2)),
        backgroundColor: "#0097E6",
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
        title: { display: true, text: "Target" },
      },
    },
  };

  useEffect(() => {
    const handleResize = () => chartRef.current?.resize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return <Bar ref={chartRef} data={data} options={options} />;
};

export default ObservationTimePerTargetChart;
