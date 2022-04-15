import { Fragment, useContext, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import NoProductsFound from "../components/products/NoProductsFound";
import Product from "../components/products/Product";
import ProductList from "../components/sidebar/products/ProductList";
import { ProductContext } from "../contexts/product.context";
import { getAllProducts } from "../lib/api";

export default function ProductsPage() {
  const ctx = useContext(ProductContext);
  const [isData, setIsData] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const navigation = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      console.log("loading...");
      const products = await getAllProducts();
      if (products.length === 0) {
        setIsData(false);
      } else {
        navigation(`/products/${products[0].id}`);
        setIsData(true);
      }
      setIsLoading(false);
    };
    loadData();
  }, []);

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
