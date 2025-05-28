import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import ProtectedRoutes from "../ProtectedRoutes";

describe("ProtectedRoutes", () => {
  afterEach(() => {
    localStorage.clear();
  });

  it("renderiza el contenido si hay usuario en localStorage", () => {
    localStorage.setItem("user", JSON.stringify({ role: "user" }));

    render(
      <MemoryRouter initialEntries={["/dashboard"]}>
        <Routes>
          <Route element={<ProtectedRoutes />}>
            <Route path="/dashboard" element={<div>Ruta protegida</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("Ruta protegida")).toBeInTheDocument();
  });

  it("redirige a /auth si no hay usuario", () => {
    render(
      <MemoryRouter initialEntries={["/dashboard"]}>
        <Routes>
          <Route element={<ProtectedRoutes />}>
            <Route path="/dashboard" element={<div>Ruta protegida</div>} />
          </Route>
          <Route path="/auth" element={<div>Página de Login</div>} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("Página de Login")).toBeInTheDocument();
    expect(screen.queryByText("Ruta protegida")).not.toBeInTheDocument();
  });
});
