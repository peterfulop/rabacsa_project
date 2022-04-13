import { Product } from "../../../utils/interfaces/product.interface";
import SidebarItem from "../Sidebar";

import "../../../Styles/Sidebar/Sidebar.css";
import SidebarListItem from "../SidebarListItem";
import { useParams } from "react-router-dom";

export default function ProductList(props: {
  products: Product[];
  location: string;
  onSelectProduct: Function;
  activeProductId?: string;
}) {
  const params = useParams();
  const { productId } = params;

  const renderProducts = (products: Product[]) => {
    return (
      <ul className="sidebar-list">
        {products.map((item) => {
          return (
            <SidebarListItem
              key={item.id}
              className={item.id === productId ? "active-product" : ""}
              href={`/${props.location}/${item.id}`}
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
