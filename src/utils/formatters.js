export const useCapitalize = () => (text) =>
  text.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());

export const useFormatDate = () => (dateObj) => {
  if (!(dateObj instanceof Date)) return "";
  const day = String(dateObj.getDate()).padStart(2, "0");
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const year = dateObj.getFullYear();
  return `${day}/${month}/${year}`;
};
