import React, { useEffect, useState } from "react";
import styles from "./table.module.css";
import usePagination from "../../hooks/usePagination";
import { TableProps } from "../../models/Table";

const Table = <T,>({ apiUrl, pageSize, columns }: TableProps<T>) => {
  const {
    totalPages,
    currentData,
    currentPage,
    hasNextPage,
    hasPrevPage,
    goToNextPage,
    goToPrevPage,
    gotToPage,
  } = usePagination<T>(apiUrl, pageSize);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Listen for window resize to update mobile view
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Function to generate pagination UI (for desktop)
  const generatePagination = () => {
    const pages: (number | "...")[] = [1];

    if (currentPage > 3) pages.push("...");
    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(totalPages - 1, currentPage + 1);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) pages.push("...");
    if (totalPages > 1) pages.push(totalPages);

    return pages;
  };

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.accessor as string}>{col.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentData.map((item, index) => (
            <tr key={index}>
              {columns.map((col) => (
                <td key={col.accessor as string}>
                  {item[col.accessor] as React.ReactNode}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination UI */}
      <div className={styles.pagination}>
        <button onClick={goToPrevPage} disabled={!hasPrevPage}>
          Previous
        </button>

        {!isMobile &&
          generatePagination().map((page, index) => (
            <button
              key={index}
              className={currentPage === page ? styles.activePage : ""}
              onClick={() => typeof page === "number" && gotToPage(page)}
              disabled={page === "..."}
            >
              {page}
            </button>
          ))}

        <button onClick={goToNextPage} disabled={!hasNextPage}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Table;
