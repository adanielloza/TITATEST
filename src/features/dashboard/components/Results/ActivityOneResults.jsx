import { useState } from "react";
import ActivityLayout from "./ActivityLayout";
import ActivityInfoPanel from "./ActivityInfoPanel";
import ActivityChartPanel from "./ActivityChartPanel";
import ErrorsPerQuestionChart from "../Charts/ErrorsPerQuestionChart";
import ObservationTimePerTargetChart from "../Charts/ObservationTimePerTargetChart";
import ObservationVsErrorsChart from "../Charts/ObservationVsErrorsChart";
import ResponseTimePerQuestionChart from "../Charts/ResponseTimePerQuestionChart";
import { getDificultad } from "../../../../utils/getDificultad";
import { formatDateTime } from "../../../../utils/formatters";

const formatSessionTime = (seconds) => {
  if (!seconds || typeof seconds !== "number") return "0s";
  const mins = Math.floor(seconds / 60);
  const secs = Math.round(seconds % 60);
  return mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;
};

const getTiempoTotalTargets = (targets = []) => {
  const totalSegundos = targets.reduce((acc, t) => acc + (t.tiempo || 0), 0);
  return formatSessionTime(totalSegundos);
};

const ActivityOneResults = ({ data }) => {
  const [selectedChart, setSelectedChart] = useState("tiempo");

  const { fecha: fechaFormatted, hora } = formatDateTime(data.fecha);
  const dificultad = getDificultad(data.actividadId, data.game_settings);
  const tiempoRA = getTiempoTotalTargets(data.game_results.tiempos_por_target);

  const infoItems = [
    { icon: "📅", label: "Fecha", value: `${fechaFormatted} ${hora}` },
    { icon: "🎯", label: "Dificultad", value: dificultad },
    { icon: "⏱️", label: "Tiempo en RA", value: tiempoRA },
    {
      icon: "❓",
      label: "Preguntas totales",
      value: data.game_settings.cantidad_preguntas,
    },
    {
      icon: "🧠",
      label: "Modelos usados",
      value: data.game_settings.cantidad_modelos,
    },
    {
      icon: "🔊",
      label: "Sonido",
      value: data.game_settings.sonido ? "Activado" : "Desactivado",
    },
    {
      icon: "🎞️",
      label: "Animaciones",
      value: data.game_settings.animaciones ? "Activadas" : "Desactivadas",
    },
  ];

  const chartOptions = [
    {
      label: "Errores por pregunta",
      value: "errores",
      content: (
        <ErrorsPerQuestionChart preguntas={data.game_results.preguntas} />
      ),
    },
    {
      label: "Tiempo por target",
      value: "tiempo",
      content: (
        <ObservationTimePerTargetChart
          tiempos={data.game_results.tiempos_por_target}
        />
      ),
    },
    {
      label: "Observación vs Errores",
      value: "comparacion",
      content: (
        <ObservationVsErrorsChart
          tiempos={data.game_results.tiempos_por_target}
          preguntas={data.game_results.preguntas}
        />
      ),
    },
    {
      label: "Tiempo por pregunta",
      value: "tiempo_pregunta",
      content: (
        <ResponseTimePerQuestionChart preguntas={data.game_results.preguntas} />
      ),
    },
  ];

  const selectedChartComponent =
    chartOptions.find((opt) => opt.value === selectedChart)?.content ?? null;

  return (
    <ActivityLayout
      leftContent={<ActivityInfoPanel items={infoItems} />}
      rightContent={
        <ActivityChartPanel
          chartOptions={chartOptions}
          selectedChart={selectedChart}
          onChartChange={setSelectedChart}
        >
          {selectedChartComponent}
        </ActivityChartPanel>
      }
    />
  );
};

export default ActivityOneResults;
