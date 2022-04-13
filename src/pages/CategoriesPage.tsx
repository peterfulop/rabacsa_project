import { Fragment, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import CategoryList from "../components/Sidebar/CategoryList/CategoryList";
import { getAllProducts } from "../lib/api";
import { Category, Product } from "../utils/interfaces/product.interface";

export default function CategoriesPage() {
  const [categories, setCategoires] = useState<Category[]>([]);
  const [firstInit, setFirstInit] = useState(true);

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
      getAllProducts()
        .then((data) => {
          return createCategories(data);
        })
        .then((toplist) => {
          setCategoires(toplist);
          setFirstInit(false);
        });
    }
  });

  return (
    <Fragment>
      <CategoryList categories={categories} location={"categories"} />
      <section className="content">
        <Outlet />
      </section>
    </Fragment>
  );
}
