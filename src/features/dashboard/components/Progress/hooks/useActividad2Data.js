import { useEffect, useState } from "react";
import {
  calcularPuntaje,
  generarObservaciones,
} from "../utils/scoreActividad2";

export const useActividad2Data = (sesionesRaw) => {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [detallePorFecha, setDetallePorFecha] = useState({});

  useEffect(() => {
    const procesar = async () => {
      const sesiones = Object.values(sesionesRaw || {})
        .filter((s) => !!s.fecha)
        .sort((a, b) => new Date(a.fecha) - new Date(b.fecha));

      const sesionesPorFecha = sesiones.reduce((acc, sesion) => {
        const fechaObj = new Date(sesion.fecha);
        const dia = fechaObj.toLocaleDateString("es-EC", { day: "2-digit" });
        const mes = fechaObj.toLocaleDateString("es-EC", { month: "long" });
        const fecha = `${dia} de ${mes}`;

        if (!acc[fecha]) acc[fecha] = [];
        acc[fecha].push(sesion);
        return acc;
      }, {});

      const labels = Object.keys(sesionesPorFecha);

      const chartData = {
        labels,
        datasets: [
          {
            label: "Desempeño (%)",
            data: await Promise.all(
              labels.map(async (fecha) => {
                const sesionesDia = sesionesPorFecha[fecha];
                const total = await sesionesDia.reduce(async (accP, sesion) => {
                  const acc = await accP;
                  const { correct_answers, image_opens, time_spent_seconds } =
                    sesion.game_results;
                  const gridSize = sesion.game_settings.grid_size || 3;
                  const puntaje = await calcularPuntaje({
                    correct_answers,
                    image_opens,
                    time_spent_seconds,
                    gridSize,
                  });
                  return acc + puntaje;
                }, Promise.resolve(0));
                return Math.round(total / sesionesDia.length);
              })
            ),
            fill: false,
            borderColor: "#0097e6",
            tension: 0.3,
            pointBackgroundColor: "#0097e6",
          },
        ],
      };

      const detalles = {};
      for (const fecha of labels) {
        const sesionesDia = sesionesPorFecha[fecha];
        const detallesFecha = await Promise.all(
          sesionesDia.map(async (sesion, i) => {
            const { correct_answers, image_opens, time_spent_seconds } =
              sesion.game_results;
            const gridSize = sesion.game_settings.grid_size || 3;
            const totalItems = gridSize * gridSize;
            const puntaje = await calcularPuntaje({
              correct_answers,
              image_opens,
              time_spent_seconds,
              gridSize,
            });
            const observaciones = await generarObservaciones({
              correct_answers,
              image_opens,
              time_spent_seconds,
              gridSize,
            });
            const dificultadTexto =
              gridSize === 3 ? "Fácil" : gridSize === 4 ? "Media" : "Difícil";
            return {
              actividad: i + 1,
              dificultad: dificultadTexto,
              correctas: `${correct_answers} / ${totalItems}`,
              aperturas: image_opens,
              tiempo: time_spent_seconds,
              puntaje,
              observaciones: observaciones.replace(/\. /g, ".\n"),
            };
          })
        );
        detalles[fecha] = detallesFecha;
      }

      setChartData(chartData);
      setDetallePorFecha(detalles);
    };

    if (Object.keys(sesionesRaw || {}).length > 0) {
      procesar();
    }
  }, [sesionesRaw]);

  const labels = chartData.labels || [];

  const obtenerDetallePorFecha = (fecha) => detallePorFecha[fecha] || [];

  return { chartData, labels, obtenerDetallePorFecha };
};
