import { useState, useEffect } from "react";
import ActivityLayout from "./ActivityLayout";
import ResponseTimeChart from "../Charts/ResponseTimeLineChart";
import ErrorsLineChart from "../Charts/ErrorsLineChart";
import Dropdown from "../../../../components/Dropdown";
import ActivityLeftContent from "./ActivityLeftContent";

const ActivityThreeResults = ({ data }) => {
  const preguntas = data?.game_results?.preguntas || [];
  const [selectedChart, setSelectedChart] = useState("tiempo");

  useEffect(() => {
    console.log("📦 Datos completos de la sesión seleccionada:", data);
    console.log("📊 game_results:", data?.game_results);
    console.log("📋 Preguntas:", data?.game_results?.preguntas);
  }, [preguntas]);

  const chartOptions = [
    { value: "tiempo", label: "Tiempo de respuesta" },
    { value: "errores", label: "Errores" },
  ];

  return (
    <ActivityLayout
      leftContent={
        <ActivityLeftContent
          actividadId={data.actividadId}
          fecha={data.fecha}
          gameSettings={data.game_settings}
          gameResults={data.game_results}
        />
      }
      rightContent={
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            width: "100%",
            height: "100%",
          }}
        >
          <Dropdown
            name="chart-selector"
            value={selectedChart}
            onChange={(e) => setSelectedChart(e.target.value)}
            options={chartOptions}
            placeholder="Selecciona un gráfico"
          />
          <div
            style={{
              flexGrow: 1,
              minHeight: 0,
            }}
          >
            {selectedChart === "tiempo" ? (
              <ResponseTimeChart preguntas={preguntas} />
            ) : (
              <ErrorsLineChart preguntas={preguntas} />
            )}
          </div>
        </div>
      }
    />
  );
};

export default ActivityThreeResults;
