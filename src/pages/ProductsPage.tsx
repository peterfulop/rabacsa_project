import { Fragment, useContext, useEffect, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import NoProductsFound from "../components/products/NoProductsFound";
import ProductList from "../components/sidebar/products/ProductList";
import { ProductContext } from "../contexts/product.context";
import { getAllProducts } from "../lib/api";
import { Product } from "../utils/interfaces/product.interface";

export default function ProductsPage() {
  const navigation = useNavigate();
  const params = useParams();
  const { productId } = params;

  const ctx = useContext(ProductContext);
  const [isData, setIsData] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const loadData = async () => {
    const products = await getAllProducts();
    if (products.length === 0) {
      setIsData(false);
    } else {
      navigation(`/products/${products[0].id}`);
      setIsData(true);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  if (!isLoading && !isData) {
    return (
      <section className="d-flex justify-content-center w-100">
        <NoProductsFound />
      </section>
    );
  }

  const loadFirstProduct = () => {
    const product = ctx.items[0] as Product;
    navigation(`/products/${product.id}`);
  };

  return (
    <Fragment>
      {isData && <ProductList products={ctx.items} location={"products"} />}
      <section className="content">
        <Outlet />
      </section>
    </Fragment>
  );
}
