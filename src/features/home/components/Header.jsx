import { useNavigate } from "react-router-dom";
import Button from "../../../components/Button";

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="shadow-sm bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-end">
          <Button
            variant="primary"
            label="Sign in"
            onClick={() => navigate("/auth")}
          />
        </div>
      </div>
    </header>
  );
}
