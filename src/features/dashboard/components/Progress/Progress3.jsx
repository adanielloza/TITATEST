import { useEffect } from "react";

const Progress3 = ({ activityHistory }) => {
  useEffect(() => {
    console.log("📈 [Actividad 2] activityHistory:", activityHistory);
  }, [activityHistory]);

  return <div>Componente de Progreso Actividad 1</div>;
};

export default Progress3;
