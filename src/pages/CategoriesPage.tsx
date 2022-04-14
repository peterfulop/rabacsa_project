import { Fragment, useContext, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import CategoryList from "../components/Sidebar/CategoryList/CategoryList";
import { ProductContext } from "../contexts/product.context";
import { getAllProducts } from "../lib/api";
import { Category, Product } from "../utils/interfaces/product.interface";

export default function CategoriesPage() {
  const [firstInit, setFirstInit] = useState(true);
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
        navigation(`/categories/All Products`);
        setFirstInit(false);
      });
    }
  });

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