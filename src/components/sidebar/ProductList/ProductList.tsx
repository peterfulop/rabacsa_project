import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
} from "@mui/material";
import { Fragment } from "react";
import { Product } from "../../../utils/interfaces/product.interface";
import SidebarItem from "../SidebarItem";

import "../Sidebar.css";

export default function ProductList(props: {
  products: Product[];
  location: string;
  onSelectProduct: Function;
  activeProductId?: string;
}) {
  const selectProductHandler = (id: string) => {
    const activeProduct = [...props.products].find(
      (product) => product.id === id
    );
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
      data={props.products}
      location={props.location}
      renderContent={renderProducts}
    />
  );
}
