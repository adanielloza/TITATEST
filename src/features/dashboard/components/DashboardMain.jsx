// src/components/DashboardMain.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Container from "./Container";
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
