import { useState } from "react";
import { useLocation } from "react-router-dom";
import { SidebarHeader, SidebarLink } from "./";
import "../styles/Sidebar.css";

export default function Sidebar({ links = [] }) {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <aside className={`sidebar${collapsed ? " sidebar--collapsed" : ""}`}>
      <div className="sidebar__container">
        <SidebarHeader
          collapsed={collapsed}
          toggle={() => setCollapsed(!collapsed)}
        />
        <nav className="sidebar__nav">
          {links.map((link) => (
            <SidebarLink
              key={link.path}
              to={link.path}
              icon={link.icon}
              label={link.label}
              isActive={location.pathname === link.path}
              collapsed={collapsed}
            />
          ))}
        </nav>
      </div>
    </aside>
  );
}
