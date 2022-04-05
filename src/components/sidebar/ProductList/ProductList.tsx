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
import SidebarItem from "../SidebarItem";

import "../Sidebar.css";

export default function ProductList(props: {
  products: Product[];
  location: string;
  onSelectProduct: Function;
  activeProductId?: string;
}) {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (props.products.length > 0) {
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
                  <ListItemButton
                    className={
                      item.id === props.activeProductId ? "active-product" : ""
                    }
                    onClick={() => props.onSelectProduct(item.id)}
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
