import { Pagination } from "@/commons/entities/Pagination";
import "@/styles/general/pagination.css";
import { FaAngleLeft } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";

interface PaginationTableProps<T> {
  pagination: Pagination<T>;
  onPageChange: (page: number) => void;
}

export const PaginationTable = <T,>({
  pagination: { page: currentPage, totalPages: pages },
  onPageChange,
}: PaginationTableProps<T>) => {
  const handlePrevious = () => {
    if (currentPage > 0) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < pages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="pagination-controls">
      <button onClick={handlePrevious} disabled={currentPage === 1}>
        <FaAngleLeft />
      </button>
      <span>
        Page {currentPage} of {pages}
      </span>
      <button onClick={handleNext} disabled={currentPage === pages}>
        <FaAngleRight />
      </button>
    </div>
  );
};
