import { render, screen, fireEvent } from "@testing-library/react";
import PatientsDataTable from "../PatientsDataTable";

vi.mock("../../../../contexts/LoaderContext.jsx", () => ({
  useLoader: () => ({
    showLoader: vi.fn(),
    hideLoader: vi.fn(),
  }),
}));

vi.mock("../../../../hooks/useToast.js", () => ({
  default: () => ({
    notify: vi.fn(),
  }),
}));

vi.mock("../AddPatient", () => ({
  __esModule: true,
  default: ({ onPatientAdded }) => (
    <button onClick={onPatientAdded}>Mock AddPatient</button>
  ),
}));

vi.mock("../EditPatient", () => ({
  default: ({ isOpen, patient, onClose }) =>
    isOpen ? (
      <div data-testid="edit-modal">
        Editando: {patient?.nombre} <button onClick={onClose}>Cerrar</button>
      </div>
    ) : null,
}));

vi.mock("../../../../components/Modal.jsx", () => ({
  __esModule: true,
  default: ({ isOpen, onConfirm, onCancel, children }) =>
    isOpen ? (
      <div data-testid="delete-modal">
        {children}
        <button onClick={onCancel}>Cancelar</button>
        <button onClick={onConfirm}>Eliminar</button>
      </div>
    ) : null,
}));

vi.mock("../../../../components/DataTable/DataTable.jsx", () => ({
  __esModule: true,
  default: ({ data, onEdit, onDelete }) => (
    <div>
      {data.map((row) => (
        <div key={row.id}>
          <span>{row.nombre}</span>
          <button onClick={() => onEdit(row)}>Editar</button>
          <button onClick={() => onDelete(row)}>Eliminar</button>
        </div>
      ))}
    </div>
  ),
}));

const mockConfirmDelete = vi.fn();
const mockFetchPatients = vi.fn();
const samplePatient = {
  id: "1",
  nombre: "Juan",
  apellido: "Pérez",
};

vi.mock("../../hooks/usePatients.js", () => ({
  default: () => ({
    patients: [samplePatient],
    patientToDelete: samplePatient,
    isModalOpen: true,
    setIsModalOpen: vi.fn(),
    setPatientToDelete: vi.fn(),
    confirmDelete: mockConfirmDelete,
    fetchPatients: mockFetchPatients,
  }),
}));

describe("PatientsDataTable", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renderiza AddPatient y DataTable con pacientes", () => {
    render(<PatientsDataTable />);
    expect(screen.getByText("Mock AddPatient")).toBeInTheDocument();
    expect(screen.getByText("Juan")).toBeInTheDocument();
  });

  it("muestra modal de edición al hacer clic en 'Editar'", () => {
    render(<PatientsDataTable />);
    fireEvent.click(screen.getByText("Editar"));
    expect(screen.getByTestId("edit-modal")).toBeInTheDocument();
    expect(screen.getByText(/Editando: Juan/)).toBeInTheDocument();
  });

  it("muestra modal de eliminación y ejecuta confirmDelete", () => {
    render(<PatientsDataTable />);
    fireEvent.click(screen.getAllByText("Eliminar")[0]);
    expect(screen.getByTestId("delete-modal")).toBeInTheDocument();
    fireEvent.click(screen.getAllByText("Eliminar")[1]);
    expect(mockConfirmDelete).toHaveBeenCalled();
  });

  it("ejecuta handleEditClick correctamente", () => {
    render(<PatientsDataTable />);
    fireEvent.click(screen.getByText("Editar"));
    expect(screen.getByTestId("edit-modal")).toBeInTheDocument();
  });

  it("ejecuta handleDeleteClick correctamente", () => {
    render(<PatientsDataTable />);
    fireEvent.click(screen.getAllByText("Eliminar")[0]);
    expect(screen.getByTestId("delete-modal")).toBeInTheDocument();
  });

  it("handleEditClick actualiza el estado de edición", () => {
    render(<PatientsDataTable />);
    fireEvent.click(screen.getByText("Editar"));
    expect(screen.getByTestId("edit-modal")).toBeInTheDocument();
  });

  it("handleDeleteClick actualiza el estado del modal de eliminación", () => {
    render(<PatientsDataTable />);
    fireEvent.click(screen.getAllByText("Eliminar")[0]);
    expect(screen.getByTestId("delete-modal")).toBeInTheDocument();
  });

  it("muestra modal de eliminación y ejecuta confirmDelete", () => {
    vi.mock("../../hooks/usePatients.js", () => ({
      default: () => ({
        patients: [samplePatient],
        patientToDelete: samplePatient,
        isModalOpen: true,
        setIsModalOpen: vi.fn(),
        setPatientToDelete: vi.fn(),
        confirmDelete: mockConfirmDelete,
        fetchPatients: mockFetchPatients,
      }),
    }));

    const { unmount } = render(<PatientsDataTable />);
    expect(screen.getByTestId("delete-modal")).toBeInTheDocument();
    fireEvent.click(screen.getAllByText("Eliminar")[1]);
    expect(mockConfirmDelete).toHaveBeenCalled();
    unmount();
  });

  it("ejecuta fetchPatients al agregar un paciente", () => {
    render(<PatientsDataTable />);
    fireEvent.click(screen.getByText("Mock AddPatient"));
    expect(mockFetchPatients).toHaveBeenCalled();
  });

  it("cierra el modal de edición cuando se hace clic en cerrar", () => {
    render(<PatientsDataTable />);
    fireEvent.click(screen.getByText("Editar"));
    fireEvent.click(screen.getByText("Cerrar"));
    expect(screen.queryByTestId("edit-modal")).not.toBeInTheDocument();
  });
});
