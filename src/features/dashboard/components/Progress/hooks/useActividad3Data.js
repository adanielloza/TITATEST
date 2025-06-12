import { useEffect, useState } from "react";
import {
  calcularPuntajeActividad3,
  generarObservacionesActividad3,
} from "../utils/scoreActividad3";

const getDificultadTexto = (cantidad_elementos) => {
  if (cantidad_elementos === 3) return "Fácil";
  if (cantidad_elementos === 4) return "Media";
  if (cantidad_elementos === 5) return "Difícil";
  return "Desconocido";
};

export const useActividad3Data = (sesionesRaw = []) => {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [detallePorFecha, setDetallePorFecha] = useState({});

  useEffect(() => {
    if (!Array.isArray(sesionesRaw) || sesionesRaw.length === 0) return;

    const procesar = async () => {
      const sesiones = [...sesionesRaw].filter((s) => !!s.fecha);
      sesiones.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));

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

      const dataPuntajes = await Promise.all(
        labels.map(async (fecha) => {
          const sesionesDia = sesionesPorFecha[fecha];
          const total = await sesionesDia.reduce(async (accP, sesion) => {
            const acc = await accP;
            const puntaje = await calcularPuntajeActividad3({
              preguntas: sesion.game_results.preguntas,
              game_settings: sesion.game_settings,
            });
            return acc + puntaje;
          }, Promise.resolve(0));
          return Math.round(total / sesionesDia.length);
        })
      );

      const chartData = {
        labels,
        datasets: [
          {
            label: "Desempeño (%)",
            data: dataPuntajes,
            fill: false,
            borderColor: "#e17055",
            tension: 0.3,
            pointBackgroundColor: "#e17055",
          },
        ],
      };

      const detalles = {};
      for (const fecha of labels) {
        const sesionesDia = sesionesPorFecha[fecha];
        const detallesFecha = await Promise.all(
          sesionesDia.map(async (sesion, i) => {
            const preguntas = sesion.game_results.preguntas || [];
            const totalPreguntas = preguntas.length || 1;
            const respuestasCorrectas = preguntas.filter(
              (p) => p.errores === 0
            ).length;
            const tiempoTotal = preguntas.reduce(
              (acc, p) => acc + p.tiempoRespuesta,
              0
            );
            const tiempoPromedio = tiempoTotal / totalPreguntas;

            const puntaje = await calcularPuntajeActividad3({
              preguntas,
              game_settings: sesion.game_settings,
            });
            const observaciones = await generarObservacionesActividad3({
              preguntas,
              game_settings: sesion.game_settings,
            });

            const dificultadTexto = getDificultadTexto(
              sesion.game_settings.cantidad_elementos
            );

            return {
              actividad: i + 1,
              dificultad: dificultadTexto,
              correctas: `${respuestasCorrectas} / ${totalPreguntas}`,
              tiempo_promedio: `${tiempoPromedio.toFixed(2)} s`,
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

    procesar();
  }, [sesionesRaw]);

  const labels = chartData.labels || [];
  const obtenerDetallePorFecha = (fecha) => detallePorFecha[fecha] || [];

  return { chartData, labels, obtenerDetallePorFecha };
};
