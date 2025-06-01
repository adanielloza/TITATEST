// src/utils/calculateAge.js

export const calculateAge = (fechaNacimiento) => {
  try {
    // 1) Si no hay fechaNacimiento o no se puede splittear en 3 partes, devolvemos "N/A"
    if (!fechaNacimiento) return "N/A";
    const parts = fechaNacimiento.split("/");
    if (parts.length !== 3) return "N/A";

    // 2) Parseamos las tres partes
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10);
    const year = parseInt(parts[2], 10);

    // 3) Si alguna parte no es un número válido, devolvemos "N/A"
    if (isNaN(day) || isNaN(month) || isNaN(year)) return "N/A";

    // 4) Construimos la fecha de nacimiento con Date(year, month-1, day)
    //    De ese modo, evitamos el problema de "mes 13" cuando month = 12+1.
    const birthDate = new Date(year, month - 1, day);

    // 5) Si la fecha resultante es inválida (NaN) o la fecha original
    //    no coincide (por ejemplo, `32/01/2020` → JS lo convierte a Feb 1),
    //    devolvemos "N/A".
    if (
      isNaN(birthDate.getTime()) ||
      birthDate.getDate() !== day ||
      birthDate.getMonth() !== month - 1 ||
      birthDate.getFullYear() !== year
    ) {
      return "N/A";
    }

    // 6) Comparamos con la fecha de hoy
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    // 7) Si el mes actual es menor al mes de nacimiento,
    //    o es el mismo mes pero el día de hoy es menor,
    //    restamos 1 a la edad.
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    // 8) Si la fecha de nacimiento está en el futuro (age < 0), devolvemos "N/A"
    return age >= 0 ? age : "N/A";
  } catch {
    return "N/A";
  }
};
