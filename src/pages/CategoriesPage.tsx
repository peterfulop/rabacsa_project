import { Fragment } from "react";
import { Link, Outlet } from "react-router-dom";
import SidebarListItem from "../components/Sidebar/SidebarListItem";

export default function CategoriesPage() {
  // const renderSidebarItems = () => {
  //   const categories = [...items].map((product: Product) => product.category);

  //   const uniques = categories.reduce(function (prev: any, cur: any) {
  //     prev[cur] = (prev[cur] || 0) + 1;
  //     return prev;
  //   }, {});

  //   let uniqueCategories: Category[] = [];
  //   for (const key in uniques) {
  //     uniqueCategories.push({
  //       title: key,
  //       count: uniques[key],
  //     });
  //   }
  //   uniqueCategories.push({
  //     title: "All Products",
  //     count: categories.length,
  //   });
  // };

  return (
    <Fragment>
      <section className="sidebar">{}</section>
      <section className="content">
        <p>Categories</p>
        <Outlet />
      </section>
    </Fragment>
  );
}
