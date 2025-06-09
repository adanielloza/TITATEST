import React, { useEffect, useState } from "react";
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
import Dropdown from "../../../../components/Dropdown";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const ActivityProgressCard = ({ activityHistory }) => {
  const [selectedProgress, setSelectedProgress] = useState("general");

  useEffect(() => {
    console.log("📈 Datos recibidos en ActivityProgressCard:", activityHistory);
  }, [activityHistory]);

  useEffect(() => {
    if (selectedProgress === "general") {
      // No filtrar, mostrar todo
      console.log("🔽 Opción seleccionada: general (sin filtro)");
      console.log("Datos completos:", activityHistory);
    } else {
      // Filtrar por actividadId
      const filtered = activityHistory.filter(
        (act) => act.actividadId === selectedProgress
      );
      console.log(`🔽 Opción seleccionada: ${selectedProgress} (filtrado)`);
      console.log("Datos filtrados:", filtered);
    }
  }, [selectedProgress, activityHistory]);

  const labels = Array.from({ length: 20 }, (_, i) => {
    const date = new Date(2025, 4, i + 1); // Mayo
    return date.toLocaleDateString("es-EC", {
      day: "2-digit",
      month: "short",
    });
  });

  // Datos estáticos por ahora
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

  const dropdownOptions = [
    { label: "Progreso General", value: "general" },
    { label: "Progreso Actividad 1", value: "actividad_1" },
    { label: "Progreso Actividad 2", value: "actividad_2" },
    { label: "Progreso Actividad 3", value: "actividad_3" },
  ];

  return (
    <div style={{ height: "350px" }}>
      <h3>📊 Seguimiento de Actividades</h3>

      <div style={{ marginBottom: "1rem" }}>
        <Dropdown
          name="progress-select"
          value={selectedProgress}
          onChange={(e) => setSelectedProgress(e.target.value)}
          options={dropdownOptions}
          placeholder="Selecciona progreso"
        />
      </div>

      <Line data={data} options={options} />
    </div>
  );
};

export default ActivityProgressCard;
