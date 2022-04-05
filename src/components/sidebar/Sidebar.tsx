import { Category, Product } from "../../interfaces/product.interface";
import { PRODUCT_PER_PAGE } from "../../utils/constans";
import { Fragment, useEffect, useState } from "react";

import "./Sidebar.css";
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";

export default function Sidebar(props: {
  data: Product[] | Category[];
  page: number;
  location: string;
  activeProduct?: string;
  onClickHandler: Function;
}) {
  const [sidebarItems, setSidebarItems] = useState<Product[] | Category[]>([]);
  const startIndex = (props.page - 1) * PRODUCT_PER_PAGE;

  useEffect(() => {
    setSidebarItems(
      props.data.slice(startIndex, startIndex + PRODUCT_PER_PAGE)
    );
  }, [props.data, startIndex]);

  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: "background.paper",
      }}
    >
      <List sx={{ padding: 0 }}>
        <p className="heading">{props.location}</p>
        {sidebarItems.map((item) => {
          return (
            <Fragment key={item.id}>
              <ListItem disablePadding>
                <ListItemButton
                  className={item.id === props.activeProduct ? "active" : ""}
                  onClick={() => props.onClickHandler(item.id)}
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
}
