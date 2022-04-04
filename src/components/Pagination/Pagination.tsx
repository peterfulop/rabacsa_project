import { ButtonGroup } from "@mui/material";

import "./Pagination.css";

export default function Pagination(props: {
  page: number;
  totalPages: number;
  onClickHandler: Function;
}) {
  const pages: number[] = [...Array(props.totalPages).keys()].map(
    (num: number) => num + 1
  );

  const paginationClickHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    num: number
  ) => {
    props.onClickHandler(num);
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
        {pages.map((num) => (
          <button
            className=""
            key={num}
            onClick={(e) => paginationClickHandler(e, num)}
          >
            {num}
          </button>
        ))}
      </ButtonGroup>
    </div>
  );
}
