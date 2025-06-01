import Dropdown from "../../../../components/Dropdown";
import "../../styles/ActivityResultsCard.css";

const ActivityChartPanel = ({
  chartOptions = [],
  selectedChart,
  onChartChange,
  children,
}) => {
  return (
    <div className="activity-chart">
      <h4 className="activity-chart__title">📊 Visualización de Resultados</h4>
      <Dropdown
        name="chart-selector"
        value={selectedChart}
        onChange={(e) => onChartChange(e.target.value)}
        options={chartOptions}
        placeholder="Selecciona un gráfico"
      />
      <div className="activity-chart__content">{children}</div>
    </div>
  );
};

export default ActivityChartPanel;
