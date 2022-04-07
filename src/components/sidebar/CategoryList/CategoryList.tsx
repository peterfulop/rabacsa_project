import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
} from "@mui/material";
import { Fragment } from "react";
import { Category } from "../../../utils/interfaces/product.interface";
import SidebarItem from "../SidebarItem";

export default function CategoryList(props: {
  categories: Category[];
  location: string;
  activeCategory?: string;
  onSelectCategory: Function;
}) {
  const renderCategories = (categories: Category[]) => {
    return (
      <Box
        sx={{
          width: "100%",
          bgcolor: "background.paper",
        }}
      >
        <List sx={{ padding: 0 }}>
          {categories.map((item) => {
            const categoryTitle = `${item.title} (${item.count})`;
            return (
              <Fragment key={item.title}>
                <ListItem disablePadding>
                  <ListItemButton
                    className={
                      item.title === props.activeCategory
                        ? "active-product"
                        : ""
                    }
                    onClick={() => props.onSelectCategory(item.title)}
                  >
                    <ListItemText primary={categoryTitle} />
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
      data={props.categories}
      location={props.location}
      renderContent={renderCategories}
    />
  );
}
