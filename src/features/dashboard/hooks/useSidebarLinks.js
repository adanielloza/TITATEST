export function useSidebarLinks() {
  const userData = JSON.parse(localStorage.getItem("user") || "{}");
  const role = userData.role;

  const commonLinks = [
    { path: "/dashboard", label: "Inicio", icon: "home.svg" },
  ];

  const adminLinks = [
    ...commonLinks,
    { path: "/dashboard/manage-users", label: "Usuarios", icon: "person.svg" },
  ];

  const userLinks = [
    ...commonLinks,
    {
      path: "/dashboard/patients-management",
      label: "Gestión de Pacientes",
      icon: "person.svg",
    },
    {
      path: "/dashboard/activity-management",
      label: "Seguimiento Actividades",
      icon: "activity.svg",
    },
  ];

  const logoutLink = {
    path: "/logout",
    label: "Cerrar sesión",
    icon: "logout.svg",
    isLogout: true,
  };

  const links = role === "admin" ? adminLinks : userLinks;
  return [...links, logoutLink];
}
