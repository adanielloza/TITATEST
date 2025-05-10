import useToast from "../../../hooks/useToast";
import { rtdb, ref, get, child, set } from "../../../services/firebase";
import { useCapitalize, useFormatDate } from "../../../utils/formatters";

const useSavePatient = () => {
  const { notify } = useToast();
  const capitalize = useCapitalize();
  const formatDate = useFormatDate();

  const savePatient = async (formData) => {
    try {
      const dbRef = ref(rtdb);
      const snapshot = await get(child(dbRef, "pacientes"));

      let nextId = 1;
      if (snapshot.exists()) {
        const ids = Object.keys(snapshot.val())
          .map((key) => parseInt(key.split("_")[1]))
          .filter(Number.isInteger);
        nextId = Math.max(...ids) + 1;
      }

      const formatted = {
        nombre: capitalize(formData.nombre),
        apellido: capitalize(formData.apellido),
        fechaNacimiento: formatDate(formData.fechaNacimiento),
        sexo: capitalize(formData.sexo),
        tipoTDAH: formData.tipoTDAH.toUpperCase(),
        nombreTutor: capitalize(formData.nombreTutor),
        telefonoTutor: formData.telefonoTutor,
        correoTutor: formData.correoTutor.toLowerCase(),
        observaciones: formData.observaciones || "",
      };

      const pacienteRef = ref(rtdb, `pacientes/paciente_${nextId}`);
      await set(pacienteRef, {
        id: nextId,
        datos_personales: formatted,
      });

      notify("success", `Paciente registrado correctamente`);
    } catch (error) {
      console.error("Error al guardar paciente:", error);
      notify("error", "Error al registrar paciente");
    }
  };

  return { savePatient };
};

export default useSavePatient;
