import {
  saveUserToFirestore,
  fetchUsersFromFirestore,
  updateUserById,
  deleteUserByUid,
} from "../userService";
import { db } from "../../../../services/firebase";
import { describe, it, expect, vi, beforeEach } from "vitest";
import * as firestore from "firebase/firestore";

vi.mock("firebase/firestore", () => {
  return {
    collection: vi.fn(),
    getDocs: vi.fn(),
    query: vi.fn(),
    where: vi.fn(),
    deleteDoc: vi.fn(),
    doc: vi.fn(),
    setDoc: vi.fn(),
    getFirestore: vi.fn(),
  };
});

describe("userService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("saveUserToFirestore guarda un nuevo usuario con nombre, apellido y correo", async () => {
    const mockDocRef = {};
    firestore.doc.mockReturnValue(mockDocRef);

    const userData = {
      uid: "user123",
      name: "Andrea",
      lastName: "López",
      email: "andrea@test.com",
    };

    await saveUserToFirestore(userData);

    expect(firestore.doc).toHaveBeenCalledWith(db, "users", "user123");
    expect(firestore.setDoc).toHaveBeenCalledWith(mockDocRef, {
      name: "Andrea",
      lastName: "López",
      email: "andrea@test.com",
      role: "user",
    });
  });

  it("fetchUsersFromFirestore devuelve lista de usuarios correctamente mapeada", async () => {
    const mockDocs = [
      { id: "1", data: () => ({ name: "A" }) },
      { id: "2", data: () => ({ name: "B" }) },
    ];
    firestore.getDocs.mockResolvedValueOnce({ docs: mockDocs });

    const result = await fetchUsersFromFirestore();

    expect(firestore.collection).toHaveBeenCalledWith(db, "users");
    expect(result).toEqual([
      { id: 1, uid: "1", name: "A" },
      { id: 2, uid: "2", name: "B" },
    ]);
  });

  it("updateUserById actualiza solo nombre y apellido del usuario", async () => {
    const mockDocRef = {};
    firestore.doc.mockReturnValue(mockDocRef);

    await updateUserById("abc123", {
      name: "Carlos",
      lastName: "Mendoza",
    });

    expect(firestore.doc).toHaveBeenCalledWith(db, "users", "abc123");
    expect(firestore.setDoc).toHaveBeenCalledWith(
      mockDocRef,
      { name: "Carlos", lastName: "Mendoza" },
      { merge: true }
    );
  });

  it("deleteUserByUid elimina el usuario con uid dado", async () => {
    const mockDocRef = {};
    firestore.doc.mockReturnValue(mockDocRef);

    await deleteUserByUid("xyz789");

    expect(firestore.doc).toHaveBeenCalledWith(db, "users", "xyz789");
    expect(firestore.deleteDoc).toHaveBeenCalledWith(mockDocRef);
  });
});
