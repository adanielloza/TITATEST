import Input from "../Input";

const Controls = ({
  search,
  setSearch,
  rowsPerPage,
  setRowsPerPage,
  setPage,
  placeholder,
}) => (
  <div className="datatable__controls">
    <Input
      placeholder={placeholder}
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
    <div className="datatable__rows-per-page">
      <label htmlFor="rowsPerPage">Filas por página:</label>
      <select
        id="rowsPerPage"
        value={rowsPerPage}
        onChange={(e) => {
          setPage(1);
          setRowsPerPage(+e.target.value);
        }}
      >
        {[5, 10, 15, 20].map((n) => (
          <option key={n} value={n}>
            {n}
          </option>
        ))}
      </select>
    </div>
  </div>
);

export default Controls;
