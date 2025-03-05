/* eslint-disable react/prop-types */
import styles from "./Pagination.module.css";

export default function Pagination({ currentPage, totalPages, onPrevPage, onNextPage}) {
  return (
    <div className={styles["pagination-simple"]}>
      <button onClick={onPrevPage} disabled={currentPage === 1} className="btn">
        Previous
      </button>

      <span>
        Page {currentPage} of {totalPages}
      </span>

      <button
        onClick={onNextPage}
        disabled={currentPage === totalPages}
        className="btn"
      >
        Next
      </button>
    </div>
  );
}
