import { useState } from "react";

import "./Pagination.css";

export default function usePagination(props: { data: any[] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const pages: number[] = [
    ...Array(props.data.length / itemsPerPage).keys(),
  ].map((num: number) => num + 1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = props.data.slice(indexOfFirstItem, indexOfLastItem);

  const [pageNumberLimit, setPageNumberLimit] = useState(3);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(3);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

  const paginationClickHandler = (number: number) => {
    setCurrentPage(number);
  };

  const prevBtnHandler = () => {
    if (currentPage === 1) return;
    setCurrentPage(currentPage - 1);
    if ((currentPage - 1) % pageNumberLimit === 0) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  const nextBtnHandler = () => {
    if (currentPage === pages.length) return;
    setCurrentPage(currentPage + 1);
    if (currentPage + 1 > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  const renderPageNumbers = pages.map((number) => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      return (
        <button
          className={currentPage === number ? "active" : ""}
          key={number}
          onClick={() => paginationClickHandler(number)}
        >
          {number}
        </button>
      );
    } else {
      return null;
    }
  });

  function renderPagination() {
    return (
      <section className="pagination">
        <button
          className="pagination-nav"
          hidden={currentPage === 1 ? true : false}
          onClick={prevBtnHandler}
        >
          Prev
        </button>
        {renderPageNumbers}
        <button
          className="pagination-nav"
          hidden={currentPage === pages.length ? true : false}
          onClick={nextBtnHandler}
        >
          Next
        </button>
      </section>
    );
  }

  return {
    currentItems,
    renderPagination,
  };
}
