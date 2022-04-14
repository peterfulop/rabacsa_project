import { Fragment, useContext, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import NoProductsFound from "../components/products/NoProductsFound";
import CategoryList from "../components/sidebar/CategoryList/CategoryList";
import { ProductContext } from "../contexts/product.context";
import { getAllProducts } from "../lib/api";
import { Category, Product } from "../utils/interfaces/product.interface";

export default function CategoriesPage() {
  const [firstInit, setFirstInit] = useState(true);
  const [isData, setIsData] = useState(false);

  const ctx = useContext(ProductContext);
  const navigation = useNavigate();

  const createCategories = (data: Product[]) => {
    const categories = [...data].map((product: Product) => product.category);
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

  useEffect(() => {
    if (firstInit) {
      getAllProducts().then((data) => {
        ctx.setItems(data);
        if (data.length === 0) {
          setIsData(false);
        } else {
          setIsData(true);
          navigation(`/categories/All Products`);
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
      <CategoryList
        categories={createCategories(ctx.items)}
        location={"categories"}
      />
      <section className="content">
        <Outlet />
      </section>
    </Fragment>
  );
}
