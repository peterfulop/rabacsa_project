import { ListItemText } from "@mui/material";
import { Category } from "../../../utils/interfaces/product.interface";
import SidebarItem from "../Sidebar";
import SidebarListItem from "../SidebarListItem";

export default function CategoryList(props: {
  categories: Category[];
  location: string;
  activeCategory?: string;
  onSelectCategory: Function;
}) {
  const renderCategories = (categories: Category[]) => {
    return (
      <ul className="sidebar-list">
        {categories.map((item) => {
          const categoryTitle = `${item.title} (${item.count})`;
          return (
            <SidebarListItem
              href="/"
              key={item.title}
              className={
                item.title === props.activeCategory ? "active-product" : ""
              }
              onClick={() => props.onSelectCategory(item.title)}
            >
              <ListItemText primary={categoryTitle} />
            </SidebarListItem>
          );
        })}
      </ul>
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
