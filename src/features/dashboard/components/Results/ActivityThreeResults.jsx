import { useState } from "react";
import ActivityLayout from "./ActivityLayout";
import ResponseTimeChart from "../Charts/ResponseTimeLineChart";
import ErrorsLineChart from "../Charts/ErrorsLineChart";
import ActivityInfoPanel from "./ActivityInfoPanel";
import ActivityChartPanel from "./ActivityChartPanel";
import { getDificultad } from "../../../../utils/getDificultad";
import { formatDateTime } from "../../../../utils/formatters";

const formatSessionTime = (seconds) => {
  if (!seconds || typeof seconds !== "number") return "0s";
  const mins = Math.floor(seconds / 60);
  const secs = Math.round(seconds % 60);
  return mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;
};

const ActivityThreeResults = ({ data }) => {
  const preguntas = data?.game_results?.preguntas || [];
  const [selectedChart, setSelectedChart] = useState("tiempo");

  const { fecha: fechaFormatted, hora } = formatDateTime(data.fecha);
  const dificultad = getDificultad(data.actividadId, data.game_settings);
  const tiempoSesion = formatSessionTime(data.game_results.session_time);

  const infoItems = [
    { icon: "📅", label: "Fecha", value: `${fechaFormatted} ${hora}` },
    { icon: "🎯", label: "Dificultad", value: dificultad },
    { icon: "⏱️", label: "Tiempo de sesión", value: tiempoSesion },
    {
      icon: "🧠",
      label: "Elementos por secuencia",
      value: data.game_settings.cantidad_elementos,
    },
    {
      icon: "❓",
      label: "Preguntas",
      value: data.game_settings.cantidad_preguntas,
    },
    {
      icon: "🕒",
      label: "Tiempo de memorización",
      value: `${data.game_settings.tiempo} segundos`,
    },
  ];

  const chartOptions = [
    { value: "tiempo", label: "Tiempo de respuesta" },
    { value: "errores", label: "Errores" },
  ];

  return (
    <ActivityLayout
      leftContent={<ActivityInfoPanel items={infoItems} />}
      rightContent={
        <ActivityChartPanel
          chartOptions={chartOptions}
          selectedChart={selectedChart}
          onChartChange={setSelectedChart}
        >
          {selectedChart === "tiempo" ? (
            <ResponseTimeChart preguntas={preguntas} />
          ) : (
            <ErrorsLineChart preguntas={preguntas} />
          )}
        </ActivityChartPanel>
      }
    />
  );
};

export default ActivityThreeResults;
