import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
} from "@mui/material";
import { Fragment, MouseEventHandler, useEffect, useState } from "react";
import { Product } from "../../../interfaces/product.interface";

export default function ProductList(props: {
  products: Product[];
  location: string;
}) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isProducts, setIsProducts] = useState<boolean>(false);

  useEffect(() => {
    if (props.products.length > 0) {
      setIsProducts(true);
      setProducts(props.products);
    }
  }, [props.products]);

  console.log(products);

  const renderProducts = (products: Product[]) => {
    return (
      <Box
        sx={{
          width: "100%",
          bgcolor: "background.paper",
        }}
      >
        <List sx={{ padding: 0 }}>
          {products.map((item) => {
            return (
              <Fragment key={item.id}>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemText primary={item.title} />
                  </ListItemButton>
                </ListItem>
                <Divider />
              </Fragment>
            );
          })}
        </List>
      </Box>
    );
  };

  /** PAGINATION SECTION */
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const pages: number[] = [...Array(products.length / itemsPerPage).keys()].map(
    (num: number) => num + 1
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

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
    if (currentPage === pages.length - 1) return;
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

  return (
    <section>
      <p className="location-heading">{props.location}</p>
      {isProducts && renderProducts(currentItems)}
      <button
        hidden={currentPage === 1 ? true : false}
        onClick={prevBtnHandler}
      >
        Prev
      </button>
      {renderPageNumbers}
      <button
        hidden={currentPage === pages.length - 1 ? true : false}
        onClick={nextBtnHandler}
      >
        Next
      </button>
    </section>
  );
}
