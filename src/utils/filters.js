export const filterData = (data, search) => {
  const lower = search.toLowerCase();
  return data.filter((row) =>
    Object.values(row).some((val) => String(val).toLowerCase().includes(lower))
  );
};

export const sortData = (data, key, asc) => {
  if (!key) return data;
  return [...data].sort((a, b) => {
    const aVal = a[key];
    const bVal = b[key];
    const isNumeric = !isNaN(aVal) && !isNaN(bVal);
    return asc
      ? isNumeric
        ? aVal - bVal
        : String(aVal).localeCompare(String(bVal))
      : isNumeric
      ? bVal - aVal
      : String(bVal).localeCompare(String(aVal));
  });
};
