import { useEffect } from "react";

const GeneralProgress = ({ activityHistory }) => {
  useEffect(() => {
    console.log("📈 [General] activityHistory:", activityHistory);
  }, [activityHistory]);

  return <div>Componente de Progreso General</div>;
};

export default GeneralProgress;
