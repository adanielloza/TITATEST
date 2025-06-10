import React, { useMemo, useState } from "react";
import "../../styles/DataTable.css";
import Controls from "./Controls";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import Pagination from "./Pagination";
import { filterData, sortData } from "../../utils/filters";

const DataTable = ({
  columns,
  data,
  onEdit,
  onDelete,
  searchPlaceholder = "Buscar...",
}) => {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState(null);
  const [sortAsc, setSortAsc] = useState(true);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const showActions = !!onEdit && !!onDelete;

  const filteredData = useMemo(() => filterData(data, search), [data, search]);
  const sortedData = useMemo(
    () => sortData(filteredData, sortKey, sortAsc),
    [filteredData, sortKey, sortAsc]
  );
  const totalPages = Math.ceil(sortedData.length / rowsPerPage);
  const paginatedData = sortedData.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return (
    <div className="datatable">
      <Controls
        search={search}
        setSearch={setSearch}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        setPage={setPage}
        placeholder={searchPlaceholder}
      />
      <div className="datatable__table-wrapper">
        <table className="datatable__table">
          <thead>
            <TableHeader
              columns={columns}
              sortKey={sortKey}
              sortAsc={sortAsc}
              onSort={setSortKey}
              toggleAsc={setSortAsc}
              showActions={showActions}
            />
          </thead>
          <tbody>
            <TableBody
              data={paginatedData}
              columns={columns}
              onEdit={onEdit}
              onDelete={onDelete}
              showActions={showActions}
            />
          </tbody>
        </table>
      </div>
      {totalPages > 1 && (
        <Pagination
          totalPages={totalPages}
          currentPage={page}
          setPage={setPage}
        />
      )}
    </div>
  );
};

export default DataTable;
