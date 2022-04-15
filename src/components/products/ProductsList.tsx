import { Product } from "../../utils/interfaces/product.interface";
import usePagination from "../../hooks/use-Pagination";

import "../../Styles/Product/ProductList.css";
import ProductAsListItem from "./ProductAsListItem";
import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../../contexts/product.context";
import { ALL_PRODUCTS_TITLE } from "../../utils/constans";

export default function ProductsList(props: {
  products: Product[];
  activeCategory: string;
}) {
  const [products, setProducts] = useState<Product[]>([]);

  const ctx = useContext(ProductContext);

  const { currentItems, renderPagination } = usePagination({
    data: products,
  });

  useEffect(() => {
    const products =
      props.activeCategory !== ALL_PRODUCTS_TITLE
        ? ctx.items.filter(
            (product: Product) => product.category === props.activeCategory
          )
        : ctx.items;
    setProducts(products);
  }, [ctx.items, props.activeCategory]);

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
