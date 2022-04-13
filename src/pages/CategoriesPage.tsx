import { Fragment, useEffect } from "react";
import { Outlet } from "react-router-dom";
import NoProductsFound from "../components/Product/NoProductsFound";
import CategoryList from "../components/Sidebar/CategoryList/CategoryList";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import useHttp from "../hooks/use-http";
import { getAllProducts } from "../lib/api";
import { Category, Product } from "../utils/interfaces/product.interface";

export default function CategoriesPage() {
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

  const getCategories = () => {
    const categories = [...loadedProducts].map(
      (product: Product) => product.category
    );

    const uniques = categories.reduce(function (prev: any, cur: any) {
      prev[cur] = (prev[cur] || 0) + 1;
      return prev;
    }, {});

    let uniqueCategories: Category[] = [];
    for (const key in uniques) {
      uniqueCategories.push({
        title: key,
        count: uniques[key],
      });
    }
    uniqueCategories.push({
      title: "All Products",
      count: categories.length,
    });

    return uniqueCategories;
  };

  return (
    <Fragment>
      <CategoryList categories={getCategories()} location={"categories"} />
      <section className="content">
        <Outlet />
      </section>
    </Fragment>
  );
}
