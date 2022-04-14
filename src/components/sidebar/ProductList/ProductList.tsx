import { Product } from "../../../utils/interfaces/product.interface";
import SidebarItem from "../Sidebar";

import "../../../Styles/Sidebar/Sidebar.css";
import SidebarListItem from "../SidebarListItem";
import { useParams } from "react-router-dom";

const getNeighbourIndex = (index: number): number => {
  const neighbourIndex: number = index === 0 ? index + 1 : index - 1;
  return neighbourIndex;
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
          const index = getNeighbourIndex(products.indexOf(item));
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
