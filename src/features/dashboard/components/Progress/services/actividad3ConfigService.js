import { ref, get } from "firebase/database";
import { rtdb } from "../../../../../services/firebase";

const DEFAULT_PARAMETROS_ACTIVIDAD_3 = {
  parametrosEsperadosPorNivel: {
    dificil: { respuestasCorrectas: 7, tiempoPorPregunta: 10 },
    medio: { respuestasCorrectas: 5, tiempoPorPregunta: 7 },
    facil: { respuestasCorrectas: 3, tiempoPorPregunta: 5 },
  },
  penalizaciones: {
    muyLento: 30,
    muyPocasCorrectas: 40,
  },
};

let cachedParametrosActividad3 = null;

export const fetchParametrosActividad3 = async () => {
  if (cachedParametrosActividad3) return cachedParametrosActividad3;

  const dbRef = ref(rtdb, "parametros_actividades/actividad_3");

  try {
    const snapshot = await get(dbRef);
    if (snapshot.exists()) {
      cachedParametrosActividad3 = snapshot.val();
    } else {
      cachedParametrosActividad3 = DEFAULT_PARAMETROS_ACTIVIDAD_3;
    }
  } catch (error) {
    console.error(
      "Error al obtener parámetros de Actividad 3 desde Firebase. Usando valores por defecto:",
      error
    );
    cachedParametrosActividad3 = DEFAULT_PARAMETROS_ACTIVIDAD_3;
  }

  return cachedParametrosActividad3;
};

export const __setCachedParametrosActividad3 = (val) => {
  cachedParametrosActividad3 = val;
};
