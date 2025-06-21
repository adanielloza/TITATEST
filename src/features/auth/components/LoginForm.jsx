import { Link } from "react-router-dom";
import Button from "../../../components/Button";

export default function LoginForm({ data, errorMsg, onChange, onSubmit }) {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {errorMsg && (
        <div className="bg-red-100 text-red-700 px-4 py-2 rounded-md text-sm font-medium">
          {errorMsg}
        </div>
      )}

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Correo electrónico
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={data.email}
          onChange={onChange}
          placeholder="tucorreo@ejemplo.com"
          className="w-full rounded-lg border border-gray-200 px-4 py-3 
                     focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Contraseña
        </label>
        <input
          id="password"
          name="password"
          type="password"
          value={data.password}
          onChange={onChange}
          placeholder="••••••••"
          className="w-full rounded-lg border border-gray-200 px-4 py-3 
                     focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
      </div>

      <div className="flex justify-end">
        <Button
          type="submit"
          variant="primary"
          label="Iniciar sesión"
          className="w-full sm:w-[320px] py-3 text-lg"
        />
      </div>
    </form>
  );
}
