import React, { useMemo, useState } from "react";
import "../styles/DataTable.css";
import Input from "./Input";

const DataTable = ({
  columns,
  data,
  onEdit,
  onDelete,
  searchPlaceholder = "Buscar...",
  rowsPerPage = 10,
}) => {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState(null);
  const [sortAsc, setSortAsc] = useState(true);
  const [page, setPage] = useState(1);

  const filteredData = useMemo(() => {
    const lower = search.toLowerCase();
    return data.filter((row) =>
      Object.values(row).some((val) =>
        String(val).toLowerCase().includes(lower)
      )
    );
  }, [data, search]);

  const sortedData = useMemo(() => {
    if (!sortKey) return filteredData;
    return [...filteredData].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      return sortAsc
        ? String(aVal).localeCompare(String(bVal))
        : String(bVal).localeCompare(String(aVal));
    });
  }, [filteredData, sortKey, sortAsc]);

  const totalPages = Math.ceil(sortedData.length / rowsPerPage);
  const paginatedData = sortedData.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const handleSort = (key) => {
    setSortAsc(sortKey === key ? !sortAsc : true);
    setSortKey(key);
  };

  return (
    <div className="datatable">
      <div className="datatable__controls">
        <Input
          placeholder={searchPlaceholder}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="datatable__table-wrapper">
        <table className="datatable__table">
          <thead>
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="datatable__th"
                  onClick={() => handleSort(col.key)}
                  style={{
                    cursor: "pointer",
                    backgroundColor: "#0097e6",
                    color: "white",
                  }}
                >
                  {col.label}
                </th>
              ))}
              <th
                className="datatable__th"
                style={{ backgroundColor: "#0097e6", color: "white" }}
              >
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length + 1} className="datatable__empty">
                  No hay datos para mostrar
                </td>
              </tr>
            ) : (
              paginatedData.map((row, index) => (
                <tr key={index}>
                  {columns.map((col) => (
                    <td key={col.key} className="datatable__td">
                      {row[col.key]}
                    </td>
                  ))}
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
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="datatable__pagination">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`datatable__page-button ${
                page === i + 1 ? "active" : ""
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default DataTable;
