import { Fragment, useEffect } from "react";
import { Outlet } from "react-router-dom";
import NoProductsFound from "../components/Product/NoProductsFound";
import ProductList from "../components/Sidebar/ProductList/ProductList";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import useHttp from "../hooks/use-http";
import { getAllProducts } from "../lib/api";

export default function ToplistPage() {
  const {
    sendRequest,
    status,
    data: loadedProducts,
    error,
  } = useHttp(getAllProducts, true);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (
    status === "completed" &&
    (!loadedProducts || loadedProducts.length === 0)
  ) {
    return <NoProductsFound />;
  }

  const getToplist = () => {
    const topList = [...loadedProducts]
      .sort((a: any, b: any) => b.price - a.price)
      .slice(0, 25);
    return topList;
  };

  return (
    <Fragment>
      <ProductList
        products={getToplist()}
        location={"toplist"}
        onSelectProduct={() => {}}
      />
      <section className="content">
        <Outlet />
      </section>
    </Fragment>
  );
}
