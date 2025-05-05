import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const role = localStorage.getItem("role");

  const commonLinks = [{ path: "/dashboard", label: "Inicio" }];

  const adminLinks = [
    ...commonLinks,
    { path: "/dashboard/manage-users", label: "Gestionar Usuarios" },
  ];

  const userLinks = [
    ...commonLinks,
    { path: "/dashboard/settings", label: "Configuración" },
  ];

  const links = role === "admin" ? adminLinks : userLinks;

  return (
    <aside className="w-64 bg-white shadow-md p-4">
      <nav className="space-y-4">
        {links.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className="block text-gray-700 hover:text-blue-600"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
