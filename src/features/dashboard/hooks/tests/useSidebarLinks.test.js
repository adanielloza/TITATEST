import { renderHook } from "@testing-library/react";
import { useSidebarLinks } from "../useSidebarLinks";

beforeEach(() => {
  localStorage.clear();
});

describe("useSidebarLinks", () => {
  it("devuelve links de admin si el usuario tiene rol admin", () => {
    localStorage.setItem("user", JSON.stringify({ role: "admin" }));

    const { result } = renderHook(() => useSidebarLinks());

    expect(result.current).toEqual([
      { path: "/dashboard", label: "Inicio", icon: "home.svg" },
      {
        path: "/dashboard/manage-users",
        label: "Usuarios",
        icon: "person.svg",
      },
    ]);
  });

  it("devuelve links de usuario si el usuario tiene rol user", () => {
    localStorage.setItem("user", JSON.stringify({ role: "user" }));

    const { result } = renderHook(() => useSidebarLinks());

    expect(result.current).toEqual([
      { path: "/dashboard", label: "Inicio", icon: "home.svg" },
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
    ]);
  });

  it("devuelve links de usuario por defecto si no hay rol definido", () => {
    const { result } = renderHook(() => useSidebarLinks());

    expect(result.current).toEqual([
      { path: "/dashboard", label: "Inicio", icon: "home.svg" },
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
    ]);
  });
});
