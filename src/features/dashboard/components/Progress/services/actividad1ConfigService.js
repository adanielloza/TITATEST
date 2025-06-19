import { ref, get } from "firebase/database";
import { rtdb } from "../../../../../services/firebase";

const DEFAULT_PARAMETROS_ACTIVIDAD_1 = {
  parametrosEsperadosPorNivel: {
    dificil: {
      respuestasCorrectas: 10,
      tiempoDeObservacion: 20,
      tiempoPorPregunta: 20,
    },
    medio: {
      respuestasCorrectas: 7,
      tiempoDeObservacion: 15,
      tiempoPorPregunta: 15,
    },
    facil: {
      respuestasCorrectas: 3,
      tiempoDeObservacion: 10,
      tiempoPorPregunta: 10,
    },
  },
  penalizaciones: {
    muyLento: 30,
    muyPocasCorrectas: 40,
    pocaObservacion: 20,
  },
};

let cachedParametrosActividad1 = null;

export const fetchParametrosActividad1 = async () => {
  if (cachedParametrosActividad1) return cachedParametrosActividad1;

  const dbRef = ref(rtdb, "parametros_actividades/actividad_1");

  try {
    const snapshot = await get(dbRef);
    if (snapshot.exists()) {
      cachedParametrosActividad1 = snapshot.val();
    } else {
      cachedParametrosActividad1 = DEFAULT_PARAMETROS_ACTIVIDAD_1;
    }
  } catch (error) {
    console.error(
      "Error al obtener parámetros desde RTDB. Usando valores por defecto:",
      error
    );
    cachedParametrosActividad1 = DEFAULT_PARAMETROS_ACTIVIDAD_1;
  }

  return cachedParametrosActividad1;
};

export const __setCachedParametrosActividad1 = (val) => {
  cachedParametrosActividad1 = val;
};
