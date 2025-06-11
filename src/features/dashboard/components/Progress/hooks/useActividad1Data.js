import { useEffect, useState } from "react";
import {
  calcularPuntajeActividad1,
  generarObservacionesActividad1,
} from "../utils/scoreActividad1";

export const useActividad1Data = (sesionesRaw) => {
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
                  const { preguntas, tiempos_por_target } = sesion.game_results;
                  const game_settings = sesion.game_settings;
                  const puntaje = await calcularPuntajeActividad1({
                    preguntas,
                    tiempos_por_target,
                    game_settings,
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
            const { preguntas, tiempos_por_target } = sesion.game_results;
            const game_settings = sesion.game_settings;
            const puntaje = await calcularPuntajeActividad1({
              preguntas,
              tiempos_por_target,
              game_settings,
            });
            const observaciones = await generarObservacionesActividad1({
              preguntas,
              tiempos_por_target,
              game_settings,
            });

            const dificultad = game_settings.cantidad_modelos;
            const dificultadTexto =
              dificultad === 5
                ? "Fácil"
                : dificultad === 7
                ? "Media"
                : dificultad === 10
                ? "Difícil"
                : "Desconocida";

            const correctas = preguntas.filter(
              (p) => p.desaciertos === 0
            ).length;
            const tiempoTotalPreguntas = preguntas.reduce(
              (acc, p) => acc + p.tiempo,
              0
            );
            const tiempoPromedioPorPregunta =
              tiempoTotalPreguntas / preguntas.length;
            const tiempoPromedioPorTarget =
              tiempos_por_target.reduce((acc, t) => acc + t.tiempo, 0) /
              tiempos_por_target.length;

            return {
              actividad: i + 1,
              dificultad: dificultadTexto,
              correctas: `${correctas} / ${preguntas.length}`,
              tiempo: tiempoTotalPreguntas.toFixed(2),
              tiempoPregunta: tiempoPromedioPorPregunta.toFixed(2),
              tiempoObservacion: tiempoPromedioPorTarget.toFixed(2),
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
