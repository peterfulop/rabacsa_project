import { Fragment, useContext, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import ProductList from "../components/Sidebar/ProductList/ProductList";
import { ProductContext } from "../contexts/product.context";
import { getAllProducts } from "../lib/api";
import { Product } from "../utils/interfaces/product.interface";

export default function ToplistPage() {
  const ctx = useContext(ProductContext);
  const [firstInit, setFirstInit] = useState(true);
  const navigation = useNavigate();

  const createToplist = (data: Product[]) => {
    const topList = [...data]
      .sort((a: any, b: any) => b.price - a.price)
      .slice(0, 25);
    return topList;
  };

  useEffect(() => {
    if (firstInit) {
      getAllProducts()
        .then((data) => {
          ctx.setItems(data);
          return createToplist(data);
        })
        .then((toplist) => {
          navigation(`/toplist/${toplist[0].id}`);
          setFirstInit(false);
        });
    }
  });

  return (
    <Fragment>
      <ProductList products={createToplist(ctx.items)} location={"toplist"} />
      <section className="content">
        <Outlet />
      </section>
    </Fragment>
  );
}
