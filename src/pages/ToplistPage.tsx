import { Fragment, useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import NoProductsFound from "../components/Product/NoProductsFound";
import ProductList from "../components/Sidebar/ProductList/ProductList";
import { ProductContext } from "../contexts/product.context";
import { getAllProducts } from "../lib/api";
import { Product } from "../utils/interfaces/product.interface";

export default function ToplistPage() {
  const ctx = useContext(ProductContext);
  const [products, setProducts] = useState<Product[]>([]);
  const [firstInit, setFirstInit] = useState(true);

  const createToplist = (data: Product[]) => {
    const topList = [...data]
      .sort((a: any, b: any) => b.price - a.price)
      .slice(0, 25);
    return topList;
  };

  useEffect(() => {
    if (firstInit) {
      getAllProducts()
        .then((data) => {
          ctx.setItems(data);
          return createToplist(data);
        })
        .then((toplist) => {
          setProducts(toplist);
          setFirstInit(false);
        });
    }
  });

  if (products.length === 0) {
    return <NoProductsFound />;
  }

  return (
    <Fragment>
      <ProductList products={products} location={"toplist"} />
      <section className="content">
        <Outlet />
      </section>
    </Fragment>
  );
}
