import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
} from "@mui/material";
import { Fragment, useContext, useEffect, useState } from "react";
import { Product } from "../../../interfaces/product.interface";
import SidebarItem from "../SidebarItem";

import "../Sidebar.css";
import ProductContext from "../../../contexts/product.context";

export default function ProductList(props: {
  products: Product[];
  location: string;
  onSelectProduct: Function;
  activeProductId?: string;
}) {
  // const ctx = useContext(ProductContext);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    setProducts(props.products);
  }, [props.products]);

  const selectProductHandler = (id: string) => {
    const activeProduct = [...products].find((product) => product.id === id);
    props.onSelectProduct(activeProduct);
  };

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
                  <ListItemButton
                    className={
                      item.id === props.activeProductId ? "active-product" : ""
                    }
                    onClick={() => selectProductHandler(item.id)}
                  >
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
    <SidebarItem
      data={products}
      location={props.location}
      renderContent={renderProducts}
    />
  );
}
