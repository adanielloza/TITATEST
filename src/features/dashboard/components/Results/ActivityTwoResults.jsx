import ActivityLayout from "./ActivityLayout";
import ActivityInfoPanel from "./ActivityInfoPanel";
import ActivityChartPanel from "./ActivityChartPanel";
import { getDificultad } from "../../../../utils/getDificultad";
import { formatDateTime } from "../../../../utils/formatters";
import { useState } from "react";
import AccuracyDonutChart from "../Charts/AccuracyDonutChart";

const formatSessionTime = (seconds) => {
  if (!seconds || typeof seconds !== "number") return "0s";
  const mins = Math.floor(seconds / 60);
  const secs = Math.round(seconds % 60);
  return mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;
};

const ActivityTwoResults = ({ data }) => {
  const [selectedChart, setSelectedChart] = useState("precision");

  const { fecha: fechaFormatted, hora } = formatDateTime(data.fecha);
  const dificultad = getDificultad(data.actividadId, data.game_settings);
  const tiempoSesion = formatSessionTime(data.game_results.time_spent_seconds);

  const correct = data.game_results.correct_answers;
  const gridSize = data.game_settings.grid_size;
  const total = gridSize * gridSize;

  const infoItems = [
    { icon: "📅", label: "Fecha", value: `${fechaFormatted} ${hora}` },
    { icon: "🎯", label: "Dificultad", value: dificultad },
    { icon: "⏱️", label: "Tiempo de sesión", value: tiempoSesion },
    {
      icon: "🔲",
      label: "Tamaño de la cuadrícula",
      value: `${gridSize} x ${gridSize}`,
    },
    {
      icon: "✅",
      label: "Respuestas correctas",
      value: correct,
    },
    {
      icon: "👁️",
      label: "Veces que se abrió la imagen",
      value: data.game_results.image_opens,
    },
  ];

  const chartOptions = [{ value: "precision", label: "Aciertos vs Errores" }];

  return (
    <ActivityLayout
      leftContent={<ActivityInfoPanel items={infoItems} />}
      rightContent={
        <ActivityChartPanel
          chartOptions={chartOptions}
          selectedChart={selectedChart}
          onChartChange={setSelectedChart}
        >
          <AccuracyDonutChart correct={correct} total={total} />
        </ActivityChartPanel>
      }
    />
  );
};

export default ActivityTwoResults;
