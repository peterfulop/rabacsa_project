import { Product } from "../../utils/interfaces/product.interface";
import usePagination from "../../hooks/use-Pagination";

import "../../Styles/Product/ProductList.css";
import ProductAsListItem from "./ProductAsListItem";

export default function ProductsList(props: {
  products: Product[];
  activeCategory: string;
}) {
  const { currentItems, renderPagination } = usePagination({
    data: props.products,
  });

  function renderProductItem(data: Product[]) {
    return data.map((product: Product) => {
      return <ProductAsListItem product={product} key={product.id} />;
    });
  }

  return (
    <section className="product-list">
      <div className="product-list-header">
        <h2>Products</h2>
        <p>{props.activeCategory}</p>
      </div>
      <section className="product-list-pagination">
        {renderPagination()}
      </section>
      {renderProductItem(currentItems)}
      <section className="product-list-pagination">
        {renderPagination()}
      </section>
    </section>
  );
}
