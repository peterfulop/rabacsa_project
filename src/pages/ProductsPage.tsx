import { Fragment, useContext, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import NoProductsFound from "../components/products/NoProductsFound";
import ProductList from "../components/sidebar/ProductList/ProductList";
import { ProductContext } from "../contexts/product.context";
import { getAllProducts } from "../lib/api";
import { Product } from "../utils/interfaces/product.interface";

export default function ProductsPage() {
  const ctx = useContext(ProductContext);
  const [firstInit, setFirstInit] = useState(true);
  const [isData, setIsData] = useState(true);
  const navigation = useNavigate();

  const [activeProduct, setActiveProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (firstInit) {
      getAllProducts().then((data) => {
        setActiveProduct(data[0]);
        ctx.setItems(data);
        if (data.length === 0) {
          setIsData(false);
        } else {
          setIsData(true);
          navigation(`/products/${data[0].id}`);
        }
        setFirstInit(false);
      });
    }
  });

  if (!isData) {
    return (
      <section className="d-flex justify-content-center w-100">
        <NoProductsFound />
      </section>
    );
  }

  return (
    <Fragment>
      {isData && (
        <ProductList
          activeProduct={activeProduct}
          products={ctx.items}
          location={"products"}
        />
      )}
      <section className="content">
        <Outlet />
      </section>
    </Fragment>
  );
}
