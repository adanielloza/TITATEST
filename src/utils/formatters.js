export const useCapitalize = () => (text) =>
  text
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

export const useFormatDate = () => (dateObj) => {
  if (!(dateObj instanceof Date)) return "";
  const day = String(dateObj.getDate()).padStart(2, "0");
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const year = dateObj.getFullYear();
  return `${day}/${month}/${year}`;
};

export const formatDateTime = (isoString) => {
  const date = new Date(isoString);
  const fecha = date.toLocaleDateString("es-EC", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  const hora = date.toLocaleTimeString("es-EC", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return { fecha, hora };
};
