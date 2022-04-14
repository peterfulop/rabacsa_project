import { Fragment, useContext, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import ProductList from "../components/Sidebar/ProductList/ProductList";
import { ProductContext } from "../contexts/product.context";
import { getAllProducts } from "../lib/api";

export default function ProductsPage() {
  const ctx = useContext(ProductContext);
  const [firstInit, setFirstInit] = useState(true);
  const navigation = useNavigate();

  useEffect(() => {
    if (firstInit) {
      getAllProducts().then((data) => {
        ctx.setItems(data);
        navigation(`/products/${data[0].id}`);
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
