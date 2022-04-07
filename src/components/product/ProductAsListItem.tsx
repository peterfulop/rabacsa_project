import { useEffect, useState } from "react";
import { Product } from "../../utils/interfaces/product.interface";
import ProductEditDialog from "./actions/ProductEditDialog";

import usePagination from "../../hooks/usePagination";
import ProductAsCardItem from "./ProductAsCardItem";

export default function ProductAsListItem(props: {
  product: Product[];
  activeCategory: string;
  onUpdateProduct: Function;
  onDeleteProduct: Function;
}) {
  const [products, setProducts] = useState<Product[]>([]);
  const { currentItems, renderPagination } = usePagination({
    data: products,
  });

  useEffect(() => {
    setProducts(props.product);
  }, [props.product]);

  function renderProductItem(data: Product[]) {
    return data.map((product: Product) => {
      return (
        <div className="product-list-item" key={product.id}>
          <div className="product-image">
            <img src={product.thumbnail} alt={product.title} />
          </div>
          <div className="product-details">
            <h4>{product.title}</h4>
            <p>{product.rating}</p>
            <small>{product.description}</small>
          </div>
          <div className="product-actions">
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
