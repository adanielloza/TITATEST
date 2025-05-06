import React from "react";
import { Link } from "react-router-dom";
import "../styles/SidebarLink.css";

export default function SidebarLink({ to, icon, label, isActive, collapsed }) {
  return (
    <Link
      to={to}
      className={`sidebar__link${isActive ? " sidebar__link--active" : ""}`}
    >
      <img src={`/icons/${icon}`} alt={label} className="sidebar__link-icon" />
      {!collapsed && <span className="sidebar__link-label">{label}</span>}
    </Link>
  );
}
