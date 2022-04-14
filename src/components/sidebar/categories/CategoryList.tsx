import { ListItemText } from "@mui/material";
import { useParams } from "react-router-dom";
import { Category } from "../../../utils/interfaces/product.interface";
import SidebarItem from "../Sidebar";
import SidebarListItem from "../SidebarListItem";

export default function CategoryList(props: {
  categories: Category[];
  location: string;
}) {
  const params = useParams();
  const { productCategory } = params;

  const renderCategories = (categories: Category[]) => {
    return (
      <ul className="sidebar-list">
        {categories.map((item) => {
          const categoryTitle = `${item.title} (${item.count})`;
          return (
            <SidebarListItem
              key={item.title}
              href={`/${props.location}/${item.title}`}
              className={item.title === productCategory ? "active-product" : ""}
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
