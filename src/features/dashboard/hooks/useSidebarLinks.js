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
      path: "/dashboard/settings",
      label: "Configuración",
      icon: "settings.svg",
    },
  ];

  return role === "admin" ? adminLinks : userLinks;
}
