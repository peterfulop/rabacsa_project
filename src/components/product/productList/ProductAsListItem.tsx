import { useEffect, useState } from "react";
import { Product } from "../../../interfaces/product.interface";
import ProductEditDialog from "../actions/ProductEditDialog";

import usePagination from "../../../hooks/usePagination";

export default function ProductAsListItem(props: {
  product: Product[];
  onGetAllProducts: Function;
  activeCategory: string;
}) {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    setProducts(props.product);
  }, [props.product]);

  const { currentItems, renderPagination } = usePagination({ data: products });

  const productItem = currentItems.map((product: Product) => {
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
          <ProductEditDialog
            productName={product.title}
            productPrice={product.price}
            productDescription={product.description}
            submitAction={() => {}}
          />
        </div>
      </div>
    );
  });

  return (
    <section className="product-list">
      <div className="product-list-header">
        <h2>Products</h2>
        <small>{props.activeCategory}</small>
      </div>
      <section className="product-list-pagination">
        {renderPagination()}
      </section>
      {productItem}
      <section className="product-list-pagination">
        {renderPagination()}
      </section>
    </section>
  );
}
