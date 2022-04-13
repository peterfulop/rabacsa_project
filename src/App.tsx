import "./Styles/App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./components/Layout/MainLayout";
import ProductsDetails from "./components/Product/ProductsDetails";

import CategoriesPage from "./pages/CategoriesPage";
import ProductsPage from "./pages/ProductsPage";
import ToplistPage from "./pages/ToplistPage";
import NewProductPage from "./pages/NewProductPage";
import NotFound from "./pages/NotFoundPage";
import CategoryDetails from "./components/Product/CategoryDetails";

function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path={"/"} element={<Navigate replace to={"/products"} />} />
        <Route path={"/new-product"} element={<NewProductPage />} />
        <Route path={"/products"} element={<ProductsPage />} />
        <Route path={"/products/:productId"} element={<ProductsPage />}>
          <Route path={""} element={<ProductsDetails />} />
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
          <Route path={""} element={<ProductsDetails />} />
        </Route>
        <Route path={"*"} element={<NotFound />} />
      </Routes>
    </MainLayout>
  );
}

export default App;
