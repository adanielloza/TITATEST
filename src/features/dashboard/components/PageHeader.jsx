import "../styles/PageHeader.css";

export default function PageHeader({ title, subtitle }) {
  return (
    <div className="page-header">
      {title && <h1 className="page-header__title">{title}</h1>}
      {subtitle && <h2 className="page-header__subtitle">{subtitle}</h2>}
    </div>
  );
}
