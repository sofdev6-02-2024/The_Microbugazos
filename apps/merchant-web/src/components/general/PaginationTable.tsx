import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import "@/styles/general/pagination.css";
import { Pagination } from "@/commons/entities/Pagination";

interface PaginationTableProps<T> {
  pagination: Pagination<T>;
  onPageChange: (page: number) => void;
}

export const PaginationTable = <T,>({
  pagination: { page: currentPage, totalPages: pages },
  onPageChange,
}: PaginationTableProps<T>) => {
  const MAX_VISIBLE_PAGES = 5;

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < pages) {
      onPageChange(currentPage + 1);
    }
  };

  const generatePageNumbers = () => {
    const pageNumbers: (number | string)[] = [];
    const halfRange = Math.floor(MAX_VISIBLE_PAGES / 2);

    if (pages <= MAX_VISIBLE_PAGES) {
      for (let i = 1; i <= pages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= halfRange + 1) {
        for (let i = 1; i <= MAX_VISIBLE_PAGES - 1; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push("...");
      } else if (currentPage > pages - halfRange) {
        pageNumbers.push("...");
        for (let i = pages - (MAX_VISIBLE_PAGES - 2); i <= pages; i++) {
          pageNumbers.push(i);
        }
      } else {
        pageNumbers.push("...");
        for (
          let i = currentPage - halfRange;
          i <= currentPage + halfRange;
          i++
        ) {
          pageNumbers.push(i);
        }
        pageNumbers.push("...");
      }
    }

    return pageNumbers;
  };

  const pageNumbers = generatePageNumbers();

  return (
    <div className="pagination-controls">
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className="pagination-button-arrow"
      >
        <FaAngleLeft />
      </button>
      {pageNumbers.map((page, index) =>
        typeof page === "number" ? (
          <button
            key={index}
            onClick={() => onPageChange(page)}
            className={`pagination-button-index ${currentPage === page ? "active" : ""}`}
          >
            {page}
          </button>
        ) : (
          <span key={index} className="dots">
            {page}
          </span>
        )
      )}
      <button
        onClick={handleNext}
        disabled={currentPage === pages}
        className="pagination-button-arrow"
      >
        <FaAngleRight />
      </button>
    </div>
  );
};
