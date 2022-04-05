import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
} from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import { Product } from "../../../interfaces/product.interface";
import usePagination from "../../hooks/usePagination";

import "../Sidebar.css";

export default function ProductList(props: {
  products: Product[];
  location: string;
}) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isProducts, setIsProducts] = useState<boolean>(false);
  const { currentItems, renderPagination } = usePagination({ data: products });

  useEffect(() => {
    if (props.products.length > 0) {
      setIsProducts(true);
      setProducts(props.products);
    }
  }, [props.products]);

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

  return (
    <section>
      <p className="location-heading">{props.location}</p>
      {renderPagination()}
      {isProducts && renderProducts(currentItems)}
    </section>
  );
}
