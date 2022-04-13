import { Fragment, useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import NoProductsFound from "../components/Product/NoProductsFound";
import ProductList from "../components/Sidebar/ProductList/ProductList";
import { ProductContext } from "../contexts/product.context";
import { getAllProducts } from "../lib/api";

export default function ProductsPage() {
  const ctx = useContext(ProductContext);
  const [firstInit, setFirstInit] = useState(true);

  useEffect(() => {
    if (firstInit) {
      getAllProducts().then((data) => {
        ctx.setItems(data);
        setFirstInit(false);
      });
    }
  });

  return (
    <Fragment>
      <ProductList products={ctx.items} location={"products"} />
      <section className="content">
        <Outlet />
      </section>
    </Fragment>
  );
}
