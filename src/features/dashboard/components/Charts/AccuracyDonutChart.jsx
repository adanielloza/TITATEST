import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useEffect, useRef } from "react";

ChartJS.register(ArcElement, Tooltip, Legend);

const AccuracyDonutChart = ({ correct, total }) => {
  const incorrect = total - correct;
  const chartRef = useRef(null);

  const data = {
    labels: ["Aciertos", "Errores"],
    datasets: [
      {
        data: [correct, incorrect],
        backgroundColor: ["#4caf50", "#f44336"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "bottom" },
    },
  };

  useEffect(() => {
    const handleResize = () => {
      if (chartRef.current) chartRef.current.resize();
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Doughnut ref={chartRef} data={data} options={options} />
    </div>
  );
};

export default AccuracyDonutChart;
