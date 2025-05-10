import useToast from "../../../hooks/useToast";
import { savePatientToDB } from "../services/patientService";
import { useCapitalize, useFormatDate } from "../../../utils/formatters";

const useSavePatient = () => {
  const { notify } = useToast();
  const capitalize = useCapitalize();
  const formatDate = useFormatDate();

  const savePatient = async (formData) => {
    try {
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

      await savePatientToDB(formatted);
      notify("success", `Paciente registrado correctamente`);
    } catch (error) {
      console.error("Error al guardar paciente:", error);
      notify("error", "Error al registrar paciente");
    }
  };

  return { savePatient };
};

export default useSavePatient;
