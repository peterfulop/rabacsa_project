import { Product } from "../../../utils/interfaces/product.interface";
import SidebarItem from "../Sidebar";
import "../../../Styles/Sidebar/Sidebar.css";
import SidebarListItem from "../SidebarListItem";
import { useParams } from "react-router-dom";

const getNeighbourIndex = (index: number, length: number): number => {
  if (length === 1) {
    return 0;
  } else if (index === 0 && length > 0) {
    return index + 1;
  } else {
    return index - 1;
  }
};

export default function ProductList(props: {
  products: Product[];
  location: string;
}) {
  const params = useParams();
  const { productId } = params;

  const renderProducts = (products: Product[]) => {
    return (
      <ul className="sidebar-list">
        {products.map((item) => {
          const index = getNeighbourIndex(
            products.indexOf(item),
            products.length
          );
          return (
            <SidebarListItem
              key={item.id}
              className={item.id === productId ? "active-product" : ""}
              href={`/${props.location}/${item.id}`}
              neighbourId={products[index].id}
            >
              {item.title}
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
