import { Outlet } from "react-router-dom";
import { Container } from "./";
import "../styles/DashboardMain.css";

export default function DashboardMain() {
  return (
    <main className="dashboard-main">
      <Container>
        <Outlet />
      </Container>
    </main>
  );
}
