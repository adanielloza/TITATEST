const Pagination = ({ totalPages, currentPage, setPage }) => (
  <div className="datatable__pagination">
    {Array.from({ length: totalPages }, (_, i) => (
      <button
        key={i}
        onClick={() => setPage(i + 1)}
        className={`datatable__page-button ${
          currentPage === i + 1 ? "active" : ""
        }`}
      >
        {i + 1}
      </button>
    ))}
  </div>
);

export default Pagination;
