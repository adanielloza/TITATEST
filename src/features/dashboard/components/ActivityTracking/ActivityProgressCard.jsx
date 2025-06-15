import React, { useState } from "react";
import Dropdown from "../../../../components/Dropdown";

import GeneralProgress from "../Progress/GeneralProgress";
import Progress1 from "../Progress/Progress1";
import Progress2 from "../Progress/Progress2";
import Progress3 from "../Progress/Progress3";

const ActivityProgressCard = ({ activityHistory }) => {
  const [selectedProgress, setSelectedProgress] = useState("general");

  const dropdownOptions = [
    { label: "Progreso General", value: "general" },
    { label: "Progreso Actividad 1", value: "actividad_1" },
    { label: "Progreso Actividad 2", value: "actividad_2" },
    { label: "Progreso Actividad 3", value: "actividad_3" },
  ];

  const renderProgressComponent = () => {
    if (selectedProgress === "general") {
      return <GeneralProgress activityHistory={activityHistory} />;
    }

    const filtered = activityHistory.find(
      (act) => act.actividadId === selectedProgress
    );

    switch (selectedProgress) {
      case "actividad_1":
        return <Progress1 activityHistory={filtered} />;
      case "actividad_2":
        return <Progress2 activityHistory={filtered} />;
      case "actividad_3":
        return <Progress3 activityHistory={filtered} />;
      default:
        return null;
    }
  };

  return (
    <div style={{ height: "350px" }}>
      <h3>📊 Seguimiento de Actividades</h3>

      <div style={{ marginBottom: "1rem" }}>
        <Dropdown
          name="progress-select"
          value={selectedProgress}
          onChange={(e) => setSelectedProgress(e.target.value)}
          options={dropdownOptions}
          placeholder="Selecciona progreso"
        />
      </div>

      {renderProgressComponent()}
    </div>
  );
};

export default ActivityProgressCard;
