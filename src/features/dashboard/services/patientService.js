import { rtdb, ref, get, child, set, remove } from "../../../services/firebase";

export const savePatientToDB = async (data) => {
  const dbRef = ref(rtdb);
  const snapshot = await get(child(dbRef, "pacientes"));

  let nextId = 1;
  if (snapshot.exists()) {
    const ids = Object.keys(snapshot.val())
      .map((key) => parseInt(key.split("_")[1]))
      .filter(Number.isInteger);
    nextId = Math.max(...ids) + 1;
  }

  const pacienteRef = ref(rtdb, `pacientes/paciente_${nextId}`);
  await set(pacienteRef, {
    id: nextId,
    datos_personales: data,
  });
};

export const fetchAllPatients = async () => {
  const snapshot = await get(child(ref(rtdb), "pacientes"));
  return snapshot.exists() ? snapshot.val() : {};
};

export const deletePatientById = async (id) => {
  const key = `paciente_${id}`;
  await remove(ref(rtdb, `pacientes/${key}`));
};
