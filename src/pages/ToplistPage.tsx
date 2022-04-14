import { Fragment, useContext, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import NoProductsFound from "../components/Product/NoProductsFound";
import ProductList from "../components/Sidebar/ProductList/ProductList";
import { ProductContext } from "../contexts/product.context";
import { getAllProducts } from "../lib/api";
import { Product } from "../utils/interfaces/product.interface";

export default function ToplistPage() {
  const ctx = useContext(ProductContext);
  const [firstInit, setFirstInit] = useState(true);
  const [isData, setIsData] = useState(false);

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
          if (toplist.length === 0) {
            setIsData(false);
          } else {
            setIsData(true);
            navigation(`/toplist/${toplist[0].id}`);
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
      <ProductList products={createToplist(ctx.items)} location={"toplist"} />
      <section className="content">
        <Outlet />
      </section>
    </Fragment>
  );
}
