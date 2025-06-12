const TableHeader = ({
  columns,
  sortKey,
  sortAsc,
  onSort,
  toggleAsc,
  showActions,
}) => {
  const handleSort = (key) => {
    toggleAsc(sortKey === key ? !sortAsc : true);
    onSort(key);
  };

  return (
    <tr>
      {columns.map((col) => (
        <th
          key={col.key}
          className="datatable__th"
          onClick={() => handleSort(col.key)}
        >
          {col.label}
        </th>
      ))}
      {showActions && <th className="datatable__th">Acciones</th>}
    </tr>
  );
};

export default TableHeader;
