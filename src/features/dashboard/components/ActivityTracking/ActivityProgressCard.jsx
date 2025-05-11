import React from "react";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const ActivityProgressCard = () => {
  const labels = Array.from({ length: 20 }, (_, i) => {
    const date = new Date(2025, 4, i + 1); // Mayo
    return date.toLocaleDateString("es-EC", {
      day: "2-digit",
      month: "short",
    });
  });

  const data = {
    labels,
    datasets: [
      {
        label: "Porcentaje de mejora",
        data: [
          40, 45, 43, 48, 50, 55, 53, 57, 60, 63, 61, 65, 67, 70, 68, 72, 75,
          73, 78, 80,
        ],
        fill: false,
        borderColor: "#3498db",
        tension: 0.3,
        pointBackgroundColor: "#3498db",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        min: 0,
        max: 100,
        ticks: {
          stepSize: 10,
        },
      },
    },
  };

  return (
    <div style={{ height: "300px" }}>
      <h3>📊 Seguimiento de Actividades</h3>
      <Line data={data} options={options} />
    </div>
  );
};

export default ActivityProgressCard;
