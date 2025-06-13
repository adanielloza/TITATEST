const InfoItem = ({ icon, label, value }) => (
  <div className="activity-info__item">
    <div className="activity-info__label">
      {icon} {label}
    </div>
    <div className="activity-info__value">{value}</div>
  </div>
);

const ActivityInfoPanel = ({
  title = "Información de la Actividad",
  items = [],
}) => {
  return (
    <div className="activity-info">
      <h4 className="activity-info__title">📄 {title}</h4>
      {items.map(({ icon, label, value }, idx) => (
        <InfoItem key={idx} icon={icon} label={label} value={value} />
      ))}
    </div>
  );
};

export default ActivityInfoPanel;
