import { Product } from "../../utils/interfaces/product.interface";
import usePagination from "../../hooks/usePagination";
import ProductAsCardItem from "./ProductAsCardItem";

export default function ProductAsListItem(props: {
  products: Product[];
  activeCategory: string;
  onUpdateProduct: Function;
  onDeleteProduct: Function;
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
            <ProductAsCardItem
              product={product}
              onUpdateProduct={props.onUpdateProduct}
              onDeleteProduct={props.onDeleteProduct}
            />
          </div>
        </div>
      );
    });
  }

  return (
    <section className="product-list">
      <div className="product-list-header">
        <h2>Products</h2>
        <small>{props.activeCategory}</small>
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
