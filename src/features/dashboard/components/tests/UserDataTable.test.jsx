import { render, screen, fireEvent } from "@testing-library/react";
import UsersDataTable from "../UsersDataTable";

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

vi.mock("../AddUser.jsx", () => ({
  __esModule: true,
  default: ({ onUserAdded }) => (
    <button onClick={onUserAdded}>Mock AddUser</button>
  ),
}));

vi.mock("../EditUser", () => ({
  default: ({ isOpen, user, onClose }) =>
    isOpen ? (
      <div data-testid="edit-modal">
        Editando: {user?.name} <button onClick={onClose}>Cerrar</button>
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
          <span>{row.name}</span>
          <button onClick={() => onEdit(row)}>Editar</button>
          <button onClick={() => onDelete(row)}>Eliminar</button>
        </div>
      ))}
    </div>
  ),
}));

const mockConfirmDelete = vi.fn();
const mockFetchUsers = vi.fn();
const sampleUser = {
  id: "1",
  uid: "abc123",
  name: "María",
  lastName: "Gómez",
  email: "maria@example.com",
};

vi.mock("../../hooks/useUsers.js", () => ({
  default: () => ({
    users: [sampleUser],
    userToDelete: sampleUser,
    isModalOpen: true,
    setIsModalOpen: vi.fn(),
    setUserToDelete: vi.fn(),
    confirmDelete: mockConfirmDelete,
    fetchUsers: mockFetchUsers,
  }),
}));

describe("UsersDataTable", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renderiza AddUser y DataTable con usuarios", () => {
    render(<UsersDataTable />);
    expect(screen.getByText("Mock AddUser")).toBeInTheDocument();
    expect(screen.getByText("María")).toBeInTheDocument();
  });

  it("muestra modal de edición al hacer clic en 'Editar'", () => {
    render(<UsersDataTable />);
    fireEvent.click(screen.getByText("Editar"));
    expect(screen.getByTestId("edit-modal")).toBeInTheDocument();
    expect(screen.getByText(/Editando: María/)).toBeInTheDocument();
  });

  it("muestra modal de eliminación y ejecuta confirmDelete", () => {
    render(<UsersDataTable />);
    fireEvent.click(screen.getAllByText("Eliminar")[0]);
    expect(screen.getByTestId("delete-modal")).toBeInTheDocument();
    fireEvent.click(screen.getAllByText("Eliminar")[1]);
    expect(mockConfirmDelete).toHaveBeenCalled();
  });

  it("handleEditClick actualiza el estado para abrir el modal de edición", () => {
    render(<UsersDataTable />);
    fireEvent.click(screen.getByText("Editar"));
    expect(screen.getByTestId("edit-modal")).toBeInTheDocument();
  });

  it("handleDeleteClick actualiza el estado para abrir el modal de eliminación", () => {
    render(<UsersDataTable />);
    fireEvent.click(screen.getAllByText("Eliminar")[0]);
    expect(screen.getByTestId("delete-modal")).toBeInTheDocument();
  });
});
