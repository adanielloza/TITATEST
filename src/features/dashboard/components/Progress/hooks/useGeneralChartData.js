import { useEffect, useState } from "react";
import {
  mapSesionActividad1,
  mapSesionActividad2,
  mapSesionActividad3,
} from "../utils/mapSessionToScore";

export const useGeneralChartData = (activityHistory) => {
  const [resumen, setResumen] = useState(null);
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [options, setOptions] = useState({});

  useEffect(() => {
    const procesar = async () => {
      if (!Array.isArray(activityHistory)) return;

      const data = {
        actividad1: null,
        actividad2: null,
        actividad3: null,
        promedioGeneral: null,
      };

      let total = 0;
      let count = 0;

      for (const { actividadId, sesiones } of activityHistory) {
        if (!Array.isArray(sesiones) || sesiones.length === 0) continue;

        let promedio = 0;

        if (actividadId === "actividad_1") {
          const puntajes = await Promise.all(sesiones.map(mapSesionActividad1));
          promedio = Math.round(
            puntajes.reduce((a, b) => a + b, 0) / puntajes.length
          );
          data.actividad1 = promedio;
        }

        if (actividadId === "actividad_2") {
          const puntajes = await Promise.all(sesiones.map(mapSesionActividad2));
          promedio = Math.round(
            puntajes.reduce((a, b) => a + b, 0) / puntajes.length
          );
          data.actividad2 = promedio;
        }

        if (actividadId === "actividad_3") {
          const puntajes = await Promise.all(sesiones.map(mapSesionActividad3));
          promedio = Math.round(
            puntajes.reduce((a, b) => a + b, 0) / puntajes.length
          );
          data.actividad3 = promedio;
        }

        if (promedio) {
          total += promedio;
          count++;
        }
      }

      data.promedioGeneral = count > 0 ? Math.round(total / count) : null;

      const chartData = {
        labels: ["Actividad 1", "Actividad 2", "Actividad 3"],
        datasets: [
          {
            label: "Desempeño (%)",
            data: [
              data.actividad1 ?? 0,
              data.actividad2 ?? 0,
              data.actividad3 ?? 0,
            ],
            backgroundColor: "rgba(0, 151, 230, 0.2)",
            borderColor: "rgba(0, 151, 230, 1)",
            borderWidth: 2,
            pointBackgroundColor: "rgba(0, 151, 230, 1)",
          },
        ],
      };

      const chartOptions = {
        responsive: true,
        scales: {
          r: {
            beginAtZero: true,
            max: 100,
            ticks: {
              stepSize: 20,
              color: "#555",
            },
            pointLabels: {
              font: { size: 14 },
            },
          },
        },
        plugins: {
          legend: {
            position: "top",
          },
        },
      };

      setResumen(data);
      setChartData(chartData);
      setOptions(chartOptions);
    };

    procesar();
  }, [activityHistory]);

  return { resumen, chartData, options };
};
