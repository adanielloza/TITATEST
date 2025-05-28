import { Sidebar, DashboardMain } from "./components";
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
