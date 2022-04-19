import { Fragment, useCallback, useContext, useEffect, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import NoProductsFound from "../components/products/NoProductsFound";
import ProductList from "../components/sidebar/products/ProductList";
import { ProductContext } from "../contexts/product.context";
import { getAllProducts } from "../lib/api";
import { Product } from "../utils/interfaces/product.interface";

export default function ToplistPage() {
  const ctx = useContext(ProductContext);
  const [isData, setIsData] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const navigation = useNavigate();
  const params = useParams();
  const { productId } = params;

  const createToplist = (data: Product[]) => {
    const topList = [...data]
      .sort((a: any, b: any) => b.price - a.price)
      .slice(0, 25);
    return topList;
  };

  const loadData = useCallback(async () => {
    const products = await getAllProducts();
    if (products.length === 0) {
      setIsData(false);
    } else {
      const highestPrice = [...products].sort(
        (a: any, b: any) => b.price - a.price
      );
      if (productId) {
        navigation(`/toplist/${productId}`);
      } else {
        navigation(`/toplist/${highestPrice[0].id}`);
      }
      setIsData(true);
    }
    setIsLoading(false);
  }, [navigation, productId]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  if (!isLoading && !isData) {
    return (
      <section className="d-flex justify-content-center w-100">
        <NoProductsFound />
      </section>
    );
  }

  return (
    <Fragment>
      <ProductList products={createToplist(ctx.items)} location={"toplist"} />
      <section className="content">
        <Outlet />
      </section>
    </Fragment>
  );
}
