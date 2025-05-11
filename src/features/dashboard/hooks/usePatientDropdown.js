import { useEffect, useState } from "react";
import { get, ref, child, rtdb } from "../../../services/firebase";
import { useLoader } from "../../../contexts/LoaderContext";

const usePatientDropdown = () => {
  const [options, setOptions] = useState([]);
  const { showLoader, hideLoader } = useLoader();

  useEffect(() => {
    const fetchPatients = async () => {
      showLoader();
      try {
        const snapshot = await get(child(ref(rtdb), "pacientes"));
        if (snapshot.exists()) {
          const data = snapshot.val();
          const parsed = Object.entries(data).map(([key, value]) => {
            const { nombre, apellido } = value.datos_personales || {};
            return {
              value: key,
              label: `${nombre} ${apellido}`,
            };
          });
          setOptions(parsed);
        }
      } catch (error) {
        console.error("Error fetching patient dropdown:", error);
      } finally {
        hideLoader();
      }
    };

    fetchPatients();
  }, []);

  return { options };
};

export default usePatientDropdown;
