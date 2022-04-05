import { ButtonGroup } from "@mui/material";
import { useEffect, useState } from "react";

import "./Pagination.css";

export default function Pagination(props: {
  page: number;
  totalPages: number;
  onClickHandler: Function;
}) {
  const [currentPage, setCurrentPage] = useState<number>(props.page);
  const [pageNumberLimit, setPageNumberLimit] = useState(3);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(3);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

  useEffect(() => {
    setCurrentPage(props.page);
  }, [props.page]);

  const pages: number[] = [...Array(props.totalPages).keys()].map(
    (num: number) => num + 1
  );

  const paginationClickHandler = (num: number) => {
    setCurrentPage(num);
    props.onClickHandler(num);
  };

  const renderPageNumbers = pages.map((number) => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      return (
        <button
          className={props.page === number ? "active" : ""}
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

  const prevBtnHandler = () => {
    console.log("prev...", currentPage);
    setCurrentPage(currentPage - 1);

    if ((currentPage - 1) % pageNumberLimit === 0) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
    // props.onClickHandler(currentPage);
  };

  const nextBtnHandler = () => {
    console.log("next...", currentPage);
    setCurrentPage(currentPage + 1);

    if (currentPage + 1 > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
    // props.onClickHandler(currentPage);
  };

  return (
    <div className="pagination">
      <div>
        <small className="pages">
          Page {props.page}/{props.totalPages}
        </small>
      </div>
      <ButtonGroup
        variant="text"
        aria-label="outlined button group"
        sx={{ borderRadius: "0 !important" }}
      >
        <button onClick={prevBtnHandler}>Prev</button>
        {renderPageNumbers}
        <button onClick={nextBtnHandler}>Next</button>
      </ButtonGroup>
    </div>
  );
}
