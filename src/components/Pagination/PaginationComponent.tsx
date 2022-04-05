import { ButtonGroup } from "@mui/material";
import { useEffect, useState } from "react";
import { PRODUCT_PER_PAGE } from "../../utils/constans";

import "./Pagination.css";

export default function PaginationComponent(props: {
  data: Array<any>;
  children?: React.ReactNode;
  renderContent: Function;
}) {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    setData(props.data);
  }, [props.data, data]);

  const [currentPage, setCurrentPage] = useState<number>(1);

  // const [pageNumberLimit, setPageNumberLimit] = useState(3);
  // const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(3);
  // const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

  const pages: number[] = [
    ...Array(props.data.length / PRODUCT_PER_PAGE).keys(),
  ].map((num: number) => num + 1);

  const indexOfLastItem = currentPage * PRODUCT_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - PRODUCT_PER_PAGE;
  const currentItems = props.data.slice(indexOfFirstItem, indexOfLastItem);

  // useEffect(() => {
  //   setTotalPages(Math.ceil(props.data.length / PRODUCT_PER_PAGE));
  // }, [props.data]);

  const paginationClickHandler = (num: number) => {
    props.data.slice(indexOfFirstItem, indexOfLastItem);
    props.renderContent(currentItems);
  };

  const renderPageNumbers = pages.map((number) => {
    return (
      <button
        className={currentPage === number ? "active" : ""}
        key={number}
        onClick={() => paginationClickHandler(number)}
      >
        {number}
      </button>
    );
    // if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
    //   return (
    //     <button
    //       className={currentPage === number ? "active" : ""}
    //       key={number}
    //       onClick={() => paginationClickHandler(number)}
    //     >
    //       {number}
    //     </button>
    //   );
    // } else {
    //   return null;
    // }
  });

  const prevBtnHandler = () => {
    console.log("prev...", currentPage);
    // setCurrentPage(currentPage - 1);

    // if ((currentPage - 1) % pageNumberLimit === 0) {
    //   setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
    //   setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    // }
  };

  const nextBtnHandler = () => {
    console.log("next...", currentPage);
    // setCurrentPage(currentPage + 1);

    // if (currentPage + 1 > maxPageNumberLimit) {
    //   setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
    //   setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    // }
  };

  return (
    <section className="paginated-section">
      <div className="paginated-content">{props.children}</div>
      <div className="pagination">
        <div>
          <small className="pages"></small>
        </div>
        <ButtonGroup
          variant="text"
          aria-label="outlined button group"
          sx={{ borderRadius: "0 !important" }}
        >
          {/* <button onClick={prevBtnHandler}>Prev</button> */}
          {renderPageNumbers}
          {/* <button onClick={nextBtnHandler}>Next</button> */}
        </ButtonGroup>
      </div>
    </section>
  );
}
