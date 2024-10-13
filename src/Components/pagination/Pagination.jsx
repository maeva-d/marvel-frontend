import "./pagination.scss";

const Pagination = ({ limit, pageNumber, setPageNumber }) => {
  return (
    <div className="pagination-system">
      {pageNumber > 1 && (
        <button
          onClick={() => {
            setPageNumber(pageNumber - 1);
          }}
        >
          ⇠ {pageNumber - 1}
        </button>
      )}
      <span>PAGE {pageNumber}</span>
      {limit >= 100 && (
        <button
          onClick={() => {
            setPageNumber(pageNumber + 1);
          }}
        >
          {pageNumber + 1} ⇢
        </button>
      )}
    </div>
  );
};

export default Pagination;
