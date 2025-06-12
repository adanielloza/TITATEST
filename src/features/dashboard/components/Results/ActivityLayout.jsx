import "../../styles/ActivityLayout.css";

const ActivityLayout = ({ leftContent, rightContent }) => {
  return (
    <div className="activity-layout">
      <div className="activity-layout__column--left">{leftContent}</div>
      <div className="activity-layout__column--right">{rightContent}</div>
    </div>
  );
};

export default ActivityLayout;
