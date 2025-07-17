const TableBody = ({ data, columns, onEdit, onDelete, showActions }) => {
  if (data.length === 0) {
    return (
      <tr>
        <td
          colSpan={columns.length + (showActions ? 1 : 0)}
          className="datatable__empty"
        >
          No hay datos para mostrar
        </td>
      </tr>
    );
  }

  return data.map((row, index) => (
    <tr key={index}>
      {columns.map((col) => (
        <td
          key={col.key}
          className={`datatable__td ${
            col.key === "observaciones" ? "datatable__td--scrollable" : ""
          }`}
        >
          {row[col.key] !== null &&
          row[col.key] !== undefined &&
          row[col.key] !== ""
            ? row[col.key]
            : "-"}
        </td>
      ))}
      {showActions && (
        <td className="datatable__td">
          <div className="datatable__actions">
            <img
              src="/icons/edit.svg"
              alt="Editar"
              onClick={() => onEdit?.(row)}
              className="datatable__icon datatable__icon--edit"
            />
            <img
              src="/icons/trash.svg"
              alt="Eliminar"
              onClick={() => onDelete?.(row)}
              className="datatable__icon datatable__icon--delete"
            />
          </div>
        </td>
      )}
    </tr>
  ));
};

export default TableBody;
