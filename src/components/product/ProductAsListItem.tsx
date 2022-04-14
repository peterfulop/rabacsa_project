import { Product } from "../../utils/interfaces/product.interface";
import usePagination from "../../hooks/usePagination";
import ProductAsCardItem from "./ProductAsCardItem";

import "../../Styles/Product/ProductList.css";

export default function ProductAsListItem(props: {
  products: Product[];
  activeCategory: string;
}) {
  const { currentItems, renderPagination } = usePagination({
    data: props.products,
  });

  function renderProductItem(data: Product[]) {
    return data.map((product: Product) => {
      return (
        <div className="product-list-item" key={product.id}>
          <div className="product-list-meta-data">
            <div className="product-image">
              <img src={product.thumbnail} alt={product.title} />
            </div>
            <div className="product-list-data">
              <h4>{product.title}</h4>
              <p>{product.rating}</p>
              <small>{product.description}</small>
            </div>
          </div>
          <div className="product-list-actions">
            <h2>${product.price}</h2>
            <ProductAsCardItem product={product} />
          </div>
        </div>
      );
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
