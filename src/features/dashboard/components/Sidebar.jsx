import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SidebarHeader, SidebarLink } from "./";
import Modal from "../../../components/Modal";
import "../styles/Sidebar.css";

export default function Sidebar({ links = [] }) {
  const [collapsed, setCollapsed] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleLinkClick = (link) => {
    if (link.isLogout) {
      setShowLogoutModal(true);
    }
  };

  return (
    <>
      <aside className={`sidebar${collapsed ? " sidebar--collapsed" : ""}`}>
        <div className="sidebar__container">
          <SidebarHeader
            collapsed={collapsed}
            toggle={() => setCollapsed(!collapsed)}
          />
          <nav className="sidebar__nav">
            {links.map((link) => {
              if (link.isLogout) {
                return (
                  <div
                    key="logout"
                    className="sidebar__link sidebar__logout-link"
                    role="button"
                    tabIndex={0}
                    onClick={() => handleLinkClick(link)}
                  >
                    <img
                      src={`/icons/${link.icon}`}
                      alt={link.label}
                      className="sidebar__link-icon"
                    />
                    {!collapsed && (
                      <span className="sidebar__link-label">{link.label}</span>
                    )}
                  </div>
                );
              }

              return (
                <SidebarLink
                  key={link.path}
                  to={link.path}
                  icon={link.icon}
                  label={link.label}
                  isActive={location.pathname === link.path}
                  collapsed={collapsed}
                />
              );
            })}
          </nav>
        </div>
      </aside>

      <Modal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        title="¿Cerrar sesión?"
        subtitle="Estás a punto de cerrar tu sesión. ¿Deseas continuar?"
        confirmLabel="Sí, cerrar sesión"
        cancelLabel="Cancelar"
        confirmVariant="primary"
        onCancel={() => setShowLogoutModal(false)}
        onConfirm={handleLogout}
      />
    </>
  );
}
