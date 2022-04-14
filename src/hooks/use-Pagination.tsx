import { useEffect, useState } from "react";
import { PRODUCT_PER_PAGE } from "../utils/constans";

import "../Styles/Pagination/UsePagination.css";

export default function usePagination(props: { data: any[] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(PRODUCT_PER_PAGE);

  let pages: number[] = [];

  if (props.data.length <= itemsPerPage) {
    for (let i = 1; i <= Math.ceil(props.data.length) / itemsPerPage; i++) {
      pages.push(i);
    }
  } else {
    for (let i = 1; i <= Math.ceil(props.data.length / itemsPerPage); i++) {
      pages.push(i);
    }
  }

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [currentPage]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = props.data.slice(indexOfFirstItem, indexOfLastItem);

  const [pageNumberLimit] = useState(3);
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
      <section
        className="pagination"
        hidden={pages.length === 0 ? true : false}
      >
        <button
          className="pagination-nav"
          hidden={currentPage === 1 || pages.length === 0 ? true : false}
          onClick={prevBtnHandler}
        >
          Prev
        </button>
        {renderPageNumbers}
        <button
          className="pagination-nav"
          hidden={
            currentPage === pages.length || pages.length === 0 ? true : false
          }
          onClick={nextBtnHandler}
        >
          Next
        </button>
      </section>
    );
  }

  const data = pages.length === 0 ? [...props.data] : [...currentItems];

  if (currentItems.length === 0 && currentPage > 1) {
    setCurrentPage((prevCurrentPage) => prevCurrentPage - 1);
  }

  return {
    currentItems: data,
    renderPagination,
  };
}
