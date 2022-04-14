import { Fragment, useContext, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import NoProductsFound from "../components/products/NoProductsFound";
import ProductList from "../components/sidebar/products/ProductList";
import { ProductContext } from "../contexts/product.context";
import { getAllProducts } from "../lib/api";

export default function ProductsPage() {
  const ctx = useContext(ProductContext);
  const [firstInit, setFirstInit] = useState(true);
  const [isData, setIsData] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const navigation = useNavigate();

  useEffect(() => {
    if (firstInit) {
      getAllProducts()
        .then((data) => {
          ctx.setItems(data);
          if (data.length === 0) {
            setIsData(false);
          } else {
            navigation(`/products/${data[0].id}`);
            setIsData(true);
          }
          setFirstInit(false);
        })
        .then(() => {
          setIsLoading(false);
        });
    }
  });

  if (!isLoading && !isData) {
    return (
      <section className="d-flex justify-content-center w-100">
        <NoProductsFound />
      </section>
    );
  }

  return (
    <Fragment>
      {isData && <ProductList products={ctx.items} location={"products"} />}
      <section className="content">
        <Outlet />
      </section>
    </Fragment>
  );
}
