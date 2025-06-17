import { renderHook, act, waitFor } from "@testing-library/react";
import useUsers from "../useUsers";
import * as userService from "../../services/userService";
import * as loaderContext from "../../../../contexts/LoaderContext";
import useToast from "../../../../hooks/useToast";
import { createUserWithEmailAndPassword } from "firebase/auth";

vi.mock("firebase/auth", () => {
  return {
    createUserWithEmailAndPassword: vi.fn(),
    getAuth: vi.fn(() => ({})),
    auth: {},
  };
});

vi.mock("../../../../hooks/useToast", () => ({
  default: vi.fn(),
}));

describe("useUsers", () => {
  const showLoader = vi.fn();
  const hideLoader = vi.fn();
  const notify = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    vi.spyOn(loaderContext, "useLoader").mockReturnValue({
      showLoader,
      hideLoader,
    });

    useToast.mockReturnValue({ notify });
  });

  it("fetchUsers carga la lista correctamente", async () => {
    const mockUsers = [
      { uid: "1", name: "Juan", lastName: "Pérez", email: "a@a.com" },
    ];

    vi.spyOn(userService, "fetchUsersFromFirestore").mockResolvedValueOnce(
      mockUsers
    );

    const { result } = renderHook(() => useUsers());

    await waitFor(() => {
      expect(result.current.users).toEqual(mockUsers);
    });

    expect(showLoader).toHaveBeenCalled();
    expect(hideLoader).toHaveBeenCalled();
  });

  it("fetchUsers maneja errores y notifica", async () => {
    vi.spyOn(userService, "fetchUsersFromFirestore").mockRejectedValueOnce(
      new Error("fail")
    );

    const { result } = renderHook(() => useUsers({ skipInitialLoad: true }));

    await act(async () => {
      await result.current.fetchUsers();
    });

    expect(notify).toHaveBeenCalledWith(
      "error",
      "No se pudo cargar la lista de usuarios"
    );
    expect(result.current.users).toEqual([]);
  });

  it("confirmDelete elimina usuario y actualiza lista", async () => {
    const user = { uid: "abc123" };
    const fetchUsersSpy = vi
      .spyOn(userService, "fetchUsersFromFirestore")
      .mockResolvedValue([]);
    const deleteSpy = vi
      .spyOn(userService, "deleteUserByUid")
      .mockResolvedValue();

    const { result } = renderHook(() => useUsers());

    act(() => {
      result.current.setUserToDelete(user);
      result.current.setIsModalOpen(true);
    });

    await act(async () => {
      await result.current.confirmDelete();
    });

    expect(deleteSpy).toHaveBeenCalledWith("abc123");
    expect(notify).toHaveBeenCalledWith(
      "success",
      "Usuario eliminado correctamente"
    );
    expect(fetchUsersSpy).toHaveBeenCalled();
    expect(result.current.userToDelete).toBeNull();
    expect(result.current.isModalOpen).toBe(false);
  });

  it("saveUser crea un nuevo usuario y lo guarda en firestore", async () => {
    createUserWithEmailAndPassword.mockResolvedValue({
      user: { uid: "123abc" },
    });

    const saveSpy = vi
      .spyOn(userService, "saveUserToFirestore")
      .mockResolvedValue();
    const fetchUsersSpy = vi
      .spyOn(userService, "fetchUsersFromFirestore")
      .mockResolvedValue([]);

    const { result } = renderHook(() => useUsers());

    const newUser = {
      name: "Ana",
      lastName: "López",
      email: "ana@test.com",
      password: "123456",
    };

    await act(async () => {
      await result.current.saveUser(newUser);
    });

    expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
      expect.anything(),
      "ana@test.com",
      "123456"
    );
    expect(saveSpy).toHaveBeenCalledWith({
      uid: "123abc",
      name: "Ana",
      lastName: "López",
      email: "ana@test.com",
    });
    expect(fetchUsersSpy).toHaveBeenCalled();
    expect(notify).toHaveBeenCalledWith(
      "success",
      "Usuario creado correctamente"
    );
  });

  it("saveUser notifica si ocurre un error", async () => {
    createUserWithEmailAndPassword.mockRejectedValue(new Error("fail"));

    const { result } = renderHook(() => useUsers());

    await act(async () => {
      await result.current.saveUser({
        name: "Ana",
        lastName: "López",
        email: "ana@test.com",
        password: "123456",
      });
    });

    expect(notify).toHaveBeenCalledWith(
      "error",
      "No se pudo registrar el usuario"
    );
  });

  it("confirmDelete notifica si ocurre un error", async () => {
    const user = { uid: "xyz789" };

    const deleteSpy = vi
      .spyOn(userService, "deleteUserByUid")
      .mockRejectedValueOnce(new Error("fail"));

    const { result } = renderHook(() => useUsers());

    act(() => {
      result.current.setUserToDelete(user);
      result.current.setIsModalOpen(true);
    });

    await act(async () => {
      await result.current.confirmDelete();
    });

    expect(deleteSpy).toHaveBeenCalledWith("xyz789");
    expect(notify).toHaveBeenCalledWith(
      "error",
      "No se pudo eliminar el usuario"
    );
  });
});
