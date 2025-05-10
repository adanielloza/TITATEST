import { useEffect, useState } from "react";
import { AddPatient } from "./";
import DataTable from "../../../components/DataTable/DataTable";
import { rtdb, ref, get, child } from "../../../services/firebase";

const calculateAge = (fechaNacimiento) => {
  try {
    const [day, month, year] = fechaNacimiento.split("/");
    const birthDate = new Date(`${year}-${month}-${day}`);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  } catch {
    return "N/A";
  }
};

const PatientsDataTable = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const snapshot = await get(child(ref(rtdb), "pacientes"));
        if (snapshot.exists()) {
          const raw = snapshot.val();
          const parsed = Object.values(raw)
            .map((entry) => ({
              id: Number(entry.id),
              ...entry.datos_personales,
              edad: calculateAge(entry.datos_personales.fechaNacimiento),
            }))
            .sort((a, b) => a.id - b.id);

          setPatients(parsed);
        }
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };

    fetchPatients();
  }, []);

  const columns = [
    { key: "id", label: "ID" },
    { key: "nombre", label: "Nombre" },
    { key: "apellido", label: "Apellido" },
    { key: "edad", label: "Edad" },
    { key: "sexo", label: "Sexo" },
    { key: "tipoTDAH", label: "Tipo TDAH" },
    { key: "nombreTutor", label: "Nombre Tutor" },
    { key: "telefonoTutor", label: "Teléfono Tutor" },
    { key: "correoTutor", label: "Correo Tutor" },
    { key: "observaciones", label: "Observaciones" },
  ];

  return (
    <div>
      <AddPatient />
      <br />
      <DataTable
        columns={columns}
        data={patients}
        onEdit={(row) => console.log("Editar:", row)}
        onDelete={(row) => console.log("Eliminar:", row)}
      />
    </div>
  );
};

export default PatientsDataTable;
