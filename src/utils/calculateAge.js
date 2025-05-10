export const calculateAge = (fechaNacimiento) => {
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
