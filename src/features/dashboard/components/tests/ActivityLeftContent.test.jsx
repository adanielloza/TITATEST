import { render, screen } from "@testing-library/react";
import ActivityLeftContent from "../Results/ActivityLeftContent";
import { describe, it, expect, vi } from "vitest";

// Mocks generales
vi.mock("../../../../utils/getDificultad", () => ({
  getDificultad: () => "Media",
}));

vi.mock("../../../../utils/formatters", () => ({
  formatDateTime: () => ({ fecha: "10 de junio", hora: "14:30" }),
}));

describe("ActivityLeftContent", () => {
  it("muestra la información básica de la actividad", () => {
    render(
      <ActivityLeftContent
        actividadId="actividad-1"
        fecha="2024-06-10T14:30:00"
        gameSettings={{ cantidad_preguntas: 5 }}
        gameResults={{ session_time: 180 }}
      />
    );

    expect(
      screen.getByText("📄 Información de la Actividad")
    ).toBeInTheDocument();
    expect(screen.getByText("📅 Fecha")).toBeInTheDocument();
    expect(screen.getByText("10 de junio - 14:30")).toBeInTheDocument();
    expect(screen.getByText("🎯 Dificultad")).toBeInTheDocument();
    expect(screen.getByText("Media")).toBeInTheDocument();
    expect(screen.getByText("⏱️ Tiempo de sesión")).toBeInTheDocument();
    expect(screen.getByText("3m 0s")).toBeInTheDocument();
    expect(screen.getByText("❓ Preguntas")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
  });

  it("muestra campos condicionales si están presentes", () => {
    render(
      <ActivityLeftContent
        actividadId="actividad-2"
        fecha="2024-06-10"
        gameSettings={{
          cantidad_elementos: 4,
          cantidad_preguntas: 3,
          tiempo: 10,
          grid_size: 5,
        }}
        gameResults={{ session_time: 62 }}
      />
    );

    expect(screen.getByText("🧠 Elementos por secuencia")).toBeInTheDocument();
    expect(screen.getByText("4")).toBeInTheDocument();
    expect(screen.getByText("❓ Preguntas")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("🕒 Tiempo de memorización")).toBeInTheDocument();
    expect(screen.getByText("10 segundos")).toBeInTheDocument();
    expect(screen.getByText("🔲 Tamaño de cuadrícula")).toBeInTheDocument();
    expect(screen.getByText("5 x 5")).toBeInTheDocument();
    expect(screen.getByText("1m 2s")).toBeInTheDocument();
  });

  it("muestra '0s' si no se proporciona tiempo de sesión", () => {
    render(
      <ActivityLeftContent
        actividadId="actividad-3"
        fecha="2024-06-10"
        gameSettings={{}}
        gameResults={{}}
      />
    );

    expect(screen.getByText("⏱️ Tiempo de sesión")).toBeInTheDocument();
    expect(screen.getByText("0s")).toBeInTheDocument();
  });

  it("muestra correctamente segundos cuando la sesión dura menos de un minuto", () => {
    render(
      <ActivityLeftContent
        actividadId="actividad-4"
        fecha="2024-06-10"
        gameSettings={{}}
        gameResults={{ session_time: 45 }}
      />
    );

    expect(screen.getByText("⏱️ Tiempo de sesión")).toBeInTheDocument();
    expect(screen.getByText("45s")).toBeInTheDocument();
  });
});
