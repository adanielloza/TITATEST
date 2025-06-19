import { useNavigate } from "react-router-dom";
import Button from "../../../components/Button";

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm border-b border-[#e2e8f0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div className="text-2xl font-bold bg-gradient-to-r from-[#3498db] to-[#6dd5fa] bg-clip-text text-transparent tracking-tight">
            MindAR
          </div>

          <Button
            variant="primary"
            label="Iniciar sesión"
            onClick={() => navigate("/auth")}
          />
        </div>
      </div>
    </header>
  );
}
