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
import SidebarItem from "../Sidebar";

import "../Sidebar.css";
import SidebarListItem from "../SidebarListItem";

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
      <ul className="sidebar-list">
        {products.map((item) => {
          return (
            <SidebarListItem
              key={item.id}
              className={
                item.id === props.activeProductId ? "active-product" : ""
              }
              onClick={() => selectProductHandler(item.id)}
            >
              <ListItemText primary={item.title} />
            </SidebarListItem>
          );
        })}
      </ul>
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
