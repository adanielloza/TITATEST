import { ref, get } from "firebase/database";
import { rtdb } from "../../../../../services/firebase";

const DEFAULT_PARAMETROS_ACTIVIDAD_2 = {
  parametrosEsperadosPorGrid: {
    grid3: { aperturas: 5, tiempo: 60 },
    grid4: { aperturas: 8, tiempo: 90 },
    grid5: { aperturas: 15, tiempo: 150 },
  },
  penalizaciones: {
    demasiadasAperturas: 20,
    muyLento: 30,
    muyPocasCorrectas: 40,
  },
};

let cachedParametrosActividad2 = null;

export const fetchParametrosActividad2 = async () => {
  if (cachedParametrosActividad2) return cachedParametrosActividad2;

  const dbRef = ref(rtdb, "parametros_actividades/actividad_2");

  try {
    const snapshot = await get(dbRef);
    if (snapshot.exists()) {
      cachedParametrosActividad2 = snapshot.val();
    } else {
      cachedParametrosActividad2 = DEFAULT_PARAMETROS_ACTIVIDAD_2;
    }
  } catch (error) {
    console.error(
      "Error al obtener parámetros desde RTDB. Usando valores por defecto:",
      error
    );
    cachedParametrosActividad2 = DEFAULT_PARAMETROS_ACTIVIDAD_2;
  }

  return cachedParametrosActividad2;
};

export const __setCachedParametros = (value) => {
  cachedParametrosActividad2 = value;
};
