import { useEffect } from "react";
import ActivityLayout from "./ActivityLayout";

const ActivityOneResults = ({ data }) => {
  useEffect(() => {
    console.log(
      "📦 Datos completos de la sesión seleccionada (Actividad 1):",
      data
    );
  }, [data]);

  return (
    <ActivityLayout
      leftContent={<div>Texto lado izquierdo Actividad 1</div>}
      rightContent={<div>Texto lado derecho Actividad 1</div>}
    />
  );
};

export default ActivityOneResults;
