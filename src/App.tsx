import { useContext, useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import Product from "./components/products/Product";
import CategoryDetails from "./components/products/CategoryDetails";

import CategoriesPage from "./pages/CategoriesPage";
import ProductsPage from "./pages/ProductsPage";
import ToplistPage from "./pages/ToplistPage";
import NewProductPage from "./pages/NewProductPage";
import NotFound from "./pages/NotFoundPage";

import useProductReloader from "./hooks/use-productReloader";
import { getAllProducts } from "./lib/api";
import { ProductContext } from "./contexts/product.context";

import "./Styles/App.css";

function App() {
  useProductReloader();
  const ctx = useContext(ProductContext);
  const [firstInit, setFirstInit] = useState(true);

  useEffect(() => {
    if (firstInit) {
      getAllProducts().then((data) => {
        ctx.setItems(data);
      });
      setFirstInit(false);
    }
  }, [ctx, firstInit]);

  return (
    <MainLayout>
      <Routes>
        <Route path={"/"} element={<Navigate replace to={"/products"} />} />
        <Route path={"/new-product"} element={<NewProductPage />} />
        <Route path={"/products"} element={<ProductsPage />} />
        <Route path={"/products/:productId"} element={<ProductsPage />}>
          <Route path={""} element={<Product />} />
        </Route>
        <Route path={"/categories"} element={<CategoriesPage />} />
        <Route
          path={"/categories/:productCategory"}
          element={<CategoriesPage />}
        >
          <Route path={""} element={<CategoryDetails />} />
        </Route>
        <Route path={"/toplist"} element={<ToplistPage />} />
        <Route path={"/toplist/:productId"} element={<ToplistPage />}>
          <Route path={""} element={<Product />} />
        </Route>
        <Route path={"*"} element={<NotFound />} />
      </Routes>
    </MainLayout>
  );
}

export default App;
