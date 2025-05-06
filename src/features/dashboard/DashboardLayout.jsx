import React from "react";
import Sidebar from "./components/Sidebar";
import DashboardMain from "./components/DashboardMain";
import { useSidebarLinks } from "./hooks/useSidebarLinks";
import "./styles/DashboardLayout.css";

export default function DashboardLayout() {
  const links = useSidebarLinks();

  return (
    <div className="dashboard-layout">
      <Sidebar links={links} />
      <DashboardMain />
    </div>
  );
}
