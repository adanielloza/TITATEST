import { useNavigate } from "react-router-dom";
import Header from "./components/Header";
import ThreeScene from "./components/ThreeScene";
import Button from "../../components/Button";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-white via-[#f0f4f8] to-[#eaf3fb]">
      <Header />

      <main className="flex-1 flex flex-col lg:flex-row items-center justify-between px-6 lg:px-20 py-12 gap-10">
        <div className="max-w-xl text-center lg:text-left">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
            Bienvenido a{" "}
            <span className="bg-gradient-to-r from-[#3498db] to-[#6dd5fa] bg-clip-text text-transparent">
              MindAR
            </span>
          </h1>

          <p className="text-lg text-gray-600 mb-8">
            Plataforma interna para monitorear el progreso y desempeño de los
            niños en actividades cognitivas.
          </p>

          <div className="flex justify-center lg:justify-start">
            <Button
              variant="primary"
              label="Ingresar al sistema"
              onClick={() => navigate("/auth")}
            />
          </div>

          <p className="mt-6 text-sm text-gray-400 italic">
            Acceso exclusivo para personal autorizado.
          </p>
        </div>

        <div className="relative w-full lg:w-[600px] h-[500px] rounded-3xl border border-[#d6eaff] bg-gradient-to-br from-white via-[#f9fbff] to-[#e6effa] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.2),inset_0_0_12px_rgba(52,152,219,0.15)] overflow-hidden">
          <div className="relative z-10 w-full h-full">
            <ThreeScene />
          </div>
        </div>
      </main>
    </div>
  );
}
